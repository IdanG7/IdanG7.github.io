"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import BlogHero from "@/components/BlogHero";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";
import { FeaturedPostCard, BlogPostCard } from "@/components/BlogPostCard";

export default function BlogPage() {
  const mainRef = useRef<HTMLElement>(null);
  const posts = getAllPosts();
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            {/* Section header */}
            <div className="blog-section-heading flex items-center gap-4 mb-10 md:mb-14">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                <span className="font-outfit text-xs font-semibold tracking-[0.2em] uppercase text-neutral-900 dark:text-white">
                  Latest Writing
                </span>
              </div>
              <div className="flex-1 h-[1px] bg-neutral-200 dark:bg-white/[0.08]" />
              <span className="font-outfit text-xs tracking-wider text-neutral-400 dark:text-white/25 tabular-nums">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
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
