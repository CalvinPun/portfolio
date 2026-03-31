import { Container } from "@/components/layout/Container";
import { siteContent } from "@/data/siteContent";

export function HeroSection() {
  return (
    <section className="px-6 py-16">
      <Container>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {siteContent.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-700">
          {siteContent.hero.subtitle}
        </p>
      </Container>
    </section>
  );
}
