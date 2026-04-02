import { NextResponse } from "next/server";

import { getSpotifyNowPlaying } from "@/lib/spotifyNowPlaying";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getSpotifyNowPlaying();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ configured: false } as const, { status: 200 });
  }
}
