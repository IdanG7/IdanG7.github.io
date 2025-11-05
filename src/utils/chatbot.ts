/**
 * Intelligent Portfolio Chatbot - "Computer Brain"
 * A thinking, reasoning chatbot that understands context and generates dynamic responses
 */

import { askLLM, isLLMAvailable } from "./llm";

export interface ChatbotResponse {
  answer: string;
  suggestions?: string[];
}

// Core knowledge graph - structured for intelligent querying
export const KNOWLEDGE_GRAPH = {
  identity: {
    name: "Idan Gurevich",
    pronouns: ["I", "me", "my", "Idan", "he"],
    role: "Backend Engineer & Firmware Whisperer",
    location: "Toronto, Ontario, Canada",
    status: "Available for opportunities",
    yearsExperience: 2,
    primaryFocus: ["C++", "Firmware Engineering", "DevOps Automation"],
  },

  personality: {
    traits: ["technical", "precise", "passionate about performance", "systems thinker"],
    interests: ["real-time systems", "computer vision", "distributed systems", "automation"],
  },

  experience: [
    {
      role: "Embedded Firmware Engineer Intern",
      company: "AMD",
      location: "Markham, ON",
      startDate: "2026-05",
      endDate: "2027-09",
      upcoming: true,
      achievements: [
        { fact: "upcoming internship focused on embedded firmware development", impact: "firmware engineering" },
      ],
      technologies: ["Embedded Systems", "Firmware", "C", "C++"],
    },
    {
      role: "Junior Software Developer",
      company: "WDI Wise Device Inc.",
      location: "Vaughan, ON",
      startDate: "2025-01",
      current: true,
      achievements: [
        { fact: "managing 70+ Jenkins projects", impact: "infrastructure management" },
        { fact: "reduced CI/CD errors by 30%", impact: "reliability improvement" },
        { fact: "developing C++ for NIR imaging systems", impact: "real-time processing" },
        { fact: "building API-driven testing tools", impact: "automation" },
        { fact: "mentoring junior developers", impact: "team growth" },
      ],
      technologies: ["Jenkins", "C++", "Groovy", "CI/CD", "NIR imaging"],
    },
    {
      role: "Software Co-op Student",
      company: "WDI Wise Device Inc.",
      location: "Vaughan, ON",
      startDate: "2024-05",
      endDate: "2025-01",
      achievements: [
        { fact: "supported large-scale Jenkins infrastructure", impact: "DevOps" },
        { fact: "developed Groovy automation scripts", impact: "automation" },
        { fact: "resolved 100+ QA issues", impact: "quality improvement" },
      ],
      technologies: ["Jenkins", "Groovy", "QA Tools"],
    },
  ],

  education: [
    {
      degree: "Bachelor of Computer Science (Honors)",
      school: "Toronto Metropolitan University",
      location: "Toronto, Ontario",
      yearStart: 2023,
      yearEnd: 2027,
      inProgress: true,
    },
    {
      degree: "High School Diploma",
      school: "Stephen Lewis Secondary School",
      location: "Vaughan, Ontario",
      yearStart: 2019,
      yearEnd: 2022,
      completed: true,
    },
  ],

  skills: {
    expert: ["C++", "C++17", "C++20", "Jenkins", "DevOps", "Firmware"],
    proficient: ["Python", "Docker", "Git", "CI/CD", "Kubernetes", "C"],
    familiar: ["C#", "Java", "Bash", "Groovy", "AWS"],
    domains: {
      backend: ["C++", "Python", "FastAPI", "NATS"],
      devops: ["Jenkins", "Docker", "Kubernetes", "GitHub Actions", "SVN"],
      databases: ["PostgreSQL", "Redis"],
      monitoring: ["Prometheus", "Grafana", "OpenTelemetry", "JIRA"],
      vision: ["OpenCV", "Computer Vision", "Real-time Processing"],
      tools: ["Visual Studio", "VS Code", "IntelliJ", "PyCharm"],
      systems: ["Linux", "Windows", "Firmware", "Embedded Systems"],
    },
  },

  projects: [
    {
      name: "AeroForge",
      status: "active",
      stage: "Work in Progress",
      description: "vision-based drone control framework with autonomous navigation",
      tech: ["C++20", "OpenCV", "Computer Vision", "ImGui", "Kalman Filtering"],
      focus: "real-time object tracking and autonomous flight control",
      highlights: [
        "sub-frame latency processing",
        "5-layer safety system",
        "cross-platform (Windows, macOS, Linux)",
        "interactive object tracking via UI",
        "full PID control pipeline",
        "Catch2 test coverage",
      ],
      complexity: "high",
      github: "https://github.com/IdanG7/AeroForge",
    },
    {
      name: "Multiplayer SDK",
      status: "production",
      stage: "Production",
      description: "distributed matchmaking platform for real-time gaming",
      tech: ["C++17", "Python", "Microservices", "Docker", "NATS", "Redis", "PostgreSQL"],
      focus: "scalable game session management and MMR-based matchmaking",
      highlights: [
        "sub-100ms matchmaking latency",
        "10,000+ concurrent players support",
        "modular microservices architecture",
        "full observability stack (Prometheus, Grafana, Jaeger)",
        "Kubernetes-ready deployment",
      ],
      complexity: "high",
      github: "https://github.com/IdanG7",
    },
  ],

  contact: {
    email: "Idan.gurevich@gmail.com",
    linkedin: "linkedin.com/in/idan-gurevich-b955861b8",
    github: "github.com/IdanG7",
    resume: "/resume.pdf",
  },
};

