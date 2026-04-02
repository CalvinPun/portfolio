import { Container } from "@/components/layout/Container";
import { AsciiCatSticky } from "@/components/scrapbook/AsciiCatSticky";
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
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
            <div className="hero-pop hero-pop-delay-1 flex max-lg:order-1 justify-center lg:col-span-4 lg:row-start-1">
              <PolaroidCard
                caption={polaroidCaption}
                photoSrc={photoSrc}
                photoPlaceholderText={photoPlaceholderText}
              />
            </div>
            <div className="flex max-lg:order-2 flex-col items-center gap-5 lg:col-span-2 lg:row-start-1 lg:col-start-5 lg:self-center">
              <div className="hero-pop hero-pop-delay-4 flex shrink-0 justify-center">
                <div className="-translate-y-3 lg:-translate-y-10">
                  <AsciiCatSticky />
                </div>
              </div>
              <div className="hero-pop hero-pop-delay-3 flex w-full justify-center">
                <LocationSticky text={locationNote} />
              </div>
            </div>
            <div className="hero-pop hero-pop-delay-2 flex max-lg:order-4 justify-center lg:col-span-6 lg:row-start-1 lg:col-start-7 lg:justify-end lg:pr-2 xl:pr-8">
              <MainHeroSticky
                headline={sticky.headline}
                headlineEmoji={sticky.headlineEmoji}
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
