"use client";

import { useCallback, useEffect, useState } from "react";

import type { NowPlayingResult } from "@/lib/spotifyNowPlaying";

/**
 * Spotify doesn’t push “now playing” to third-party apps. Polling while the tab
 * is visible is the standard approach (stay reasonable to avoid rate limits).
 */
const POLL_MS_WHILE_VISIBLE = 8_000;

function parseNowPlayingPayload(raw: unknown): NowPlayingResult | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (o.configured === false) return { configured: false };
  if (o.configured !== true) return null;
  if (o.playing === false) return { configured: true, playing: false };
  if (o.playing === true && typeof o.title === "string" && typeof o.artist === "string") {
    let url: string | null = null;
    if (typeof o.url === "string") url = o.url;
    else if (o.url != null) return null;
    return {
      configured: true,
      playing: true,
      title: o.title,
      artist: o.artist,
      url,
    };
  }
  return null;
}

export type CurrentlyListeningFallback = {
  title: string;
  artist: string;
  url?: string;
};

type CurrentlyListeningStickyProps = {
  label: string;
  /** Copy when Spotify is connected but nothing is playing */
  idleLine: string;
  fallback: CurrentlyListeningFallback;
};

function MusicGlyph() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-emerald-950/85"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function CurrentlyListeningSticky({
  label,
  idleLine,
  fallback,
}: CurrentlyListeningStickyProps) {
  const [mounted, setMounted] = useState(false);
  const [payload, setPayload] = useState<NowPlayingResult | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/now-playing", {
        cache: "no-store",
        credentials: "same-origin",
      });
      const raw: unknown = await res.json();
      const parsed = parseNowPlayingPayload(raw);
      setPayload(parsed ?? { configured: false });
    } catch {
      setPayload({ configured: false });
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    void load();
    const onVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, POLL_MS_WHILE_VISIBLE);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(id);
    };
  }, [mounted, load]);

  const display =
    !mounted || payload === null
      ? { kind: "loading" as const }
      : !payload.configured
        ? {
            kind: "static" as const,
            title: fallback.title,
            artist: fallback.artist,
            url: fallback.url,
          }
        : !payload.playing
          ? { kind: "idle" as const, line: idleLine }
          : {
              kind: "live" as const,
              title: payload.title,
              artist: payload.artist,
              url: payload.url,
            };

  const inner =
    display.kind === "loading" ? (
      <p className="font-hand text-lg leading-snug text-stone-500">…</p>
    ) : display.kind === "idle" ? (
      <p className="font-hand text-lg leading-snug text-stone-600">{display.line}</p>
    ) : (
      <>
        {display.url ? (
          <a
            href={display.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link block min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800/40 rounded-sm"
          >
            <span className="block truncate font-hand text-lg font-semibold leading-snug text-stone-900 underline decoration-stone-400/60 underline-offset-2 transition-colors group-hover/link:decoration-stone-700">
              {display.title}
            </span>
            <span className="block truncate font-hand text-base leading-snug text-stone-700">
              {display.artist}
            </span>
          </a>
        ) : (
          <div className="min-w-0">
            <span className="block truncate font-hand text-lg font-semibold leading-snug text-stone-900">
              {display.title}
            </span>
            <span className="block truncate font-hand text-base leading-snug text-stone-700">
              {display.artist}
            </span>
          </div>
        )}
      </>
    );

  return (
    <div
      className={[
        "note-curl sticky-note-interactive sticky-note-interactive--green",
        "relative w-fit max-w-[15.5rem] shrink-0 overflow-visible rounded-[3px]",
        "border border-emerald-900/[0.08]",
        "bg-gradient-to-b from-[#f2faf5] to-[#dff5ea]",
        "px-5 py-2.5 sm:max-w-[17rem]",
      ].join(" ")}
    >
      <div className="tape tape-sticky-top tape--green" aria-hidden />
      <div className="relative z-0 pt-4">
        <div className="flex items-start gap-2.5">
          <MusicGlyph />
          <div className="min-w-0 flex-1">
            <p className="font-hand text-[0.95rem] uppercase tracking-[0.12em] text-emerald-900/75">
              {label}
            </p>
            <div className="mt-1.5">{inner}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