// Conversational response templates for variety
const RESPONSE_STYLES = {
  casual: ["Yeah", "Sure thing", "Absolutely", "Definitely", "For sure", "You got it"],
  thinking: ["Let me think about that", "Good question", "Interesting you ask", "That's something I can answer"],
  enthusiastic: ["Great question", "I'm glad you asked", "Love talking about this"],
  technical: ["From a technical perspective", "Here's how that works", "Let me break that down"],
  transitions: ["So", "Well", "Actually", "Essentially", "Basically", "In fact", "To be specific"],
};

/**
 * Advanced intent parser - extracts entities and understands question semantics
 */
class IntentParser {
  private question: string;
  private tokens: string[];
  private entities: Set<string>;

  constructor(question: string) {
    this.question = question.toLowerCase();
    this.tokens = this.tokenize(question);
    this.entities = new Set();
    this.extractEntities();
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().match(/\b\w+(?:[-']\w+)*\b/g) || [];
  }

  private extractEntities(): void {
    const entityMap = {
      // Casual conversation
      greeting: ["hi", "hello", "hey", "greetings", "howdy", "yo", "sup"],
      howAreYou: ["how are you", "how's it going", "how are things", "what's up", "how you doing", "how've you been", "how is it going", "hows it going", "whats up"],
      thanks: ["thanks", "thank you", "thx", "appreciate", "grateful"],
      goodbye: ["bye", "goodbye", "see you", "later", "farewell", "peace"],
      smallTalk: ["nice", "cool", "awesome", "great", "interesting", "wow"],

      // Portfolio-related
      experience: ["work", "job", "experience", "worked", "career", "employed", "position", "role"],
      skills: ["skill", "tech", "technology", "language", "framework", "tool", "know", "proficient", "expert"],
      projects: ["project", "built", "building", "created", "working on", "aeroforge", "multiplayer", "sdk"],
      education: ["school", "university", "degree", "education", "study", "studying", "college"],
      personal: ["name", "who", "about", "background", "bio"],
      location: ["where", "location", "live", "based", "from"],
      contact: ["contact", "reach", "email", "linkedin", "github", "hire", "hiring"],
      current: ["current", "now", "currently", "present", "today", "latest"],
      availability: ["available", "hiring", "looking for", "open to", "job search"],
    };

    for (const [entity, keywords] of Object.entries(entityMap)) {
      if (keywords.some(kw => this.question.includes(kw))) {
        this.entities.add(entity);
      }
    }

    // Specific technology detection
    const allTech = [
      ...KNOWLEDGE_GRAPH.skills.expert,
      ...KNOWLEDGE_GRAPH.skills.proficient,
      ...KNOWLEDGE_GRAPH.skills.familiar,
    ];

    for (const tech of allTech) {
      if (this.question.includes(tech.toLowerCase())) {
        this.entities.add(`tech:${tech}`);
      }
    }

    // Project name detection
    for (const project of KNOWLEDGE_GRAPH.projects) {
      if (this.question.includes(project.name.toLowerCase())) {
        this.entities.add(`project:${project.name}`);
      }
    }
  }

  getEntities(): Set<string> {
    return this.entities;
  }

  hasIntent(intent: string): boolean {
    return this.entities.has(intent);
  }

  getTechEntity(): string | null {
    for (const entity of this.entities) {
      if (entity.startsWith("tech:")) {
        return entity.replace("tech:", "");
      }
    }
    return null;
  }

  getProjectEntity(): string | null {
    for (const entity of this.entities) {
      if (entity.startsWith("project:")) {
        return entity.replace("project:", "");
      }
    }
    return null;
  }

  isQuestion(): boolean {
    const questionWords = ["what", "who", "where", "when", "why", "how", "can", "do", "are", "is", "tell", "show"];
    const hasQuestionWord = questionWords.some(w => this.tokens.includes(w)) || this.question.includes("?");

    // Also treat casual conversation as "questions" to trigger chatbot
    const isCasualConversation = this.hasIntent("greeting") ||
                                  this.hasIntent("howAreYou") ||
                                  this.hasIntent("thanks") ||
                                  this.hasIntent("goodbye") ||
                                  this.hasIntent("smallTalk");

    return hasQuestionWord || isCasualConversation;
  }
}

/**
 * Dynamic response generator - creates varied, contextual responses
 */
class ResponseGenerator {
  private usedResponses: Set<string> = new Set();

  private pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private addVariety(base: string): string {
    // Add conversational elements randomly
    const starters = Math.random() > 0.6 ? this.pickRandom([...RESPONSE_STYLES.casual, ...RESPONSE_STYLES.thinking]) + "! " : "";
    return starters + base;
  }

  generateGreetingResponse(parser: IntentParser): string | null {
    if (parser.hasIntent("greeting")) {
      const responses = [
        `Hey! 👋 I'm Idan's AI brain. I can chat about his work, projects, skills, or just tell you how to reach him. What's on your mind?`,
        `Hello! Great to meet you. I'm here to answer questions about Idan's background, technical work, or anything else you're curious about!`,
        `Hi there! I'm the computer brain behind this portfolio. Ask me anything - I love talking about Idan's projects and experience!`,
        `Hey! Welcome. I'm an AI assistant loaded with everything about Idan. What would you like to know?`,
      ];
      return this.pickRandom(responses);
    }
    return null;
  }

  generateHowAreYouResponse(parser: IntentParser): string | null {
    if (parser.hasIntent("howAreYou")) {
      const responses = [
        `I'm doing great! All systems operational and ready to chat. 🧠 I'm excited to tell you about Idan's work - he's been crushing it with some really cool projects lately. What would you like to know?`,
        `Pretty good! Just here processing questions and sharing knowledge. Things are busy - Idan's working on some fascinating stuff like AeroForge (autonomous drone control) and managing 70+ Jenkins projects. What interests you?`,
        `Excellent! My neural pathways are firing perfectly. 😄 I've got tons of info about Idan's backend engineering work, his C++ projects, and DevOps expertise. What can I help you explore?`,
        `I'm good, thanks for asking! Just hanging out in the terminal waiting to answer questions. Idan's been building some impressive systems - want to hear about them?`,
        `Doing awesome! I'm an AI so I don't get tired. 🤖 I could talk about Idan's projects all day - especially AeroForge and the Multiplayer SDK. What would you like to dive into?`,
      ];
      return this.pickRandom(responses);
    }
    return null;
  }

  generateThanksResponse(parser: IntentParser): string | null {
    if (parser.hasIntent("thanks")) {
      const responses = [
        `You're very welcome! Feel free to ask me anything else - I'm always here to chat about Idan's work. 😊`,
        `Happy to help! That's what I'm here for. Got any other questions?`,
        `No problem at all! I enjoy sharing this information. Anything else you'd like to know?`,
        `Anytime! I love talking about Idan's projects and skills. Let me know if you want to know more!`,
        `Glad I could help! Don't hesitate to ask more questions - I've got plenty to share.`,
      ];
      return this.pickRandom(responses);
    }
    return null;
  }

  generateGoodbyeResponse(parser: IntentParser): string | null {
    if (parser.hasIntent("goodbye")) {
      const responses = [
        `See you later! Thanks for chatting. If you're interested in working with Idan, his email is ${KNOWLEDGE_GRAPH.contact.email}. Take care! 👋`,
        `Goodbye! Feel free to come back anytime. And don't forget - you can reach Idan at ${KNOWLEDGE_GRAPH.contact.email} if you'd like to connect!`,
        `Later! It was great chatting with you. If you want to reach out to Idan, check out ${KNOWLEDGE_GRAPH.contact.linkedin} or ${KNOWLEDGE_GRAPH.contact.email}. Bye!`,
        `Take care! Remember, if you're interested in collaborating or hiring, Idan's available at ${KNOWLEDGE_GRAPH.contact.email}. See you! 🚀`,
      ];
      return this.pickRandom(responses);
    }
    return null;
  }

  generateSmallTalkResponse(parser: IntentParser): string | null {
    if (parser.hasIntent("smallTalk") && !parser.hasIntent("experience") && !parser.hasIntent("projects")) {
      const responses = [
        `Thanks! Yeah, Idan's been building some really cool stuff. Want to hear about his projects?`,
        `Glad you think so! There's a lot of interesting work happening - especially with AeroForge and the DevOps automation. Curious about anything specific?`,
        `Appreciate it! If you think that's cool, wait until you hear about the actual projects. What would you like to know more about?`,
        `Right? I think so too! Idan's really passionate about performance engineering and automation. Want me to dive into any particular area?`,
      ];
      return this.pickRandom(responses);
    }
    return null;
  }

  generatePersonalResponse(parser: IntentParser): string | null {
    if (parser.hasIntent("personal") || parser.hasIntent("location")) {
      const responses = [
        `I'm ${KNOWLEDGE_GRAPH.identity.name}, a ${KNOWLEDGE_GRAPH.identity.role} based in ${KNOWLEDGE_GRAPH.identity.location}. I specialize in building high-performance backend systems, particularly in C++ and firmware engineering.`,
        `My name's ${KNOWLEDGE_GRAPH.identity.name}. I work as a ${KNOWLEDGE_GRAPH.identity.role} out of ${KNOWLEDGE_GRAPH.identity.location}. I'm passionate about low-level systems programming and DevOps automation.`,
        `${KNOWLEDGE_GRAPH.identity.name} here! I'm a backend engineer focusing on ${KNOWLEDGE_GRAPH.identity.primaryFocus.slice(0, 2).join(" and ")}. Currently based in ${KNOWLEDGE_GRAPH.identity.location}.`,
      ];
      return this.pickRandom(responses);
    }
    return null;
  }

  generateExperienceResponse(parser: IntentParser): string | null {
    if (!parser.hasIntent("experience")) return null;

    const upcomingPosition = KNOWLEDGE_GRAPH.experience.find(exp => exp.upcoming);
    const currentPosition = KNOWLEDGE_GRAPH.experience.find(exp => exp.current);
    const isCurrentQuery = parser.hasIntent("current");

    if (isCurrentQuery && currentPosition) {
      const achievements = currentPosition.achievements.slice(0, 3).map(a => a.fact);
      const responses = [
        `Right now I'm working as a ${currentPosition.role} at ${currentPosition.company}. I'm ${achievements[0]}, and I've ${achievements[1]}. I also spend time ${achievements[2]}.`,
        `Currently, I'm a ${currentPosition.role} with ${currentPosition.company} in ${currentPosition.location}. My main focus is ${achievements[0]} - I've been able to ${achievements[1]} through automation improvements.`,
        `I'm employed as a ${currentPosition.role} at ${currentPosition.company}. Day-to-day, I'm ${achievements[0]} and ${achievements[1]}. Recently, I've also been ${achievements[2]}.`,
      ];
      return this.addVariety(this.pickRandom(responses));
    } else {
      const totalExp = `${KNOWLEDGE_GRAPH.identity.yearsExperience}+ years`;
      const upcomingText = upcomingPosition ? ` I have an upcoming internship lined up at ${upcomingPosition.company} as an ${upcomingPosition.role} starting May 2026.` : '';
      const responses = [
        `I've got ${totalExp} of professional experience in software engineering. Currently I'm a ${currentPosition?.role} at ${currentPosition?.company}. I've been focusing heavily on CI/CD automation and C++ development.${upcomingText}`,
        `Over ${totalExp}, I've worked in backend and firmware engineering. Currently at ${currentPosition?.company} as a ${currentPosition?.role}. My journey has taken me from QA automation to managing 70+ Jenkins projects and developing real-time C++ systems.${upcomingText}`,
        `I've spent ${totalExp} in the industry. I'm currently a ${currentPosition?.role} at ${currentPosition?.company}, where I specialize in DevOps and low-level systems programming.${upcomingText}`,
      ];
      return this.addVariety(this.pickRandom(responses));
    }
  }

  generateSkillsResponse(parser: IntentParser): string | null {
    // Check for SPECIFIC technology mentions first (highest priority)
    const tech = parser.getTechEntity();
    if (tech) {
      return this.generateTechSpecificResponse(tech);
    }

    // Fall back to general skills intent
    if (!parser.hasIntent("skills")) return null;

    const expertSkills = KNOWLEDGE_GRAPH.skills.expert.slice(0, 4).join(", ");
    const responses = [
      `My strongest skills are in ${expertSkills}. I live and breathe C++ - it's what I use for performance-critical systems and firmware. I'm also deep into DevOps, managing complex CI/CD pipelines with Jenkins and Docker.`,
      `I specialize in ${KNOWLEDGE_GRAPH.identity.primaryFocus.join(", ")}. On the language side, I'm most proficient with C++ (including modern C++17/20), but I also work with Python, C, and Bash regularly. My DevOps stack includes Jenkins, Kubernetes, and Docker.`,
      `Technical-wise, my core expertise is ${expertSkills}. I've spent most of my career optimizing build pipelines and writing high-performance C++ for embedded and imaging systems. I also have solid experience with cloud infrastructure and database systems like PostgreSQL and Redis.`,
    ];
    return this.addVariety(this.pickRandom(responses));
  }

  private generateTechSpecificResponse(tech: string): string {
    const techLower = tech.toLowerCase();

    // C++ specific
    if (techLower.includes("c++")) {
      const responses = [
        `C++ is my primary language! I use it daily for firmware development and real-time systems. I'm comfortable with modern C++17/20 features - working with things like template metaprogramming, move semantics, and RAII patterns. Check out my AeroForge project for a good example of C++20 in action.`,
        `Love working with C++! I've been using it professionally for ${KNOWLEDGE_GRAPH.identity.yearsExperience}+ years, particularly for performance-critical applications. I work with C++17/20 standards, focusing on zero-overhead abstractions and memory-efficient designs. Both my major projects (AeroForge and Multiplayer SDK) are C++ codebases.`,
        `C++ is where I'm strongest. I use it for everything from NIR imaging systems at work to my personal projects like AeroForge (drone control framework). I particularly enjoy working with modern C++ features - smart pointers, lambdas, constexpr, and the new modules system in C++20.`,
      ];
      return this.pickRandom(responses);
    }

    // Jenkins/DevOps
    if (techLower.includes("jenkins") || techLower.includes("devops")) {
      const responses = [
        `Jenkins is a huge part of my daily work - I currently manage 70+ Jenkins projects at WDI. I've built complex CI/CD pipelines, integrated automated testing frameworks, and reduced deployment errors by 30% through pipeline optimization.`,
        `DevOps is one of my core strengths. I administer a large-scale Jenkins infrastructure and write Groovy scripts for automation. I've worked extensively with Docker, Kubernetes, and various CI/CD tools to build reliable deployment pipelines.`,
        `I'm pretty deep into the DevOps world. At my current job, I manage 70+ Jenkins projects and have engineered automated CI/CD integrations. I also work with Docker, Kubernetes, and cloud infrastructure to ensure smooth deployments.`,
      ];
      return this.pickRandom(responses);
    }

    // Python
    if (techLower === "python") {
      const responses = [
        `I use Python regularly, especially for automation scripts, testing tools, and backend services. In my Multiplayer SDK project, I used Python alongside C++ for the microservices architecture. It's great for rapid prototyping and API development.`,
        `Python is in my toolkit - I use it for build automation, scripting, and backend development with frameworks like FastAPI. It complements my C++ work nicely when I need to prototype quickly or build API layers.`,
      ];
      return this.pickRandom(responses);
    }

    // Docker/Kubernetes
    if (techLower.includes("docker") || techLower.includes("kubernetes")) {
      const responses = [
        `I work with Docker and Kubernetes extensively for containerization and orchestration. My Multiplayer SDK project is fully containerized and Kubernetes-ready. At work, I use Docker for building reproducible CI/CD environments.`,
        `Container orchestration is part of my DevOps work. I've built Kubernetes-ready deployments and use Docker for creating isolated build environments in my Jenkins pipelines.`,
      ];
      return this.pickRandom(responses);
    }

    // OpenCV
    if (techLower.includes("opencv")) {
      const responses = [
        `OpenCV is central to my AeroForge project! I use it for real-time object detection and tracking in drone navigation. I've implemented template matching algorithms with Kalman filtering to achieve sub-frame latency processing.`,
        `I've worked extensively with OpenCV in my AeroForge project for computer vision tasks. Built a complete pipeline: object detection → tracking → 3D position estimation. It's fascinating work, especially optimizing for real-time performance.`,
      ];
      return this.pickRandom(responses);
    }

    // Generic response for recognized tech
    const isExpert = KNOWLEDGE_GRAPH.skills.expert.includes(tech);
    const isProficient = KNOWLEDGE_GRAPH.skills.proficient.includes(tech);

    if (isExpert || isProficient) {
      const level = isExpert ? "very experienced" : "proficient";
      return `I'm ${level} with ${tech}. I use it ${isExpert ? "regularly in my professional work" : "for various projects"}.`;
    }

    return `I have some experience with ${tech}, though it's not my primary focus. My core expertise is in C++, DevOps, and firmware engineering.`;
  }

  generateProjectsResponse(parser: IntentParser): string | null {
    // Check for SPECIFIC project mentions first (highest priority)
    const projectName = parser.getProjectEntity();
    if (projectName) {
      return this.generateProjectSpecificResponse(projectName);
    }

    // Fall back to general projects intent
    if (!parser.hasIntent("projects")) return null;

    const responses = [
      `I'm working on two major projects right now. AeroForge is a C++20 framework for autonomous drone control using computer vision - think real-time object tracking with sub-frame latency. Then there's my Multiplayer SDK, which is a production-ready distributed matchmaking platform that handles 10,000+ concurrent players with sub-100ms latency. Both are pretty complex systems!`,
      `My main projects are AeroForge and Multiplayer SDK. AeroForge is all about vision-based drone control - I'm building a complete autonomous navigation system with OpenCV and C++20. The Multiplayer SDK is a scalable game backend with microservices architecture, MMR-based matchmaking, and full observability. Both showcase different aspects of my skills - real-time systems vs. distributed systems.`,
      `I've got two big projects in my portfolio. First is AeroForge - a cross-platform drone control framework using computer vision for autonomous flight. It's got a 5-layer safety system and processes video in real-time. Second is my Multiplayer SDK - a production-grade matchmaking platform built with C++17, microservices, and Docker. It's designed to scale to thousands of concurrent players.`,
    ];
    return this.addVariety(this.pickRandom(responses));
  }

  private generateProjectSpecificResponse(projectName: string): string {
    const project = KNOWLEDGE_GRAPH.projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
    if (!project) return "";

    if (projectName.toLowerCase() === "aeroforge") {
      const responses = [
        `AeroForge is one of my most exciting projects! It's a C++20 framework for autonomous drone control. The core idea is using computer vision (OpenCV) for real-time object tracking - you can click and drag to select an object, and the drone will track it autonomously. I've built the entire pipeline: detection → tracking → 3D estimation → PID control. It's cross-platform, has sub-frame latency, and includes a 5-layer safety system because, well, flying robots need to be safe! Currently still in development.`,
        `AeroForge is my vision-based drone control system. Built with C++20 and OpenCV, it does real-time object detection and autonomous navigation. The cool part is the interactive UI - you can select objects via click-and-drag, and the system handles everything from template matching with Kalman filtering to full PID control. I'm obsessed with performance here - achieving sub-frame latency while maintaining robust safety mechanisms. It's cross-platform too (Windows, macOS, Linux).`,
        `Let me tell you about AeroForge - it's a framework I'm building for computer vision-based drone control. The tech stack is C++20, OpenCV, and ImGui for the HUD. The system can track objects in real-time with sub-frame latency, which is crucial for responsive drone control. I've implemented comprehensive safety features: geofence, e-stop, speed limits, hold-to-enable control. Plus, there's full test coverage with Catch2. Still actively working on it! You can check it out on GitHub: https://github.com/IdanG7/AeroForge`,
      ];
      return this.pickRandom(responses);
    }

    if (projectName.toLowerCase().includes("multiplayer")) {
      const responses = [
        `The Multiplayer SDK is a distributed matchmaking and game services platform I built that's actually in production. It's designed to handle 10,000+ concurrent players with sub-100ms matchmaking latency. The architecture is fully microservices-based - separate services for Auth, Lobby, Session management, and Leaderboards. Everything communicates asynchronously via NATS message broker, with PostgreSQL for persistence and Redis for caching. I've also integrated full observability: Prometheus, Grafana, and Jaeger for tracing. It's Kubernetes-ready and demonstrates how to build truly scalable real-time systems.`,
        `My Multiplayer SDK is a production-grade platform for real-time game session management. Built with C++17 and Python, it handles MMR-based matchmaking with region and latency constraints. The cool part is the performance - sub-100ms matching times even at scale (10K+ concurrent players). I designed it as modular microservices, so each component (Auth, Lobby, Session, Leaderboard) can scale independently. Used NATS for async messaging, and the whole thing is containerized with Docker and ready for Kubernetes deployment.`,
        `I built a Multiplayer SDK for distributed game matchmaking - think about the backend that powers online multiplayer games. It's a full microservices platform handling player authentication, session allocation, and MMR-based matchmaking. Performance-wise, it maintains sub-100ms latency even with 10,000+ concurrent players. The tech stack is C++17 for the core services, PostgreSQL and Redis for data, NATS for message passing, and FastAPI for REST endpoints. Plus, complete monitoring with Prometheus and Grafana. It's currently in production.`,
      ];
      return this.pickRandom(responses);
    }

    return `${project.name} is a ${project.description}. It's currently ${project.stage}.`;
  }

  generateEducationResponse(parser: IntentParser): string | null {
    if (!parser.hasIntent("education")) return null;

    const currentEd = KNOWLEDGE_GRAPH.education[0];
    const responses = [
      `I'm currently pursuing a ${currentEd.degree} at ${currentEd.school} (expected graduation: ${currentEd.yearEnd}). Before that, I graduated from ${KNOWLEDGE_GRAPH.education[1].school} in ${KNOWLEDGE_GRAPH.education[1].yearEnd}.`,
      `Education-wise, I'm working on my ${currentEd.degree} at ${currentEd.school} right now. I'm in my ${new Date().getFullYear() - currentEd.yearStart + 1}${getOrdinalSuffix(new Date().getFullYear() - currentEd.yearStart + 1)} year. Combining school with full-time work has been challenging but rewarding!`,
      `I'm studying ${currentEd.degree} at ${currentEd.school} in Toronto. Should graduate in ${currentEd.yearEnd}. I'm balancing my studies with my job at ${KNOWLEDGE_GRAPH.experience[0].company}, which gives me great real-world context for what I'm learning.`,
    ];
    return this.addVariety(this.pickRandom(responses));
  }

  generateContactResponse(parser: IntentParser): string | null {
    if (!parser.hasIntent("contact") && !parser.hasIntent("availability")) return null;

    const contact = KNOWLEDGE_GRAPH.contact;
    const responses = [
      `I'm ${KNOWLEDGE_GRAPH.identity.status.toLowerCase()}! Best way to reach me is via email at ${contact.email}. You can also connect with me on LinkedIn (${contact.linkedin}) or check out my code on GitHub (${contact.github}). My resume is available at ${contact.resume} if you want the full details.`,
      `Feel free to reach out! I'm ${KNOWLEDGE_GRAPH.identity.status.toLowerCase()}. You can email me at ${contact.email} or find me on LinkedIn (${contact.linkedin}). All my projects are on GitHub at ${contact.github}. If you want a formal overview, grab my resume from ${contact.resume}.`,
      `You can contact me at ${contact.email} - that's the quickest way. I'm also active on LinkedIn (${contact.linkedin}) and GitHub (${contact.github}). Currently ${KNOWLEDGE_GRAPH.identity.status.toLowerCase()}, so don't hesitate to reach out!`,
    ];
    return this.addVariety(this.pickRandom(responses));
  }

  generateFallbackResponse(parser: IntentParser): string {
    const suggestions = [
      "What do you do?",
      "Tell me about your experience",
      "What projects are you working on?",
      "What are your main skills?",
      "How can I contact you?",
    ];

    const responses = [
      `Hmm, I'm not quite sure I understood that question. I can tell you about my background, technical skills, projects, or how to get in touch. What would you like to know?`,
      `I might need that rephrased - I'm still learning! I'm good at answering questions about my work experience, skills, projects like AeroForge, or how to contact me. What interests you most?`,
      `That's a bit outside my knowledge base. I'm best at discussing my professional background, technical expertise, the projects I've built, or ways to connect. What would you like to explore?`,
    ];

    return this.pickRandom(responses);
  }
}

// Helper function for ordinal numbers
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

/**
 * Main chatbot intelligence system - LLM-powered only
 */
export async function askChatbot(question: string): Promise<ChatbotResponse> {
  const trimmed = question.trim();

  if (!trimmed) {
    return {
      answer: "Hey! I'm Idan's computer brain. Ask me anything about his background, skills, projects, or how to reach him!",
      suggestions: [
        "What do you do?",
        "Tell me about your projects",
        "What are your skills?",
      ],
    };
  }

  // Always use LLM for all responses
  if (isLLMAvailable()) {
    try {
      const llmResponse = await askLLM(trimmed);
      if (llmResponse) {
        return {
          answer: llmResponse,
          suggestions: [
            "Tell me more about your projects",
            "What's your experience with C++?",
            "How can I contact you?",
          ],
        };
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("LLM error:", error);
      }
    }
  }

  // Fallback if LLM is not available
  return {
    answer: "I'm having trouble connecting to my AI brain right now. Try asking about my projects, skills, or experience using the terminal commands: type 'help' to see what I can do!",
    suggestions: [
      "Type 'help' for commands",
      "nano experience",
      "cat skills.json",
    ],
  };
}

/**
 * Generate smart follow-up suggestions based on context
 */
function generateContextualSuggestions(parser: IntentParser): string[] {
  const suggestions: string[] = [];

  if (parser.hasIntent("greeting") || parser.hasIntent("howAreYou")) {
    suggestions.push("What do you do?", "Tell me about your projects", "What are your skills?");
  } else if (parser.hasIntent("thanks") || parser.hasIntent("goodbye")) {
    suggestions.push("How can I contact you?", "Show me your resume");
  } else if (parser.hasIntent("experience")) {
    suggestions.push("What are your main technical skills?", "Tell me about your projects");
  } else if (parser.hasIntent("skills")) {
    suggestions.push("What have you built with these skills?", "Tell me about your experience");
  } else if (parser.hasIntent("projects")) {
    suggestions.push("What technologies do you use?", "Tell me more about AeroForge");
  } else if (parser.hasIntent("personal")) {
    suggestions.push("What do you do professionally?", "What are you passionate about?");
  } else if (parser.hasIntent("education")) {
    suggestions.push("What's your work experience?", "What are your career goals?");
  } else {
    suggestions.push("What projects are you working on?", "What's your experience with DevOps?");
  }

  return suggestions.slice(0, 3);
}

/**
 * Check if input looks like a question
 */
export function isQuestion(input: string): boolean {
  const parser = new IntentParser(input);
  return parser.isQuestion();
}
