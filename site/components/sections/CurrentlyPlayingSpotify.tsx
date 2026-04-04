"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  ABOUT_NOTEBOOK_LINE_CQW,
  ABOUT_STICKY_ART_CQW,
  ABOUT_STICKY_CAPTION_FONT_CQW,
  ABOUT_STICKY_LABEL_FONT_CQW,
  ABOUT_STICKY_PRIMARY_FONT_CQW,
  ABOUT_STICKY_SECONDARY_FONT_CQW,
} from "@/lib/aboutNotebookTypeScale";
import type { NowPlayingResult } from "@/lib/spotifyNowPlaying";

const stickyLineCompact = ABOUT_NOTEBOOK_LINE_CQW * 0.92;

const stickyLabelStyle = {
  fontSize: `${ABOUT_STICKY_LABEL_FONT_CQW}cqw`,
  lineHeight: `${stickyLineCompact}cqw`,
} as const;

const stickyPrimaryStyle = {
  fontSize: `${ABOUT_STICKY_PRIMARY_FONT_CQW}cqw`,
  lineHeight: `${ABOUT_NOTEBOOK_LINE_CQW * 0.95}cqw`,
} as const;

const stickySecondaryStyle = {
  fontSize: `${ABOUT_STICKY_SECONDARY_FONT_CQW}cqw`,
  lineHeight: `${stickyLineCompact}cqw`,
} as const;

const stickyCaptionStyle = {
  fontSize: `${ABOUT_STICKY_CAPTION_FONT_CQW}cqw`,
  lineHeight: `${stickyLineCompact}cqw`,
} as const;

const stickyArtBoxStyle = {
  width: `${ABOUT_STICKY_ART_CQW}cqw`,
  height: `${ABOUT_STICKY_ART_CQW}cqw`,
  minWidth: "2.25rem",
  minHeight: "2.25rem",
} as const;

const stickyProgressBarStyle = {
  height: `clamp(3px, ${ABOUT_NOTEBOOK_LINE_CQW * 0.14}cqw, 5px)`,
} as const;

