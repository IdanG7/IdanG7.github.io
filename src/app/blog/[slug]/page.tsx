import { notFound } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import BlogMetricsBar from "@/components/BlogMetricsBar";
import CommentSection from "@/components/CommentSection";
import AuthorCard from "@/components/AuthorCard";
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
      images: [
        {
          url: "/images/main.png",
          width: 800,
          height: 800,
          alt: `${post.title} — Idan Gurevich`,
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon-32x32.png",
    },
  };
}

const tagColors: Record<string, string> = {
  AI: "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
  Career:
    "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Junior Dev":
    "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  Opinion:
    "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  Infrastructure:
    "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Engineering:
    "text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
  Systems:
    "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const defaultTagColor =
  "text-neutral-600 dark:text-neutral-400 bg-neutral-500/10 border-neutral-200 dark:border-neutral-500/20";

function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <Navigation />
      <main>
        <article className="w-full bg-neutral-50 dark:bg-black min-h-screen">
          {/* Header */}
          <header className="pt-32 md:pt-44 pb-10 md:pb-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <TransitionLink
                href="/blog"
                back
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
              </TransitionLink>

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

              {/* Metrics bar */}
              <BlogMetricsBar
                slug={post.slug}
                title={post.title}
                date={post.date}
                commentCount={0}
              />
            </div>
          </header>

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div
              className="max-w-3xl mx-auto prose-blog font-outfit text-neutral-700 dark:text-white/70"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Card */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AuthorCard />
          </div>

          {/* Prev/Next Navigation — between author card and discussion */}
          {(prev || next) && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 mt-12 pt-12 border-t border-neutral-200 dark:border-white/[0.08]">
                {prev ? (
                  <TransitionLink
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-col items-start text-left"
                  >
                    <span className="font-outfit text-xs tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                      &larr; Previous Article
                    </span>
                    <h4 className="font-outfit text-base font-bold text-neutral-900 dark:text-white group-hover:underline underline-offset-4 decoration-1">
                      {prev.title}
                    </h4>
                  </TransitionLink>
                ) : (
                  <div />
                )}

                {next ? (
                  <TransitionLink
                    href={`/blog/${next.slug}`}
                    className="group flex flex-col items-end text-right"
                  >
                    <span className="font-outfit text-xs tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                      Next Article &rarr;
                    </span>
                    <h4 className="font-outfit text-base font-bold text-neutral-900 dark:text-white group-hover:underline underline-offset-4 decoration-1">
                      {next.title}
                    </h4>
                  </TransitionLink>
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}

          {/* Discussion / Comments */}
          <AuthProvider>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
              <CommentSection slug={post.slug} />
            </div>
          </AuthProvider>
        </article>
        <Footer />
      </main>
    </>
  );
}
