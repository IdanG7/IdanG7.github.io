"use client";

import TransitionLink from "@/components/TransitionLink";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

// Map tag names to color classes
const tagColors: Record<string, string> = {
  AI: "text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
  Career: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Junior Dev": "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  Opinion: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  Firmware: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  "C++": "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  Infrastructure: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Engineering: "text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
  Systems: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  Philosophy: "text-neutral-500 dark:text-neutral-400 bg-neutral-500/10 border-neutral-500/20",
};

const defaultTagColor = "text-neutral-500 dark:text-neutral-400 bg-neutral-500/10 border-neutral-500/20";

function ArticleNumber({ index }: { index: number }) {
  return (
    <span className="font-outfit text-[11px] font-medium tracking-[0.2em] text-neutral-300 dark:text-white/15 uppercase tabular-nums select-none">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

export function FeaturedPostCard({ post, index }: { post: BlogPost; index: number }) {
  const primaryTag = post.tags[0];
  const tagColor = tagColors[primaryTag] ?? defaultTagColor;

  return (
    <div className="blog-card-wrapper">
      <TransitionLink
        href={`/blog/${post.slug}`}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-3xl"
      >
        <article className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0A0A] transition-all duration-500 group-hover:border-neutral-300 dark:group-hover:border-white/[0.15] group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_8px_40px_rgba(255,255,255,0.03)]">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-300 dark:via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col md:flex-row">
            {/* Left: Large typographic area */}
            <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ArticleNumber index={index} />
                  <div className="h-[1px] w-6 bg-neutral-200 dark:bg-white/10" />
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "text-[11px] font-outfit font-semibold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border",
                          tagColors[tag] ?? defaultTagColor
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="font-nyght text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] text-neutral-900 dark:text-white mb-5 group-hover:tracking-[-0.01em] transition-all duration-500">
                  {post.title}
                </h2>
                <p className="font-outfit text-base md:text-lg leading-relaxed text-neutral-500 dark:text-white/45 max-w-xl">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-100 dark:border-white/[0.06]">
                <time dateTime={post.date} className="font-outfit text-xs font-medium tracking-wider uppercase text-neutral-400 dark:text-white/30">
                  {formatDate(post.date)}
                </time>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-white/20" />
                <span className="font-outfit text-xs font-medium tracking-wider uppercase text-neutral-400 dark:text-white/30">
                  {post.readTime}
                </span>
                <div className="flex-1" />
                <span className="inline-flex items-center gap-2 font-outfit text-xs font-semibold tracking-wider uppercase text-neutral-900 dark:text-white opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-400">
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Right: Abstract decorative panel */}
            <div className="hidden md:flex w-[280px] lg:w-[320px] shrink-0 relative overflow-hidden bg-neutral-50 dark:bg-[#060606] border-l border-neutral-100 dark:border-white/[0.06] items-center justify-center">
              {/* Large serif letter watermark */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <span className="font-nyght text-[200px] lg:text-[240px] italic text-neutral-100 dark:text-white/[0.03] leading-none transition-transform duration-700 group-hover:scale-105 group-hover:rotate-[-2deg]">
                  {post.title.charAt(0)}
                </span>
              </div>
              {/* Featured badge */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-outfit font-bold tracking-[0.15em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
                  Latest
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute bottom-8 left-8 right-8 space-y-2 opacity-30">
                <div className="h-[1px] bg-neutral-300 dark:bg-white/10 w-full" />
                <div className="h-[1px] bg-neutral-300 dark:bg-white/10 w-3/4" />
                <div className="h-[1px] bg-neutral-300 dark:bg-white/10 w-1/2" />
              </div>
            </div>
          </div>
        </article>
      </TransitionLink>
    </div>
  );
}

export function BlogPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <div className="blog-card-wrapper">
      <TransitionLink
        href={`/blog/${post.slug}`}
        className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-2xl"
      >
        <article className="relative h-full flex flex-col rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0A0A] p-6 md:p-7 transition-all duration-500 group-hover:border-neutral-300 dark:group-hover:border-white/[0.15] group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_4px_24px_rgba(255,255,255,0.02)] overflow-hidden">
          {/* Subtle top-left accent on hover */}
          <div className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-neutral-300 dark:from-white/20 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-neutral-300 dark:from-white/20 to-transparent" />
          </div>

          <div className="flex items-center gap-3 mb-5">
            <ArticleNumber index={index} />
            <div className="h-[1px] flex-1 bg-neutral-100 dark:bg-white/[0.06]" />
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "text-[10px] font-outfit font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border",
                    tagColors[tag] ?? defaultTagColor
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-nyght text-xl md:text-[1.4rem] leading-[1.25] text-neutral-900 dark:text-white mb-3 group-hover:text-neutral-700 dark:group-hover:text-white/90 transition-colors duration-300">
              {post.title}
            </h3>
            <p className="font-outfit text-sm leading-relaxed text-neutral-500 dark:text-white/40 line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-neutral-100 dark:border-white/[0.06]">
            <time dateTime={post.date} className="font-outfit text-[11px] font-medium tracking-wider uppercase text-neutral-400 dark:text-white/25">
              {formatDate(post.date)}
            </time>
            <span className="w-0.5 h-0.5 rounded-full bg-neutral-300 dark:bg-white/15" />
            <span className="font-outfit text-[11px] font-medium tracking-wider uppercase text-neutral-400 dark:text-white/25">
              {post.readTime}
            </span>
            <div className="flex-1" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300 dark:text-white/15 group-hover:text-neutral-900 dark:group-hover:text-white/60 transition-all duration-400 group-hover:translate-x-0.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </article>
      </TransitionLink>
    </div>
  );
}
