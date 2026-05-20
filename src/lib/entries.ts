export type ImageEntry = {
  type: "image";
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleHref?: string;
  date: string;
};

export type BandcampEntry = {
  type: "bandcamp";
  id: string;
  trackId: number;
  date: string;
};

export type YouTubeEntry = {
  type: "youtube";
  id: string;
  videoId: string;
  title: string;
  date: string;
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
    date: "Wed 20 May",
  },
  {
    type: "bandcamp",
    id: "every-time-the-sun-comes-up",
    trackId: 3957424062,
    date: "Wed 20 May",
  },
  {
    type: "youtube",
    id: "6lkS-MCenXI",
    videoId: "6lkS-MCenXI",
    title: "YouTube video",
    date: "Wed 20 May",
  },
];
