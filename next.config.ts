import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [600, 1200],
    qualities: [90],
    // Defining localPatterns turns image optimization into an allow-list, so
    // every locally-optimized path must be listed here.
    localPatterns: [
      // Vinyl covers carry a ?v=<hash> cache-busting query (see
      // scripts/sync-vinyl.mjs); omitting `search` permits any query string.
      { pathname: "/vinyl/**" },
      // Journal/feed images use plain paths with no query string.
      { pathname: "/entries/**", search: "" },
    ],
  },
};

export default nextConfig;
