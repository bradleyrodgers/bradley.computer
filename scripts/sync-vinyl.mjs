#!/usr/bin/env node
// Regenerates src/lib/vinyl-data.ts from an Obsidian vault folder of record
// notes, and fetches missing cover art from the Cover Art Archive (via
// MusicBrainz). Covers already present in public/vinyl are never overwritten,
// so manual overrides are preserved.
//
// The vault is the single source of truth for record data; MusicBrainz is only
// used to fetch cover art (which isn't stored in the vault).
//
// Frontmatter fields read from each note:
//   Artist, Title (optional; filename is used when absent),
//   Release Date (full ISO date preferred; "Release Year" also accepted)
//   MusicBrainz (optional) — a release or release-group URL/MBID. When set, the
//     exact release is used for cover art instead of a fuzzy title search.
//
// Usage: npm run sync-vinyl
// Override the source folder with VINYL_VAULT_DIR=/path/to/Music

import { readFile, readdir, writeFile, access, mkdir } from "node:fs/promises";
import { constants } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const VAULT_DIR =
  process.env.VINYL_VAULT_DIR ||
  path.join(homedir(), "Obsidian", "Music");
const PUBLIC_VINYL_DIR = path.join(repoRoot, "public", "vinyl");
const DATA_FILE = path.join(repoRoot, "src", "lib", "vinyl-data.ts");
const PLACEHOLDER = "/vinyl/placeholder.svg";

const USER_AGENT =
  "bradley.computer-vinyl/1.0 ( https://bradley.computer )";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

// Minimal flat-frontmatter parser (the notes only use simple key: value pairs).
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = stripQuotes(line.slice(idx + 1));
    fields[key] = value === "" ? undefined : value;
  }
  return fields;
}

async function fileExists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// Fetch JSON, falling back to curl when Node's fetch can't connect (some
// sandboxed/IPv6-only networks fail under undici but curl still works).
async function fetchJson(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  } catch {
    const { stdout } = await execFileAsync(
      "curl",
      ["-fsS", "-m", "30", "-A", USER_AGENT, "-H", "Accept: application/json", url],
      { maxBuffer: 10 * 1024 * 1024 },
    );
    return JSON.parse(stdout);
  }
}

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

// Parses a MusicBrainz frontmatter value: a release/release-group URL, or a
// bare MBID (assumed to be a release). Returns { type, id } or null.
function parseMusicBrainzRef(value) {
  if (!value) return null;
  const v = value.trim();
  let m = v.match(new RegExp(`release-group/(${UUID})`, "i"));
  if (m) return { type: "release-group", id: m[1] };
  m = v.match(new RegExp(`release/(${UUID})`, "i"));
  if (m) return { type: "release", id: m[1] };
  m = v.match(new RegExp(`^(${UUID})$`, "i"));
  if (m) return { type: "release", id: m[1] };
  console.warn(`  ! Unrecognized MusicBrainz value: ${value}`);
  return null;
}

// Resolves MusicBrainz cover-art ids for a record. Uses the pinned ref when
// given, otherwise a fuzzy artist+title search. Returns { releaseId,
// releaseGroupId } or null. Sleeps after each call to respect ~1 req/sec.
async function resolveMusicBrainz(ref, artist, title) {
  try {
    if (ref?.type === "release") {
      const data = await fetchJson(
        `https://musicbrainz.org/ws/2/release/${ref.id}?fmt=json&inc=release-groups`,
      );
      await sleep(1100);
      return { releaseId: ref.id, releaseGroupId: data["release-group"]?.id ?? null };
    }

    if (ref?.type === "release-group") {
      return { releaseId: null, releaseGroupId: ref.id };
    }

    const query = `releasegroup:"${title}" AND artist:"${artist}"`;
    const url = `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(
      query,
    )}&fmt=json&limit=1`;
    const data = await fetchJson(url);
    await sleep(1100);
    const group = data["release-groups"]?.[0];
    if (!group) return null;
    return { releaseId: null, releaseGroupId: group.id };
  } catch (err) {
    console.warn(`  ! MusicBrainz lookup failed: ${err.message}`);
    return null;
  }
}

// Cover Art Archive URLs to try, most specific first (a pinned release beats
// its release-group).
function coverUrls(mb) {
  const urls = [];
  if (mb.releaseId) {
    urls.push(`https://coverartarchive.org/release/${mb.releaseId}/front-500`);
  }
  if (mb.releaseGroupId) {
    urls.push(
      `https://coverartarchive.org/release-group/${mb.releaseGroupId}/front-500`,
    );
  }
  return urls;
}

