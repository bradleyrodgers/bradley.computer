# bradley.computer

A minimal inspiration journal — a vertical feed of graphics, links, and embeds.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add journal entries

Edit `src/lib/entries.ts`. Two entry types are supported:

- **image** — square image, title, and date (`imageSrc` under `public/`)
- **youtube** — embedded video (`videoId` from the watch URL)
- **bandcamp** — embedded Bandcamp track (use the track ID from Bandcamp’s embed code)

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Deploy (defaults work for Next.js).
4. In the Vercel project **Settings → Domains**, add `bradley.computer` (and `www` if you want). Vercel will show DNS records if anything still needs configuring at your registrar.

The domain was purchased through Vercel, so it should attach to this project with minimal setup.
