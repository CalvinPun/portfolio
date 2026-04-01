import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen text-stone-900">
      <div className="flex min-h-[100dvh] flex-col justify-center py-10 sm:py-14">
        <HeroSection />
      </div>
      <section id="work" className="scroll-mt-20" aria-label="Work" />
      <section id="contact" className="scroll-mt-20" aria-label="Contact" />
    </main>
  );
}
