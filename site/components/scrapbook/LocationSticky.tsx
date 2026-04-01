type LocationStickyProps = {
  text: string;
};

function MapPinIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-stone-900"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export function LocationSticky({ text }: LocationStickyProps) {
  return (
    <div
      className={[
        "note-curl relative w-full max-w-[13rem] -rotate-[2deg] overflow-visible rounded-[3px]",
        "border border-sky-900/[0.07]",
        "bg-gradient-to-b from-[#f0f7fc] to-[#e2edf6]",
        "px-5 py-4",
        "shadow-[0_1px_2px_rgba(15,40,60,0.06),0_8px_24px_-6px_rgba(15,50,80,0.12)]",
        "sm:max-w-[14rem]",
      ].join(" ")}
    >
      <div className="tape tape-sticky-top tape--blue" aria-hidden />
      <div className="relative z-0 flex items-center gap-3 pt-6">
        <MapPinIcon />
        <p className="font-hand text-[1.35rem] leading-none tracking-[0.2em] text-stone-800 sm:text-2xl">
          <span className="uppercase">{text}</span>
        </p>
      </div>
    </div>
  );
}
