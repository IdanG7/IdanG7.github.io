import { Mail, Linkedin, Github, FileText, Terminal, Send, ArrowRight, MapPin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState, memo } from "react";
import { toast } from "sonner";

const socials = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:Idan.gurevich@gmail.com",
    value: "Idan.gurevich@gmail.com",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10 hover:bg-red-500/20"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/idangurevich/",
    value: "linkedin.com/in/idangurevich",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/20"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/IdanG7",
    value: "github.com/IdanG7",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10 hover:bg-purple-500/20"
  },
  {
    icon: FileText,
    label: "Resume",
    href: "/resume.pdf",
    value: "View Resume",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10 hover:bg-green-500/20"
  }
];

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      toast.success('Copied to clipboard!', {
        description: text,
        duration: 3000,
      });
    }).catch(() => {
      toast.error('Failed to copy', {
        description: 'Please try again',
      });
    });
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-24"
      ref={ref}
    >
      {/* Hex address decoration */}
      <div className="absolute top-8 right-4 text-xs font-mono text-muted-foreground/30">
        [0x0005]
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={isVisible ? { rotate: [0, 360] } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Terminal className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight font-mono">
              <span className="text-primary">./</span>contact
            </h2>
          </div>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's build something exceptional together
          </p>

          {/* Terminal status box */}
          <motion.div
            className="inline-block"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative p-4 sm:p-6 rounded-xl bg-card border border-primary/30 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-muted-foreground">status</span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-primary font-semibold">"Available for opportunities"</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {socials.map((social, index) => {
            const Icon = social.icon;
            const isCopied = copiedIndex === index;

            return (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                  {/* Card */}
                  <div className="relative h-full backdrop-blur-xl bg-card/40 border-2 border-primary/20 rounded-2xl p-6 overflow-hidden transition-all duration-300">
                    {/* Animated neon border glow - outline only */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                        boxShadow: `0 0 20px ${social.color === 'from-red-500 to-orange-500' ? '#ef4444' : social.color === 'from-blue-500 to-cyan-500' ? '#3b82f6' : social.color === 'from-purple-500 to-pink-500' ? '#a855f7' : '#22c55e'}, 0 0 40px ${social.color === 'from-red-500 to-orange-500' ? '#ef444440' : social.color === 'from-blue-500 to-cyan-500' ? '#3b82f640' : social.color === 'from-purple-500 to-pink-500' ? '#a855f740' : '#22c55e40'}`
                      }} />
                    </div>

                    {/* Subtle glassmorphism overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${social.bgColor} transition-colors duration-300`}>
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>

                      {/* Copy button for email and links */}
                      {index < 3 && (
                        <button
                          onClick={() => handleCopy(social.value, index)}
                          className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          title="Copy to clipboard"
                        >
                          {isCopied ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-500 text-xs font-mono"
                            >
                              Copied!
                            </motion.div>
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                          )}
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold font-mono mb-1 text-foreground">
                        {social.label}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono break-all">
                        {social.value}
                      </p>
                    </div>

                    <a
                      href={social.href}
                      target={social.label !== "Email" ? "_blank" : undefined}
                      rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-accent transition-colors group/link"
                    >
                      {social.label === "Email" ? "Send Email" : "Visit"}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-2xl" />
          <div className="relative bg-card/50 border border-primary/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold font-mono mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Based in Toronto, Ontario
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Available for professional opportunities in backend engineering,
                  firmware development, and DevOps architecture. Open to both remote
                  and on-site positions.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="font-mono bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity group"
                  asChild
                >
                  <a href="mailto:Idan.gurevich@gmail.com">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Get in Touch
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className={`pt-12 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="border-t border-primary/20 pt-8">
            <p className="text-sm text-muted-foreground font-mono mb-3">
              © {new Date().getFullYear()} Idan Gurevich. Built with precision and passion.
            </p>
            <div className="flex justify-center items-center gap-3 text-xs font-mono text-muted-foreground/50">
              <span className="px-2 py-1 rounded bg-primary/5 border border-primary/10">0xC0DE</span>
              <span className="text-primary">•</span>
              <span className="px-2 py-1 rounded bg-accent/5 border border-accent/10">0x1337</span>
              <span className="text-primary">•</span>
              <span className="px-2 py-1 rounded bg-primary/5 border border-primary/10">0xF1RM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Contact);
