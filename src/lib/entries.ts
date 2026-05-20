export type ImageEntry = {
  type: "image";
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleHref?: string;
  /** ISO 8601 datetime; only the local calendar date is shown. */
  publishedAt: string;
};

export type BandcampEntry = {
  type: "bandcamp";
  id: string;
  trackId: number;
  publishedAt: string;
};

export type YouTubeEntry = {
  type: "youtube";
  id: string;
  videoId: string;
  title: string;
  publishedAt: string;
};

export type FeedEntry = ImageEntry | BandcampEntry | YouTubeEntry;

/** Content from the Figma Desktop frame. */
export const entries: FeedEntry[] = [
  {
    type: "image",
    id: "history-of-software",
    imageSrc: "/entries/history-of-software.png",
    imageAlt: "make software",
    title: "History of Software",
    titleHref: "https://historyofsoftware.org/",
    publishedAt: "2026-05-20T10:00:00-04:00",
  },
  {
    type: "bandcamp",
    id: "every-time-the-sun-comes-up",
    trackId: 3957424062,
    publishedAt: "2026-05-20T14:30:00-04:00",
  },
  {
    type: "youtube",
    id: "6lkS-MCenXI",
    videoId: "6lkS-MCenXI",
    title: "YouTube video",
    publishedAt: "2026-05-20T18:00:00-04:00",
  },
];
