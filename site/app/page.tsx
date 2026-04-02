import { ScrollDownCue } from "@/components/layout/ScrollDownCue";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen text-stone-900">
      <div className="relative min-h-[100dvh]">
        <div className="flex min-h-[100dvh] flex-col justify-center py-12 sm:py-16">
          <HeroSection />
        </div>
        {/* Arrow sits on the bottom edge without shrinking the hero’s vertical space */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-6 pt-1 sm:pb-8">
          <span className="pointer-events-auto">
            <ScrollDownCue />
          </span>
        </div>
      </div>
      <section id="work" className="min-h-[80vh] scroll-mt-20" aria-label="Work" />
      <section id="contact" className="min-h-[50vh] scroll-mt-20" aria-label="Contact" />
    </main>
  );
}
