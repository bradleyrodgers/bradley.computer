import { EntryDate } from "@/components/EntryDate";
import { design } from "@/lib/design";
import type { YouTubeEntry as YouTubeEntryType } from "@/lib/entries";

export function YouTubeEntry({ entry }: { entry: YouTubeEntryType }) {
  const src = `https://www.youtube.com/embed/${entry.videoId}`;
  const captionLinkClassName =
    "text-foreground underline decoration-muted decoration-1 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent";

  const captionTextStyle = {
    ...design.typography.caption,
    color: design.colors.foreground,
  };

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
      <div className={`${design.spacing.caption.mt} space-y-1`}>
        {entry.titleHref ? (
          <a
            href={entry.titleHref}
            className={captionLinkClassName}
            style={design.typography.caption}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entry.title}
          </a>
        ) : (
          <p style={captionTextStyle}>{entry.title}</p>
        )}
        <EntryDate publishedAt={entry.publishedAt} />
      </div>
    </article>
  );
}
