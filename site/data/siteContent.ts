export const siteContent = {
  hero: {
    polaroidCaption: "— that's me! :)",
    sticky: {
      headline: "hey, i'm calvin 👋",
      body: "cs + math @ nyu",
      ctaWork: { label: "view my work", href: "#work" },
      ctaHello: { label: "say hello", href: "#contact" },
    },
    locationNote: "New York City · CS student · open to opportunities",
    /** Shown when `photoSrc` is null */
    photoPlaceholderText: "your photo here",
    /** Set to e.g. "/portrait.jpg" when you add a photo to `public/` */
    photoSrc: "/me.jpg",
  },
} as const;
