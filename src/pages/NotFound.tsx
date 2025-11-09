import { motion } from 'framer-motion';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * 404 Not Found page with terminal theme
 */
const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card/50 backdrop-blur-xl border-2 border-primary/30 rounded-xl p-8 md:p-12 space-y-8"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">error.log</span>
          </div>

          {/* Error code */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
            >
              <h1 className="text-8xl md:text-9xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-mono font-semibold text-foreground">
                Page Not Found
              </h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>

          {/* Terminal-style error message */}
          <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm space-y-2">
            <div className="flex gap-2">
              <span className="text-destructive">Error:</span>
              <span className="text-muted-foreground">ENOENT: no such file or directory</span>
            </div>
            <div className="flex gap-2">
              <span className="text-primary">$</span>
              <span className="text-muted-foreground">
                at Router.navigate ({location.pathname})
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-primary">→</span>
              <span className="text-muted-foreground">Status: 404</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="flex-1 gap-2 font-mono"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="flex-1 gap-2 font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Helpful links */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3 font-mono">
              Quick links:
            </p>
            <div className="flex flex-wrap gap-2">
              {['about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                <Button
                  key={section}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="font-mono text-xs"
                >
                  ./{section}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated 404 text in background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none"
        >
          <span className="text-[20rem] font-bold font-mono text-foreground">
            404
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
