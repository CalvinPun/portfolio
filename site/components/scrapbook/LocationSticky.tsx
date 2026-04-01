type LocationStickyProps = {
  text: string;
};

function MapPinIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

export function LocationSticky({ text }: LocationStickyProps) {
  return (
    <div className="note-curl relative w-full max-w-sm -rotate-[2deg] overflow-visible rounded-sm bg-[#e8f2fa] px-6 py-5 shadow-[0_2px_6px_rgba(0,0,0,0.05),0_12px_28px_-8px_rgba(0,0,0,0.1)] sm:max-w-[22rem]">
      <div className="tape tape-sticky-top tape--blue" aria-hidden />
      <div className="relative z-0 flex gap-3 pt-1">
        <MapPinIcon />
        <p className="font-hand text-lg leading-snug text-stone-800 sm:text-xl">{text}</p>
      </div>
    </div>
  );
}
