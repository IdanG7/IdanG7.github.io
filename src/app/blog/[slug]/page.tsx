import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
        <article className="w-full bg-neutral-50 dark:bg-black">
          {/* Post Header */}
          <div className="pt-32 md:pt-44 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-outfit text-neutral-500 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white/80 transition-colors mb-10 md:mb-14"
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
                    className="px-3 py-1 text-xs font-outfit font-medium tracking-wide uppercase rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-white/50 border border-neutral-200 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-bold text-neutral-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm font-outfit text-neutral-500 dark:text-white/40">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-white/20" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-neutral-200 dark:bg-white/10" />
          </div>

          {/* Post Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div
              className="max-w-3xl mx-auto prose-blog font-outfit text-base md:text-lg leading-relaxed text-neutral-700 dark:text-white/70"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Footer divider + back */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="h-px bg-neutral-200 dark:bg-white/10 mb-10" />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-outfit text-neutral-500 dark:text-white/40 hover:text-neutral-900 dark:hover:text-white/80 transition-colors"
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
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
