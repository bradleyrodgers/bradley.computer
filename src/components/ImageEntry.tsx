import { EntryDate } from "@/components/EntryDate";
import Image from "next/image";
import { design } from "@/lib/design";
import type { ImageEntry as ImageEntryType } from "@/lib/entries";

export function ImageEntry({ entry }: { entry: ImageEntryType }) {
  const captionLinkClassName =
    "text-foreground underline decoration-muted decoration-1 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent";

  const captionTextStyle = {
    ...design.typography.caption,
    color: design.colors.foreground,
  };

  const { contentWidth, imageSrcWidth } = design.layout;

  return (
    <article className="w-full">
      <Image
        src={entry.imageSrc}
        alt={entry.imageAlt}
        width={imageSrcWidth}
        height={imageSrcWidth}
        sizes={`${contentWidth}px`}
        className="h-auto w-full"
        quality={90}
      />
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
