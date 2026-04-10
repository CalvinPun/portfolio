type ProjectLink = {
  label: string;
  href: string;
};

type ProjectItem = {
  title: string;
  caption: string;
  image?: string;
  imageAspectRatio?: string;
  imageVersion?: string;
  href?: string;
  description?: string;
  links?: ProjectLink[];
};

type SiteContent = {
  hero: {
    polaroidCaption: string;
    sticky: {
      headline: string;
      headlineEmoji: string;
      bodyLead: string;
      bodyAccent: string;
      social: {
        github: string;
        linkedin: string;
        instagram: string;
        spotify: string;
        email: string;
      };
    };
    locationNote: string;
    photoPlaceholderText: string;
    photoSrc: string | null;
  };
  about: {
    eyebrow: string;
    sectionTitle: string;
    notebookTitle: string;
    pocketPolaroid: {
      src: string;
      alt: string;
      caption: string;
    };
    pocketPolaroid2: {
      src: string;
      alt: string;
      caption: string;
    };
    pocketScrap: string;
    bucketList: {
      title: string;
      items: Array<{
        text: string;
        crossed?: boolean;
      }>;
    };
    notebookLines: string[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ProjectItem[];
  };
};

export const siteContent: SiteContent = {
  hero: {
    polaroidCaption: "— that's me! :)",
    sticky: {
      headline: "hey, i'm calvin",
      headlineEmoji: "👋",
      bodyLead: "cs + math @ ",
      bodyAccent: "nyu",
      social: {
        github: "https://github.com/CalvinPun",
        linkedin: "https://www.linkedin.com/in/calvinpun/",
        instagram: "https://www.instagram.com/calvin_pun/",
        spotify: "https://open.spotify.com/user/31riatjcvoh2ldnvsv7kqiezdhwy?si=582fbd0d59bf467f",
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
        imageAspectRatio: "3024 / 1596",
        imageVersion: "2026-04-05-2",
        href: "https://github.com/CalvinPun/portfolio",
        description:
          "I built a scrapbook-inspired portfolio with Next.js, React, and TailwindCSS. I designed most of the site components and icons using Figma, and implemented a separate mobile view for smaller screens. I opted to create my own website instead of using a template/website builder because I wanted to have full control over the design and functionality, and it was a fun opportunity to practice my frontend development skills! ",
        links: [
          { label: "View Site", href: "https://calvinpun.com" },
          { label: "GitHub", href: "https://github.com/CalvinPun/portfolio" },
        ],
      },
      {
        title: "time grasp",
        caption: "a chrome extension that helps users take control of their time",
        image: "/Countdown.png",
        imageAspectRatio: "3024 / 1596",
        imageVersion: "2026-04-05-1",
        href: "https://github.com/CalvinPun/time-grasp",
        description:
          "I built this Chrome extension using JavaScript and the Chrome Extensions API (Manifest V3) to help a friend who wanted a better way to stay on top of their evenings. It counts down your free time before bed, factoring in however long your nightly routine takes, and sends notifications at 30 minutes, 5 minutes, and when time's up, so you're never caught off guard. It also features a smart To-Do list that allows users to create tasks and assign them to specific time intervals, which can be sorted and marked as complete. It also tells the user whether or not it would be feasible to complete before their bedtime.",
        links:[
          {label: "Store Page", href: "https://chromewebstore.google.com/detail/time-grasp/jackjcddpfmdnemggbhaehkkmmkfdfjd?authuser=0&hl=en"},
          { label: "GitHub", href: "https://github.com/CalvinPun/time-grasp"},
        ]
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
};
