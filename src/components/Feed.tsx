import { BandcampEntry } from "@/components/BandcampEntry";
import { ImageEntry } from "@/components/ImageEntry";
import { YouTubeEntry } from "@/components/YouTubeEntry";
import { design } from "@/lib/design";
import type { FeedEntry } from "@/lib/entries";

export function Feed({ entries }: { entries: FeedEntry[] }) {
  return (
    <div className={`flex w-full flex-col ${design.spacing.feed.gap}`}>
      {entries.map((entry) => {
        switch (entry.type) {
          case "image":
            return <ImageEntry key={entry.id} entry={entry} />;
          case "bandcamp":
            return <BandcampEntry key={entry.id} entry={entry} />;
          case "youtube":
            return <YouTubeEntry key={entry.id} entry={entry} />;
        }
      })}
    </div>
  );
}
