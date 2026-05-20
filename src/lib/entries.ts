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
    id: "horizon-systems",
    imageSrc: "/entries/horizon-systems.jpg",
    imageAlt: "Horizon Systems",
    title: "Horizon Systems",
    titleHref: "https://horizon-system.com/project/record-b1",
    publishedAt: "2026-05-21T00:00:00-04:00",
  },
  {
    type: "image",
    id: "quarantine-quilts",
    imageSrc: "/entries/quarantine-quilts.webp",
    imageAlt: "Quarantine Quilts by Raw Color",
    title: "Quarantine Quilts",
    titleHref: "https://www.projectplanum.rawcolor.nl/quarantine-quilts",
    publishedAt: "2026-05-20T23:00:00-04:00",
  },
  {
    type: "image",
    id: "zikawei-library",
    imageSrc: "/entries/zikawei-library.jpg",
    imageAlt: "Zikawei Library by David Chipperfield Architects",
    title: "Zikawei Library",
    titleHref: "https://davidchipperfield.com/projects/zikawei-library",
    publishedAt: "2026-05-20T22:00:00-04:00",
  },
  {
    type: "image",
    id: "rennie-ellis-fitzroy-extrovert",
    imageSrc: "/entries/rennie-ellis-fitzroy-extrovert.jpg",
    imageAlt: "Fitzroy Extrovert, 1974 by Rennie Ellis",
    title: "Rennie Ellis",
    titleHref:
      "https://rennieellis.com.au/collection/index/view/department/aussies-all/product/fitzroy-extrovert-1974",
    publishedAt: "2026-05-20T21:00:00-04:00",
  },
  {
    type: "youtube",
    id: "RrKMtl_BiGI",
    videoId: "RrKMtl_BiGI",
    title: "YouTube video",
    publishedAt: "2026-05-20T20:00:00-04:00",
  },
  {
    type: "image",
    id: "atlantic-coastal-supplies",
    imageSrc: "/entries/atlantic-coastal-supplies.jpg",
    imageAlt: "Atlantic Coastal Supplies coffee mugs",
    title: "Atlantic Coastal Supplies",
    titleHref:
      "https://atlanticcoastalsupplies.com/products/standard-coffee-mug?variant=45533638230208",
    publishedAt: "2026-05-20T12:00:00-04:00",
  },
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
    type: "image",
    id: "roden-crater",
    imageSrc: "/entries/roden-crater.jpg",
    imageAlt: "roden crater",
    title: "Roden Crater",
    titleHref: "https://rodencrater.com/",
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
