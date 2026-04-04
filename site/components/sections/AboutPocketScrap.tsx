import {
  ABOUT_NOTEBOOK_LINE_CQW,
  ABOUT_STICKY_SECONDARY_FONT_CQW,
} from "@/lib/aboutNotebookTypeScale";

/** Small tilted scrap below the Spotify post-it — balances the left pocket. */
export function AboutPocketScrap({ text }: { text: string }) {
  const scrapStyle = {
    fontSize: `${ABOUT_STICKY_SECONDARY_FONT_CQW}cqw`,
    lineHeight: `${ABOUT_NOTEBOOK_LINE_CQW * 0.92}cqw`,
  } as const;

  return (
    <div className="relative z-0 w-full min-w-0 overflow-visible font-hand">
      <div className="relative rotate-[2.75deg]">
        <div
          className="tape tape-sticky-top pointer-events-none absolute left-[42%] top-0 z-10 scale-75 opacity-90"
          aria-hidden
        />
        <div
          className={[
            "relative rounded-sm border border-stone-700/12",
            "bg-gradient-to-br from-[#faf8f4] via-[#f3f0e8] to-[#ebe6dc]",
            "px-3 py-3 pt-5 text-left shadow-[1px_2px_0_rgba(45,35,25,0.06),0_6px_16px_rgba(40,30,20,0.07)]",
          ].join(" ")}
        >
          <p className="m-0 text-stone-700" style={scrapStyle}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
