import { useState } from "react";
import { Terminal, Wrench, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UnderConstructionProps {
  onAuthenticate: () => void;
}

const UnderConstruction = ({ onAuthenticate }: UnderConstructionProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hash the entered password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-256 hash of the correct password
    const correctPasswordHash = "c009a343ce4e17dc092f48b2f8a37da6a646734e7c1e8369e129d7240fbd953b";

    if (hashHex === correctPasswordHash) {
      sessionStorage.setItem("site_authenticated", "true");
      onAuthenticate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

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

          <div className="flex flex-wrap justify-center gap-4 mb-8">
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

          {!showPassword ? (
            <Button
              variant="outline"
              onClick={() => setShowPassword(true)}
              className="font-mono border-primary/30 hover:border-primary"
            >
              <Lock className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
          ) : (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="bg-card border border-primary/20 rounded-lg p-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`font-mono mb-3 ${error ? 'border-destructive' : ''}`}
                  autoFocus
                />
                {error && (
                  <p className="text-destructive text-sm mb-3 font-mono">
                    ✗ Incorrect password
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 font-mono"
                  >
                    Enter
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPassword(false);
                      setPassword("");
                      setError(false);
                    }}
                    className="font-mono"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.form>
          )}

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