async function fetchBinary(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
  } catch {
    // curl fallback for sandboxed networks; -L follows CAA redirects.
    const { stdout } = await execFileAsync(
      "curl",
      ["-fsSL", "-m", "60", "-A", USER_AGENT, url],
      { encoding: "buffer", maxBuffer: 50 * 1024 * 1024 },
    );
    return stdout;
  }
}

// Downloads the first reachable cover to destPath. Returns true on success.
// Cover Art Archive occasionally 500s transiently, so retry each URL.
async function downloadCover(urls, destPath) {
  for (const url of urls) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const buffer = await fetchBinary(url);
        if (!buffer || buffer.length === 0) throw new Error("empty response");
        await writeFile(destPath, buffer);
        return true;
      } catch {
        await sleep(1200 * attempt);
      }
    }
  }
  return false;
}

function serializeRecords(records) {
  const body = records
    .map((r) => {
      const lines = [
        `    id: ${JSON.stringify(r.id)},`,
        `    artist: ${JSON.stringify(r.artist)},`,
        `    title: ${JSON.stringify(r.title)},`,
        `    releaseDate: ${JSON.stringify(r.releaseDate)},`,
        `    coverSrc: ${JSON.stringify(r.coverSrc)},`,
        `    coverAlt: ${JSON.stringify(r.coverAlt)},`,
      ];
      return `  {\n${lines.join("\n")}\n  },`;
    })
    .join("\n");

  return `// AUTO-GENERATED by scripts/sync-vinyl.mjs — do not edit by hand.
// Source: Obsidian vault Music folder. Run \`npm run sync-vinyl\` to refresh.
import type { VinylRecord } from "./vinyl";

export const records: VinylRecord[] = [
${body}
];
`;
}

async function main() {
  await mkdir(PUBLIC_VINYL_DIR, { recursive: true });

  let files;
  try {
    files = (await readdir(VAULT_DIR)).filter((f) => f.endsWith(".md"));
  } catch (err) {
    console.error(`Could not read vault folder ${VAULT_DIR}: ${err.message}`);
    process.exit(1);
  }

  const records = [];
  for (const file of files.sort()) {
    const fileTitle = path.basename(file, ".md");
    const raw = await readFile(path.join(VAULT_DIR, file), "utf8");
    const fields = parseFrontmatter(raw);
    const title = fields["Title"] ?? fileTitle;
    const artist = fields["Artist"] ?? "Unknown Artist";
    const slug = slugify(title);
    const mbRef = parseMusicBrainzRef(fields["MusicBrainz"]);

    console.log(`• ${title} — ${artist}`);

    // Full ISO date preferred for ordering; "Release Year" stays supported for
    // notes that only record the year. The site displays just the year.
    const releaseDate =
      fields["Release Date"] ||
      (fields["Release Year"] ? `${fields["Release Year"]}` : "");

    const fileName = `${slug}.jpg`;
    const destPath = path.join(PUBLIC_VINYL_DIR, fileName);
    const publicSrc = `/vinyl/${fileName}`;
    const haveCover = await fileExists(destPath);

    // Covers aren't in the vault, so only fetch when one is missing. Existing
    // files (auto-fetched or manual overrides) are always kept.
    let coverSrc = haveCover ? publicSrc : PLACEHOLDER;
    if (haveCover) {
      console.log(`  = cover exists, keeping ${fileName}`);
    } else {
      const mb = await resolveMusicBrainz(mbRef, artist, title);
      const urls = mb ? coverUrls(mb) : [];
      if (urls.length && (await downloadCover(urls, destPath))) {
        coverSrc = publicSrc;
        console.log(`  + fetched cover ${fileName}`);
      } else {
        console.log(`  - no cover found, using placeholder`);
      }
    }

    records.push({
      id: slug,
      artist,
      title,
      releaseDate,
      coverSrc,
      coverAlt: `${title} by ${artist} album cover`,
    });
  }

  // Stable order for clean diffs; the site re-sorts at runtime.
  records.sort((a, b) => a.title.localeCompare(b.title));

  await writeFile(DATA_FILE, serializeRecords(records), "utf8");
  console.log(
    `\nWrote ${records.length} record(s) to ${path.relative(repoRoot, DATA_FILE)}`,
  );
}

main();
