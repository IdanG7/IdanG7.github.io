import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import SectionPreview from "./SectionPreview";

const commandSchema = z.string().trim().max(500);

interface CommandHistory {
  command: string;
  output: string | JSX.Element;
  timestamp: Date;
}

type TerminalState = "maximized" | "minimized" | "closed";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  targetX: number;
  targetY: number;
}

interface TerminalInterfaceProps {
  onStateChange: (isMaximized: boolean) => void;
}

const TerminalInterface = ({ onStateChange }: TerminalInterfaceProps) => {
  const [input, setInput] = useState("");
  const [terminalState, setTerminalState] = useState<TerminalState>("closed");
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [buttonFill, setButtonFill] = useState(0);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <div className="text-primary space-y-2">
          <div>Welcome to Idan Gurevich's Portfolio Terminal</div>
          <div className="text-muted-foreground">Type 'help' to see available commands</div>
          <div className="text-muted-foreground text-sm">Version 1.0.0 | Backend Engineer Portfolio</div>
        </div>
      ),
      timestamp: new Date(),
    },
  ]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [nanoSection, setNanoSection] = useState<"about" | "skills" | "projects" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => (
      <div className="space-y-2">
        <div className="text-primary font-semibold">Available Commands:</div>
        <div className="grid gap-1 text-sm">
          <div>
            <span className="text-accent font-mono">nano about</span> - View About section
          </div>
          <div>
            <span className="text-accent font-mono">nano skills</span> - View Skills section
          </div>
          <div>
            <span className="text-accent font-mono">nano projects</span> - View Projects section
          </div>
          <div>
            <span className="text-accent font-mono">ls</span> - List all sections
          </div>
          <div>
            <span className="text-accent font-mono">cat [file]</span> - Display file contents
          </div>
          <div>
            <span className="text-accent font-mono">tree</span> - Show directory structure
          </div>
          <div>
            <span className="text-accent font-mono">neofetch</span> - Display system info
          </div>
          <div>
            <span className="text-accent font-mono">echo [text]</span> - Print text to terminal
          </div>
          <div>
            <span className="text-accent font-mono">pwd</span> - Print working directory
          </div>
          <div>
            <span className="text-accent font-mono">whoami</span> - Display profile info
          </div>
          <div>
            <span className="text-accent font-mono">date</span> - Show current date/time
          </div>
          <div>
            <span className="text-accent font-mono">history</span> - Show command history
          </div>
          <div>
            <span className="text-accent font-mono">clear</span> - Clear terminal
          </div>
          <div className="text-muted-foreground text-xs mt-2">In nano: Press ESC or Ctrl+Z to exit</div>
        </div>
      </div>
    ),
    ls: () => (
      <div className="space-y-1">
        <div className="flex gap-4 flex-wrap font-mono">
          <span className="text-blue-400">drwxr-xr-x</span>
          <span className="text-accent">about</span>
          <span className="text-accent">skills</span>
          <span className="text-accent">projects</span>
          <span className="text-green-400">README.md</span>
          <span className="text-green-400">skills.json</span>
        </div>
      </div>
    ),
    whoami: () => (
      <div className="space-y-2">
        <div className="text-primary font-semibold">Idan Gurevich</div>
        <div>Backend Engineer (Firmware / Host / Dev-ops)</div>
        <div className="text-sm text-muted-foreground">
          Specializing in C++, Test Automation, and System-Level Programming
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          <div>→ Firmware Engineering</div>
          <div>→ Automated Testing Frameworks</div>
          <div>→ DevOps & CI/CD Pipelines</div>
        </div>
      </div>
    ),
    pwd: () => <div className="text-accent font-mono">~/portfolio</div>,
    date: () => <div className="text-muted-foreground">{new Date().toString()}</div>,
    tree: () => (
      <div className="font-mono text-sm space-y-1">
        <div className="text-primary">portfolio/</div>
        <div className="ml-4">
          ├── <span className="text-accent">about</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-accent">skills</span>
        </div>
        <div className="ml-8">
          ├── <span className="text-green-400">cpp.conf</span>
        </div>
        <div className="ml-8">
          ├── <span className="text-green-400">firmware.conf</span>
        </div>
        <div className="ml-8">
          └── <span className="text-green-400">devops.conf</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-accent">projects</span>
        </div>
        <div className="ml-4">
          └── <span className="text-green-400">README.md</span>
        </div>
      </div>
    ),
    neofetch: () => (
      <div className="font-mono text-sm space-y-1">
        <div className="flex gap-8">
          <div className="text-primary text-2xl">
            <pre>{`
  _____ 
 |_   _|
   | |  
   |_|  
            `}</pre>
          </div>
          <div className="space-y-1">
            <div>
              <span className="text-primary font-bold">Name:</span> Idan Gurevich
            </div>
            <div>
              <span className="text-primary font-bold">Role:</span> Backend Engineer
            </div>
            <div>
              <span className="text-primary font-bold">Expertise:</span> C++, Firmware, DevOps
            </div>
            <div>
              <span className="text-primary font-bold">Shell:</span> /bin/bash
            </div>
            <div>
              <span className="text-primary font-bold">Uptime:</span> {new Date().getFullYear() - 2015} years
            </div>
            <div>
              <span className="text-primary font-bold">Terminal:</span> portfolio-terminal v1.0.0
            </div>
          </div>
        </div>
      </div>
    ),
    history: () => {
      const commandsOnly = history.filter((h) => h.command.trim() !== "");
      return (
        <div className="space-y-1 font-mono text-sm">
          {commandsOnly.map((item, idx) => (
            <div key={idx}>
              <span className="text-muted-foreground">{idx + 1}</span>
              <span className="ml-4 text-foreground">{item.command}</span>
            </div>
          ))}
        </div>
      );
    },
  };

  const generateParticles = (targetX: number = window.innerWidth, targetY: number = window.innerHeight) => {
    const newParticles: Particle[] = [];
    const centerX = 50;
    const centerY = 50;

    // Create particles in a spiral pattern
    for (let i = 0; i < 40; i++) {
      const angle = i * 137.5 * (Math.PI / 180); // Golden angle for natural spiral
      const radius = Math.sqrt(i) * 8;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      newParticles.push({
        id: i,
        x: x,
        y: y,
        size: Math.random() * 25 + 20,
        delay: i * 0.015,
        targetX,
        targetY,
      });
    }
    setParticles(newParticles);
  };

  const handleClose = () => {
    onStateChange(false);
    setTerminalState("closed");
  };

  const handleOpen = () => {
    setIsOpening(true);
    setTerminalState("maximized");
    onStateChange(true);
    
    // Animate button draining as terminal opens
    const drainInterval = setInterval(() => {
      setButtonFill((prev) => {
        const decrement = 100 / (800 / 16);
        return Math.max(prev - decrement, 0);
      });
    }, 16);

    setTimeout(
      () => {
        setIsOpening(false);
        clearInterval(drainInterval);
        setButtonFill(0);
      },
      800,
    );
  };

  const handleMinimize = () => {
    setIsMinimizing(true);
    onStateChange(false);
    setTimeout(() => {
      setTerminalState("minimized");
      setIsMinimizing(false);
    }, 500);
  };

  const handleMaximize = () => {
    setTerminalState("maximized");
    onStateChange(true);
  };

  const handleCommand = (cmd: string, isQuickCommand = false) => {
    try {
      const validatedCmd = commandSchema.parse(cmd);
      const trimmedCmd = validatedCmd.toLowerCase();

      let output: string | JSX.Element = "";

      if (trimmedCmd === "clear") {
        setHistory([]);
        return;
      } else if (trimmedCmd === "help") {
        output = commands.help();
      } else if (trimmedCmd === "ls") {
        output = commands.ls();
      } else if (trimmedCmd === "whoami") {
        output = commands.whoami();
      } else if (trimmedCmd === "pwd") {
        output = commands.pwd();
      } else if (trimmedCmd === "date") {
        output = commands.date();
      } else if (trimmedCmd === "tree") {
        output = commands.tree();
      } else if (trimmedCmd === "neofetch") {
        output = commands.neofetch();
      } else if (trimmedCmd === "history") {
        output = commands.history();
      } else if (trimmedCmd.startsWith("echo ")) {
        const text = trimmedCmd.substring(5);
        output = <span className="text-foreground">{text}</span>;
      } else if (trimmedCmd.startsWith("cat ")) {
        const file = trimmedCmd.substring(4).trim();
        const files: { [key: string]: JSX.Element } = {
          "README.md": (
            <div className="space-y-2 text-sm">
              <div className="text-primary font-bold"># Idan Gurevich - Portfolio</div>
              <div className="text-muted-foreground">
                Backend Engineer specializing in firmware, host systems, and DevOps.
              </div>
              <div className="mt-2">Use the terminal to navigate through my portfolio.</div>
            </div>
          ),
          "skills.json": (
            <div className="font-mono text-sm">
              <div>{`{`}</div>
              <div className="ml-4">"languages": ["C++", "Python", "Bash"],</div>
              <div className="ml-4">"tools": ["CMake", "GCC", "Jenkins"],</div>
              <div className="ml-4">"expertise": ["Firmware", "Testing", "DevOps"]</div>
              <div>{`}`}</div>
            </div>
          ),
        };
        output = files[file] || <span className="text-destructive">cat: {file}: No such file or directory</span>;
      } else if (trimmedCmd.startsWith("nano ")) {
        const file = trimmedCmd.substring(5).trim();
        const validSections: ("about" | "skills" | "projects")[] = [
          "about",
          "skills",
          "projects",
        ];

        if (validSections.includes(file as any)) {
          setNanoSection(file as "about" | "skills" | "projects");
          output = <span className="text-primary">Opening {file} in nano...</span>;
        } else {
          output = <span className="text-destructive">nano: {file}: No such file</span>;
        }
      } else if (trimmedCmd.startsWith("cd ")) {
        const path = trimmedCmd.substring(3).trim();
        if (path === "~" || path === "") {
          output = <span className="text-muted-foreground">Changed directory to ~</span>;
        } else {
          output = <span className="text-destructive">cd: {path}: No such directory</span>;
        }
      } else if (trimmedCmd === "") {
        output = "";
      } else {
        output = (
          <span className="text-destructive">Command not found: {trimmedCmd}. Type 'help' for available commands.</span>
        );
      }

      setHistory((prev) => [
        ...prev,
        {
          command: isQuickCommand ? `⚡ ${cmd}` : cmd,
          output,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: <span className="text-destructive">Error: Invalid command</span>,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
      setCommandHistoryIndex(-1);
      setTabCompletions([]);
      setTabIndex(0);
    }
  };

  const getCompletions = (partial: string) => {
    const allCommands = Object.keys(commands);
    const sections = ["about", "skills", "projects"];
    const files = ["README.md", "skills.json"];
    const echoSuggestions = [
      "echo Hello World",
      "echo Backend Engineer",
      "echo C++ Developer",
      "echo Available for opportunities",
    ];

    // nano command completion
    if (partial.startsWith("nano ")) {
      const pathPart = partial.substring(5);
      return sections.filter((dir) => dir.startsWith(pathPart)).map((dir) => `nano ${dir}`);
    }

    // cat command completion
    if (partial.startsWith("cat ")) {
      const pathPart = partial.substring(4);
      return files.filter((file) => file.toLowerCase().startsWith(pathPart.toLowerCase())).map((file) => `cat ${file}`);
    }

    // cd command completion
    if (partial.startsWith("cd ")) {
      const pathPart = partial.substring(3);
      return ["~"].filter((dir) => dir.startsWith(pathPart)).map((dir) => `cd ${dir}`);
    }

    // echo command completion
    if (partial.startsWith("echo ")) {
      return echoSuggestions.filter((suggestion) => 
        suggestion.toLowerCase().startsWith(partial.toLowerCase())
      );
    }

    // If just "echo", show all suggestions
    if (partial === "echo" || partial === "ech" || partial === "ec") {
      return allCommands.filter((cmd) => cmd.startsWith(partial));
    }

    // Base command completion
    return allCommands.filter((cmd) => cmd.startsWith(partial));
  };

  const handleNanoKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" || (e.ctrlKey && e.key === "z")) {
      e.preventDefault();
      setNanoSection(null);
    }
  };

  useEffect(() => {
    if (nanoSection) {
      window.addEventListener("keydown", handleNanoKeyDown);
      return () => window.removeEventListener("keydown", handleNanoKeyDown);
    }
  }, [nanoSection]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const commandsOnly = history.filter((h) => h.command.trim() !== "" && !h.command.startsWith("⚡"));

    if (e.key === "Tab") {
      e.preventDefault();
      const completions = getCompletions(input.toLowerCase());

      if (completions.length === 0) return;

      if (tabCompletions.length === 0) {
        setTabCompletions(completions);
        setTabIndex(0);
        setInput(completions[0]);
      } else {
        const nextIndex = (tabIndex + 1) % tabCompletions.length;
        setTabIndex(nextIndex);
        setInput(tabCompletions[nextIndex]);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandsOnly.length > 0) {
        const newIndex = commandHistoryIndex < commandsOnly.length - 1 ? commandHistoryIndex + 1 : commandHistoryIndex;
        setCommandHistoryIndex(newIndex);
        setInput(commandsOnly[commandsOnly.length - 1 - newIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistoryIndex > 0) {
        const newIndex = commandHistoryIndex - 1;
        setCommandHistoryIndex(newIndex);
        setInput(commandsOnly[commandsOnly.length - 1 - newIndex].command);
      } else if (commandHistoryIndex === 0) {
        setCommandHistoryIndex(-1);
        setInput("");
      }
    } else {
      setTabCompletions([]);
      setTabIndex(0);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (terminalState === "maximized" && !nanoSection) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [terminalState, nanoSection]);

  // Notify parent of initial state
  useEffect(() => {
    onStateChange(terminalState === "maximized");
  }, []);

  // Listen for terminal commands from quick actions
  useEffect(() => {
    const handleTerminalCommand = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      handleCommand(customEvent.detail, true);
    };

    window.addEventListener("terminal-command", handleTerminalCommand);
    return () => window.removeEventListener("terminal-command", handleTerminalCommand);
  }, [history]);

  return (
    <>
      {/* Full-page nano view */}
      <AnimatePresence>
        {nanoSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <div className="h-full flex flex-col">
              <div className="bg-black border-b border-primary/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">GNU nano 7.2</span>
                  <span className="text-muted-foreground text-sm">~/{nanoSection}</span>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  <span className="text-accent">^Z</span> Exit | <span className="text-accent">ESC</span> Close
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <SectionPreview section={nanoSection} onClose={() => setNanoSection(null)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalState !== "closed" && (
          <motion.div
            className={`z-50 ${
              terminalState === "minimized" ? "fixed w-80 bottom-6 right-6" : "w-full max-w-4xl mx-auto px-4 mb-8"
            }`}
            initial={
              isOpening
                ? { 
                    scale: 0.05,
                    x: window.innerWidth / 2 - 100,
                    y: window.innerHeight / 2 - 100,
                    opacity: 0.3,
                  }
                : terminalState === "minimized" 
                  ? { x: "calc(100% + 24px)", scale: 0.8, opacity: 0 } 
                  : { scale: 0.95, opacity: 0 }
            }
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
            }}
            exit={
              terminalState === "minimized"
                ? {
                    x: "calc(100% + 24px)",
                    scale: 0.8,
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.34, 1.26, 0.64, 1],
                    }
                  }
                : {
                    opacity: 0,
                    transition: {
                      duration: 0.15,
                    }
                  }
            }
            transition={
              isMinimizing
                ? {
                    duration: 0.5,
                    ease: [0.34, 1.26, 0.64, 1],
                  }
                : {
                    type: "spring",
                    damping: 20,
                    stiffness: 160,
                    mass: 0.8,
                  }
            }
          >
            <div className="relative">
              {/* Scan line effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-[scan_3s_linear_infinite]"
                  style={{ height: "50%" }}
                />
              </div>

              {/* Terminal Window */}
              <motion.div
                className={`bg-card/95 backdrop-blur-sm border border-primary/30 rounded-xl shadow-[var(--shadow-elegant)] overflow-hidden relative ${
                  terminalState === "minimized" ? "h-14" : ""
                }`}
                animate={{
                  opacity: isMinimizing ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-primary/10 border-b border-primary/20">
                <TerminalIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-foreground">portfolio@terminal:~</span>
                {/* Online Status Indicator */}
                <div className="flex items-center gap-1.5 ml-3">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono tracking-wider">ONLINE</span>
                </div>
                <div className="ml-auto flex gap-1.5 items-center">
                  {terminalState === "maximized" && (
                    <button
                      onClick={handleClose}
                      className="h-3 w-3 rounded-full bg-destructive/60 hover:bg-destructive transition-colors"
                      title="Close"
                    />
                  )}
                    <button
                      onClick={() => {
                        if (terminalState === "maximized") {
                          handleMinimize();
                        } else {
                          handleMaximize();
                        }
                      }}
                      className="h-3 w-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors"
                      title={terminalState === "maximized" ? "Minimize" : "Maximize"}
                    />
                    {terminalState === "maximized" && (
                      <button
                        className="h-3 w-3 rounded-full bg-primary/60 hover:bg-primary transition-colors"
                        title="Info"
                      />
                    )}
                  </div>
                </div>

                {/* Terminal Content */}
                <AnimatePresence>
                  {terminalState === "maximized" && (
                    <motion.div
                      className="flex flex-col h-[calc(100vh-200px)] max-h-[800px]"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "calc(100vh - 200px)",
                        transition: {
                          duration: 0.4,
                          ease: "easeOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div
                        ref={terminalRef}
                        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
                        onClick={() => inputRef.current?.focus()}
                      >
                        {history.map((item, idx) => (
                          <div key={idx} className="mb-3">
                            {item.command && (
                              <div className="flex items-start gap-2">
                                <span className="text-primary">$</span>
                                <span className="text-foreground">{item.command}</span>
                              </div>
                            )}
                            {item.output && <div className="mt-1 ml-4 text-muted-foreground">{item.output}</div>}
                          </div>
                        ))}

                        {/* Input Line */}
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                          <span className="text-primary">$</span>
                          <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono caret-primary"
                            placeholder="Type a command..."
                            autoComplete="off"
                            spellCheck={false}
                            maxLength={500}
                          />
                        </form>

                        {/* Show completions inline below input */}
                        {tabCompletions.length > 0 && (
                          <div className="mt-2 ml-4 text-xs text-muted-foreground font-mono">
                            <span className="text-accent">Tab to cycle:</span>{" "}
                            {tabCompletions.map((comp, idx) => (
                              <span key={idx} className={idx === tabIndex ? "text-primary font-bold" : ""}>
                                {idx > 0 && " | "}
                                {comp}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles Overlay - Only for closing animation */}
      <AnimatePresence>
        {isClosing && false && // Disabled particles, using smooth animation instead
          particles.map((particle) => {
            const spiralAngle = particle.id * 0.5;
            const spiralRadius = 100 - particle.id * 2;

            return (
              <motion.div
                key={particle.id}
                className="fixed bg-card/95 backdrop-blur-sm overflow-hidden z-[60]"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  borderRadius: "8px",
                  boxShadow: "none",
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                }}
                animate={
                  {
                    // Closing animation - collapse to button center
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1, 0.8, 0.05],
                    rotate: [0, spiralAngle * 180, spiralAngle * 1080],
                    x: [
                      0,
                      Math.cos(spiralAngle) * spiralRadius * 1.5,
                      particle.targetX - (window.innerWidth * particle.x) / 100 - particle.size / 2,
                    ],
                    y: [
                      0,
                      Math.sin(spiralAngle) * spiralRadius * 1.5,
                      particle.targetY - (window.innerHeight * particle.y) / 100 - particle.size / 2,
                    ],
                  }
                }
                transition={{
                  duration: 1.4,
                  delay: particle.delay,
                  ease: [0.34, 0.01, 0.01, 1] as const,
                  times: [0, 0.3, 0.85, 1],
                }}
              />
            );
          })}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {terminalState === "closed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1] as const,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Button container with fill effect */}
            <motion.div
              className="relative h-14 w-14 rounded-full overflow-hidden"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
            >
              {/* Base background - always visible */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent" />

              {/* Fill overlay - shows during opening (draining effect) */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-full bg-gradient-to-t from-primary via-accent to-primary"
                style={{
                  height: isOpening ? `${buttonFill}%` : "0%",
                  opacity: buttonFill > 0 ? 1 : 0,
                  transformOrigin: "bottom",
                }}
              />

              {/* Button content */}
              <Button
                onClick={handleOpen}
                disabled={isOpening}
                className="absolute inset-0 h-14 w-14 rounded-full shadow-[var(--shadow-glow)] bg-transparent hover:scale-110 transition-all duration-300"
                aria-label="Open terminal"
              >
                <TerminalIcon className="w-6 h-6 relative z-10 text-white" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalInterface;
