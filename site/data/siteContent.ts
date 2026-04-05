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
    eyebrow: "about me",
    sectionTitle: "a digital recollection of who i am",
    /** Trailing date is appended in the UI from the visitor’s current date. */
    notebookTitle: "about... me!",
    /** Mini polaroid to the right of the Spotify post-it (`public/` path). */
    pocketPolaroid: {
      src: "/lyn-lapid.jpg",
      alt: "Lyn Lapid",
      caption: "6/10/25 - lyn lapid ♪",
    },
    pocketPolaroid2: {
      src: "/dingding.jpg",
      alt: "Hong Kong",
      caption: "1/1/26 - hong kong 🇭🇰",
    },
    /** Short note on the manila folder’s left pocket (below the Spotify sticky). */
    pocketScrap:
      "ps — always happy to share song recs!",
    bucketList: {
      title: "things i wanna do...",
      items: [
        { text: "attend a NIKI concert" },
        { text: "adopt a cat" },
        { text: "leave nyc" },
        { text: "world domination", crossed: true },
      ],
    },
    notebookLines: [
      "// ambition",
      "I’m a developer who builds things that are functional, visually clean, and feel good to use. More specifically, I love building apps that have an actual impact on lives and help the people around me.",
      "=======================================",
      "// personal life",
      "Outside of programming, I love gaming, listening to music, fashion, sweet potatoes, traveling, and cats (if you couldn't tell already). If you'd like to know more about me, please feel free to reach out! I'm always open to new opportunities and meeting new people and friends along the way :).",
      "=======================================",
      "// gratitude",
      "exit(0); (thanks for reading!)",
    ],
  },
  projects: {
    eyebrow: "projects",
    title: "stuff i've built",
    intro:
      "",
    items: [
      {
        title: "personal portfolio site",
        caption: "this website! live at calvinpun.com",
        image: "/portfolio.png",
        href: "https://github.com/CalvinPun/portfolio",
        summary:
          "Designed and built a playful portfolio experience with layered paper textures, handwritten details, and responsive scrapbook layouts.",
      },
      // {
      //   title: "Signal Board",
      //   image: "",
      //   caption: "Operational metrics, made legible",
      //   summary:
      //     "Designed a monitoring dashboard that turns noisy operational metrics into quick, readable decisions.",
      // },
      // {
      //   title: "Pocket Playlist",
      //   image: "",
      //   caption: "A music journal with memories attached",
      //   summary:
      //     "Created a music journaling experience for saving songs with notes, moods, and tiny memories attached.",
      // },
      // {
      //   title: "Studio Archive",
      //   image: "",
      //   caption: "Editorial portfolio system",
      //   summary:
      //     "Developed a portfolio archive with editorial layouts, reusable content blocks, and fast image delivery.",
      // },
    ],
  },
} as const;
