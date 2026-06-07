# bradley.computer

A minimal inspiration journal — a vertical feed of graphics, links, and embeds.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add journal entries

Edit `src/lib/entries.ts`. Each entry has a `publishedAt` ISO datetime (time is not shown; the local calendar date is derived from it). Supported types:

- **image** — square image, title, and date (`imageSrc` under `public/`)
- **youtube** — embedded video (`videoId` from the watch URL)
- **bandcamp** — embedded Bandcamp track (use the track ID from Bandcamp’s embed code)

## Add records

Record collection data is generated from Markdown notes. On a local machine, the
canonical notes live in the Obsidian Music folder:

```bash
/Users/bradley/Documents/Obsidian Vault/Music
```

Use `VINYL_VAULT_DIR=/path/to/Music` when that folder lives somewhere else.
Each record note is named `<Album Title>.md` and uses simple frontmatter:

```markdown
---
Artist: Kevin Morby
Release Date: 2022-05-13
MusicBrainz: https://musicbrainz.org/release-group/<uuid>
---
```

Cloud sessions can stage new records in the repo-backed inbox at
`content/record-inbox/`. Inbox notes use the same filename and frontmatter as
Obsidian notes. Run `npm run sync-vinyl` to merge the inbox with the current
collection, regenerate `src/lib/vinyl-data.ts`, and fetch any missing covers
under `public/vinyl/`.

When you are back on a local machine, run:

```bash
npm run import-vinyl-inbox
npm run sync-vinyl
```

The import command moves inbox notes into the Obsidian Music folder and refuses
to overwrite existing vault notes. Commit the resulting removal of inbox notes
and regenerated data after verifying the collection.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Deploy (defaults work for Next.js).
4. In the Vercel project **Settings → Domains**, add `bradley.computer` (and `www` if you want). Vercel will show DNS records if anything still needs configuring at your registrar.

The domain was purchased through Vercel, so it should attach to this project with minimal setup.
