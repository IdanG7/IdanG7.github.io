import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const socialLinks = [
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    href: "https://github.com/IdanG7",
    color: "hover:text-[#6e5494]",
    bgGradient: "group-hover:from-[#6e5494]/10 group-hover:to-[#6e5494]/20"
  },
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/idangurevich/",
    color: "hover:text-[#0077b5]",
    bgGradient: "group-hover:from-[#0077b5]/10 group-hover:to-[#0077b5]/20"
  },
  {
    id: "resume",
    icon: FileText,
    label: "Resume",
    href: "/resume.pdf",
    color: "hover:text-primary",
    bgGradient: "group-hover:from-primary/10 group-hover:to-accent/20"
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    href: "mailto:Idan.gurevich@gmail.com",
    color: "hover:text-accent-secondary",
    bgGradient: "group-hover:from-accent-secondary/10 group-hover:to-accent-secondary/20"
  }
];

const SocialTaskbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const setupObserver = () => {
      const contactSection = document.getElementById('contact');

      if (!contactSection) {
        // Retry after a short delay if contact section not found
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hide taskbar when contact section is more than 20% visible
            setIsContactVisible(entry.intersectionRatio > 0.2);
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
          rootMargin: '-50px 0px 0px 0px'
        }
      );

      observer.observe(contactSection);
    };

    setupObserver();

    // Re-check visibility when page layout might have changed
    const handleLayoutChange = () => {
      // Small delay to allow layout to settle
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const rect = contactSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
          const totalHeight = rect.height;
          const visibilityRatio = totalHeight > 0 ? visibleHeight / totalHeight : 0;

          setIsContactVisible(visibilityRatio > 0.2);
        }
      }, 100);
    };

    // Listen for scroll events and layout changes
    window.addEventListener('scroll', handleLayoutChange, { passive: true });
    window.addEventListener('resize', handleLayoutChange);

    // Also check immediately
    handleLayoutChange();

    return () => {
      if (observer) observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleLayoutChange);
      window.removeEventListener('resize', handleLayoutChange);
    };
  }, []);

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {!isContactVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <div className="group/taskbar flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 bg-card/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-300 relative"
            >
        {/* Subtle background glow that intensifies on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl blur-xl -z-10 opacity-50 group-hover/taskbar:opacity-100 transition-opacity duration-300" />

        {/* Animated border glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/taskbar:opacity-100 transition-opacity duration-300 -z-10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-md" />
        </div>

        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          const isHovered = hoveredIcon === link.id;

          return (
            <div key={link.id} className="relative flex items-center justify-center">
              <motion.a
                href={link.href}
                target={link.id !== "email" ? "_blank" : undefined}
                rel={link.id !== "email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className={`relative flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-br from-background to-muted backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300 group overflow-hidden ${link.bgGradient}`}
                onMouseEnter={() => setHoveredIcon(link.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icon glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl" />
                </div>

                <Icon className={`w-4 h-4 sm:w-4 sm:h-4 text-foreground/80 transition-colors duration-300 relative z-10 ${link.color}`} />

                {/* Label text - hidden on small screens, visible on sm and up */}
                <span className={`hidden sm:inline text-sm font-medium text-foreground/70 transition-colors duration-300 relative z-10 group-hover:text-foreground ${link.color}`}>
                  {link.label}
                </span>
              </motion.a>
            </div>
          );
        })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialTaskbar;
