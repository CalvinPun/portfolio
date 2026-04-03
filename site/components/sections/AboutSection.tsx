import { Container } from "@/components/layout/Container";
import { siteContent } from "@/data/siteContent";

export function AboutSection() {
  const { heading, body } = siteContent.about;

  return (
    <section
      id="about"
      className="flex min-h-[100dvh] scroll-mt-0 flex-col justify-center px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="about-heading"
    >
      <Container className="max-w-2xl">
        <h2
          id="about-heading"
          className="mb-6 font-hand text-3xl text-stone-800 sm:mb-8 sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="font-sans text-lg leading-relaxed text-stone-700 sm:text-xl">{body}</p>
      </Container>
    </section>
  );
}
