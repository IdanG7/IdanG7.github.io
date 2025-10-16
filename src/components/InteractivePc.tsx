import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Zap, TrendingUp, Clock, MapPin } from "lucide-react";

const InteractivePc = () => {
  const [time, setTime] = useState(new Date());
  const [codeLineIndex, setCodeLineIndex] = useState(0);

  const codeSnippets = [
    "// Life of a Developer",
    "const passion = true;",
    "while(passion) {",
    "  dream.code();",
    "  coffee.refill();",
    "  bugs.squash();",
    "  features.ship();",
    "  repeat();",
    "}",
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const codeTimer = setInterval(() => {
      setCodeLineIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 2000);
    return () => clearInterval(codeTimer);
  }, []);

  const techStack = [
    { name: "React", icon: "⚛️", color: "text-blue-400" },
    { name: "TypeScript", icon: "📘", color: "text-blue-500" },
    { name: "C++", icon: "⚙️", color: "text-purple-400" },
    { name: "Python", icon: "🐍", color: "text-green-400" },
    { name: "Docker", icon: "🐳", color: "text-cyan-400" },
    { name: "Git", icon: "📦", color: "text-orange-400" },
  ];

  return (
    <div className="w-full h-full p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full">

        {/* Large Terminal Card - Top Left (2x2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 row-span-2 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">~/developer_life.js</span>
            </div>

            <div className="space-y-2 font-mono text-sm overflow-hidden">
              {codeSnippets.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= codeLineIndex ? 1 : 0.3,
                    x: 0,
                    color: index === codeLineIndex ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 overflow-hidden"
                >
                  <span className="text-muted-foreground/50 flex-shrink-0">{index + 1}</span>
                  <span className="truncate">{line}</span>
                  {index === codeLineIndex && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-primary ml-1 flex-shrink-0"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Compiling happiness...</span>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack - Top Right (2x2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 row-span-2 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-primary flex-shrink-0" />
            <h3 className="font-mono font-bold text-foreground truncate">Tech Stack</h3>
          </div>

          <div className="grid grid-cols-3 gap-3 overflow-hidden">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group overflow-hidden"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </span>
                <span className={`text-xs font-mono font-bold ${tech.color} truncate w-full text-center`}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-primary/20 overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span className="truncate">Years of Experience</span>
              <span className="text-primary font-bold flex-shrink-0 ml-2">9+</span>
            </div>
          </div>
        </motion.div>

        {/* Live Clock - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 row-span-1 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <Clock className="w-6 h-6 text-primary mb-2 relative z-10 flex-shrink-0" />
          <div className="text-2xl font-bold font-mono text-primary relative z-10 truncate w-full text-center">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs text-muted-foreground font-mono relative z-10 truncate w-full text-center">Toronto Time</div>
        </motion.div>

        {/* Location - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 row-span-1 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <MapPin className="w-6 h-6 text-primary mb-2 relative z-10 flex-shrink-0" />
          <div className="text-lg font-bold font-mono text-foreground relative z-10 truncate w-full text-center">Toronto</div>
          <div className="text-xs text-muted-foreground font-mono relative z-10 truncate w-full text-center">📍 Canada</div>
        </motion.div>

        {/* Status - Bottom Middle (2x1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="col-span-2 row-span-1 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex items-center justify-between h-full overflow-hidden">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-mono font-bold text-foreground truncate">Available for Work</div>
                <div className="text-xs text-muted-foreground font-mono truncate">Open to collaboration</div>
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 ml-2" />
          </div>
        </motion.div>

        {/* Currently Listening - Bottom Right (2x1) */}
        <motion.a
          href="https://open.spotify.com/user/idang7"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="col-span-2 row-span-1 bg-gradient-to-br from-green-500/20 via-card/90 to-card/70 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
        >
          {/* Spotify-style animated bars */}
          <div className="absolute right-4 top-4 flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-500 rounded-full"
                animate={{
                  height: ["8px", "16px", "8px"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 h-full">
            {/* Album Art Placeholder */}
            <div className="relative w-16 h-16 bg-gradient-to-br from-green-500/30 to-primary/30 rounded-lg flex-shrink-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/50 to-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs text-green-500/80 font-mono mb-1">Currently Coding To</div>
              <div className="text-sm font-bold text-foreground truncate">Lo-Fi Beats to Code To</div>
              <div className="text-xs text-muted-foreground font-mono truncate">Click to view my Spotify →</div>
            </div>
          </div>
        </motion.a>

      </div>
    </div>
  );
};

export default InteractivePc;
