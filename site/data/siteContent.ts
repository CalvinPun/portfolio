export const siteContent = {
  hero: {
    polaroidCaption: "— that's me! :)",
    sticky: {
      headline: "hey, i'm calvin",
      headlineEmoji: "👋",
      bodyLead: "cs + math @ ",
      bodyAccent: "nyu",
      social: {
        github: "https://github.com/CalvinPun",
        linkedin: "https://www.linkedin.com/in/",
        instagram: "https://www.instagram.com/calvin_pun/",
        youtube: "https://www.youtube.com/@corrotic",
        email: "cp4295@nyu.edu",
      },
    },
    locationNote: "nyc",
    /** Shown when `photoSrc` is null */
    photoPlaceholderText: "your photo here",
    /** Set to e.g. "/portrait.jpg" when you add a photo to `public/` */
    photoSrc: "/me.jpg",
  },
  about: {
    heading: "About me",
    body: "Placeholder copy — add your story, interests, and what you’re building. This section sits after the hero; the arrow scrolls here.",
  },
} as const;
