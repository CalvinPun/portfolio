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
            <div className="flex flex-col items-center gap-8 lg:col-span-5 lg:flex-row lg:items-start lg:justify-start lg:gap-5 lg:pt-4">
              <div className="hero-pop hero-pop-delay-1 flex shrink-0 justify-center">
                <PolaroidCard
                  caption={polaroidCaption}
                  photoSrc={photoSrc}
                  photoPlaceholderText={photoPlaceholderText}
                />
              </div>
              <div className="hero-pop hero-pop-delay-3 w-full max-w-sm shrink-0 lg:mt-64 lg:ml-6 lg:w-auto lg:max-w-[22rem] xl:mt-72 xl:ml-8">
                <LocationSticky text={locationNote} />
              </div>
            </div>
            <div className="hero-pop hero-pop-delay-2 flex justify-center lg:col-span-7 lg:justify-end lg:pr-2 xl:pr-8">
              <MainHeroSticky
                headline={sticky.headline}
                bodyLead={sticky.bodyLead}
                bodyAccent={sticky.bodyAccent}
                social={sticky.social}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
