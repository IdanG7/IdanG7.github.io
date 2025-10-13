import { Terminal, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Terminal className="w-12 h-12 text-primary" />
            <Wrench className="w-12 h-12 text-accent" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-light tracking-tight font-mono mb-6">
            <span className="text-primary">$</span> Under Construction
          </h1>

          <div className="bg-card border border-primary/20 rounded-lg p-6 mb-8 font-mono text-left">
            <div className="flex items-start gap-2 text-sm mb-2">
              <span className="text-primary">&gt;</span>
              <span className="text-muted-foreground">Building something awesome...</span>
            </div>
            <div className="flex items-start gap-2 text-sm mb-2">
              <span className="text-accent">&gt;</span>
              <span className="text-muted-foreground">Compiling portfolio...</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">&gt;</span>
              <span className="text-muted-foreground">Check back soon!</span>
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            This site is currently being developed. Please check back later.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/IdanG7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-card border border-primary/30 hover:border-primary transition-all hover:shadow-[var(--shadow-glow)] font-mono"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/idangurevich/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-card border border-primary/30 hover:border-primary transition-all hover:shadow-[var(--shadow-glow)] font-mono"
            >
              LinkedIn
            </a>
            <a
              href="mailto:Idan.gurevich@gmail.com"
              className="px-6 py-3 rounded-lg bg-card border border-primary/30 hover:border-primary transition-all hover:shadow-[var(--shadow-glow)] font-mono"
            >
              Email
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-primary/20">
            <p className="text-sm text-muted-foreground font-mono">
              © {new Date().getFullYear()} Idan Gurevich
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnderConstruction;
