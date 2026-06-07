#!/usr/bin/env node
// Moves repo-backed record inbox notes into the local Obsidian vault so cloud
// additions become part of the canonical record source.
//
// Usage: npm run import-vinyl-inbox
// Override the vault folder with VINYL_VAULT_DIR=/path/to/Music
// Override the repo-backed inbox with VINYL_INBOX_DIR=/path/to/record-inbox

import { access, copyFile, readdir, unlink } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const VAULT_DIR =
  process.env.VINYL_VAULT_DIR ||
  "/Users/bradley/Documents/Obsidian Vault/Music";
const INBOX_DIR =
  process.env.VINYL_INBOX_DIR || path.join(repoRoot, "content", "record-inbox");

async function fileExists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let files;
  try {
    files = (await readdir(INBOX_DIR)).filter((f) => f.endsWith(".md")).sort();
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`No record inbox found at ${INBOX_DIR}; nothing to import.`);
      return;
    }
    throw new Error(`Could not read record inbox ${INBOX_DIR}: ${err.message}`);
  }

  if (files.length === 0) {
    console.log(`No inbox record notes found in ${INBOX_DIR}; nothing to import.`);
    return;
  }

  try {
    await access(VAULT_DIR, constants.R_OK | constants.W_OK);
  } catch (err) {
    throw new Error(
      `Could not access Obsidian vault folder ${VAULT_DIR}: ${err.message}`,
    );
  }

  for (const file of files) {
    const dest = path.join(VAULT_DIR, file);
    if (await fileExists(dest)) {
      throw new Error(
        `Refusing to overwrite existing Obsidian record note: ${dest}`,
      );
    }
  }

  for (const file of files) {
    const src = path.join(INBOX_DIR, file);
    const dest = path.join(VAULT_DIR, file);
    await copyFile(src, dest, constants.COPYFILE_EXCL);
    await unlink(src);
    console.log(`Imported ${file} to ${VAULT_DIR}`);
  }

  console.log(
    `Imported ${files.length} record note(s). Run npm run sync-vinyl to refresh generated data.`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
