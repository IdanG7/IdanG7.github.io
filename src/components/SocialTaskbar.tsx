import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        className="group/taskbar flex items-center gap-3 px-5 py-3 bg-card/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-300 relative"
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
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-br from-background to-muted backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300 group overflow-hidden ${link.bgGradient}`}
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

                <Icon className={`w-4 h-4 text-foreground/80 transition-colors duration-300 relative z-10 ${link.color}`} />

                {/* Label text */}
                <span className={`text-sm font-medium text-foreground/70 transition-colors duration-300 relative z-10 group-hover:text-foreground ${link.color}`}>
                  {link.label}
                </span>
              </motion.a>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SocialTaskbar;
