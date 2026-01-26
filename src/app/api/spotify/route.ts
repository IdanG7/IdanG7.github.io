import { NextResponse } from "next/server";

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyAlbum = {
  name: string;
  images: Array<{ url: string }>;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls?: {
    spotify?: string;
  };
};

type CurrentlyPlayingResponse = {
  is_playing: boolean;
  item: SpotifyTrack | null;
};

type RecentlyPlayedResponse = {
  items: Array<{
    track: SpotifyTrack;
  }>;
};

const FALLBACK_RESPONSE = {
  isPlaying: false,
  title: "In My Years",
  artist: "Men I Trust",
  album: "Equus Caballus",
  albumArt: "https://i.scdn.co/image/ab67616d00001e02dcfa162250c7d0feed61d638",
  url: "https://open.spotify.com/track/01V9eIxh3ctGIuRxcS7Ppg",
};

const getAccessToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as SpotifyTokenResponse;
  if (!response.ok) {
    return null;
  }

  return payload.access_token ?? null;
};

const toNowPlayingPayload = (track: SpotifyTrack, isPlaying: boolean) => ({
  isPlaying,
  title: track.name,
  artist: track.artists.map((artist) => artist.name).join(", "),
  album: track.album.name,
  albumArt: track.album.images[0]?.url ?? FALLBACK_RESPONSE.albumArt,
  url: track.external_urls?.spotify ?? FALLBACK_RESPONSE.url,
});

const getCurrentlyPlaying = async (token: string) => {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 204) {
    return { payload: null, status: 204 };
  }

  if (!response.ok) {
    return { payload: null, status: response.status };
  }

  const payload = (await response.json()) as CurrentlyPlayingResponse;
  if (!payload.item) {
    return { payload: null, status: 200 };
  }

  return {
    payload: toNowPlayingPayload(payload.item, payload.is_playing),
    status: 200,
  };
};

const getRecentlyPlayed = async (token: string) => {
  const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { payload: null, status: response.status };
  }

  const payload = (await response.json()) as RecentlyPlayedResponse;
  const track = payload.items[0]?.track;
  if (!track) {
    return { payload: null, status: 200 };
  }

  return { payload: toNowPlayingPayload(track, false), status: 200 };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const debug = searchParams.get("debug") === "1";
    const token = await getAccessToken();
    if (!token) {
      if (debug) {
        return NextResponse.json({
          ok: false,
          reason: "missing_token",
        });
      }
      return NextResponse.json(FALLBACK_RESPONSE);
    }

    const nowPlaying = await getCurrentlyPlaying(token);
    if (nowPlaying.payload) {
      return NextResponse.json(nowPlaying.payload);
    }

    const recentlyPlayed = await getRecentlyPlayed(token);
    if (recentlyPlayed.payload) {
      return NextResponse.json(recentlyPlayed.payload);
    }

    if (debug) {
      return NextResponse.json({
        ok: false,
        reason: "no_playback",
        currentlyPlayingStatus: nowPlaying.status,
        recentlyPlayedStatus: recentlyPlayed.status,
      });
    }

    return NextResponse.json(FALLBACK_RESPONSE);
  } catch {
    return NextResponse.json(FALLBACK_RESPONSE);
  }
}
