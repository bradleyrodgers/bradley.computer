---
name: add-journal-post
description: Add posts to the bradley.computer audio visual journal. Use when the user asks to add, create, embed, or publish an image post, Instagram-sourced image, YouTube video, or other feed item on the local Next.js site at /Users/bradley/Projects/bradley.computer, especially with captions, attribution links, or requests to verify and push the journal update.
---

# Add Journal Post

## Overview

Use this skill to add new entries to the `bradley.computer` journal feed with the repo's existing content model. Prefer the helper script for image and YouTube posts, then verify with lint/build and commit/push only when the user asks.

## Repo Pattern

- Repo: `/Users/bradley/Projects/bradley.computer`
- Entry data: `src/lib/entries.ts`
- Image assets: `public/entries`
- Image component: `src/components/ImageEntry.tsx`
- YouTube component: `src/components/YouTubeEntry.tsx`
- New posts go at the top of `entries`.
- Read `AGENTS.md` and relevant local Next docs in `node_modules/next/dist/docs/` before editing code.

## Quick Start

Use `scripts/add_journal_post.py` from this skill folder when possible. In this repo, the vendored script path is `.codex/skills/add-journal-post/scripts/add_journal_post.py`:

```bash
python3 .codex/skills/add-journal-post/scripts/add_journal_post.py image \
  --repo /Users/bradley/Projects/bradley.computer \
  --source "https://example.com/image.jpg" \
  --title "Caption" \
  --href "https://example.com/" \
  --alt "Short accessible image description"
```

```bash
python3 .codex/skills/add-journal-post/scripts/add_journal_post.py youtube \
  --repo /Users/bradley/Projects/bradley.computer \
  --url "https://www.youtube.com/watch?v=WgpKEMAfU_U"
```

The script downloads/copies image assets, fetches YouTube oEmbed titles when possible, creates a local timestamp, and prepends the entry.

## Workflow

1. Check `git status --short --branch`. If local changes exist, inspect them and avoid overwriting unrelated work.
2. For image posts:
   - Use the provided caption as `title`.
   - Use the provided link as `titleHref`.
   - Choose a stable kebab-case `id`, usually from the caption.
   - Write a concise `imageAlt` describing the visible image, not repeating only the caption.
   - Store the asset in `public/entries/<id>.<ext>`.
3. For YouTube posts:
   - Extract the video ID from the URL.
   - Fetch title from `https://www.youtube.com/oembed?url=<url>&format=json` when no title is provided.
   - Use the video ID as `id` and `videoId`.
4. Run `npm run lint` and `npm run build`.
5. If a dev server is already running, check the rendered HTML with `curl`; otherwise start `npm run dev` only when a visual/render check is useful. Stop any server you start.
6. Commit and push only if the user asks. Use focused commit messages such as `Add Benjamin Edgar feed entry` or `Add Swimming Hole video entry`.

## Verification Hints

- Confirm image assets return `200 OK` from the local dev server or exist with expected dimensions via `sips -g pixelWidth -g pixelHeight`.
- Confirm rendered HTML includes the new title/link/image path or YouTube embed URL.
- If the Browser plugin cannot attach, use `curl` against localhost and direct image preview instead.
