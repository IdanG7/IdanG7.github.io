import Link from "next/link";
import Navigation from "@/components/Navigation";
import BlogHero from "@/components/BlogHero";
import Footer from "@/components/Footer";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main>
        <BlogHero />
        <section className="w-full bg-neutral-50 dark:bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            {posts.length > 0 ? (
              <div className="flex flex-col gap-0">
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    {index > 0 && (
                      <div className="h-px bg-neutral-200 dark:bg-white/10" />
                    )}
                    <article className="py-10 md:py-14">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-[10px] font-outfit font-medium tracking-wider uppercase rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-white/40 border border-neutral-200 dark:border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-outfit font-bold text-neutral-900 dark:text-white leading-tight tracking-tight group-hover:text-neutral-600 dark:group-hover:text-white/80 transition-colors mb-3">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-outfit text-neutral-500 dark:text-white/50 text-base md:text-lg leading-relaxed mb-4 max-w-2xl">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-sm font-outfit text-neutral-400 dark:text-white/30">
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-white/20" />
                        <span>{post.readTime}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 text-neutral-400 dark:text-white/30"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-outfit font-bold text-neutral-900 dark:text-white mb-3">
                  Coming Soon
                </h2>
                <p className="text-neutral-500 dark:text-white/50 font-outfit max-w-md">
                  I&apos;m working on some in-depth articles about backend
                  systems, firmware development, and engineering philosophy. Stay
                  tuned.
                </p>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
