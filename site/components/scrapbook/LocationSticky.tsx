import Image from "next/image";

type LocationStickyProps = {
  text: string;
};

function MapPinIcon() {
  return (
    <Image src="/pin.svg" alt="" aria-hidden width={28} height={28} className="h-7 w-7 shrink-0" />
  );
}

export function LocationSticky({ text }: LocationStickyProps) {
  return (
    <div
      className={[
        "note-curl sticky-note-interactive sticky-note-interactive--blue",
        "relative w-fit max-w-[14rem] shrink-0 overflow-visible rounded-[3px]",
        "border border-sky-900/[0.07]",
        "bg-gradient-to-b from-[#f0f7fc] to-[#e2edf6]",
        "px-6 py-3",
        "sm:max-w-[15.5rem]",
      ].join(" ")}
    >
      <div className="tape tape-sticky-top tape--blue" aria-hidden />
      <div className="relative z-0 flex items-center gap-3.5 pt-5 pb-3">
        <MapPinIcon />
        <p className="font-hand text-[1.5rem] leading-none tracking-[0.2em] text-stone-800 sm:text-[1.75rem]">
          <span className="uppercase">{text}</span>
        </p>
      </div>
    </div>
  );
}
