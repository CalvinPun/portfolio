import {
  ABOUT_NOTEBOOK_LINE_CQW,
  ABOUT_STICKY_LABEL_FONT_CQW,
  ABOUT_STICKY_SECONDARY_FONT_CQW,
} from "@/lib/aboutNotebookTypeScale";

type BucketItem = { readonly text: string; readonly crossed?: boolean };

type Props = {
  title: string;
  items: readonly BucketItem[];
};

export function AboutBucketList({ title, items }: Props) {
  const titleStyle = {
    fontSize: `${ABOUT_STICKY_LABEL_FONT_CQW}cqw`,
    lineHeight: `${ABOUT_NOTEBOOK_LINE_CQW * 0.92}cqw`,
  } as const;

  const itemStyle = {
    fontSize: `${ABOUT_STICKY_SECONDARY_FONT_CQW}cqw`,
    lineHeight: `${ABOUT_NOTEBOOK_LINE_CQW * 0.85}cqw`,
  } as const;

  return (
    <div className="relative z-0 w-[min(100%,13rem)] min-w-0 overflow-visible font-hand">
      <div className="relative rotate-[-1.5deg]">
        <div
          className="tape tape-sticky-top pointer-events-none absolute left-[46%] top-0 z-10 scale-75 opacity-90"
          aria-hidden
        />
        <div
          className={[
            "relative rounded-sm border border-purple-400/20",
            "bg-gradient-to-br from-[#f0e2fa] via-[#ead6f5] to-[#e0ccf0]",
            "px-3 py-3 pt-5 text-left shadow-[1px_2px_0_rgba(80,40,100,0.06),0_6px_16px_rgba(80,40,100,0.08)]",
          ].join(" ")}
        >
          <p className="m-0 mb-1 font-semibold text-stone-900" style={titleStyle}>
            {title}
          </p>
          <ul className="m-0 list-none p-0">
            {items.map((item, i) => (
              <li
                key={i}
                className="m-0 flex items-baseline gap-1.5 text-stone-800"
                style={itemStyle}
              >
                <span className="shrink-0">{item.crossed ? "☑" : "☐"}</span>
                <span className={item.crossed ? "line-through opacity-60" : ""}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
