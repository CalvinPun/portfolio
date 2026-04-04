import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption: string;
  rotation?: number;
};

export function AboutPocketPolaroid({ src, alt, caption, rotation }: Props) {
  return (
    <div className="about-pocket-polaroid w-full max-w-full [container-type:inline-size]">
      <div
        className="polaroid-tilt"
        style={rotation != null ? { "--polaroid-rot": `${rotation}deg` } as React.CSSProperties : undefined}
      >
        <div className="photo-frame polaroid-card">
          <div className="polaroid-card__photo-wrap">
            <div
              className="photo-frame__media polaroid-card__media relative z-0 w-full overflow-hidden rounded-[2px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
              style={{ aspectRatio: "330 / 420" }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 144px"
                quality={95}
                unoptimized
              />
            </div>
          </div>
          <p className="photo-caption font-hand text-stone-800">{caption}</p>
        </div>
      </div>
    </div>
  );
}
