import { NextResponse } from "next/server";

type GithubPushPayload = {
  commits?: Array<{
    message?: string;
  }>;
  head?: string;
};

type GithubEvent = {
  type: string;
  created_at: string;
  public?: boolean;
  repo?: {
    name?: string;
  };
  payload?: GithubPushPayload;
};

const FALLBACK_RESPONSE = {
  time: "Active",
  message: "Optimizing firmware and CI/CD automation...",
  repo: "AeroForge",
  isPrivate: false,
};

type GithubFetchError = {
  status: number;
  message: string;
  rateLimitRemaining?: number | null;
  rateLimitReset?: number | null;
};

const formatRelativeTime = (timestamp: string) => {
  const eventTime = new Date(timestamp).getTime();
  const now = Date.now();
  if (Number.isNaN(eventTime)) {
    return "Active";
  }

  const diffSeconds = Math.floor((now - eventTime) / 1000);
  if (diffSeconds < 60) return "Just now";
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
  return `${Math.floor(diffSeconds / 86400)}d ago`;
};

const parseBooleanFlag = (value?: string | null) => {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "on";
};

const fetchCommitMessage = async (
  repoFullName: string,
  sha: string,
  token?: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoFullName}/commits/${sha}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "NewPortfolio",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 60 },
      }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.commit?.message ?? null;
  } catch {
    return null;
  }
};

const getLatestPush = async (): Promise<
  | { latest: typeof FALLBACK_RESPONSE; error: null }
  | { latest: null; error: GithubFetchError }
> => {
  const username = process.env.GITHUB_USERNAME ?? "IdanG7";
  const token = process.env.GITHUB_TOKEN;
  const showPrivateDetails = parseBooleanFlag(process.env.GITHUB_SHOW_PRIVATE);
  const endpoint = token
    ? `https://api.github.com/users/${username}/events?per_page=100`
    : `https://api.github.com/users/${username}/events/public?per_page=100`;

  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "NewPortfolio",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const remainingHeader = response.headers.get("x-ratelimit-remaining");
    const resetHeader = response.headers.get("x-ratelimit-reset");
    const rateLimitRemaining =
      remainingHeader === null ? null : Number.parseInt(remainingHeader, 10);
    const rateLimitReset = resetHeader === null ? null : Number.parseInt(resetHeader, 10);
    return {
      latest: null,
      error: {
        status: response.status,
        message: "request_failed",
        rateLimitRemaining: Number.isNaN(rateLimitRemaining) ? null : rateLimitRemaining,
        rateLimitReset: Number.isNaN(rateLimitReset) ? null : rateLimitReset,
      },
    };
  }

  const events = (await response.json()) as GithubEvent[];
  const latestPush = events
    .filter((event) => event.type === "PushEvent")
    .sort((a, b) => {
      const aTime = Number.isNaN(Date.parse(a.created_at)) ? 0 : Date.parse(a.created_at);
      const bTime = Number.isNaN(Date.parse(b.created_at)) ? 0 : Date.parse(b.created_at);
      return bTime - aTime;
    })[0];
  if (!latestPush) {
    return {
      latest: null,
      error: {
        status: 200,
        message: "no_push_event",
      },
    };
  }

  const isPrivate = latestPush.public === false || Boolean(token && latestPush.public !== true);
  const repoFullName = latestPush.repo?.name ?? "";
  const repoName = repoFullName.split("/").pop() ?? "Private work";
  const commits = latestPush.payload?.commits ?? [];
  let commitMessage = commits[commits.length - 1]?.message;

  // If no commit message in payload, fetch it using the commit SHA
  if (!commitMessage && latestPush.payload?.head && repoFullName) {
    commitMessage = await fetchCommitMessage(repoFullName, latestPush.payload.head, token) ?? undefined;
  }
  commitMessage = commitMessage ?? "Pushed updates";

  const safeRepoName = isPrivate && !showPrivateDetails ? "Private work" : repoName;
  const safeMessage = isPrivate && !showPrivateDetails ? "Private updates" : commitMessage;

  return {
    latest: {
      time: formatRelativeTime(latestPush.created_at),
      message: safeMessage,
      repo: safeRepoName,
      isPrivate,
    },
    error: null,
  };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const debug = searchParams.get("debug") === "1";
    const result = await getLatestPush();
    if (result.latest) {
      return NextResponse.json(result.latest);
    }
    if (debug) {
      return NextResponse.json({
        ok: false,
        reason: result.error.message,
        status: result.error.status,
        rateLimitRemaining: result.error.rateLimitRemaining ?? undefined,
        rateLimitReset: result.error.rateLimitReset ?? undefined,
      });
    }
    return NextResponse.json(FALLBACK_RESPONSE);
  } catch {
    return NextResponse.json(FALLBACK_RESPONSE);
  }
}
