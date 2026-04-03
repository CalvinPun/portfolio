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
    notebookTitle: "about... me! 4/3/26",
    notebookLines: [
      "// goals",
      "I’m a developer who builds things that are functional, visually clean, and feel good to use. More specifically, I love building apps that have an actual impact on lives and help the people around me.",
      "========================================",
      "// personal life",
      "Outside of computer science, I love gaming, listening to music, fashion, leaving nyc, and cats (if you couldn't tell already). If you'd like to know more about me, please feel free to reach out! I'm always open to new opportunities and meeting new people and friends along the way :).",
      "========================================",
      "// gratitude",
      "Thanks for reading!",
    ],
  },
} as const;
