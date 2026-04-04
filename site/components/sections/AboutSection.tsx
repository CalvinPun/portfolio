import Image from "next/image";

import { AboutBucketList } from "@/components/sections/AboutBucketList";
import { AboutNotebookOverlay } from "@/components/sections/AboutNotebookOverlay";
import { AboutPocketPolaroid } from "@/components/sections/AboutPocketPolaroid";
import { AboutPocketScrap } from "@/components/sections/AboutPocketScrap";
import { CurrentlyPlayingSpotify } from "@/components/sections/CurrentlyPlayingSpotify";
import { siteContent } from "@/data/siteContent";

const MANILA_W = 5158;
const MANILA_H = 2771;
const MANILA_RATIO = MANILA_W / MANILA_H;

export function AboutSection() {
  const { notebookTitle, notebookLines, pocketPolaroid, pocketPolaroid2, pocketScrap, bucketList } = siteContent.about;

  return (
    <section
      id="about"
      className="flex scroll-mt-0 flex-col justify-center overflow-x-clip overflow-y-visible px-1 pb-10 pt-0 sm:px-2 sm:py-12 md:min-h-[100dvh]"
      aria-label="About"
    >
      <div
        className="relative mx-auto w-full min-w-0"
        style={{
          maxWidth: `min(100%, var(--folder-vw-cap), calc((100dvh - 3rem) * ${MANILA_RATIO.toFixed(3)}))`,
        }}
      >
        <Image
          src="/manila-folder.svg"
          alt=""
          width={MANILA_W}
          height={MANILA_H}
          className="relative z-0 block h-auto w-full select-none"
          sizes="(max-width: 768px) 100vw, 88vw"
          loading="eager"
          priority
        />
        {/* Left pocket — left of the folder crease (~49%); notebook sits on the right */}
        <div className="pointer-events-auto absolute left-[6%] right-[53%] top-[7.5%] z-20 flex min-w-0 flex-col items-start gap-6 overflow-visible [container-type:inline-size] sm:left-[7%] sm:right-[53%] sm:top-[8%] sm:gap-8">
          <div className="flex w-full min-w-0 flex-row flex-nowrap items-start justify-start gap-3 overflow-visible sm:gap-4 [container-type:inline-size]">
            <div className="w-[15rem] min-w-0 shrink-0">
              <CurrentlyPlayingSpotify variant="embedded" />
            </div>
            <div className="w-52 shrink-0 translate-x-4 sm:w-60 sm:translate-x-6">
              <AboutPocketPolaroid
                src={pocketPolaroid.src}
                alt={pocketPolaroid.alt}
                caption={pocketPolaroid.caption}
                rotation={-2}
              />
            </div>
          </div>
          <AboutPocketScrap text={pocketScrap} />
          <div className="flex w-full min-w-0 flex-row flex-nowrap items-start justify-start gap-3 overflow-visible sm:gap-4">
            <div className="-mt-4 w-52 shrink-0 sm:-mt-6 sm:w-60 [container-type:inline-size]">
              <AboutPocketPolaroid
                src={pocketPolaroid2.src}
                alt={pocketPolaroid2.alt}
                caption={pocketPolaroid2.caption}
              />
            </div>
            <div className="shrink-0 translate-x-2 translate-y-8 sm:translate-x-4 sm:translate-y-12">
              <AboutBucketList title={bucketList.title} items={bucketList.items} />
            </div>
          </div>
        </div>
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
