import { ScrollDownCue } from "@/components/layout/ScrollDownCue";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen text-stone-900">
      {/* Full-viewport hero (its own “page”); arrow fixed to bottom of this screen on all breakpoints */}
      <section
        id="hero"
        className="relative min-h-[100dvh] scroll-mt-0"
        aria-label="Introduction"
      >
        <div className="flex min-h-[100dvh] flex-col justify-center px-4 py-12 sm:px-6 sm:py-16">
          <HeroSection />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 sm:pb-8 sm:pt-8">
          <span className="pointer-events-auto">
            <ScrollDownCue />
          </span>
        </div>
      </section>

      <AboutSection />

      <section id="work" className="min-h-[80vh] scroll-mt-20" aria-label="Work" />
      <section id="contact" className="min-h-[50vh] scroll-mt-20" aria-label="Contact" />
    </main>
  );
}
