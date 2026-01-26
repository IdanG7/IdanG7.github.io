import { NextResponse } from "next/server";

type SpotifyTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  error?: string;
  error_description?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code parameter." }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI ?? "http://127.0.0.1:3000/api/spotify/callback";

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET." },
      { status: 500 }
    );
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as SpotifyTokenResponse;

  if (!response.ok) {
    return NextResponse.json(
      {
        error: payload.error ?? "token_exchange_failed",
        message: payload.error_description ?? "Failed to exchange code.",
      },
      { status: response.status }
    );
  }

  return NextResponse.json({
    refresh_token: payload.refresh_token ?? null,
    access_token: payload.access_token ?? null,
  });
}
