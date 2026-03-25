import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import ReactionBar from "@/components/ReactionBar";
import CommentSection from "@/components/CommentSection";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Idan Gurevich`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

const tagColors: Record<string, string> = {
  AI: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
  Career: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Junior Dev": "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  Opinion: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const defaultTagColor =
  "text-neutral-600 dark:text-neutral-400 bg-neutral-500/10 border-neutral-200 dark:border-neutral-500/20";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main>
        <article className="w-full bg-neutral-50 dark:bg-black min-h-screen">
          {/* ── Header ── */}
          <header className="pt-32 md:pt-44 pb-10 md:pb-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-outfit text-neutral-400 dark:text-white/35 hover:text-neutral-900 dark:hover:text-white transition-colors mb-10 md:mb-14"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Blog
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-[10px] font-outfit font-semibold tracking-[0.15em] uppercase rounded-full border ${tagColors[tag] ?? defaultTagColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-nyght italic text-neutral-900 dark:text-white leading-[1.12] tracking-tight mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="font-outfit text-base md:text-lg text-neutral-500 dark:text-white/45 leading-relaxed max-w-2xl mb-8">
                {post.excerpt}
              </p>

              {/* Author + Meta row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between pt-6 border-t border-neutral-200 dark:border-white/[0.08]">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-white/10 dark:to-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="font-agile text-xs text-neutral-600 dark:text-white/60 leading-none">
                      IG
                    </span>
                  </div>
                  <span className="font-outfit text-sm font-medium text-neutral-900 dark:text-white leading-tight">
                    Idan Gurevich
                  </span>
                </div>

                {/* Date + Read time */}
                <div className="flex items-center gap-3 font-outfit text-xs font-medium tracking-wider uppercase text-neutral-400 dark:text-white/30">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-white/15" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ── Content ── */}
          <div className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div
              className="max-w-3xl mx-auto prose-blog font-outfit text-neutral-700 dark:text-white/70"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* ── Reactions & Comments ── */}
          <AuthProvider>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-t border-neutral-200 dark:border-white/[0.08]">
                <ReactionBar slug={post.slug} />
              </div>
              <CommentSection slug={post.slug} />
            </div>
          </AuthProvider>

          {/* ── Article Footer ── */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
            <div className="border-t border-neutral-200 dark:border-white/[0.08] pt-10 mt-10">
              {/* Tags reprise */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-[10px] font-outfit font-semibold tracking-[0.15em] uppercase rounded-full border ${tagColors[tag] ?? defaultTagColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Back CTA */}
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 font-outfit text-sm font-medium text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to all posts
              </Link>
            </div>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
