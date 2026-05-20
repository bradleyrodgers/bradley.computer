/** Local calendar label from an ISO datetime, e.g. "May 21, 2026" (time not shown). */
export function formatEntryDate(publishedAt: string): string {
  const date = new Date(publishedAt);
  const parts = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).formatToParts(date);

  const month = parts.find((p) => p.type === "month")?.value ?? "";
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const year = parts.find((p) => p.type === "year")?.value ?? "";

  return `${month} ${day}, ${year}`;
}
