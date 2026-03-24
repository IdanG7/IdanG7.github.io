import Navigation from "@/components/Navigation";
import BlogHero from "@/components/BlogHero";
import Footer from "@/components/Footer";

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main>
        <BlogHero />
        {/* Blog content section */}
        <section className="w-full bg-neutral-50 dark:bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 flex items-center justify-center mb-6">
                {/* Pencil icon - Lucide "pencil" */}
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
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
