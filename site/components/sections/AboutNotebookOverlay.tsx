"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  ABOUT_NOTEBOOK_ARTBOARD_W as NOTEBOOK_W,
  ABOUT_NOTEBOOK_BODY_FONT_CQW as BODY_FONT_CQW,
  ABOUT_NOTEBOOK_LINE_CQW as RULE_CQW,
  ABOUT_NOTEBOOK_TITLE_FONT_CQW as TITLE_FONT_CQW,
} from "@/lib/aboutNotebookTypeScale";

const NOTEBOOK_H = 2211;

type Props = {
  notebookTitle: string;
  notebookLines: readonly string[];
};

export function AboutNotebookOverlay({ notebookTitle, notebookLines }: Props) {
  const [titleDate, setTitleDate] = useState("");

  useEffect(() => {
    setTitleDate(
      new Date().toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      }),
    );
  }, []);

  return (
    <div className="relative w-full min-w-0 max-w-full [container-type:inline-size]">
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
        className="absolute inset-0 flex min-w-0 max-w-full flex-col overflow-hidden pl-[13%] pr-[4%] pt-[5.85%] sm:pl-[12%] sm:pt-[5.1%]"
        style={{ gap: 0 }}
      >
        <h2
          className="font-hand m-0 min-w-0 max-w-full break-words font-bold text-stone-900"
          style={{
            fontSize: `${TITLE_FONT_CQW}cqw`,
            lineHeight: `${RULE_CQW}cqw`,
          }}
        >
          {notebookTitle}
          {titleDate ? ` ${titleDate}` : ""}
        </h2>

        <div className="flex min-w-0 max-w-full flex-col" style={{ gap: 0 }}>
          {notebookLines.map((line, i) => {
            const trim = line.trim();
            const isComment = trim.startsWith("//");
            const isRuleBar = /^=+$/.test(trim);

            return (
              <p
                key={`${i}-${line}`}
                aria-hidden={isRuleBar || undefined}
                className={[
                  "font-hand m-0 min-w-0 max-w-full",
                  isComment ? "font-semibold text-sky-900" : "text-zinc-700",
                  isRuleBar ? "invisible select-none break-all" : "break-words",
                ].join(" ")}
                style={{
                  fontSize: `${BODY_FONT_CQW}cqw`,
                  lineHeight: `${RULE_CQW}cqw`,
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
