import { NextResponse } from "next/server";

type GithubPushPayload = {
  commits?: Array<{
    message?: string;
  }>;
};

type GithubEvent = {
  type: string;
  created_at: string;
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

const getLatestPush = async () => {
  const username = process.env.GITHUB_USERNAME ?? "IdanG7";
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return null;
  }

  const events = (await response.json()) as GithubEvent[];
  const latestPush = events.find((event) => event.type === "PushEvent");
  if (!latestPush) {
    return null;
  }

  const repoName = latestPush.repo?.name?.split("/").pop() ?? "Private work";
  const commitMessage = latestPush.payload?.commits?.[0]?.message ?? "Pushed updates";

  return {
    time: formatRelativeTime(latestPush.created_at),
    message: commitMessage,
    repo: repoName,
    isPrivate: false,
  };
};

export async function GET() {
  try {
    const latest = await getLatestPush();
    return NextResponse.json(latest ?? FALLBACK_RESPONSE);
  } catch {
    return NextResponse.json(FALLBACK_RESPONSE);
  }
}
