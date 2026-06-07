export type VinylRecord = {
  id: string;
  artist: string;
  title: string;
  /**
   * Release date as an ISO string — full date preferred for ordering, e.g.
   * "2022-10-21"; a bare year like "2022" is accepted. Empty when unknown.
   * The UI displays only the year.
   */
  releaseDate: string;
  label?: string;
  coverSrc: string;
  coverAlt: string;
};

// Records are generated from the Obsidian vault plus the repo-backed record
// inbox by `npm run sync-vinyl`. Edit the vault/inbox notes (or the cover
// images in public/vinyl), not vinyl-data.ts.
export { records } from "./vinyl-data";

export type SortKey = "releaseDate" | "artist";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "releaseDate", label: "Release date" },
  { key: "artist", label: "Artist" },
];

// Milliseconds for a release year; missing/invalid sorts to the end.
function releaseTime(value: string): number {
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? -Infinity : ms;
}

function byArtistName(a: VinylRecord, b: VinylRecord): number {
  const byArtist = a.artist.localeCompare(b.artist, undefined, {
    sensitivity: "base",
  });
  if (byArtist !== 0) return byArtist;
  return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
}

function byRelease(a: VinylRecord, b: VinylRecord): number {
  return (
    releaseTime(b.releaseDate) - releaseTime(a.releaseDate) ||
    byArtistName(a, b)
  );
}

/** Returns a new array sorted by the given key (dates newest-first). */
export function sortRecords(
  records: VinylRecord[],
  key: SortKey,
): VinylRecord[] {
  const sorted = [...records];
  sorted.sort(key === "artist" ? byArtistName : byRelease);
  return sorted;
}
