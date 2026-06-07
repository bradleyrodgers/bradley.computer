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
            className="flex items-center gap-4 border-b py-4 first:border-t"
            style={{ borderColor: design.colors.muted }}
          >
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden"
              style={{ backgroundColor: design.colors.white }}
            >
              <Image
                src={record.coverSrc}
                alt={record.coverAlt}
                fill
                sizes="56px"
                className="object-cover"
                quality={90}
                unoptimized={record.coverSrc.endsWith(".svg")}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="truncate"
                style={{
                  ...design.typography.caption,
                  color: design.colors.foreground,
                }}
              >
                {record.artist}
              </p>
              <p
                className="truncate"
                style={{
                  ...design.typography.caption,
                  color: design.colors.muted,
                }}
              >
                {record.title}
              </p>
            </div>
            <p
              className="shrink-0 tabular-nums"
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
