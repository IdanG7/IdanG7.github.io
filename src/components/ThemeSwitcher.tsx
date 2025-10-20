import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ];

  const currentThemeData = themes.find((t) => t.name === theme) || themes[1];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Theme options dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 bg-card/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-2 space-y-1 min-w-[140px]">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon;
                  const isActive = theme === themeOption.name;

                  return (
                    <button
                      key={themeOption.name}
                      onClick={() => {
                        setTheme(themeOption.name);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{themeOption.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTheme"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main theme toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-card/95 backdrop-blur-lg border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Sun - left half */}
          <motion.div
            animate={{
              x: currentTheme === 'dark' ? -20 : 0,
              opacity: currentTheme === 'dark' ? 0.3 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="absolute left-2"
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </motion.div>

          {/* Moon - right half */}
          <motion.div
            animate={{
              x: currentTheme === 'dark' ? 0 : 20,
              opacity: currentTheme === 'dark' ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className="absolute right-2"
          >
            <Moon className="w-5 h-5 text-primary" />
          </motion.div>

          {/* Divider line */}
          <motion.div
            className="absolute w-px h-8 bg-border"
            animate={{
              opacity: currentTheme === 'system' ? 1 : 0,
            }}
          />

          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </motion.button>

        {/* Tooltip when not open */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-card/95 backdrop-blur-lg border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
          >
            <span className="text-xs font-medium text-foreground">
              {currentThemeData.label} Mode
            </span>
          </motion.div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
