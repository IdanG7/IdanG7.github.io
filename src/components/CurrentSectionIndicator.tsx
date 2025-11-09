import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'Experience' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
];

/**
 * Displays current section indicator on the side
 */
export const CurrentSectionIndicator = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center"
            aria-label={`Go to ${section.name}`}
          >
            {/* Dot indicator */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary w-3 h-3'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />

            {/* Label tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 px-3 py-1.5 bg-card border border-primary/30 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              <span className="text-xs font-mono text-foreground">{section.name}</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-4 border-l-card border-y-4 border-y-transparent" />
            </motion.div>

            {/* Active indicator line */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute -left-1 -right-1 -top-1 -bottom-1 rounded-full border-2 border-primary"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
