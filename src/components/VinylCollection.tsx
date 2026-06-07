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
  const [sort, setSort] = useState<SortKey>("purchasedAt");

  const sorted = useMemo(() => sortRecords(records, sort), [records, sort]);

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4"
        style={{ borderColor: design.colors.muted }}
      >
        <div className="flex items-center gap-4">
          {views.map((option) => {
            const active = view === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setView(option.value)}
                className="transition-colors"
                aria-pressed={active}
                style={{
                  ...design.typography.caption,
                  color: active
                    ? design.colors.accent
                    : design.colors.foreground,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <label
          className="flex items-center gap-2"
          style={{
            ...design.typography.caption,
            color: design.colors.muted,
          }}
        >
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="cursor-pointer bg-transparent outline-none"
            style={{
              ...design.typography.caption,
              color: design.colors.foreground,
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {view === "grid" ? (
        <VinylGrid records={sorted} />
      ) : (
        <VinylList records={sorted} />
      )}
    </div>
  );
}
