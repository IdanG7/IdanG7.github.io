"use client";

import { useState, useEffect, useCallback } from "react";
import ShareButton from "@/components/ShareButton";

interface BlogMetricsBarProps {
  slug: string;
  title: string;
  date: string;
  commentCount: number;
}

interface ReactionData {
  likes: number;
  claps: number;
  userLiked: boolean;
  userClapped: boolean;
}

export default function BlogMetricsBar({
  slug,
  title,
  date,
  commentCount,
}: BlogMetricsBarProps) {
  const [reactions, setReactions] = useState<ReactionData>({
    likes: 0,
    claps: 0,
    userLiked: false,
    userClapped: false,
  });
  const [views, setViews] = useState(0);
  const [liveCommentCount, setLiveCommentCount] = useState(commentCount);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reactionsRes, viewsRes, commentsRes] = await Promise.all([
          fetch(`/api/blog/${slug}/reactions`),
          fetch(`/api/blog/${slug}/views`),
          fetch(`/api/blog/${slug}/comments`),
        ]);

        const reactionsData = await reactionsRes.json();
        const viewsData = await viewsRes.json();
        const commentsData = await commentsRes.json();

        setReactions(reactionsData);
        setViews(viewsData.views);
        setLiveCommentCount(commentsData.comments?.length ?? commentCount);

        // Increment view count
        const postRes = await fetch(`/api/blog/${slug}/views`, {
          method: "POST",
        });
        const postData = await postRes.json();
        setViews(postData.views);
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, commentCount]);

  const toggleReaction = useCallback(
    async (type: "LIKE" | "CLAP") => {
      if (isPending) return;
      setIsPending(true);

      const prev = { ...reactions };
      setReactions((r) => {
        if (type === "LIKE") {
          return {
            ...r,
            likes: r.userLiked ? r.likes - 1 : r.likes + 1,
            userLiked: !r.userLiked,
          };
        } else {
          return {
            ...r,
            claps: r.userClapped ? r.claps - 1 : r.claps + 1,
            userClapped: !r.userClapped,
          };
        }
      });

      try {
        const res = await fetch(`/api/blog/${slug}/reactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        });
        const result = await res.json();
        setReactions(result);
      } catch {
        setReactions(prev);
      } finally {
        setIsPending(false);
      }
    },
    [slug, reactions, isPending]
  );

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-between py-5 border-t border-b border-neutral-200 dark:border-white/[0.08]">
        <div className="flex items-center gap-4">
          <div className="w-32 h-6 rounded bg-neutral-100 dark:bg-white/5 animate-pulse" />
          <div className="w-20 h-6 rounded bg-neutral-100 dark:bg-white/5 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-16 h-8 rounded-full bg-neutral-100 dark:bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const pillBase =
    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[13px] font-outfit font-medium transition-all duration-200";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-t border-b border-neutral-200 dark:border-white/[0.08]">
      {/* Left: date + views */}
      <div className="flex items-center gap-4 font-outfit text-[13px] text-neutral-500 dark:text-neutral-400">
        <span className="inline-flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formattedDate}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="tabular-nums">{views.toLocaleString()}</span>
          <span className="text-neutral-400 dark:text-neutral-500">VIEWS</span>
        </span>
      </div>

      {/* Right: reactions + comments + share */}
      <div className="flex items-center gap-2">
        {/* Heart */}
        <button
          onClick={() => toggleReaction("LIKE")}
          disabled={isPending}
          className={`${pillBase} ${
            reactions.userLiked
              ? "text-red-500 border-red-500/30 bg-red-500/10"
              : "border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:border-red-500/30 hover:text-red-500 dark:hover:text-red-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={reactions.userLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 hover:scale-110">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="tabular-nums">{reactions.likes}</span>
        </button>

        {/* Clap */}
        <button
          onClick={() => toggleReaction("CLAP")}
          disabled={isPending}
          className={`${pillBase} ${
            reactions.userClapped
              ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
              : "border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:border-amber-500/30 hover:text-amber-500 dark:hover:text-amber-400"
          }`}
        >
          <span className="text-base leading-none">
            {reactions.userClapped ? "\uD83D\uDC4F" : "\uD83D\uDC4F"}
          </span>
          <span className="tabular-nums">{reactions.claps}</span>
        </button>

        {/* Comments count */}
        <a
          href="#discussion"
          className={`${pillBase} border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-white/20`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
          <span className="tabular-nums">{liveCommentCount}</span>
        </a>

        {/* Share */}
        <ShareButton
          title={title}
          url={typeof window !== "undefined" ? window.location.href : ""}
        />
      </div>
    </div>
  );
}
