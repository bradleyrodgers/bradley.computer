"use client";

import { useMemo, useState } from "react";
import { design } from "@/lib/design";
import {
  type SortKey,
  type VinylRecord,
  sortOptions,
  sortRecords,
} from "@/lib/vinyl";
import { VinylGrid } from "@/components/VinylGrid";
import { VinylList } from "@/components/VinylList";

type View = "grid" | "list";

const views: { value: View; label: string }[] = [
  { value: "grid", label: "Grid" },
  { value: "list", label: "List" },
];

export function VinylCollection({ records }: { records: VinylRecord[] }) {
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<SortKey>("releaseDate");

  const sorted = useMemo(() => sortRecords(records, sort), [records, sort]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {views.map((option) => {
            const active = view === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setView(option.value)}
                className={`transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted"
                }`}
                aria-pressed={active}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          className="cursor-pointer bg-transparent text-muted outline-none transition-colors hover:text-foreground"
          aria-label="Sort by"
        >
          {sortOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {view === "grid" ? (
        <VinylGrid records={sorted} />
      ) : (
        <VinylList records={sorted} />
      )}
    </div>
  );
}
