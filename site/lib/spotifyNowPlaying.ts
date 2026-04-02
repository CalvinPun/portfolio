/**
 * Spotify “currently playing” for a single user (refresh token flow).
 * `.env.local`: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * (OAuth once via Spotify dashboard redirect URI + any auth flow you use).
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
    };

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
};

type SpotifyCurrentlyPlaying = {
  item: SpotifyPlayingItem | null;
};

type SpotifyPlayingItem = {
  name?: string;
  artists?: { name?: string }[];
  show?: { name?: string };
  external_urls?: { spotify?: string };
};

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

  return {
    configured: true,
    playing: true,
    title,
    artist,
    url,
  };
}
