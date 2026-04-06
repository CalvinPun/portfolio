/**
 * Spotify “currently playing” for a single user (refresh token flow).
 * `.env.local`: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 *
 * Optional: `SPOTIFY_IDLE_FAVORITE_TRACK_ID` — Spotify track id shown when nothing is playing
 * (default: wave to earth “love.”).
 *
 * Used by `GET /api/now-playing` — wire a client fetch to this route from About or elsewhere.
 */

export type IdleFavoriteTrack = {
  title: string;
  artist: string;
  url: string | null;
  albumImageUrl: string | null;
};

export const DEFAULT_IDLE_FAVORITE_TRACK: IdleFavoriteTrack = {
  title: "love.",
  artist: "wave to earth",
  url: "https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN",
  albumImageUrl: "/wave-to-earth-love.jpg",
};

export type NowPlayingResult =
  | { configured: false }
  | { configured: true; playing: false; idleFavorite: IdleFavoriteTrack | null }
  | {
      configured: true;
      playing: true;
      title: string;
      artist: string;
      url: string | null;
      albumImageUrl: string | null;
      /** Playback position from Spotify (ms). */
      progressMs: number;
      /** Track or episode length (ms). */
      durationMs: number;
      /** Whether audio is actively playing (false = paused). */
      isPlaying: boolean;
    };

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
};

type SpotifyCurrentlyPlaying = {
  item: SpotifyPlayingItem | null;
  progress_ms?: number;
  is_playing?: boolean;
};

type SpotifyImage = { url?: string; width?: number; height?: number };

type SpotifyPlayingItem = {
  name?: string;
  artists?: { name?: string }[];
  show?: { name?: string };
  images?: SpotifyImage[];
  album?: { images?: SpotifyImage[] };
  external_urls?: { spotify?: string };
  /** Track or episode length (ms). */
  duration_ms?: number;
};

function pickCoverImageUrl(item: SpotifyPlayingItem): string | null {
  const pool =
    item.album?.images?.length ? item.album.images : (item.images ?? []);
  const withUrl = pool.filter((i): i is SpotifyImage & { url: string } => typeof i?.url === "string");
  if (!withUrl.length) return null;
  // Prefer the largest asset (often 640×640); Spotify also returns 300px and 64px URLs.
  const sorted = [...withUrl].sort((a, b) => {
    const dw = (b.width ?? 0) - (a.width ?? 0);
    if (dw !== 0) return dw;
    return (b.height ?? 0) - (a.height ?? 0);
  });
  return sorted[0].url;
}

function isConfigured(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body,
    next: { revalidate: 0 },
  });

  const data = (await res.json()) as SpotifyTokenResponse;
  if (!res.ok || !data.access_token) {
    return null;
  }
  return data.access_token;
}

const DEFAULT_IDLE_FAVORITE_TRACK_ID = "5mtTAScDytxMMqZj14NmlN";

async function fetchIdleFavoriteTrack(accessToken: string): Promise<IdleFavoriteTrack | null> {
  const trackId =
    process.env.SPOTIFY_IDLE_FAVORITE_TRACK_ID?.trim() || DEFAULT_IDLE_FAVORITE_TRACK_ID;
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackId)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const item = (await res.json()) as SpotifyPlayingItem;
    const title = typeof item.name === "string" ? item.name : "";
    if (!title) return null;
    const fromArtists = Array.isArray(item.artists)
      ? item.artists.map((a) => a?.name).filter(Boolean).join(", ")
      : "";
    return {
      title,
      artist: fromArtists || "Spotify",
      url: item.external_urls?.spotify ?? DEFAULT_IDLE_FAVORITE_TRACK.url,
      albumImageUrl: pickCoverImageUrl(item) ?? DEFAULT_IDLE_FAVORITE_TRACK.albumImageUrl,
    };
  } catch {
    return null;
  }
}

async function idleResponse(accessToken: string | null): Promise<NowPlayingResult> {
  const idleFavorite = accessToken ? await fetchIdleFavoriteTrack(accessToken) : null;
  return {
    configured: true,
    playing: false,
    idleFavorite: idleFavorite ?? DEFAULT_IDLE_FAVORITE_TRACK,
  };
}

export async function getSpotifyNowPlaying(): Promise<NowPlayingResult> {
  if (!isConfigured()) {
    return { configured: false };
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return idleResponse(null);
  }

  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  });

  if (res.status === 204) {
    return idleResponse(accessToken);
  }

  if (!res.ok) {
    return idleResponse(accessToken);
  }

  let payload: SpotifyCurrentlyPlaying;
  try {
    payload = (await res.json()) as SpotifyCurrentlyPlaying;
  } catch {
    return idleResponse(accessToken);
  }

  const item = payload.item;
  if (!item || typeof item !== "object") {
    return idleResponse(accessToken);
  }

  const title = typeof item.name === "string" ? item.name : "";
  if (!title) {
    return idleResponse(accessToken);
  }

  const fromArtists = Array.isArray(item.artists)
    ? item.artists.map((a) => a?.name).filter(Boolean).join(", ")
    : "";
  const fromShow =
    item.show && typeof item.show.name === "string" ? item.show.name : "";
  const artist = fromArtists || fromShow || "Spotify";
  const url = item.external_urls?.spotify ?? null;
  const albumImageUrl = pickCoverImageUrl(item);

  const durationMs =
    typeof item.duration_ms === "number" && item.duration_ms > 0
      ? item.duration_ms
      : 0;
  const progressRaw = typeof payload.progress_ms === "number" ? payload.progress_ms : 0;
  const progressMs =
    durationMs > 0 ? Math.min(Math.max(0, progressRaw), durationMs) : Math.max(0, progressRaw);
  const isPlaying = payload.is_playing !== false;

  return {
    configured: true,
    playing: true,
    title,
    artist,
    url,
    albumImageUrl,
    progressMs,
    durationMs,
    isPlaying,
  };
}
