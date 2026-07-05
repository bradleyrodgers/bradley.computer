<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

`bradley.computer` is a single Next.js 16 (Turbopack, React 19) app — no backend, database, or auth. Content is file-driven: the journal feed lives in `src/lib/entries.ts` and the records collection in `src/lib/vinyl-data.ts`.

- Dev server: `npm run dev` (serves on port 3000; hot reload picks up edits to `src/lib/entries.ts` etc. automatically). Standard scripts are in `package.json`.
- Lint: `npm run lint`. Typecheck: `npx tsc --noEmit`. There is no automated test suite.
- Gotcha: `next.config.ts` uses `images.localPatterns` as an allow-list. New locally-optimized image paths under `public/` must be added there or `next/image` will 400.
- `npm run sync-vinyl` (`scripts/sync-vinyl.mjs`) fetches album cover art from the MusicBrainz/Cover Art Archive APIs and needs network access.
