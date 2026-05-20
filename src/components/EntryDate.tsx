"use client";

import { design } from "@/lib/design";
import { formatEntryDate } from "@/lib/format-date";
import { useEffect, useState } from "react";

export function EntryDate({ publishedAt }: { publishedAt: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(formatEntryDate(publishedAt));
  }, [publishedAt]);

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
