import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, FolderGit2, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const logoOptions = [
  { type: 'root', content: '~Root' },
  { type: 'uptime', content: null },
  { type: 'jsx', content: '</>' },
  { type: 'function', content: 'init();' },
  { type: 'array', content: '[IG]' },
];

const StickyNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(logoOptions[0]);
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    setMounted(true);

    // Pick random logo option
    const randomIndex = Math.floor(Math.random() * logoOptions.length);
    const selectedLogo = logoOptions[randomIndex];
    setCurrentLogo(selectedLogo);

    // If uptime logo, start counter
    if (selectedLogo.type === 'uptime') {
      const launchDate = new Date('2025-01-01T00:00:00');

      const updateUptime = () => {
        const now = new Date();
        const diff = now.getTime() - launchDate.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setUptime(`${days}d ${hours.toString().padStart(2, '0')}h`);
        } else {
          setUptime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      };

      updateUptime();
      const interval = setInterval(updateUptime, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Hide nav after scrolling 100px, unless mouse is at top
      if (window.scrollY > 100 && !isHovered) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // If at the very top of the page, always set hero as active
      if (window.scrollY < 50) {
        setActiveSection('hero');
        return;
      }

      // Find active section
      const sections = navItems.map(item => document.getElementById(item.id));

      // Check if sections are properly laid out
      // Sections should have increasing offsetTop values. If they don't, layout isn't ready.
      const allSectionsExist = sections.every(section => section !== null);
      if (!allSectionsExist) {
        return; // Don't update if sections aren't ready yet
      }

      // Verify that sections have realistic positions (contact should be well below hero)
      const heroSection = sections[0];
      const contactSection = sections[sections.length - 1];
      if (heroSection && contactSection) {
        const verticalSpacing = contactSection.offsetTop - heroSection.offsetTop;
        // If contact isn't at least 500px below hero, layout isn't ready
        if (verticalSpacing < 500) {
          return;
        }
      }

      const scrollPosition = window.scrollY + 200;

      // Check if sections are properly laid out (have valid offsetTop values)
      const sectionsReady = sections.every(section => section !== null);
      if (!sectionsReady) {
        return; // Don't update if sections aren't ready yet
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show nav when mouse is within 100px of top
      if (e.clientY < 100) {
        setIsHovered(true);
        setIsVisible(true);
      } else {
        setIsHovered(false);
        if (window.scrollY > 100) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Height of the nav bar (h-16 = 4rem = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border shadow-lg"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2"
              >
                {currentLogo.type === 'uptime' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-mono text-muted-foreground">
                      {uptime}
                    </span>
                  </div>
                ) : (
                  <div className="relative cursor-pointer">
                    <span className="text-xl font-bold font-mono text-primary">
                      {currentLogo.content}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Theme Switcher */}
              {mounted && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={toggleTheme}
                  className="relative hidden md:flex items-center justify-center w-10 h-10 bg-muted rounded-full transition-colors duration-200 hover:bg-muted/80 border border-border overflow-hidden"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    {currentTheme === 'dark' ? (
                      <motion.div
                        key="moon"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -30, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute"
                      >
                        <Moon className="w-5 h-5 text-primary" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -30, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute"
                      >
                        <Sun className="w-5 h-5 text-amber-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Mobile Navigation - Compact dots + theme switcher */}
              <div className="md:hidden flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="p-1.5"
                      aria-label={item.label}
                    >
                      <div className="w-2 h-2 rounded-full transition-all duration-200 bg-muted-foreground/30 hover:bg-muted-foreground/50" />
                    </button>
                  ))}
                </div>

                {/* Mobile theme switcher */}
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="relative flex items-center justify-center w-10 h-8 bg-muted rounded-full border border-border overflow-hidden"
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait">
                      {currentTheme === 'dark' ? (
                        <motion.div
                          key="moon"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute"
                        >
                          <Moon className="w-4 h-4 text-primary" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sun"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute"
                        >
                          <Sun className="w-4 h-4 text-amber-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default StickyNav;
