"use client";

import { useEffect, useRef, useState } from "react";

import { SectionDots } from "@/components/layout/SectionDots";
import { ScrollDownCue } from "@/components/layout/ScrollDownCue";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroExiting, setHeroExiting] = useState(false);
  const heroExitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (heroExitTimeoutRef.current !== null) {
            window.clearTimeout(heroExitTimeoutRef.current);
            heroExitTimeoutRef.current = null;
          }
          setHeroExiting(false);
          setHeroVisible(true);
          return;
        }

        if (!heroVisible) return;
        setHeroExiting(true);
        if (heroExitTimeoutRef.current !== null) {
          window.clearTimeout(heroExitTimeoutRef.current);
        }
        heroExitTimeoutRef.current = window.setTimeout(() => {
          setHeroVisible(false);
          setHeroExiting(false);
          heroExitTimeoutRef.current = null;
        }, 720);
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (heroExitTimeoutRef.current !== null) {
        window.clearTimeout(heroExitTimeoutRef.current);
      }
    };
  }, [heroVisible]);

  return (
    <main className="min-h-screen text-stone-900">
      <SectionDots />

      {/* Hero: arrow under content on small screens; pinned to bottom from lg up */}
      <section
        ref={heroRef}
        id="hero"
        className={`hero-stage relative scroll-mt-0 lg:min-h-[100dvh]${heroVisible ? " is-visible" : ""}${heroExiting ? " is-exiting" : ""}`}
        aria-label="Introduction"
      >
        <div className="flex flex-col justify-start px-4 pb-0 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:min-h-[100dvh] lg:justify-center">
          <HeroSection />
          {/* Narrow viewports: arrow follows the hero in the document (under post-its), not the screen bottom */}
          <div className="pointer-events-none mt-2 flex justify-center pb-0 sm:mt-10 sm:pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
            <span className="pointer-events-auto">
              <ScrollDownCue />
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 sm:pb-8 sm:pt-8 lg:flex">
          <span className="pointer-events-auto">
            <ScrollDownCue />
          </span>
        </div>
      </section>

      <AboutSection />

      <ProjectsSection />
    </main>
  );
}
