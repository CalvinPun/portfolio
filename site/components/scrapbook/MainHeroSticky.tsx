import { SocialLinks } from "@/components/scrapbook/SocialLinks";

type MainHeroStickyProps = {
  headline: string;
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

export function MainHeroSticky({ headline, bodyLead, bodyAccent, social }: MainHeroStickyProps) {
  return (
    <div className="note-curl relative w-full max-w-xl rotate-[2deg] overflow-visible rounded-sm bg-[#fff8e8] px-8 py-9 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.14)] sm:px-10 sm:py-10">
      <div className="tape tape-sticky-top" aria-hidden />
      <div className="relative z-0 pt-1">
        <h1 className="font-hand text-4xl leading-tight text-stone-900 sm:text-[2.75rem]">
          {headline}
        </h1>
        <p className="mt-4 max-w-md font-hand text-xl leading-snug text-stone-700 sm:text-2xl">
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
