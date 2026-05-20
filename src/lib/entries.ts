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
  title: string;
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
    type: "bandcamp",
    id: "cobwebs",
    trackId: 1515978283,
    title: "Cobwebs — Mildred",
    publishedAt: "2026-05-20T15:18:44+10:00",
  },
  {
    type: "image",
    id: "office-blommen",
    imageSrc: "/entries/office-blommen.jpg",
    imageAlt: "Office Blommen",
    title: "Office Blommen",
    titleHref: "https://www.instagram.com/officeblommen/",
    publishedAt: "2026-05-20T15:17:01+10:00",
  },
  {
    type: "image",
    id: "cd-co",
    imageSrc: "/entries/cd-co.png",
    imageAlt: "Christopher Doyle & Co",
    title: "Christopher Doyle & Co",
    titleHref: "https://christopherdoyle.co",
    publishedAt: "2026-05-20T15:14:01+10:00",
  },
  {
    type: "image",
    id: "history-of-software",
    imageSrc: "/entries/history-of-software.png",
    imageAlt: "make software",
    title: "History of Software",
    titleHref: "https://historyofsoftware.org/",
    publishedAt: "2026-03-02T17:00:00+11:00",
  },
  {
    type: "image",
    id: "roden-crater",
    imageSrc: "/entries/roden-crater.jpg",
    imageAlt: "roden crater",
    title: "Roden Crater",
    titleHref: "https://rodencrater.com/",
    publishedAt: "2026-02-10T17:00:00+11:00",
  },
  {
    type: "bandcamp",
    id: "every-time-the-sun-comes-up",
    trackId: 3957424062,
    title: "Every Time the Sun Comes Up (Alternate Version) — Sharon Van Etten",
    publishedAt: "2026-02-09T17:00:00+11:00",
  },
  {
    type: "image",
    id: "atlantic-coastal-supplies",
    imageSrc: "/entries/atlantic-coastal-supplies.jpg",
    imageAlt: "Atlantic Coastal Supplies coffee mugs",
    title: "Atlantic Coastal Supplies",
    titleHref:
      "https://atlanticcoastalsupplies.com/products/standard-coffee-mug?variant=45533638230208",
    publishedAt: "2026-02-08T17:00:00+11:00",
  },
  {
    type: "youtube",
    id: "6lkS-MCenXI",
    videoId: "6lkS-MCenXI",
    title: "YouTube video",
    publishedAt: "2026-02-07T17:00:00+11:00",
  },
  {
    type: "image",
    id: "rennie-ellis-fitzroy-extrovert",
    imageSrc: "/entries/rennie-ellis-fitzroy-extrovert.jpg",
    imageAlt: "Fitzroy Extrovert, 1974 by Rennie Ellis",
    title: "Rennie Ellis",
    titleHref:
      "https://rennieellis.com.au/collection/index/view/department/aussies-all/product/fitzroy-extrovert-1974",
    publishedAt: "2026-02-06T17:00:00+11:00",
  },
  {
    type: "youtube",
    id: "RrKMtl_BiGI",
    videoId: "RrKMtl_BiGI",
    title: "YouTube video",
    publishedAt: "2026-01-26T17:00:00+11:00",
  },
  {
    type: "image",
    id: "zikawei-library",
    imageSrc: "/entries/zikawei-library.jpg",
    imageAlt: "Zikawei Library by David Chipperfield Architects",
    title: "Zikawei Library",
    titleHref: "https://davidchipperfield.com/projects/zikawei-library",
    publishedAt: "2026-01-22T17:00:00+11:00",
  },
  {
    type: "image",
    id: "quarantine-quilts",
    imageSrc: "/entries/quarantine-quilts.webp",
    imageAlt: "Quarantine Quilts by Raw Color",
    title: "Quarantine Quilts",
    titleHref: "https://www.projectplanum.rawcolor.nl/quarantine-quilts",
    publishedAt: "2026-01-20T17:00:00+11:00",
  },
  {
    type: "image",
    id: "horizon-systems",
    imageSrc: "/entries/horizon-systems.jpg",
    imageAlt: "Horizon Systems",
    title: "Horizon Systems",
    titleHref: "https://horizon-system.com/project/record-b1",
    publishedAt: "2026-01-18T17:00:00+11:00",
  },
  {
    type: "image",
    id: "western-acoustics",
    imageSrc: "/entries/western-acoustics.webp",
    imageAlt: "Western Acoustics",
    title: "Western Acoustics",
    titleHref:
      "https://western-acoustics.com/product/type-2/?v=eb65bcceaa5f",
    publishedAt: "2026-01-16T17:00:00+11:00",
  },
  {
    type: "image",
    id: "louisiana-visits-franz-gertsch",
    imageSrc: "/entries/louisiana-visits-franz-gertsch.jpg",
    imageAlt: "Louisiana visits Franz Gertsch",
    title: "Louisiana visits Franz Gertsch",
    titleHref:
      "https://atelierpol.com/work/museum-franz-gertsch-exhibition-catalogue-louisiana-visits-franz-gertsch/",
    publishedAt: "2026-01-14T17:00:00+11:00",
  },
];
