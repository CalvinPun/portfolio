"use client";

import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const pocketFrameRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [pocketScale, setPocketScale] = useState(1);
  const exitTimeoutRef = useRef<number | null>(null);
  const POCKET_BASE_W = 496;
  const POCKET_BASE_H = Math.round(POCKET_BASE_W / 0.78);
  const POCKET_MAX_SCALE = 1.34;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (exitTimeoutRef.current !== null) {
            window.clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
          }
          setIsExiting(false);
          setIsVisible(true);
          return;
        }

        if (!isVisible) return;
        setIsExiting(true);
        if (exitTimeoutRef.current !== null) {
          window.clearTimeout(exitTimeoutRef.current);
        }
        exitTimeoutRef.current = window.setTimeout(() => {
          setIsVisible(false);
          setIsExiting(false);
          exitTimeoutRef.current = null;
        }, 380);
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const node = pocketFrameRef.current;
    if (!node) return;

    const updateScale = () => {
      const nextScale = Math.min(POCKET_MAX_SCALE, node.clientWidth / POCKET_BASE_W);
      setPocketScale(nextScale > 0 ? nextScale : 1);
    };

    updateScale();

    const observer = new ResizeObserver(() => updateScale());
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="flex scroll-mt-0 flex-col justify-center overflow-x-clip overflow-y-visible px-1 pb-10 pt-0 sm:px-2 sm:py-12 md:min-h-[100dvh]"
      aria-label="About"
    >
      <div
        className={`about-folder-stage relative mx-auto w-full min-w-0${isVisible ? " is-visible" : ""}${isExiting ? " is-exiting" : ""}`}
        style={{
          maxWidth: `min(100%, var(--folder-vw-cap), 112rem, calc((100dvh - 4rem) * ${MANILA_RATIO.toFixed(3)}))`,
        }}
      >
        <Image
          src="/manila-folder.svg"
          alt=""
          width={MANILA_W}
          height={MANILA_H}
          className="about-folder-base relative z-0 block h-auto w-full select-none"
          sizes="(max-width: 768px) 100vw, 88vw"
          loading="eager"
          priority
        />
        <div className="about-folder-texture absolute inset-0 z-[1] pointer-events-none" aria-hidden />
        {/* Left pocket — left of the folder crease (~49%); notebook sits on the right */}
        <div
          ref={pocketFrameRef}
          className="about-folder-pocket pointer-events-auto absolute left-[5.5%] right-[52.5%] top-[6.8%] z-20 min-w-0 overflow-visible sm:left-[6%] sm:top-[7%] md:left-[7%] md:right-[53%] md:top-[8%]"
        >
          <div
            className="relative origin-top-left overflow-visible [container-type:inline-size]"
            style={{
              width: `${POCKET_BASE_W}px`,
              height: `${POCKET_BASE_H}px`,
              transform: `scale(${pocketScale})`,
              transformOrigin: "top left",
            }}
          >
            <div className="absolute left-[5%] top-[0%] w-[53%] min-w-0">
              <CurrentlyPlayingSpotify variant="embedded" />
            </div>
            <div className="absolute right-[-3%] top-[0%] w-[44%] min-w-0">
              <AboutPocketPolaroid
                src={pocketPolaroid.src}
                alt={pocketPolaroid.alt}
                caption={pocketPolaroid.caption}
                rotation={-2}
              />
            </div>
            <div className="absolute left-[9%] top-[27%] w-[46%] min-w-0">
              <AboutPocketScrap text={pocketScrap} />
            </div>
            <div className="absolute left-[3%] top-[44%] w-[44%] min-w-0 [container-type:inline-size]">
              <AboutPocketPolaroid
                src={pocketPolaroid2.src}
                alt={pocketPolaroid2.alt}
                caption={pocketPolaroid2.caption}
              />
            </div>
            <div className="absolute right-[7%] top-[54%] w-[40%] min-w-0">
              <AboutBucketList title={bucketList.title} items={bucketList.items} />
            </div>
          </div>
        </div>
        <div className="about-folder-notebook absolute left-[49.25%] top-[6.75%] z-10 w-[40.5%] min-w-0 overflow-hidden">
          <AboutNotebookOverlay
            notebookTitle={notebookTitle}
            notebookLines={notebookLines}
          />
        </div>
      </div>
    </section>
  );
}
