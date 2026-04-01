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
        "relative w-full max-w-xl overflow-visible rounded-sm bg-[#fff8e8] px-8 py-9 sm:px-10 sm:py-10",
      ].join(" ")}
    >
      <div className="tape tape-sticky-top" aria-hidden />
      <div className="relative z-0 pt-6 sm:pt-7">
        <h1 className="font-hand text-6xl leading-[1.08] text-stone-900 sm:text-[3.85rem] sm:leading-[1.06]">
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
        <p className="mt-5 max-w-md font-hand text-2xl leading-snug text-stone-700 sm:text-3xl">
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
