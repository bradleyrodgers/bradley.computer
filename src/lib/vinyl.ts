export type VinylRecord = {
  id: string;
  artist: string;
  title: string;
  /** Release year, e.g. "2022" (empty when unknown). */
  releaseDate: string;
  /**
   * When the record was purchased. Optional and may be partial, since memory
   * gets fuzzy further back: "" | "2022" | "2022-10" | "2022-10-15".
   */
  purchasedAt: string;
  label?: string;
  coverSrc: string;
  coverAlt: string;
};

// Records are generated from the Obsidian vault by `npm run sync-vinyl`.
// Edit the vault notes (or the cover images in public/vinyl), not vinyl-data.ts.
export { records } from "./vinyl-data";

export type SortKey = "releaseDate" | "purchasedAt" | "artist";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "purchasedAt", label: "Purchase date" },
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

type PurchaseParts = { year: number; month: number | null; day: number | null };

function parsePurchase(value: string): PurchaseParts | null {
  if (!value) return null;
  const [y, m, d] = value.split("-");
  const year = Number(y);
  if (Number.isNaN(year)) return null;
  return {
    year,
    month: m ? Number(m) : null,
    day: d ? Number(d) : null,
  };
}

// Newest purchase first. Purchase dates are optional/partial: within the same
// year, records are ordered by month/day only when both have that precision;
// when a year-only record is involved, release date is the secondary sort.
// Records without a purchase year sort to the end (then by release date).
function byPurchase(a: VinylRecord, b: VinylRecord): number {
  const pa = parsePurchase(a.purchasedAt);
  const pb = parsePurchase(b.purchasedAt);

  if (!pa && !pb) return byRelease(a, b);
  if (!pa) return 1;
  if (!pb) return -1;

  if (pa.year !== pb.year) return pb.year - pa.year;

  if (pa.month != null && pb.month != null) {
    if (pa.month !== pb.month) return pb.month - pa.month;
    const dayDiff = (pb.day ?? 0) - (pa.day ?? 0);
    if (dayDiff !== 0) return dayDiff;
  }

  return byRelease(a, b);
}

/** Returns a new array sorted by the given key (dates newest-first). */
export function sortRecords(
  records: VinylRecord[],
  key: SortKey,
): VinylRecord[] {
  const sorted = [...records];

  if (key === "artist") {
    sorted.sort(byArtistName);
  } else if (key === "releaseDate") {
    sorted.sort(byRelease);
  } else {
    sorted.sort(byPurchase);
  }

  return sorted;
}
