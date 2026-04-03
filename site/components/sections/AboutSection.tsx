import Image from "next/image";

import { AboutNotebookOverlay } from "@/components/sections/AboutNotebookOverlay";
import { siteContent } from "@/data/siteContent";

const MANILA_W = 5158;
const MANILA_H = 2771;

/**
 * Notebook on the right panel of `manila-folder.svg`, past the spine crease.
 */
export function AboutSection() {
  const { notebookTitle, notebookLines } = siteContent.about;

  return (
    <section
      id="about"
      className="flex min-h-[100dvh] scroll-mt-0 flex-col justify-center px-2 py-10 sm:px-4 sm:py-16"
      aria-label="About"
    >
      <div className="relative mx-auto w-full max-w-[min(100%,80rem)]">
        <Image
          src="/manila-folder.svg"
          alt=""
          width={MANILA_W}
          height={MANILA_H}
          className="relative z-0 block h-auto w-full select-none"
          sizes="(max-width: 768px) 100vw, 80rem"
          priority={false}
        />
        <div className="absolute left-[49%] top-[7.25%] z-10 w-[41%] max-h-[86%] sm:left-[49.25%] sm:top-[6.75%] sm:w-[40.5%]">
          <AboutNotebookOverlay
            notebookTitle={notebookTitle}
            notebookLines={notebookLines}
          />
        </div>
      </div>
    </section>
  );
}
