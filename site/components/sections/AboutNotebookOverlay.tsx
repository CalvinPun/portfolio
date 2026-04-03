"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const NOTEBOOK_W = 1920;
const NOTEBOOK_H = 2211;
/**
 * `notebook-paper.svg` rules are 114px apart at 1920px wide. Slightly over-shoot
 * (~3.5%) so baselines track the printed lines (font metrics + stroke make 114 feel tight).
 */
const RULE_STEP_PX = 115;
const RULE_LINE_SCALE = 1;

const FALLBACK_LINE_HEIGHT =
  "max(1.35em, calc(100cqw * 114 / 1920 * 1.035))";

type AboutNotebookOverlayProps = {
  notebookTitle: string;
  notebookLines: readonly string[];
};

export function AboutNotebookOverlay({
  notebookTitle,
  notebookLines,
}: AboutNotebookOverlayProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [ruleLinePx, setRuleLinePx] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    if (w <= 0) return;
    setRuleLinePx(((w * RULE_STEP_PX) / NOTEBOOK_W) * RULE_LINE_SCALE);
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = measureRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const bodyLineHeight =
    ruleLinePx != null ? `${ruleLinePx}px` : FALLBACK_LINE_HEIGHT;
  /** Title can be larger than one rule band — never shrink below ~1.22em. */
  const titleLineHeight =
    ruleLinePx != null
      ? `max(1.22em, ${ruleLinePx}px)`
      : "max(1.22em, calc(100cqw * 114 / 1920 * 1.035))";

  return (
    <div
      ref={measureRef}
      className="relative w-full min-w-0 max-w-full [container-type:inline-size]"
    >
      <Image
        src="/notebook-paper.svg"
        alt=""
        width={NOTEBOOK_W}
        height={NOTEBOOK_H}
        className="block h-auto w-full select-none"
        sizes="(max-width: 768px) 42vw, 34vw"
        priority={false}
      />
      <div
        className="absolute inset-0 flex min-w-0 max-w-full flex-col overflow-x-hidden pl-[13%] pr-[4%] pt-[5.85%] sm:pl-[12%] sm:pt-[5.1%]"
        style={{
          gap: 0,
          transform:
            "translateY(calc(0.48rem - clamp(0.4rem, 0.3rem + 0.48vw, 0.88rem)))",
        }}
      >
        <h2
          className="font-hand m-0 min-w-0 max-w-full break-words font-bold text-stone-900"
          style={{
            fontSize: "clamp(1.05rem, 0.78rem + 1.35vw, 2.35rem)",
            lineHeight: titleLineHeight,
          }}
        >
          {notebookTitle}
        </h2>
        <div className="flex min-w-0 max-w-full flex-col" style={{ gap: 0 }}>
          {notebookLines.map((line, i) => {
            const n = notebookLines.length;
            const tail2 = i === n - 2;
            const prevTrim = (notebookLines[i - 1] ?? "").trim();
            const nextTrim = (notebookLines[i + 1] ?? "").trim();
            const trim = line.trim();
            const isRuleBar = /^=+$/.test(trim);
            const isPersonalHeader = trim.startsWith("// personal life");
            /** `====` row directly before `// personal life` (not the gratitude divider). */
            const personalSectionPair =
              (isRuleBar && nextTrim.startsWith("// personal life")) ||
              (isPersonalHeader && /^=+$/.test(prevTrim));
            const pullUpPx =
              personalSectionPair && ruleLinePx != null
                ? Math.round(ruleLinePx * 0.14)
                : personalSectionPair
                  ? 4
                  : 0;
            const nudgeDown =
              tail2 && ruleLinePx != null
                ? `${Math.round(ruleLinePx * 0.46)}px`
                : tail2
                  ? "0.55rem"
                  : undefined;
            return (
              <p
                key={`${i}-${line}`}
                className={`font-hand m-0 min-w-0 max-w-full text-zinc-700 ${isRuleBar ? "break-all" : "break-words"}`}
                style={{
                  fontSize: "clamp(0.9rem, 0.72rem + 0.95vw, 1.55rem)",
                  lineHeight: bodyLineHeight,
                  ...(nudgeDown ? { marginTop: nudgeDown } : {}),
                  ...(pullUpPx
                    ? { transform: `translateY(-${pullUpPx}px)` }
                    : {}),
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
