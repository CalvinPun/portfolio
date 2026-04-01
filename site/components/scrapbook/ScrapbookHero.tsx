import { Container } from "@/components/layout/Container";
import { LocationSticky } from "@/components/scrapbook/LocationSticky";
import { MainHeroSticky } from "@/components/scrapbook/MainHeroSticky";
import { PolaroidCard } from "@/components/scrapbook/PolaroidCard";
import { siteContent } from "@/data/siteContent";

export function ScrapbookHero() {
  const { polaroidCaption, sticky, locationNote, photoSrc, photoPlaceholderText } =
    siteContent.hero;

  return (
    <section className="px-4 sm:px-6" aria-label="Introduction">
      <Container className="max-w-6xl">
        <div className="relative">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8 lg:gap-y-10">
            <div className="hero-pop hero-pop-delay-1 flex justify-center lg:col-span-5 lg:justify-start lg:pt-4">
              <PolaroidCard
                caption={polaroidCaption}
                photoSrc={photoSrc}
                photoPlaceholderText={photoPlaceholderText}
              />
            </div>
            <div className="hero-pop hero-pop-delay-2 flex justify-center lg:col-span-7 lg:justify-end lg:pr-2 xl:pr-8">
              <MainHeroSticky
                headline={sticky.headline}
                body={sticky.body}
                ctaWork={sticky.ctaWork}
                ctaHello={sticky.ctaHello}
              />
            </div>
          </div>
          <div className="hero-pop hero-pop-delay-3 mt-2 flex justify-center lg:absolute lg:bottom-[-8px] lg:right-0 lg:mt-0 lg:justify-end xl:right-4">
            <LocationSticky text={locationNote} />
          </div>
        </div>
      </Container>
    </section>
  );
}
