"use client";

import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import BlogHero from "@/components/BlogHero";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { FeaturedPostCard, BlogPostCard } from "@/components/BlogPostCard";

export default function BlogPage() {
  const mainRef = useRef<HTMLElement>(null);
  const allPosts = getAllPosts();

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All Posts");

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allPosts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return ["All Posts", ...Array.from(tagSet).sort()];
  }, [allPosts]);

  // Filtered posts
  const posts = useMemo(() => {
    let filtered = allPosts;

    if (activeTag !== "All Posts") {
      filtered = filtered.filter((post) => post.tags.includes(activeTag));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [allPosts, activeTag, search]);

  const featured = posts[0];
  const rest = posts.slice(1);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const selector = gsap.utils.selector(mainRef);
      const sectionHeading = selector(".blog-section-heading");
      const cards = selector(".blog-card-wrapper");

      if (prefersReducedMotion) {
        gsap.set([sectionHeading, cards], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(sectionHeading, { y: 30, opacity: 0 });
      gsap.set(cards, { y: 40, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(sectionHeading, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
        })
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.6"
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={mainRef}>
        <BlogHero />

        {/* Posts section */}
        <section className="w-full bg-neutral-50 dark:bg-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* Search + Filter bar */}
            <div className="blog-section-heading mb-10 md:mb-14">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 p-3 rounded-2xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0A0A]">
                {/* Search input */}
                <div className="relative flex-1 min-w-0">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-white/30"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-white/[0.03] rounded-xl font-outfit text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/25 border border-neutral-200 dark:border-white/[0.06] focus:outline-none focus:border-green-500/40 dark:focus:border-green-500/30 transition-colors"
                  />
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-[1px] h-8 bg-neutral-200 dark:bg-white/[0.08]" />

                {/* Tag filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl font-outfit text-sm font-medium transition-all duration-200 ${
                        activeTag === tag
                          ? "bg-white dark:bg-white text-neutral-900 dark:text-black shadow-sm border border-neutral-200 dark:border-white/20"
                          : "bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 dark:text-white/40 hover:text-neutral-700 dark:hover:text-white/60 hover:bg-neutral-150 dark:hover:bg-white/[0.1] border border-transparent"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {posts.length > 0 ? (
              <>
                {/* Featured post (latest) */}
                {featured && (
                  <div className="mb-8 md:mb-12">
                    <FeaturedPostCard post={featured} index={0} />
                  </div>
                )}

                {/* Remaining posts grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {rest.map((post, i) => (
                      <BlogPostCard
                        key={post.slug}
                        post={post}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-12">
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
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h2 className="text-2xl font-outfit font-bold text-neutral-900 dark:text-white mb-3">
                  No results found
                </h2>
                <p className="text-neutral-500 dark:text-white/50 font-outfit max-w-md">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}

            {/* Bottom tagline */}
            <div className="blog-card-wrapper mt-16 md:mt-20 flex flex-col items-center text-center">
              <div className="w-12 h-[1px] bg-neutral-300 dark:bg-white/10 mb-8" />
              <p className="font-outfit text-sm text-neutral-400 dark:text-white/30 mb-2">
                More articles on the way.
              </p>
              <p className="font-nyght text-lg md:text-xl italic text-neutral-600 dark:text-white/50">
                Stay curious, stay building.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
