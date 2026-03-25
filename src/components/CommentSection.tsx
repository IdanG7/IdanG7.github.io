"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";

interface Comment {
  id: string;
  body: string;
  authorName: string;
  authorAvatar: string | null;
  authorGithub: string;
  createdAt: string;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function CommentSection({ slug }: { slug: string }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const userLogin = (session?.user as Record<string, unknown> | undefined)?.login as string | undefined;
  const isAdmin = userLogin === process.env.NEXT_PUBLIC_ADMIN_GITHUB;

  useEffect(() => {
    fetch(`/api/blog/${slug}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [slug]);

  const submitComment = useCallback(async () => {
    if (!body.trim() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: body.trim() }),
      });

      if (res.ok) {
        const { comment } = await res.json();
        setComments((prev) => [comment, ...prev]);
        setBody("");
      }
    } catch {
      // Silently fail
    } finally {
      setIsSubmitting(false);
    }
  }, [slug, body, isSubmitting]);

  const deleteComment = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        const res = await fetch(`/api/blog/${slug}/comments/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setComments((prev) => prev.filter((c) => c.id !== id));
        }
      } catch {
        // Silently fail
      } finally {
        setDeletingId(null);
      }
    },
    [slug]
  );

  return (
    <div className="mt-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
        <span className="font-outfit text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 dark:text-white">
          Discussion
        </span>
        <div className="flex-1 h-[1px] bg-neutral-200 dark:bg-white/[0.08]" />
        <span className="font-outfit text-xs tracking-wider text-neutral-400 dark:text-white/25 tabular-nums">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {/* Comment form or sign-in prompt */}
      {status === "loading" ? (
        <div className="h-24 rounded-xl bg-neutral-100 dark:bg-white/5 animate-pulse mb-8" />
      ) : session?.user ? (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="w-7 h-7 rounded-full"
              />
            )}
            <span className="font-outfit text-sm font-medium text-neutral-700 dark:text-white/70">
              {session.user.name}
            </span>
          </div>
          <div className="relative">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts..."
              maxLength={2000}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-neutral-800 dark:text-white/80 font-outfit text-sm placeholder:text-neutral-400 dark:placeholder:text-white/20 resize-none focus:outline-none focus:border-green-500/40 dark:focus:border-green-500/30 transition-colors"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="font-outfit text-[11px] text-neutral-400 dark:text-white/20">
                {body.length}/2000
              </span>
              <button
                onClick={submitComment}
                disabled={!body.trim() || isSubmitting}
                className="px-4 py-1.5 rounded-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:hover:bg-green-600 text-white font-outfit text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="group flex items-center gap-3 w-full px-5 py-4 mb-8 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] hover:border-green-500/30 dark:hover:border-green-500/20 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            className="text-neutral-600 dark:text-white/50 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
          </svg>
          <span className="font-outfit text-sm text-neutral-500 dark:text-white/40 group-hover:text-neutral-700 dark:group-hover:text-white/60 transition-colors">
            Sign in with GitHub to comment
          </span>
        </button>
      )}

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-neutral-100 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-0">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="group py-5 border-b border-neutral-100 dark:border-white/[0.05] last:border-b-0"
            >
              <div className="flex items-start gap-3">
                {comment.authorAvatar ? (
                  <img
                    src={comment.authorAvatar}
                    alt=""
                    className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-white/10 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-outfit text-sm font-medium text-neutral-800 dark:text-white/80">
                      {comment.authorName}
                    </span>
                    <span className="font-outfit text-[11px] text-neutral-400 dark:text-white/25">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="font-outfit text-sm text-neutral-600 dark:text-white/55 leading-relaxed whitespace-pre-wrap">
                    {comment.body}
                  </p>
                </div>
                {/* Delete button for admin or comment author */}
                {(isAdmin || comment.authorGithub === userLogin) && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    disabled={deletingId === comment.id}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1.5 rounded-md text-neutral-400 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete comment"
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
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-outfit text-sm text-neutral-400 dark:text-white/25 text-center py-6">
          No comments yet. Be the first to share your thoughts.
        </p>
      )}
    </div>
  );
}
