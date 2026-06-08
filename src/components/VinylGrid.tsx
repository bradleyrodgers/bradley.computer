import Image from "next/image";
import { design } from "@/lib/design";
import type { VinylRecord } from "@/lib/vinyl";

export function VinylGrid({ records }: { records: VinylRecord[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {records.map((record) => (
        <li key={record.id} className="min-w-0">
          <div
            className="relative aspect-square w-full overflow-hidden"
            style={{ backgroundColor: design.colors.white }}
          >
            <Image
              src={record.coverSrc}
              alt={record.coverAlt}
              fill
              sizes="(max-width: 500px) 50vw, 300px"
              className="object-cover"
              quality={90}
              unoptimized={record.coverSrc.endsWith(".svg")}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 0 1px rgba(80, 79, 74, 0.12)" }}
            />
          </div>
          <div className="mt-3 min-w-0">
            <p
              className="truncate"
              title={record.title}
              style={{
                ...design.typography.caption,
                color: design.colors.foreground,
              }}
            >
              {record.title}
            </p>
            <p
              className="truncate"
              title={record.artist}
              style={{
                ...design.typography.caption,
                color: design.colors.muted,
              }}
            >
              {record.artist}
            </p>
            {record.releaseDate ? (
              <p
                className="tabular-nums"
                style={{
                  ...design.typography.caption,
                  color: design.colors.muted,
                }}
              >
                {record.releaseDate.slice(0, 4)}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
