"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Paths mirror `public/down-arrow.svg` — edit the SVG, then paste updated `d` values here. */

const ARROW_VIEW_W = 672;
const ARROW_VIEW_H = 1179;
/** Near-black graphite; not pure #000 so it reads like pencil on paper */
const PENCIL_STROKE = "#141414";
const PENCIL_STROKE_W = 30;

type ScrollDownCueProps = {
  targetId?: string;
  scrollPastPx?: number;
  ariaLabel?: string;
  mirrored?: boolean;
  forceVisible?: boolean;
};

export function ScrollDownCue({
  targetId = "about",
  scrollPastPx = 24,
  ariaLabel = "Scroll to about section",
  mirrored = false,
  forceVisible = false,
}: ScrollDownCueProps = {}) {
  const filterUid = useId().replace(/:/g, "");
  const filterId = `arrow-pencil-${filterUid}`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [inView, setInView] = useState(true);
  const [drawKey, setDrawKey] = useState(0);
  const prevVisibleRef = useRef<boolean | null>(null);
  const isShown = forceVisible || inView;

  useEffect(() => {
    if (forceVisible) {
      return;
    }

    const el = buttonRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setInView(visible);
        if (prevVisibleRef.current === false && visible) {
          setDrawKey((k) => k + 1);
        }
        prevVisibleRef.current = visible;
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [forceVisible]);

  function scrollToTarget() {
    const el = document.getElementById(targetId);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
    const rect = el.getBoundingClientRect();
    const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const top = rect.top + window.scrollY - scrollMarginTop + scrollPastPx;
    window.scrollTo({ top, behavior });
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTarget}
      className={[
        "group inline-flex shrink-0 flex-col items-center border-0 bg-transparent pb-1",
        "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        isShown
          ? "translate-y-0 opacity-100 hover:opacity-80"
          : "pointer-events-none translate-y-2 opacity-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-500",
      ].join(" ")}
      aria-label={ariaLabel}
      aria-hidden={!isShown}
      tabIndex={isShown ? undefined : -1}
    >
      <span
        className="block h-[6rem] shrink-0 sm:h-[9rem] lg:h-[11rem]"
        style={{
          aspectRatio: `${ARROW_VIEW_W} / ${ARROW_VIEW_H}`,
          transform: mirrored ? "scaleX(-1)" : undefined,
        }}
        aria-hidden
      >
        <svg
          className="block h-full w-full overflow-visible"
          viewBox={`0 0 ${ARROW_VIEW_W} ${ARROW_VIEW_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id={filterId}
              x="-12%"
              y="-12%"
              width="124%"
              height="124%"
              colorInterpolationFilters="sRGB"
            >
              {/* Fine grain + slight edge wobble — reads like graphite / pencil on paper */}
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045 0.65"
                numOctaves="2"
                seed="11"
                result="grain"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="grain"
                scale="2.4"
                xChannelSelector="R"
                yChannelSelector="G"
                result="wobble"
              />
              <feGaussianBlur in="wobble" stdDeviation="0.35" />
            </filter>
          </defs>
          <g filter={`url(#${filterId})`}>
            <g key={drawKey}>
            <path
              className="draw-arrow-path--shaft"
              pathLength="1"
              d="M444.408 16.8392C439.865 16.3862 426.18 15.4666 378.057 21.355C337.064 26.3709 262.896 39.0203 222.589 45.7666C178.092 53.2145 169.93 56.1778 150.617 63.4388C108.22 79.3792 75.2481 97.7812 61.33 106.902C33.9244 124.862 25.7935 138.506 19.6099 150.619C12.9986 163.571 18.4364 184.241 22.0875 195.462C27.2463 211.317 43.1156 221.329 58.3926 234.327C65.102 240.036 76.3325 246.831 92.3507 255.094C108.369 263.357 129.205 272.417 162.813 284.331C196.421 296.245 242.17 310.739 277.514 321.151C312.858 331.562 336.412 337.45 365.305 346.146C394.198 354.841 427.717 366.165 464.462 381.511C501.206 396.856 540.16 415.88 563.172 427.945C605.505 450.141 615.955 467.929 623.271 476.165C633.495 487.675 637.917 496.754 643.64 509.992C652.363 530.167 654.388 548.363 655.108 571.052C655.937 597.154 649.858 616.115 646.193 628.063C640.799 645.65 626.991 664.21 621.047 673.805C614.348 684.619 600.966 698.937 587.48 711.97C568.044 730.753 538.705 748.872 508.44 765.028C490.759 774.466 459.671 788.403 441.766 796.549C407.289 812.235 384.069 823.432 373.074 828.483C362.071 833.538 353.405 838.997 342.204 844.94C318.357 857.595 307.642 871.033 300.32 878.562C286.652 892.614 270.665 916.631 254.358 947.109C237.012 979.532 238.079 989.516 235.78 998.438C233.168 1008.58 232.122 1017.87 230.29 1028.4C228.235 1040.2 228.004 1052.19 227.311 1080.94C226.945 1096.14 228.444 1108 230.276 1117.85C230.736 1120.38 231.189 1123.1 231.649 1125.63C232.108 1128.16 232.561 1130.43 233.028 1136.88"
              stroke={PENCIL_STROKE}
              strokeWidth={PENCIL_STROKE_W}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={0.94}
            />
            <path
              className="draw-arrow-path--head"
              pathLength="1"
              d="M131.456 1095.7C137.839 1098.43 146.966 1104.81 158.62 1115.09C181.958 1135.66 188.611 1142.81 199.358 1152.39C203.607 1156.18 207.388 1158.83 211.039 1161.34C214.492 1163.71 228.787 1161.16 249.129 1155.45C261.179 1152.07 279.092 1143.34 308.981 1129.89C341.256 1115.37 360.638 1100.76 372.703 1092.11C380.692 1086.63 392.469 1078.93 401.706 1073.6C410.944 1068.28 417.285 1065.56 423.819 1062.76"
              stroke={PENCIL_STROKE}
              strokeWidth={PENCIL_STROKE_W}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={0.94}
            />
            </g>
          </g>
        </svg>
      </span>
    </button>
  );
}
