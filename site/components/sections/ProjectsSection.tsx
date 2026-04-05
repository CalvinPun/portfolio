"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { siteContent } from "@/data/siteContent";

const cardLayouts = [
  "md:col-span-5 md:col-start-2",
  "md:col-span-5 md:col-start-7",
  "md:col-span-5 md:col-start-2",
  "md:col-span-5 md:col-start-7",
];

const cardRotations = [
  "",
  "",
  "",
  "",
];
const DESKTOP_MAX_SCALE = 0.94;

export function ProjectsSection() {
  const { eyebrow, title, intro, items } = siteContent.projects;
  const sectionRef = useRef<HTMLElement | null>(null);
  const scaleFrameRef = useRef<HTMLDivElement | null>(null);
  const scaleContentRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [desktopScale, setDesktopScale] = useState(1);
  const [desktopHeight, setDesktopHeight] = useState<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const activeProject = activeProjectIndex !== null ? items[activeProjectIndex] : null;

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
        }, 720);
      },
      {
        threshold: 0.22,
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
    const frame = scaleFrameRef.current;
    const content = scaleContentRef.current;
    const section = sectionRef.current;
    if (!frame || !content || !section) return;

    const updateScale = () => {
      if (window.innerWidth < 1024) {
        setDesktopScale(1);
        setDesktopHeight(null);
        return;
      }

      const contentWidth = content.offsetWidth;
      const contentHeight = content.offsetHeight;
      const frameWidth = frame.clientWidth;
      const sectionStyles = window.getComputedStyle(section);
      const sectionPaddingTop = Number.parseFloat(sectionStyles.paddingTop) || 0;
      const sectionPaddingBottom = Number.parseFloat(sectionStyles.paddingBottom) || 0;
      const availableHeight = window.innerHeight - sectionPaddingTop - sectionPaddingBottom;
      const widthScale = frameWidth / contentWidth;
      const heightScale = availableHeight / contentHeight;
      const nextScale = Math.min(DESKTOP_MAX_SCALE, widthScale, heightScale);
      const safeScale = Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1;

      setDesktopScale(safeScale);
      setDesktopHeight(contentHeight * safeScale);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => updateScale());
    resizeObserver.observe(frame);
    resizeObserver.observe(content);

    window.addEventListener("resize", updateScale);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className={`projects-stage -mt-10 scroll-mt-8 px-4 pb-44 pt-0 sm:-mt-11 sm:px-6 sm:pb-48 sm:pt-1 lg:-mt-12${isVisible ? " is-visible" : ""}${isExiting ? " is-exiting" : ""}`}
        aria-labelledby="projects-title"
      >
        <div
          ref={scaleFrameRef}
          className="mx-auto w-full max-w-[68rem]"
          style={desktopHeight !== null ? { height: `${desktopHeight}px` } : undefined}
        >
          <div
            ref={scaleContentRef}
            className="flex w-full max-w-[68rem] flex-col gap-5 lg:gap-4"
            style={
              desktopScale !== 1
                ? {
                    transform: `scale(${desktopScale})`,
                    transformOrigin: "top center",
                  }
                : undefined
            }
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-hand text-[1.45rem] tracking-[0.08em] text-stone-700 sm:text-[1.6rem]">{eyebrow}</p>
              <h2
                id="projects-title"
                className="mt-1 text-[2.3rem] font-semibold tracking-[-0.05em] text-stone-900 sm:text-[2.75rem] lg:text-[2.55rem]"
              >
                {title}
              </h2>
              {intro ? (
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-700 sm:text-lg">
                  {intro}
                </p>
              ) : null}
            </div>

            <div className="corkboard-frame rounded-[1.75rem] p-2.5 shadow-[0_16px_34px_rgba(74,47,23,0.12)] sm:p-3 lg:p-2.5">
            <div className="corkboard relative overflow-hidden rounded-[1.35rem] px-3 py-4 sm:px-4 sm:py-4 lg:px-4.5 lg:py-4.5">
                <div className="relative grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-y-8 md:gap-x-6 lg:gap-y-10 lg:gap-x-8">
                  {items.map((project, index) => (
                    <article
                      key={project.title}
                      className={[
                        "project-card project-card--paper relative flex flex-col rounded-[1.25rem] p-3.5 shadow-[0_10px_20px_rgba(55,31,15,0.1)] transition-transform duration-300 hover:-translate-y-1 sm:p-4 lg:p-3.5",
                        cardLayouts[index % cardLayouts.length],
                        cardRotations[index % cardRotations.length],
                      ].join(" ")}
                    >
                    <button
                      type="button"
                      onClick={() => setActiveProjectIndex(index)}
                      className="group block cursor-pointer text-left"
                      aria-label={`Open details for ${project.title}`}
                    >
                        <div className="project-image-wrap relative overflow-hidden rounded-[0.95rem]">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={`${project.title} screenshot`}
                              fill
                              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
                              sizes="(max-width: 767px) 100vw, 42vw"
                            />
                          ) : (
                            <div className="project-image-placeholder">
                              <span>{project.title}</span>
                              <span>screenshot</span>
                            </div>
                          )}
                        </div>

                        <div className="px-1 pb-1 pt-3 text-center">
                          <h3 className="text-[1.55rem] font-semibold tracking-[-0.05em] text-stone-900 sm:text-[1.7rem] lg:text-[1.5rem]">
                            {project.title}
                          </h3>
                          <p className="mx-auto mt-1 max-w-[21rem] text-[0.9rem] leading-5 text-stone-700 sm:text-[0.96rem] lg:text-[0.88rem]">
                            {project.caption}
                          </p>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeProject ? (
        <div
          className="project-modal-overlay fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          onClick={() => setActiveProjectIndex(null)}
        >
          <div
            className="project-modal project-modal--enter relative w-full max-w-4xl rounded-[1.75rem] p-4 sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProjectIndex(null)}
              className="project-modal__close"
              aria-label="Close project details"
            >
              x
            </button>

            <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="project-modal__image project-image-wrap relative min-h-[18rem] overflow-hidden rounded-[1.2rem] sm:min-h-[22rem]">
                <div className="project-modal__image-inner absolute inset-x-1 inset-y-2 sm:inset-x-2 sm:inset-y-3">
                  {activeProject.image ? (
                    <Image
                      src={activeProject.image}
                      alt={`${activeProject.title} screenshot`}
                      fill
                      className="scale-[1.12] object-contain object-center"
                      sizes="(max-width: 1023px) 100vw, 52vw"
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      <span>{activeProject.title}</span>
                      <span>screenshot</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="project-modal__body">
                <p className="font-hand text-[1.35rem] tracking-[0.06em] text-stone-700">
                  project details
                </p>
                <h3
                  id="project-detail-title"
                  className="mt-1 text-[2rem] font-semibold tracking-[-0.05em] text-stone-900 sm:text-[2.35rem]"
                >
                  {activeProject.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-stone-700">
                  {activeProject.description ?? activeProject.summary}
                </p>

                {activeProject.links?.length ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {activeProject.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="project-modal__link"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : activeProject.href ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={activeProject.href}
                      target="_blank"
                      rel="noreferrer"
                      className="project-modal__link"
                    >
                      Open Link
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
