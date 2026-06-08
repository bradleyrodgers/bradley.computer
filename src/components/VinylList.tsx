import Image from "next/image";
import { design } from "@/lib/design";
import type { VinylRecord } from "@/lib/vinyl";

export function VinylList({ records }: { records: VinylRecord[] }) {
  return (
    <ul className="flex w-full flex-col">
      {records.map((record) => {
        const year = record.releaseDate.slice(0, 4);
        const meta = [year, record.label].filter(Boolean).join(" · ");

        return (
          <li
            key={record.id}
            className="flex items-center gap-3 border-b py-2 last:border-b-0"
            style={{ borderColor: "rgba(184, 184, 180, 0.2)" }}
          >
            <div
              className="relative h-8 w-8 shrink-0 overflow-hidden"
              style={{ backgroundColor: design.colors.white }}
            >
              <Image
                src={record.coverSrc}
                alt={record.coverAlt}
                fill
                sizes="32px"
                className="object-cover"
                quality={90}
                unoptimized={record.coverSrc.endsWith(".svg")}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col md:flex-row md:items-center md:gap-3">
              <p
                className="min-w-0 truncate md:flex-1"
                title={record.artist}
                style={{
                  ...design.typography.caption,
                  color: design.colors.foreground,
                }}
              >
                {record.artist}
              </p>
              <p
                className="min-w-0 truncate md:flex-1"
                title={record.title}
                style={{
                  ...design.typography.caption,
                  color: design.colors.muted,
                }}
              >
                {record.title}
              </p>
            </div>
            <p
              className="shrink-0 whitespace-nowrap tabular-nums"
              style={{
                ...design.typography.caption,
                color: design.colors.muted,
              }}
            >
              {meta}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