function formatTrackTime(ms: number) {
  const s = Math.floor(Math.max(0, ms) / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const POLL_MS = 4000;
const TICK_MS = 250;

/** Fallback when the API doesn’t return `idleFavorite` (e.g. no token). Same track as default on the server. */
const IDLE_FAVORITE_FALLBACK = {
  header: "current favorite song",
  title: "love.",
  artist: "wave to earth",
  spotifyUrl: "https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN",
} as const;

type PlayingPayload = Extract<NowPlayingResult, { configured: true; playing: true }>;

type Props = {
  /** Compact layout for the left pocket inside the manila folder (left of the crease). */
  variant?: "default" | "embedded";
};

export function CurrentlyPlayingSpotify({ variant = "default" }: Props) {
  const embedded = variant === "embedded";
  const [data, setData] = useState<NowPlayingResult | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/now-playing", { cache: "no-store" });
      const json = (await res.json()) as NowPlayingResult;
      setData(json);
      setFetchedAt(Date.now());
    } catch {
      setData({ configured: false });
      setFetchedAt(null);
    }
  }, []);

  useEffect(() => {
    const initialId = window.setTimeout(() => void load(), 0);
    const id = window.setInterval(() => void load(), POLL_MS);
    return () => {
      window.clearTimeout(initialId);
      window.clearInterval(id);
    };
  }, [load]);

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const displayProgress = useMemo(() => {
    if (!data || data.configured !== true || data.playing !== true || fetchedAt === null) {
      return 0;
    }
    const p = data as PlayingPayload;
    if (!p.isPlaying || p.durationMs <= 0) return p.progressMs;
    const elapsed = nowMs - fetchedAt;
    return Math.min(p.progressMs + elapsed, p.durationMs);
  }, [data, fetchedAt, nowMs]);

  const shell = embedded
    ? ""
    : "w-full shrink-0 rounded-xl border border-zinc-600/90 bg-[#1e1f22] p-3 text-zinc-100 shadow-md md:w-[260px]";

  if (data === null) {
    if (embedded) {
      return (
        <div className="w-full min-w-0" aria-hidden>
          <EmbeddedPostItFrame>
            <div className="h-24 animate-pulse rounded-sm bg-emerald-900/10" />
          </EmbeddedPostItFrame>
        </div>
      );
    }
    return (
      <div className={shell} aria-hidden>
        <div className="h-[88px] animate-pulse rounded-lg bg-stone-300/60" />
      </div>
    );
  }

  if (data.configured === false) {
    return null;
  }

  if (!data.playing) {
    if (embedded) {
      const fav = data.idleFavorite;
      const idleTitle = fav?.title ?? IDLE_FAVORITE_FALLBACK.title;
      const idleArtist = fav?.artist ?? IDLE_FAVORITE_FALLBACK.artist;
      const idleHref = fav?.url ?? IDLE_FAVORITE_FALLBACK.spotifyUrl;
      const idleCover = fav?.albumImageUrl ?? null;
      const idleAria = `Open ${idleTitle} by ${idleArtist} on Spotify`;
      const idleBody = (
        <EmbeddedPostItFrame aria-label="Current favorite song">
          <p className="lowercase text-stone-800" style={stickyLabelStyle}>
            {IDLE_FAVORITE_FALLBACK.header}
          </p>
          <div className="mt-[0.35em] flex gap-[0.35em]">
            <div
              className="relative shrink-0 overflow-hidden rounded-sm border-2 border-white bg-[#e8e4dc] shadow-sm"
              style={stickyArtBoxStyle}
            >
              {idleCover ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote Spotify CDN hostnames vary
                <img src={idleCover} alt="" className="h-full w-full object-cover" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-stone-500"
                  style={{ fontSize: `${ABOUT_STICKY_PRIMARY_FONT_CQW * 0.95}cqw` }}
                >
                  ♪
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 pt-px">
              <p className="truncate font-semibold text-stone-900" style={stickyPrimaryStyle}>
                {idleTitle}
              </p>
              <p className="mt-0.5 truncate text-stone-700" style={stickySecondaryStyle}>
                {idleArtist}
              </p>
            </div>
          </div>
        </EmbeddedPostItFrame>
      );
      return (
        <a
          href={idleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full min-w-0 outline-none transition-[opacity,transform] hover:opacity-95 focus-visible:ring-2 focus-visible:ring-emerald-700/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf0e6]"
          aria-label={idleAria}
        >
          {idleBody}
        </a>
      );
    }
    return (
      <aside className={shell} aria-label="Spotify">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-tight text-zinc-100">Listening to Spotify</span>
          <SpotifyGlyph className="h-4 w-4 shrink-0 text-[#1ed760]" aria-hidden />
        </div>
        <p className="text-xs text-zinc-400">Nothing playing right now</p>
      </aside>
    );
  }

  const { title, artist, url, albumImageUrl, durationMs } = data;
  const pct = durationMs > 0 ? Math.min(100, (displayProgress / durationMs) * 100) : 0;

  if (embedded) {
    const body = (
      <EmbeddedPostItFrame>
        <p className="lowercase text-stone-800" style={stickyLabelStyle}>
          currently listening to...
        </p>
        <div className="mt-[0.35em] flex gap-[0.35em]">
          <div
            className="relative shrink-0 overflow-hidden rounded-sm border-2 border-white bg-[#e8e4dc] shadow-sm"
            style={stickyArtBoxStyle}
          >
            {albumImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- remote Spotify CDN hostnames vary
              <img src={albumImageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-stone-500"
                style={{ fontSize: `${ABOUT_STICKY_PRIMARY_FONT_CQW * 0.95}cqw` }}
              >
                ♪
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 pt-px">
            <p className="truncate font-semibold text-stone-900" style={stickyPrimaryStyle}>
              {title}
            </p>
            <p className="mt-0.5 truncate text-stone-700" style={stickySecondaryStyle}>
              {artist}
            </p>
          </div>
        </div>
        <div className="mt-[0.45em]">
          <div
            className="w-full overflow-hidden rounded-full bg-emerald-900/15"
            style={stickyProgressBarStyle}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 ring-1 ring-inset ring-white/30"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div
            className="mt-[0.25em] flex justify-between tabular-nums text-stone-600"
            style={stickyCaptionStyle}
          >
            <span>{formatTrackTime(displayProgress)}</span>
            <span>{formatTrackTime(durationMs)}</span>
          </div>
        </div>
      </EmbeddedPostItFrame>
    );

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Currently playing on Spotify — open in Spotify"
          className="block w-full min-w-0 outline-none transition-[opacity,transform] hover:opacity-95 focus-visible:ring-2 focus-visible:ring-emerald-700/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf0e6]"
        >
          {body}
        </a>
      );
    }
    return (
      <div
        className="w-full min-w-0"
        role="region"
        aria-label="Currently playing on Spotify"
      >
        {body}
      </div>
    );
  }

  const inner = (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold tracking-tight text-zinc-100">Listening to Spotify</span>
        <SpotifyGlyph className="h-4 w-4 shrink-0 text-[#1ed760]" aria-hidden />
      </div>
      <div className="flex gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-zinc-800">
          {albumImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Spotify CDN hostnames vary
            <img src={albumImageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-zinc-500">♪</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-white">{title}</p>
          <p className="mt-0.5 truncate text-xs text-zinc-400">{artist}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] tabular-nums text-zinc-400">
        <span className="w-9 shrink-0">{formatTrackTime(displayProgress)}</span>
        <div className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-zinc-600">
          <div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: `${pct}%` }} />
        </div>
        <span className="w-9 shrink-0 text-right">{formatTrackTime(durationMs)}</span>
      </div>
    </>
  );

  return (
    <aside className={shell} aria-label="Currently playing on Spotify">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#1ed760] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1f22]"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </aside>
  );
}

/** Green scrapbook post-it: tape, curl, slight tilt — uses site `font-hand` (Caveat). */
function EmbeddedPostItFrame({
  children,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: {
  children: ReactNode;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <div
      className="relative z-0 w-full min-w-0 overflow-visible font-hand"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <div className="relative -rotate-[3deg]">
        <div
          className="tape tape-sticky-top pointer-events-none absolute left-1/2 top-0 z-10 scale-[0.72] -translate-y-px"
          aria-hidden
        />
        <div
          className={[
            "note-curl relative overflow-hidden rounded-sm border border-emerald-800/20",
            "bg-gradient-to-br from-[#e6faee] via-[#daf5e4] to-[#c8efd6]",
            "px-2.5 pb-2.5 pt-5 shadow-[2px_3px_0_rgba(45,80,55,0.12),0_8px_20px_rgba(40,70,50,0.08)]",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SpotifyGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
