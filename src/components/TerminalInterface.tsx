import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import SectionPreview from "./SectionPreview";
import { askChatbot, isQuestion } from "@/utils/chatbot";

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
        <div className="text-primary space-y-3">
          <div className="text-xl font-bold">🧠 Computer Brain Interface v2.0</div>
          <div className="text-accent">Connecting to Idan's neural network...</div>
          <div className="text-green-400 text-sm animate-pulse">● ONLINE - AI Assistant Active</div>
          <div className="border-l-2 border-primary/50 pl-4 space-y-2 mt-3">
            <div className="text-foreground">Hey there! I'm Idan's AI-powered computer brain.</div>
            <div className="text-muted-foreground text-sm">
              I can think, understand context, and have real conversations about:
            </div>
            <div className="text-sm ml-2 space-y-1">
              <div>• My work experience and technical expertise</div>
              <div>• Projects I'm building (AeroForge, Multiplayer SDK)</div>
              <div>• Skills, technologies, and how I use them</div>
              <div>• How to get in touch or collaborate</div>
            </div>
          </div>
          <div className="text-muted-foreground text-sm mt-3">
            💬 <span className="text-accent font-semibold">Just ask naturally!</span> Try: <span className="text-primary font-mono">"What do you do?"</span> or <span className="text-primary font-mono">"Tell me about AeroForge"</span>
          </div>
          <div className="text-muted-foreground text-xs">Type 'help' for traditional terminal commands</div>
        </div>
      ),
      timestamp: new Date(),
    },
  ]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [nanoSection, setNanoSection] = useState<"about" | "skills" | "projects" | "experience" | "contact" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => (
      <div className="space-y-3">
        <div className="text-primary font-semibold text-lg">🧠 Computer Brain Commands</div>
        <div className="grid gap-1 text-sm">
          <div className="text-accent font-semibold mb-1">💬 AI Conversation (Primary Mode):</div>
          <div className="ml-4 space-y-1 mb-3">
            <div className="text-muted-foreground">
              Just type naturally! I understand context and can have real conversations.
            </div>
            <div className="text-sm space-y-1">
              <div>• <span className="text-foreground font-mono">What do you do?</span></div>
              <div>• <span className="text-foreground font-mono">Tell me about AeroForge</span></div>
              <div>• <span className="text-foreground font-mono">What's your experience with C++?</span></div>
              <div>• <span className="text-foreground font-mono">How can I contact you?</span></div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Or use: <span className="text-accent font-mono">ask [your question]</span>
            </div>
          </div>
          <div className="text-muted-foreground text-xs mt-3">Portfolio Navigation:</div>
          <div>
            <span className="text-accent font-mono">nano about</span> - View About section
          </div>
          <div>
            <span className="text-accent font-mono">nano experience</span> - View Experience section
          </div>
          <div>
            <span className="text-accent font-mono">nano skills</span> - View Skills section
          </div>
          <div>
            <span className="text-accent font-mono">nano projects</span> - View Projects section
          </div>
          <div>
            <span className="text-accent font-mono">nano contact</span> - View Contact section
          </div>
          <div className="text-muted-foreground text-xs mt-3">System Commands:</div>
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
          <div className="text-muted-foreground text-xs mt-3">Fun Commands:</div>
          <div>
            <span className="text-accent font-mono">cowsay [text]</span> - ASCII cow speaks
          </div>
          <div>
            <span className="text-accent font-mono">fortune</span> - Get a random quote
          </div>
          <div>
            <span className="text-accent font-mono">joke</span> - Random programming joke
          </div>
          <div>
            <span className="text-accent font-mono">coffee</span> - Brew some coffee
          </div>
          <div>
            <span className="text-accent font-mono">hack</span> - Initiate hacker mode
          </div>
          <div>
            <span className="text-accent font-mono">matrix</span> - Enter the matrix
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
          <span className="text-accent">experience</span>
          <span className="text-accent">skills</span>
          <span className="text-accent">projects</span>
          <span className="text-accent">contact</span>
          <span className="text-green-400">README.md</span>
          <span className="text-green-400">contact.txt</span>
          <span className="text-green-400">experience.json</span>
          <span className="text-green-400">projects.json</span>
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
          ├── <span className="text-accent">about/</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-accent">experience/</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-accent">skills/</span>
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
          ├── <span className="text-accent">projects/</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-accent">contact/</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-green-400">README.md</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-green-400">contact.txt</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-green-400">experience.json</span>
        </div>
        <div className="ml-4">
          ├── <span className="text-green-400">projects.json</span>
        </div>
        <div className="ml-4">
          └── <span className="text-green-400">skills.json</span>
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
    fortune: () => {
      const fortunes = [
        "The best way to predict the future is to implement it.",
        "Code never lies, comments sometimes do.",
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
        "First, solve the problem. Then, write the code.",
        "Simplicity is the soul of efficiency.",
        "Make it work, make it right, make it fast.",
        "The only way to go fast is to go well.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Programs must be written for people to read, and only incidentally for machines to execute.",
        "Debugging is twice as hard as writing the code. So if you write the code as cleverly as possible, you are not smart enough to debug it.",
      ];
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      return (
        <div className="space-y-2">
          <div className="text-primary border-l-2 border-primary/50 pl-4 italic">
            "{randomFortune}"
          </div>
        </div>
      );
    },
    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "Why do Java developers wear glasses? Because they can't C#.",
        "What's a programmer's favorite hangout place? The Foo Bar.",
        "Why did the programmer quit his job? Because he didn't get arrays.",
        "There are 10 types of people in the world: those who understand binary and those who don't.",
        "A programmer had a problem. He thought he could solve it with threads. has Now problems. two he",
        "Algorithm: A word used by programmers when they don't want to explain what they did.",
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return <div className="text-accent">{randomJoke}</div>;
    },
    coffee: () => (
      <div className="font-mono text-sm space-y-1">
        <pre className="text-primary">{`
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'
        `}</pre>
        <div className="text-muted-foreground">Here's your coffee! ☕ Time to code!</div>
      </div>
    ),
    hack: () => (
      <div className="font-mono text-sm space-y-2">
        <div className="text-green-400">
          <div>Initializing hack sequence...</div>
          <div>Bypassing firewall... ✓</div>
          <div>Cracking encryption... ✓</div>
          <div>Accessing mainframe... ✓</div>
          <div className="text-primary mt-2">Just kidding! I'm a portfolio site, not a hacker tool 😄</div>
        </div>
      </div>
    ),
    matrix: () => (
      <div className="font-mono text-sm space-y-1">
        <div className="text-green-400">
          <div>Wake up, Neo...</div>
          <div>The Matrix has you...</div>
          <div>Follow the white rabbit.</div>
          <div className="text-primary mt-2">🐰 Check out my projects to see what I've built!</div>
        </div>
      </div>
    ),
    cowsay: (text: string = "Hello! I'm a cow!") => {
      const message = text || "Hello! I'm a cow!";
      const bubbleLength = Math.max(message.length + 2, 20);
      const topBorder = " " + "_".repeat(bubbleLength);
      const bottomBorder = " " + "-".repeat(bubbleLength);

      return (
        <div className="font-mono text-sm">
          <pre className="text-primary">{`${topBorder}
< ${message.padEnd(bubbleLength - 2)} >
${bottomBorder}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}</pre>
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

  const handleCommand = async (cmd: string, isQuickCommand = false) => {
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
        const fileLower = file.toLowerCase();

        let fileOutput: JSX.Element | null = null;

        if (fileLower === "readme.md") {
          fileOutput = (
            <div className="space-y-3 text-sm">
              <div className="text-primary font-bold text-lg"># Idan Gurevich - Portfolio</div>

              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="text-accent font-semibold">## About</div>
                <div className="text-muted-foreground">
                  Backend Engineer specializing in C++ development, firmware engineering,
                  host systems, and DevOps automation. Passionate about building robust,
                  high-performance solutions for critical infrastructure.
                </div>
              </div>

              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="text-accent font-semibold">## Quick Start</div>
                <div className="text-muted-foreground space-y-1">
                  <div>• Type <span className="text-primary font-mono">help</span> to see all available commands</div>
                  <div>• Use <span className="text-primary font-mono">nano about</span> to view my background</div>
                  <div>• Try <span className="text-primary font-mono">nano skills</span> to see my technical stack</div>
                  <div>• Check out <span className="text-primary font-mono">nano projects</span> for my work</div>
                </div>
              </div>

              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="text-accent font-semibold">## Fun Commands</div>
                <div className="text-muted-foreground space-y-1">
                  <div>• <span className="text-primary font-mono">fortune</span> - Get a programming quote</div>
                  <div>• <span className="text-primary font-mono">joke</span> - Hear a programmer joke</div>
                  <div>• <span className="text-primary font-mono">cowsay [text]</span> - Make the cow speak</div>
                  <div>• <span className="text-primary font-mono">coffee</span> - Brew some virtual coffee</div>
                </div>
              </div>

              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="text-accent font-semibold">## Contact</div>
                <div className="text-muted-foreground">
                  📧 Idan.gurevich@gmail.com<br />
                  💼 linkedin.com/in/idangurevich<br />
                  🐙 github.com/IdanG7
                </div>
              </div>

              <div className="text-muted-foreground/60 text-xs mt-4">
                Version 1.0.0 | Built with React, TypeScript, and Tailwind CSS
              </div>
            </div>
          );
        } else if (fileLower === "skills.json") {
          fileOutput = (
            <div className="font-mono text-sm space-y-1">
              <div>{`{`}</div>
              <div className="ml-4">"categories": {`{`}</div>
              <div className="ml-8">"Languages": ["C++", "C", "Python", "C#", "Java", "Bash", "Groovy"],</div>
              <div className="ml-8">"DevOps & Cloud": ["Jenkins", "Docker", "Git", "GitHub Actions", "SVN", "AWS", "Kubernetes"],</div>
              <div className="ml-8">"Development Tools": ["Visual Studio", "VS Code", "IntelliJ", "PyCharm", "AutoIt"],</div>
              <div className="ml-8">"Databases & Backend": ["PostgreSQL", "Redis", "FastAPI", "NATS"],</div>
              <div className="ml-8">"Libraries & Frameworks": ["OpenCV", "PhysX", "YAML", "OpenTelemetry"],</div>
              <div className="ml-8">"Tools & Systems": ["Linux", "Windows", "JIRA", "Monday", "Prometheus", "Grafana"]</div>
              <div className="ml-4">{`}`}</div>
              <div>{`}`}</div>
            </div>
          );
        } else if (fileLower === "contact.txt") {
          fileOutput = (
            <div className="space-y-3 text-sm">
              <div className="text-primary font-bold">Contact Information</div>
              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-accent font-semibold">Email:</span>
                  <span className="text-muted-foreground">Idan.gurevich@gmail.com</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent font-semibold">LinkedIn:</span>
                  <span className="text-muted-foreground">linkedin.com/in/idangurevich</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent font-semibold">GitHub:</span>
                  <span className="text-muted-foreground">github.com/IdanG7</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-accent font-semibold">Location:</span>
                  <span className="text-muted-foreground">Toronto, Ontario, Canada</span>
                </div>
              </div>
              <div className="text-muted-foreground/60 text-xs mt-3">
                Feel free to reach out for opportunities or collaboration!
              </div>
            </div>
          );
        } else if (fileLower === "experience.json") {
          fileOutput = (
            <div className="font-mono text-sm space-y-1">
              <div>{`{`}</div>
              <div className="ml-4">"positions": [</div>
              <div className="ml-8">{`{`}</div>
              <div className="ml-12">"company": "AMD",</div>
              <div className="ml-12">"location": "Markham, ON",</div>
              <div className="ml-12">"title": "Embedded Firmware Engineer Intern",</div>
              <div className="ml-12">"period": "May 2026 – Sep 2027",</div>
              <div className="ml-12">"description": "Upcoming internship focused on embedded firmware development."</div>
              <div className="ml-8">{`},`}</div>
              <div className="ml-8">{`{`}</div>
              <div className="ml-12">"company": "WDI Wise Device Inc.",</div>
              <div className="ml-12">"location": "Vaughan, ON",</div>
              <div className="ml-12">"title": "Junior Software Developer",</div>
              <div className="ml-12">"period": "Jan 2025 – Present",</div>
              <div className="ml-12">"description": "Administering 70+ Jenkins projects and engineering automated CI/CD integrations that reduced errors by 30%. Developing C++ components for NIR imaging systems with real-time processing algorithms. Building API-driven testing tools and mentoring junior developers."</div>
              <div className="ml-8">{`},`}</div>
              <div className="ml-8">{`{`}</div>
              <div className="ml-12">"company": "WDI Wise Device Inc.",</div>
              <div className="ml-12">"location": "Vaughan, ON",</div>
              <div className="ml-12">"title": "Software Co-op Student",</div>
              <div className="ml-12">"period": "May 2024 – Jan 2025",</div>
              <div className="ml-12">"description": "Supporting large-scale Jenkins infrastructure and developing Groovy automation scripts. Collaborated with QA to resolve 100+ issues and strengthen release delivery timelines."</div>
              <div className="ml-8">{`}`}</div>
              <div className="ml-4">],</div>
              <div className="ml-4">"total_experience": "2+ Years"</div>
              <div>{`}`}</div>
            </div>
          );
        } else if (fileLower === "projects.json") {
          fileOutput = (
            <div className="font-mono text-sm space-y-1">
              <div>{`{`}</div>
              <div className="ml-4">"projects": [</div>
              <div className="ml-8">{`{`}</div>
              <div className="ml-12">"name": "AeroForge",</div>
              <div className="ml-12">"status": "WIP",</div>
              <div className="ml-12">"description": "Cross-platform C++20 framework for vision-based drone control with real-time object detection and autonomous navigation.",</div>
              <div className="ml-12">"tech": ["C++20", "OpenCV", "Computer Vision", "Drones"],</div>
              <div className="ml-12">"metrics": {`{`}</div>
              <div className="ml-16">"latency": "Sub-frame",</div>
              <div className="ml-16">"safety": "5 layers",</div>
              <div className="ml-16">"platform": "Cross"</div>
              <div className="ml-12">{`},`}</div>
              <div className="ml-12">"github": "https://github.com/IdanG7/AeroForge"</div>
              <div className="ml-8">{`},`}</div>
              <div className="ml-8">{`{`}</div>
              <div className="ml-12">"name": "Multiplayer SDK",</div>
              <div className="ml-12">"status": "Production",</div>
              <div className="ml-12">"description": "Production-grade distributed matchmaking and game services platform supporting real-time session allocation at scale.",</div>
              <div className="ml-12">"tech": ["C++17", "Python", "Microservices", "Docker"],</div>
              <div className="ml-12">"metrics": {`{`}</div>
              <div className="ml-16">"latency": "&lt;100ms",</div>
              <div className="ml-16">"players": "10K+",</div>
              <div className="ml-16">"services": "5+"</div>
              <div className="ml-12">{`},`}</div>
              <div className="ml-12">"github": "https://github.com/IdanG7"</div>
              <div className="ml-8">{`}`}</div>
              <div className="ml-4">]</div>
              <div>{`}`}</div>
            </div>
          );
        }

        output = fileOutput || <span className="text-destructive">cat: {file}: No such file or directory</span>;
      } else if (trimmedCmd.startsWith("nano ")) {
        const file = trimmedCmd.substring(5).trim();
        const validSections: ("about" | "skills" | "projects" | "experience" | "contact")[] = [
          "about",
          "experience",
          "skills",
          "projects",
          "contact",
        ];

        if (validSections.includes(file as any)) {
          setNanoSection(file as "about" | "skills" | "projects" | "experience" | "contact");
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
      } else if (trimmedCmd === "fortune") {
        output = commands.fortune();
      } else if (trimmedCmd === "joke") {
        output = commands.joke();
      } else if (trimmedCmd === "coffee") {
        output = commands.coffee();
      } else if (trimmedCmd === "hack") {
        output = commands.hack();
      } else if (trimmedCmd === "matrix") {
        output = commands.matrix();
      } else if (trimmedCmd.startsWith("cowsay")) {
        const text = trimmedCmd.substring(6).trim();
        output = commands.cowsay(text);
      } else if (trimmedCmd.startsWith("sudo ")) {
        const sudoCmd = trimmedCmd.substring(5).trim();
        if (sudoCmd === "rm -rf /" || sudoCmd === "rm -rf /*") {
          output = (
            <div className="space-y-2">
              <div className="text-destructive">Nice try! But I'm not falling for that one.</div>
              <div className="text-muted-foreground">This is a portfolio site, not a production server 😉</div>
            </div>
          );
        } else {
          output = (
            <div className="space-y-1">
              <div className="text-yellow-500">[sudo] password for portfolio:</div>
              <div className="text-muted-foreground">Sorry, user portfolio is not in the sudoers file.</div>
              <div className="text-muted-foreground text-xs">This incident will be reported to nobody because this is a portfolio site 😄</div>
            </div>
          );
        }
      } else if (trimmedCmd === "") {
        output = "";
      } else if (trimmedCmd.startsWith("ask ")) {
        // Explicit ask command
        const question = trimmedCmd.substring(4).trim();
        const response = await askChatbot(question);
        output = (
          <div className="space-y-2">
            <div className="text-foreground whitespace-pre-wrap">{response.answer}</div>
            {response.suggestions && response.suggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary/20">
                <div className="text-muted-foreground text-xs mb-2">You might also ask:</div>
                {response.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="text-accent text-sm ml-2">
                    • {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      } else {
        // Default: Send everything else to the LLM/chatbot
        // This allows any natural language input to work without keyword detection
        const response = await askChatbot(validatedCmd);
        output = (
          <div className="space-y-2">
            <div className="text-foreground whitespace-pre-wrap">{response.answer}</div>
            {response.suggestions && response.suggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary/20">
                <div className="text-muted-foreground text-xs mb-2">You might also ask:</div>
                {response.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="text-accent text-sm ml-2">
                    • {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
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
    const sections = ["about", "experience", "skills", "projects", "contact"];
    const files = ["README.md", "contact.txt", "experience.json", "projects.json", "skills.json"];
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
              terminalState === "minimized" ? "fixed w-96 bottom-6 right-6" : "w-full max-w-4xl mx-auto px-4 mb-8"
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
                className={`backdrop-blur-sm border rounded-xl shadow-[var(--shadow-elegant)] overflow-hidden relative ${
                  terminalState === "minimized"
                    ? "h-16 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/40 hover:border-primary/60 transition-all duration-300 cursor-pointer group"
                    : "bg-card/95 border-primary/30"
                }`}
                animate={{
                  opacity: isMinimizing ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                onClick={terminalState === "minimized" ? handleMaximize : undefined}
              >
              {/* Terminal Header */}
              <div className={`flex items-center gap-3 px-4 ${
                terminalState === "minimized"
                  ? "h-16 border-transparent"
                  : "py-3 bg-primary/10 border-b border-primary/20"
              }`}>
                <span className={`${terminalState === "minimized" ? "text-2xl" : "text-lg"}`}>🧠</span>
                <span className={`font-mono text-foreground font-semibold ${
                  terminalState === "minimized" ? "text-base" : "text-sm"
                }`}>Computer Brain</span>
                {terminalState === "minimized" ? (
                  <>
                    {/* Minimized View - Centered */}
                    <div className="flex items-center gap-2 ml-3">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                      </div>
                      <span className="text-sm text-green-400 font-mono tracking-wider font-bold">READY</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-lg border border-primary/30 group-hover:bg-primary/30 group-hover:border-primary/50 transition-all">
                      <span className="text-xs text-primary font-mono font-semibold">Click to expand</span>
                      <svg className="w-3 h-3 text-primary group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Maximized View */}
                    <span className="text-xs text-muted-foreground font-mono">v2.0</span>
                    <div className="flex items-center gap-1.5 ml-3">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                      </div>
                      <span className="text-xs text-green-400 font-mono tracking-wider font-semibold">AI ACTIVE</span>
                    </div>
                    <div className="ml-auto flex gap-2 items-center">
                      {/* Cool futuristic buttons */}
                      <button
                        onClick={handleMinimize}
                        className="group relative p-1.5 rounded-md border border-primary/30 bg-primary/5 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
                        title="Minimize"
                      >
                        <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                        <div className="absolute inset-0 rounded-md bg-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                      </button>
                      <button
                        onClick={handleClose}
                        className="group relative p-1.5 rounded-md border border-destructive/30 bg-destructive/5 hover:bg-destructive/20 hover:border-destructive/50 transition-all duration-200"
                        title="Close"
                      >
                        <svg className="w-3.5 h-3.5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div className="absolute inset-0 rounded-md bg-destructive/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                      </button>
                    </div>
                  </>
                )}
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
                            placeholder="Ask me anything or type a command..."
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
