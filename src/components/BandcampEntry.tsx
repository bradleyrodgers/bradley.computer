import { EntryDate } from "@/components/EntryDate";
import { design } from "@/lib/design";
import type { BandcampEntry as BandcampEntryType } from "@/lib/entries";

function hexForEmbed(color: string) {
  return color.startsWith("#") ? color.slice(1) : color;
}

export function BandcampEntry({ entry }: { entry: BandcampEntryType }) {
  const { background, foreground } = design.colors;
  const src = `https://bandcamp.com/EmbeddedPlayer/track=${entry.trackId}/size=large/bgcol=${hexForEmbed(background)}/linkcol=${hexForEmbed(foreground)}/tracklist=false/artwork=small/transparent=true/`;

  return (
    <article className="w-full">
      <iframe
        title="Every Time the Sun Comes Up (Alternate Version) — Sharon Van Etten"
        src={src}
        className="h-[120px] w-full border-0"
        allow="autoplay"
        loading="lazy"
      />
      <div className={design.spacing.caption.mt}>
        <EntryDate publishedAt={entry.publishedAt} />
      </div>
    </article>
  );
}
