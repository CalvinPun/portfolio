import Image from "next/image";

import { AboutNotebookOverlay } from "@/components/sections/AboutNotebookOverlay";
import { siteContent } from "@/data/siteContent";

const MANILA_W = 5158;
const MANILA_H = 2771;
const MANILA_RATIO = MANILA_W / MANILA_H;

export function AboutSection() {
  const { notebookTitle, notebookLines } = siteContent.about;

  return (
    <section
      id="about"
      className="flex scroll-mt-0 flex-col justify-center overflow-x-hidden px-2 pb-10 pt-0 sm:px-4 sm:py-16 md:min-h-[100dvh]"
      aria-label="About"
    >
      <div
        className="relative mx-auto w-full min-w-0"
        style={{
          maxWidth: `min(100%, var(--folder-vw-cap), calc((100dvh - 8rem) * ${MANILA_RATIO.toFixed(3)}))`,
        }}
      >
        <Image
          src="/manila-folder.svg"
          alt=""
          width={MANILA_W}
          height={MANILA_H}
          className="relative z-0 block h-auto w-full select-none"
          sizes="(max-width: 768px) 100vw, 88vw"
          priority={false}
        />
        <div className="absolute left-[49%] top-[7.25%] z-10 w-[41%] min-w-0 overflow-hidden sm:left-[49.25%] sm:top-[6.75%] sm:w-[40.5%]">
          <AboutNotebookOverlay
            notebookTitle={notebookTitle}
            notebookLines={notebookLines}
          />
        </div>
      </div>
    </section>
  );
}
