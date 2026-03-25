"use client";

import { useState, useEffect, useCallback } from "react";

interface ReactionData {
  likes: number;
  userVote: "LIKE" | "DISLIKE" | null;
}

export default function ReactionBar({ slug }: { slug: string }) {
  const [data, setData] = useState<ReactionData>({ likes: 0, userVote: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${slug}/reactions`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [slug]);

  const vote = useCallback(
    async (type: "LIKE" | "DISLIKE") => {
      if (isPending) return;
      setIsPending(true);

      // Optimistic update
      const prev = { ...data };
      setData((d) => {
        const wasVote = d.userVote;
        let likes = d.likes;

        if (wasVote === type) {
          // Toggle off
          if (type === "LIKE") likes--;
          return { likes, userVote: null };
        } else {
          // Switch or new vote
          if (wasVote === "LIKE") likes--;
          if (type === "LIKE") likes++;
          return { likes, userVote: type };
        }
      });

      try {
        const res = await fetch(`/api/blog/${slug}/reactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        });
        const result = await res.json();
        setData(result);
      } catch {
        setData(prev); // Revert on error
      } finally {
        setIsPending(false);
      }
    },
    [slug, data, isPending]
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 py-6">
        <div className="w-20 h-9 rounded-full bg-neutral-100 dark:bg-white/5 animate-pulse" />
        <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-white/5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-6">
      {/* Like button with count */}
      <button
        onClick={() => vote("LIKE")}
        disabled={isPending}
        className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-outfit font-medium transition-all duration-200
          ${
            data.userVote === "LIKE"
              ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
              : "bg-transparent border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-white/40 hover:border-green-500/30 hover:text-green-600 dark:hover:text-green-400"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={data.userVote === "LIKE" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:scale-110"
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
        <span className="tabular-nums">{data.likes}</span>
      </button>

      {/* Dislike button — no count */}
      <button
        onClick={() => vote("DISLIKE")}
        disabled={isPending}
        className={`group inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200
          ${
            data.userVote === "DISLIKE"
              ? "bg-red-500/10 border-red-500/30 text-red-500 dark:text-red-400"
              : "bg-transparent border-neutral-200 dark:border-white/10 text-neutral-400 dark:text-white/30 hover:border-red-500/30 hover:text-red-500 dark:hover:text-red-400"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={data.userVote === "DISLIKE" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:scale-110 rotate-180"
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      </button>
    </div>
  );
}
