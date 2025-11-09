import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Shortcut {
  keys: string[];
  description: string;
  action: () => void;
}

/**
 * Keyboard shortcuts system for power users
 * Press '?' to view all shortcuts
 */
export const KeyboardShortcuts = () => {
  const [showHelp, setShowHelp] = useState(false);

  const shortcuts: Shortcut[] = [
    {
      keys: ['?'],
      description: 'Show keyboard shortcuts',
      action: () => setShowHelp(true),
    },
    {
      keys: ['Escape'],
      description: 'Close dialogs/modals',
      action: () => setShowHelp(false),
    },
    {
      keys: ['h'],
      description: 'Go to top (Home)',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      keys: ['a'],
      description: 'Jump to About section',
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      keys: ['e'],
      description: 'Jump to Experience section',
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      keys: ['s'],
      description: 'Jump to Skills section',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      keys: ['p'],
      description: 'Jump to Projects section',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      keys: ['c'],
      description: 'Jump to Contact section',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      keys: ['t'],
      description: 'Toggle theme (light/dark)',
      action: () => {
        const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement;
        themeToggle?.click();
      },
    },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      shortcuts.forEach((shortcut) => {
        if (shortcut.keys.includes(key) || shortcut.keys.includes(e.key)) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {/* Help indicator - subtle hint for users */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-8 z-40 hidden lg:block"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHelp(true)}
          className="gap-2 bg-card/80 backdrop-blur-sm"
        >
          <Keyboard className="w-4 h-4" />
          <span className="text-xs font-mono">Press ? for shortcuts</span>
        </Button>
      </motion.div>

      {/* Shortcuts help dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-mono flex items-center gap-2">
              <Keyboard className="w-6 h-6 text-primary" />
              Keyboard Shortcuts
            </DialogTitle>
            <DialogDescription>
              Navigate faster with these keyboard shortcuts
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, i) => (
                    <kbd
                      key={i}
                      className="px-2 py-1 text-xs font-mono bg-background border border-border rounded shadow-sm"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro tip:</strong> These shortcuts work from anywhere on the page
              (except when typing in input fields)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
