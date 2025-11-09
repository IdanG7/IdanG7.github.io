import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Home, User, Briefcase, Code, FolderGit2, Mail, Moon, Sun, Github, Linkedin, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Command palette for quick navigation
 * Trigger with Cmd+K (Mac) or Ctrl+K (Windows/Linux)
 */
export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Command Palette */}
          <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-start justify-center p-4 pt-[20vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <Command className="rounded-xl border-2 border-primary/30 bg-card shadow-2xl overflow-hidden">
                <div className="flex items-center border-b border-border px-3">
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <kbd className="ml-auto text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="text-muted-foreground text-xs font-mono mb-2 px-2">
                    <Command.Item onSelect={() => navigate('hero')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Home className="w-4 h-4" />
                      <span>Home</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('about')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <User className="w-4 h-4" />
                      <span>About</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('experience')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Briefcase className="w-4 h-4" />
                      <span>Experience</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('skills')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Code className="w-4 h-4" />
                      <span>Skills</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('projects')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <FolderGit2 className="w-4 h-4" />
                      <span>Projects</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('contact')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Mail className="w-4 h-4" />
                      <span>Contact</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator className="h-px bg-border my-2" />

                  <Command.Group heading="Theme" className="text-muted-foreground text-xs font-mono mb-2 px-2">
                    <Command.Item onSelect={() => setTheme('light')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Sun className="w-4 h-4" />
                      <span>Light Mode</span>
                    </Command.Item>
                    <Command.Item onSelect={() => setTheme('dark')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Moon className="w-4 h-4" />
                      <span>Dark Mode</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator className="h-px bg-border my-2" />

                  <Command.Group heading="Links" className="text-muted-foreground text-xs font-mono mb-2 px-2">
                    <Command.Item onSelect={() => openUrl('https://github.com/IdanG7')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Github className="w-4 h-4" />
                      <span>GitHub Profile</span>
                    </Command.Item>
                    <Command.Item onSelect={() => openUrl('https://www.linkedin.com/in/idangurevich/')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </Command.Item>
                    <Command.Item onSelect={() => openUrl('/resume.pdf')} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-primary/10 aria-selected:bg-primary/10">
                      <FileText className="w-4 h-4" />
                      <span>View Resume</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground font-mono flex items-center justify-between">
                  <span>Navigate with ↑ ↓ arrows</span>
                  <span>Press ⏎ to select</span>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
