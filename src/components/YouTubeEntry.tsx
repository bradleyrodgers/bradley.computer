import { EntryDate } from "@/components/EntryDate";
import { design } from "@/lib/design";
import type { YouTubeEntry as YouTubeEntryType } from "@/lib/entries";

export function YouTubeEntry({ entry }: { entry: YouTubeEntryType }) {
  const src = `https://www.youtube.com/embed/${entry.videoId}`;

  return (
    <article className="w-full">
      <div className="relative aspect-video w-full">
        <iframe
          title={entry.title}
          src={src}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className={design.spacing.caption.mt}>
        <EntryDate publishedAt={entry.publishedAt} />
      </div>
    </article>
  );
}
