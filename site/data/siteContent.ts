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
    /** Shown until `SPOTIFY_*` env vars are set — see `lib/spotifyNowPlaying.ts` */
    currentlyListening: {
      label: "currently listening to",
      idleLine: "nothing playing rn",
      fallback: {
        title: "—",
        artist: "connect spotify to go live",
      },
    },
    /** Shown when `photoSrc` is null */
    photoPlaceholderText: "your photo here",
    /** Set to e.g. "/portrait.jpg" when you add a photo to `public/` */
    photoSrc: "/me.jpg",
  },
} as const;
