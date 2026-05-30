"use client";

import { design } from "@/lib/design";
import { formatEntryDate } from "@/lib/format-date";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getServerSnapshot = () => null;

export function EntryDate({ publishedAt }: { publishedAt: string }) {
  const label = useSyncExternalStore(
    subscribe,
    () => formatEntryDate(publishedAt),
    getServerSnapshot,
  );

  return (
    <p
      className="text-sm tabular-nums"
      style={{
        ...design.typography.caption,
        color: design.colors.muted,
        minHeight: design.typography.caption.lineHeight,
      }}
    >
      {label ?? "\u00a0"}
    </p>
  );
}
