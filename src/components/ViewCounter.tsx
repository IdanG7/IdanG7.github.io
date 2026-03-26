"use client";

import { useState, useEffect } from "react";

export default function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const track = async () => {
      try {
        const getRes = await fetch(`/api/blog/${slug}/views`);
        const getData = await getRes.json();
        setCount(getData.views);

        const postRes = await fetch(`/api/blog/${slug}/views`, {
          method: "POST",
        });
        const postData = await postRes.json();
        setCount(postData.views);
      } catch {
        // Silently fail
      }
    };

    track();
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1.5 font-outfit text-sm text-neutral-500 dark:text-neutral-400">
      {/* Eye icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      {count === null ? (
        <span className="inline-block w-8 h-4 rounded bg-neutral-100 dark:bg-white/5 animate-pulse" />
      ) : (
        <span className="tabular-nums">{count}</span>
      )}

      <span>views</span>
    </span>
  );
}
