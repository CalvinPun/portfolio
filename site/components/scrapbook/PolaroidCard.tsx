import Image from "next/image";

type PolaroidCardProps = {
  caption: string;
  photoSrc: string | null;
  photoPlaceholderText: string;
};

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="photo-img photo-img--placeholder"
      role="img"
      aria-label={label}
    >
      <svg
        className="h-12 w-12 opacity-45"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span className="font-hand text-lg text-stone-600">{label}</span>
    </div>
  );
}

export function PolaroidCard({ caption, photoSrc, photoPlaceholderText }: PolaroidCardProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="photo-frame">
        {/* Media first; tapes after so they paint above Next/Image wrapper */}
        <div className="photo-frame__media">
          {photoSrc ? (
            <Image
              src={photoSrc}
              alt="Portrait"
              width={240}
              height={280}
              className="photo-img"
              priority
            />
          ) : (
            <PhotoPlaceholder label={photoPlaceholderText} />
          )}
        </div>
        <div className="tape tape-corner tape-corner-tl" aria-hidden />
        <div className="tape tape-corner tape-corner-tr" aria-hidden />
        <div className="tape tape-corner tape-corner-bl" aria-hidden />
        <div className="tape tape-corner tape-corner-br" aria-hidden />
      </div>
      <div className="mt-5 w-full text-center">
        <p className="font-hand text-xl text-stone-800">{caption}</p>
      </div>
    </div>
  );
}
