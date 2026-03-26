"use client";

import { useState, useCallback } from "react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled or share failed silently
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied
    }
  }, [title, url]);

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-colors font-outfit text-sm text-neutral-500 dark:text-neutral-400"
      >
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
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        Share
      </button>

      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-outfit text-xs whitespace-nowrap pointer-events-none animate-fade-in">
          Copied!
        </span>
      )}
    </div>
  );
}
