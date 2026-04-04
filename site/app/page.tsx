import { ScrollDownCue } from "@/components/layout/ScrollDownCue";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen text-stone-900">
      {/* Hero: arrow under content on small screens; pinned to bottom from lg up */}
      <section
        id="hero"
        className="relative scroll-mt-0 lg:min-h-[100dvh]"
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

      <section id="work" className="scroll-mt-20 md:min-h-[80vh]" aria-label="Work" />
      <section id="contact" className="scroll-mt-20 md:min-h-[50vh]" aria-label="Contact" />
    </main>
  );
}
