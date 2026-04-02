import { SocialLinks } from "@/components/scrapbook/SocialLinks";

type MainHeroStickyProps = {
  headline: string;
  headlineEmoji?: string;
  bodyLead: string;
  bodyAccent: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    email: string;
  };
};

export function MainHeroSticky({
  headline,
  headlineEmoji,
  bodyLead,
  bodyAccent,
  social,
}: MainHeroStickyProps) {
  return (
    <div
      className={[
        "note-curl sticky-note-interactive sticky-note-interactive--yellow",
        "relative w-full max-w-xl overflow-visible rounded-sm bg-[#fff8e8] px-9 py-10 sm:px-11 sm:py-11 lg:max-w-2xl",
      ].join(" ")}
    >
      <div
        className="tape absolute left-1/2 top-0 h-5 w-40 -translate-x-1/2 -translate-y-[72%] rotate-[0.75deg] sm:h-6 sm:w-48"
        aria-hidden
      />
      <div className="relative z-0 pt-7 sm:pt-8">
        <h1 className="font-hand text-7xl leading-[1.06] text-stone-900 sm:text-[4.35rem] sm:leading-[1.05]">
          {headline}
          {headlineEmoji ? (
            <>
              {" "}
              <span className="inline-block align-baseline text-[0.86em]" aria-hidden>
                {headlineEmoji}
              </span>
            </>
          ) : null}
        </h1>
        <p className="mt-6 max-w-md font-hand text-3xl leading-snug text-stone-700 sm:text-[2rem]">
          {bodyLead}
          <span className="text-nyu-violet font-semibold">{bodyAccent}</span>
        </p>
        <SocialLinks
          github={social.github}
          linkedin={social.linkedin}
          instagram={social.instagram}
          youtube={social.youtube}
          email={social.email}
        />
      </div>
    </div>
  );
}
