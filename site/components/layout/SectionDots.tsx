"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "about", "work"] as const;

export function SectionDots() {
  const [activeSection, setActiveSection] = useState<(typeof SECTION_IDS)[number]>("hero");

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target instanceof HTMLElement) {
          setActiveSection(visibleEntries[0].target.id as (typeof SECTION_IDS)[number]);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-18% 0px -18% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:flex"
    >
      <div className="pointer-events-auto flex flex-col gap-3 rounded-full bg-[rgba(255,250,244,0.68)] px-2 py-3 shadow-[0_10px_24px_rgba(63,41,19,0.08)] backdrop-blur-[6px]">
        {SECTION_IDS.map((sectionId) => {
          const isActive = activeSection === sectionId;

          return (
            <button
              key={sectionId}
              type="button"
              aria-label={`Jump to ${sectionId}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                document.getElementById(sectionId)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="flex h-4 w-4 items-center justify-center"
            >
              <span
                className={[
                  "block h-2.5 w-2.5 rounded-full border border-[rgba(84,58,34,0.55)] transition-all duration-300",
                  isActive
                    ? "scale-110 bg-[rgba(73,46,23,0.92)]"
                    : "bg-transparent",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
