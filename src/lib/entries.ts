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
  titleHref?: string;
  publishedAt: string;
};

export type FeedEntry = ImageEntry | BandcampEntry | YouTubeEntry;

/** Content from the Figma Desktop frame. */
export const entries: FeedEntry[] = [
  {
    type: "image",
    id: "a-courtyard-house-by-office-mi-ji",
    imageSrc: "/entries/a-courtyard-house-by-office-mi-ji.webp",
    imageAlt: "A planted courtyard framed by pale brick walls, blue steel beams, timber-framed glazing, and an open kitchen",
    title: "A Courtyard House by Office MI-JI",
    titleHref: "https://mi-ji.com.au/projects/ACourtyardHouse",
    publishedAt: "2026-07-22T04:02:45+00:00",
  },
  {
    type: "youtube",
    id: "JZMtOT-Tw8M",
    videoId: "JZMtOT-Tw8M",
    title: "Design Institute of Australia",
    titleHref: "https://design.org.au/",
    publishedAt: "2026-07-15T03:53:34+00:00",
  },
  {
    type: "image",
    id: "twisted-teens-florida-water-blues",
    imageSrc: "/entries/twisted-teens-florida-water-blues.jpg",
    imageAlt: "Blue Twisted Teens cover: a black-and-white photo of a man in a suit and tie holding up a marionette-style cut-out of a clown-faced figure",
    title: "Twisted Teens - Florida Water Blues",
    titleHref: "https://cpnpc.bandcamp.com/album/florida-water-blues",
    publishedAt: "2026-07-09T01:03:24+00:00",
  },
  {
    type: "image",
    id: "twisted-teens-blame-the-clown",
    imageSrc: "/entries/twisted-teens-blame-the-clown.jpg",
    imageAlt: "Green Twisted Teens cover: two men sit on the front of an old school bus, one in a suit and one wearing clown face paint and smoking",
    title: "Twisted Teens - Blame the Clown",
    titleHref: "https://cpnpc.bandcamp.com/album/blame-the-clown",
    publishedAt: "2026-07-09T01:03:23+00:00",
  },
  {
    type: "image",
    id: "twisted-teens-eu-ep",
    imageSrc: "/entries/twisted-teens-eu-ep.jpg",
    imageAlt: "Black-and-white Twisted Teens cover: two people on playground swings with metal chains draped across their faces",
    title: "Twisted Teens - EU EP",
    titleHref: "https://cpnpc.bandcamp.com/album/eu-ep",
    publishedAt: "2026-07-09T01:03:22+00:00",
  },
  {
    type: "image",
    id: "twisted-teens",
    imageSrc: "/entries/twisted-teens.jpg",
    imageAlt: "Orange Twisted Teens cover: a black-and-white photo of a man in a suit holding a lap steel guitar beside a laughing man",
    title: "Twisted Teens",
    titleHref: "https://cpnpc.bandcamp.com/album/twisted-teens",
    publishedAt: "2026-07-09T01:03:21+00:00",
  },
  {
    type: "image",
    id: "five-fits-with-tal-silberstein",
    imageSrc: "/entries/five-fits-with-tal-silberstein.jpg",
    imageAlt: "Tal Silberstein standing outside a storefront wearing a brown coat, white shirt, cream trousers, and tan shoes",
    title: "Five Fits with Tal Silberstein",
    titleHref: "https://christopherfenimore.substack.com/p/five-fits-with-tal-silberstein",
    publishedAt: "2026-06-08T20:36:23+10:00",
  },
  {
    type: "image",
    id: "eric-schmidt-htsi",
    imageSrc: "/entries/eric-schmidt-htsi.jpg",
    imageAlt: "Eric Schmidt reading in a room with built-in bookshelves and a dog in the foreground",
    title: "Eric Schmidt – HTSI",
    titleHref: "https://www.ft.com/content/3446d9cf-ea9f-407a-a0a8-4be7fb7a7d54",
    publishedAt: "2026-06-07T19:49:20+10:00",
  },
  {
    type: "youtube",
    id: "WgpKEMAfU_U",
    videoId: "WgpKEMAfU_U",
    title: "EDDY CURRENT SUPPRESSION RING - SWIMMING HOLE",
    publishedAt: "2026-05-30T20:49:23+10:00",
  },
  {
    type: "image",
    id: "benjamin-edgar",
    imageSrc: "/entries/benjamin-edgar.jpg",
    imageAlt: "Brown Switzerland Chicago sweatshirt hanging in a studio",
    title: "Benjamin Edgar",
    titleHref: "https://www.benjaminedgar.com/",
    publishedAt: "2026-05-30T20:28:39+10:00",
  },
  {
    type: "image",
    id: "jazmine-joye",
    imageSrc: "/entries/jazmine-joye.jpg",
    imageAlt: "Illustration of a dark pint beside oysters on a plate",
    title: "Jazmine Joye",
    titleHref: "https://www.instagram.com/jazmine.joye/",
    publishedAt: "2026-05-30T20:12:30+10:00",
  },
  {
    type: "image",
    id: "stout-books",
    imageSrc: "/entries/stout-books.webp",
    imageAlt: "An afternoon at Stout Books",
    title: "An afternoon at Stout Books",
    titleHref:
      "https://www.drakes.com/blogs/news/an-afternoon-at-stout-books",
    publishedAt: "2026-05-21T23:57:08+10:00",
  },
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
