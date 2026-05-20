export const design = {
  colors: {
    background: "#F7F7F4",
    foreground: "#504F4A",
    muted: "#B8B8B4",
    accent: "#0104eb",
    white: "#ffffff",
  },
  layout: {
    contentWidth: 600,
    /** Requested from the image optimizer (2× content width for retina). */
    imageSrcWidth: 1200,
    /** Tailwind `md` — adjust mobile values in `spacing` below */
    breakpoint: "500px",
  },
  /** Mobile-first vertical spacing (default = mobile, `md:` = 768px+). */
  spacing: {
    page: {
      pt: "pt-0 md:pt-0",
      pb: "pb-40 md:pb-40",
      px: "px-6 md:px-6",
    },
    main: {
      pt: "pt-10 md:pt-16",
    },
    header: {
      pb: "pb-8 md:pb-12",
    },
    feed: {
      gap: "gap-10 md:gap-16",
    },
    caption: {
      mt: "mt-3 md:mt-4",
    },
  },
  font: {
    sans: 'var(--font-geist-sans), system-ui, sans-serif',
  },
  typography: {
    header: {
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 500,
    },
    caption: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400,
    },
  },
} as const;
