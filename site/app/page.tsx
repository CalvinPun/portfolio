import { ScrollDownCue } from "@/components/layout/ScrollDownCue";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen text-stone-900">
      {/* Mobile: column + in-flow arrow under hero (no overlap). Desktop (lg+): full-viewport centered hero + arrow overlaid at bottom like before. */}
      <div className="max-lg:flex max-lg:min-h-[100dvh] max-lg:flex-col lg:relative lg:min-h-[100dvh]">
        <div className="flex min-h-0 flex-1 flex-col justify-center py-12 sm:py-16 max-lg:py-10 max-lg:sm:py-14 lg:min-h-[100dvh] lg:flex-none">
          <HeroSection />
        </div>
        <div className="flex shrink-0 justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 sm:pb-8 sm:pt-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:z-10 lg:pt-1 lg:pb-8">
          <span className="lg:pointer-events-auto">
            <ScrollDownCue />
          </span>
        </div>
      </div>
      <section id="work" className="min-h-[80vh] scroll-mt-20" aria-label="Work" />
      <section id="contact" className="min-h-[50vh] scroll-mt-20" aria-label="Contact" />
    </main>
  );
}
