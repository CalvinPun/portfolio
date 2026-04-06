"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type SocialLinksProps = {
  github: string;
  linkedin: string;
  instagram: string;
  spotify?: string;
  youtube?: string;
  email: string;
};

const ICON_WRAP_CLASS =
  "text-stone-600 transition-colors hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 rounded-sm";

function IconHoverLabel({ children }: { children: string }) {
  return (
    <span
      className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 whitespace-nowrap font-hand text-sm text-stone-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[0.95rem]"
      aria-hidden
    >
      {children}
    </span>
  );
}

export function SocialLinks({ github, linkedin, instagram, spotify, youtube, email }: SocialLinksProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked (non-HTTPS, permissions)
    }
  }, [email]);

  return (
    <nav className="mt-10 flex flex-wrap items-start gap-x-8 gap-y-9 pb-1" aria-label="Social and contact links">
      <a
        href={github}
        className={`group relative ${ICON_WRAP_CLASS}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
      >
        <span className="relative block h-9 w-9 shrink-0">
          <Image
            src="/github.svg"
            alt=""
            fill
            className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
            aria-hidden
          />
          <svg
            className="relative h-9 w-9 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </span>
        <IconHoverLabel>github</IconHoverLabel>
      </a>
      <a
        href={linkedin}
        className={`group relative ${ICON_WRAP_CLASS}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
      >
        <span className="relative block h-9 w-9 shrink-0">
          <Image
            src="/linkedin.svg"
            alt=""
            fill
            className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
            aria-hidden
          />
          <svg
            className="relative h-9 w-9 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </span>
        <IconHoverLabel>linkedin</IconHoverLabel>
      </a>
      <a
        href={instagram}
        className={`group relative ${ICON_WRAP_CLASS}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram @calvin_pun"
      >
        <span className="relative block h-9 w-9 shrink-0">
          <Image
            src="/instagram.svg"
            alt=""
            fill
            className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
            aria-hidden
          />
          <svg
            className="relative h-9 w-9 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </span>
        <IconHoverLabel>instagram</IconHoverLabel>
      </a>
      {spotify ? (
        <a
          href={spotify}
          className={`group relative ${ICON_WRAP_CLASS}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify profile"
        >
          <span className="relative block h-9 w-9 shrink-0">
            <Image
              src="/spotify.svg"
              alt=""
              fill
              className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
              aria-hidden
            />
            <svg
              className="relative h-9 w-9 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm5.504 17.34a.75.75 0 0 1-1.032.247c-2.826-1.728-6.382-2.12-10.569-1.166a.75.75 0 0 1-.333-1.462c4.58-1.045 8.51-.6 11.684 1.34a.75.75 0 0 1 .25 1.04zm1.474-3.281a.938.938 0 0 1-1.29.31c-3.235-1.988-8.166-2.565-11.992-1.402a.937.937 0 1 1-.546-1.794c4.374-1.33 9.816-.69 13.519 1.585a.938.938 0 0 1 .309 1.301zm.126-3.418c-3.88-2.304-10.284-2.517-13.988-1.41a1.125 1.125 0 1 1-.644-2.156c4.25-1.27 11.318-1.024 15.782 1.627a1.125 1.125 0 1 1-1.15 1.939z" />
            </svg>
          </span>
          <IconHoverLabel>spotify</IconHoverLabel>
        </a>
      ) : null}
      {youtube ? (
        <a
          href={youtube}
          className={`group relative ${ICON_WRAP_CLASS}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube channel @corrotic"
        >
          <span className="relative block h-9 w-9 shrink-0">
            <Image
              src="/youtube.svg"
              alt=""
              fill
              className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
              aria-hidden
            />
            <svg
              className="relative h-9 w-9 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </span>
          <IconHoverLabel>youtube</IconHoverLabel>
        </a>
      ) : null}
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="group relative cursor-pointer border-0 bg-transparent p-0 text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700 rounded-sm"
          onClick={() => void copyEmail()}
          aria-label={`Copy ${email} to clipboard`}
        >
          <span className="relative block h-9 w-9 shrink-0">
            <Image
              src="/mail.svg"
              alt=""
              fill
              className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-focus-visible:opacity-0"
              aria-hidden
            />
            <svg
              className="relative h-9 w-9 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <IconHoverLabel>email</IconHoverLabel>
        </button>
        <span
          className="font-hand text-xl text-stone-600"
          aria-live="polite"
          aria-atomic="true"
        >
          {copied ? "copied!" : ""}
        </span>
      </div>
    </nav>
  );
}
