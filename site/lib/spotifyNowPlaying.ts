/**
 * Spotify “currently playing” for a single user (refresh token flow).
 * `.env.local`: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 *
 * Used by `GET /api/now-playing` — wire a client fetch to this route from About or elsewhere.
 */

export type NowPlayingResult =
  | { configured: false }
  | { configured: true; playing: false }
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
  const sorted = [...withUrl].sort((a, b) => (a.width ?? 9999) - (b.width ?? 9999));
  const preferred = sorted.find((i) => (i.width ?? 0) >= 48);
  return (preferred ?? sorted[sorted.length - 1]).url;
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

export async function getSpotifyNowPlaying(): Promise<NowPlayingResult> {
  if (!isConfigured()) {
    return { configured: false };
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { configured: true, playing: false };
  }

  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  });

  if (res.status === 204) {
    return { configured: true, playing: false };
  }

  if (!res.ok) {
    return { configured: true, playing: false };
  }

  let payload: SpotifyCurrentlyPlaying;
  try {
    payload = (await res.json()) as SpotifyCurrentlyPlaying;
  } catch {
    return { configured: true, playing: false };
  }

  const item = payload.item;
  if (!item || typeof item !== "object") {
    return { configured: true, playing: false };
  }

  const title = typeof item.name === "string" ? item.name : "";
  if (!title) {
    return { configured: true, playing: false };
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
