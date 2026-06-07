---
name: add-record
description: Add a record to the bradley.computer record collection from a natural-language message. Use when the user says they got, bought, picked up, or wants to add a record/album/vinyl (e.g. "I got the new Kevin Morby album yesterday"). Resolves the album on MusicBrainz, creates an Obsidian vault note when local or a repo-backed inbox note when the vault is unavailable, runs the sync to fetch the cover, then summarizes for confirmation before committing.
---

# Add Record to Collection

## Overview

The Obsidian vault is the canonical source of truth. Adding a record means: create a
markdown note per record in the vault when available, or in the repo-backed record
inbox during cloud sessions, run the sync script to regenerate `src/lib/vinyl-data.ts`
and download cover art, then commit the repo changes — but only after the user
confirms the summary.

A single message may request **multiple records** (e.g. "add the latest Big Thief and
Jeff Tweedy albums"). Resolve and create a note for each, then sync once, confirm once,
and commit once.

## Paths

- Repo: `/Users/bradley/Projects/bradley.computer`
- Vault Music folder: `/Users/bradley/Documents/Obsidian Vault/Music` (override with `VINYL_VAULT_DIR`)
- Repo record inbox: `content/record-inbox` (override with `VINYL_INBOX_DIR`)
- Note file: `<Album Title>.md` — the filename IS the album title shown on the site
- Generated data: `src/lib/vinyl-data.ts` (auto-generated; never hand-edit)
- Cover images: `public/vinyl/<slug>.jpg` (existing covers are never overwritten)
- Public route: `/records`

## Note frontmatter

```markdown
---
Artist: Kevin Morby
Release Date: 2022-05-13
MusicBrainz: https://musicbrainz.org/release-group/<uuid>
---
```

- Every field except `Artist` is optional. Leave a field blank (key with empty value) when unknown.
- `Release Date` is the full ISO date (the site displays only the year but orders by the full date). A bare year is accepted when that's all you have.
- `MusicBrainz` should be a **release-group** URL — pin it so the sync fetches the correct cover.

## Workflow

Copy this checklist and track progress:

```
- [ ] 1. Parse the message into one or more records (artist, album)
- [ ] 2. For each record: resolve on MusicBrainz (release-group MBID + full release date)
- [ ] 3. Confirm any ambiguous matches
- [ ] 4. For each record: create the vault note, or an inbox note if the vault is unavailable
- [ ] 5. Run npm run sync-vinyl once (it picks up every new note)
- [ ] 6. Verify every cover + data entry
- [ ] 7. Summarize all additions and ask for confirmation
- [ ] 8. On approval: commit and push
```

For multiple records, do steps 2–4 for each one, then continue with a single sync,
summary, and commit.

### 1. Parse the message

- **Artist** and **album**. If the user says "the new/latest album" without a title, resolve the most recent studio album in step 2.

### 2. Resolve on MusicBrainz

Always send a descriptive User-Agent and pause ~1s between calls (rate limit). Use curl:

```bash
UA="bradley.computer-vinyl/1.0 ( https://bradley.computer )"
```

**Find the artist MBID:**

```bash
curl -fsS -A "$UA" -H "Accept: application/json" \
  'https://musicbrainz.org/ws/2/artist/?query=artist:%22Kevin%20Morby%22&fmt=json&limit=5'
```

Pick the best-scoring artist (check `country`/`disambiguation` if multiple).

**For a specific titled album** — search release-groups directly:

```bash
curl -fsS -A "$UA" -H "Accept: application/json" \
  'https://musicbrainz.org/ws/2/release-group/?query=artist:%22Kevin%20Morby%22%20AND%20releasegroup:%22This%20Is%20a%20Photograph%22&fmt=json&limit=5'
```

**For "the new/latest album"** — browse the artist's release-groups and pick the newest studio album:

```bash
curl -fsS -A "$UA" -H "Accept: application/json" \
  'https://musicbrainz.org/ws/2/release-group?artist=<ARTIST_MBID>&type=album&fmt=json&limit=100'
```

From the results, keep only `primary-type: "Album"` with **no** `secondary-types`
(exclude Live, Compilation, EP, Single, Soundtrack, Remix). Sort by
`first-release-date` descending and take the first.

From the chosen release-group capture:
- `id` → build `MusicBrainz: https://musicbrainz.org/release-group/<id>`
- `first-release-date` → `Release Date` (the full date, e.g. `2022-05-13`)
- `title` → the album title (use this canonical casing for the filename)

### 3. Confirm ambiguity

If the artist or album match is uncertain (multiple plausible hits, low score, or you
inferred "latest"), state the chosen artist + album + year and ask the user to confirm
before writing files.

### 4. Create the record note

Prefer the vault when it exists locally: write
`/Users/bradley/Documents/Obsidian Vault/Music/<Album Title>.md` with the
frontmatter above. Use the canonical title as the filename verbatim (keep
characters like `&`, `'`). If the vault is unavailable in a cloud session, write
`content/record-inbox/<Album Title>.md` instead. If either target note already
exists, stop and tell the user instead of overwriting.

Inbox notes are committed with the generated site changes. Later, on a local
machine, run `npm run import-vinyl-inbox` to move them into Obsidian, then run
`npm run sync-vinyl` and commit the inbox cleanup.

### 5. Run the sync

```bash
cd /Users/bradley/Projects/bradley.computer && npm run sync-vinyl
```

This regenerates `src/lib/vinyl-data.ts` and downloads the cover to `public/vinyl/<slug>.jpg`
using the pinned MusicBrainz release-group. Existing covers are kept. If the
Obsidian vault is unavailable but inbox notes exist, the script preserves existing
records from the generated data and merges in the inbox notes for cloud-session
updates.

### 6. Verify

For every record added:
- Confirm it appears in `src/lib/vinyl-data.ts` with the expected `releaseDate`.
- Confirm `coverSrc` is `/vinyl/<slug>.jpg`, not `/vinyl/placeholder.svg`. If it's the
  placeholder, the cover wasn't found — tell the user; they can drop a JPG at
  `public/vinyl/<slug>.jpg` manually and re-run the sync.

### 7. Summarize and confirm

Present a short summary of every addition — artist, title, release year, cover status (one
line per record) — and ask the user to confirm before committing. Do not commit or push
without approval.

### 8. Commit and push (after approval)

Stage only these records' changes — `src/lib/vinyl-data.ts`, the new cover(s) under
`public/vinyl/`, and any new `content/record-inbox/*.md` note(s) created during a
cloud session — and avoid unrelated working-tree changes. Local vault notes live
outside the repo and are not committed.

For a single record:

```bash
git add src/lib/vinyl-data.ts public/vinyl/<slug>.jpg content/record-inbox/<Album Title>.md
git commit -m "Add <Artist> — <Album> to record collection"
git push
```

Omit `content/record-inbox/<Album Title>.md` when the note was written directly to
the local vault.

For multiple records, stage every new cover/inbox note and use a summary message:

```bash
git add src/lib/vinyl-data.ts public/vinyl/<slug-1>.jpg public/vinyl/<slug-2>.jpg content/record-inbox/<Album 1>.md content/record-inbox/<Album 2>.md
git commit -m "Add 2 records to collection: <Album 1>, <Album 2>"
git push
```

## Notes

- Internal code still uses `vinyl` identifiers (script `sync-vinyl`, `public/vinyl`,
  `vinyl-data.ts`); only the public route/title were renamed to "records". Don't rename these.
- If MusicBrainz/Cover Art Archive is unreachable, the sync falls back to curl automatically;
  if it still fails, report it rather than committing a placeholder.
