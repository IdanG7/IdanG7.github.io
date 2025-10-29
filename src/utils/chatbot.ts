/**
 * Portfolio Chatbot Service
 * Provides natural language question-answering about Idan Gurevich's portfolio
 */

export interface ChatbotResponse {
  answer: string;
  suggestions?: string[];
}

// Knowledge base organized by topic
const KNOWLEDGE_BASE = {
  personal: {
    name: "Idan Gurevich",
    location: "Toronto, Ontario, Canada",
    title: "Backend Engineer & Firmware Whisperer",
    bio: "Backend engineer specializing in C++ development with deep expertise in firmware engineering, host systems, and DevOps automation. I build robust, high-performance solutions that power critical infrastructure. My work focuses on automated testing frameworks, firmware validation, and continuous integration pipelines.",
    yearsOfExperience: "2+ years",
    availability: "Available for opportunities"
  },

  experience: {
    current: {
      title: "Junior Software Developer",
      company: "WDI Wise Device Inc.",
      location: "Vaughan, ON",
      period: "Jan 2025 – Present",
      responsibilities: [
        "Administering 70+ Jenkins projects",
        "Engineering automated CI/CD integrations (reduced errors by 30%)",
        "Developing C++ components for NIR imaging systems with real-time processing algorithms",
        "Building API-driven testing tools",
        "Mentoring junior developers"
      ]
    },
    previous: {
      title: "Software Co-op Student",
      company: "WDI Wise Device Inc.",
      location: "Vaughan, ON",
      period: "May 2024 – Jan 2025",
      responsibilities: [
        "Supporting large-scale Jenkins infrastructure",
        "Developing Groovy automation scripts",
        "Collaborating with QA to resolve 100+ issues",
        "Strengthening release delivery timelines"
      ]
    }
  },

  education: [
    {
      degree: "Bachelor of Computer Science (Honors)",
      institution: "Toronto Metropolitan University",
      location: "Toronto, Ontario",
      period: "2023-2027",
      status: "In Progress"
    },
    {
      degree: "High School Diploma",
      institution: "Stephen Lewis Secondary School",
      location: "Vaughan, Ontario",
      period: "2019-2022",
      status: "Completed"
    }
  ],

  skills: {
    languages: ["C++", "C", "Python", "C#", "Java", "Bash", "Groovy"],
    devops: ["Jenkins", "Docker", "Git", "GitHub Actions", "SVN", "AWS", "Kubernetes"],
    tools: ["Visual Studio", "VS Code", "IntelliJ", "PyCharm", "AutoIt"],
    databases: ["PostgreSQL", "Redis"],
    backend: ["FastAPI", "NATS"],
    libraries: ["OpenCV", "PhysX", "YAML", "OpenTelemetry"],
    systems: ["Linux", "Windows"],
    monitoring: ["JIRA", "Monday.com", "Prometheus", "Grafana"]
  },

  projects: {
    aeroforge: {
      name: "AeroForge",
      status: "Work in Progress",
      description: "Cross-platform C++20 framework for vision-based drone control with real-time object detection and autonomous navigation.",
      tech: ["C++20", "OpenCV", "Computer Vision", "Drones"],
      metrics: {
        latency: "Sub-frame",
        safety: "5 layers",
        platform: "Cross-platform (Windows, macOS, Linux)"
      },
      features: [
        "Interactive object selection via click-and-drag tracking",
        "High-performance template matching with Kalman filtering",
        "Complete processing chain: detection → tracking → 3D estimation → PID control",
        "Professional ImGui-based HUD with real-time telemetry",
        "Comprehensive safety mechanisms (geofence, hold-to-enable, e-stop, speed limits)",
        "YAML-based runtime configuration",
        "Full testing suite using Catch2 framework",
        "Optional DJI SDK integration for real drone hardware"
      ],
      github: "https://github.com/IdanG7/AeroForge"
    },
    multiplayerSdk: {
      name: "Multiplayer SDK",
      status: "Production",
      description: "Production-grade distributed matchmaking and game services platform supporting real-time session allocation at scale.",
      tech: ["C++17", "Python", "Microservices", "Docker"],
      metrics: {
        latency: "<100ms",
        concurrentPlayers: "10K+",
        services: "5+"
      },
      features: [
        "MMR-based dynamic matchmaking queues with region and latency constraints",
        "Sub-100ms matching latency supporting 10,000+ concurrent players",
        "Modular backend services: Auth, Lobby, Session, Leaderboard",
        "Asynchronous communication via NATS message broker",
        "PostgreSQL for persistent storage, Redis for caching",
        "Full OpenTelemetry observability (Prometheus, Grafana, Jaeger)",
        "Kubernetes-ready deployment with Docker containerization",
        "FastAPI-based REST endpoints for client integration"
      ],
      github: "https://github.com/IdanG7"
    }
  },

  contact: {
    email: "Idan.gurevich@gmail.com",
    linkedin: "linkedin.com/in/idan-gurevich-b955861b8",
    github: "github.com/IdanG7",
    resume: "/resume.pdf"
  }
};

// Question patterns for intent detection
const QUESTION_PATTERNS = {
  // Personal & Bio
  name: [/\b(what'?s? your|who are you|your name|who'?s this)\b/i, /\bname\b/i],
  bio: [/\b(about (you|yourself)|who are you|tell me about|background|introduction)\b/i],
  location: [/\b(where (are you|do you live)|location|based|from)\b/i],
  title: [/\b(what do you do|job title|position|role|what'?s? your (job|role|title))\b/i],
  availability: [/\b(available|hiring|looking for (work|job)|open to|job search)\b/i],

  // Experience
  experience: [/\b(work experience|job history|work|worked|career|professional)\b/i],
  currentJob: [/\b(current (job|role|position|work)|where do you work|working at)\b/i],
  company: [/\b(company|employer|wdi|wise device)\b/i],
  responsibilities: [/\b(what do you do|responsibilities|duties|tasks)\b/i],

  // Education
  education: [/\b(education|school|university|college|degree|study|studying)\b/i],

  // Skills
  skills: [/\b(skills|technologies|tech stack|languages|tools|know|proficient|good at)\b/i],
  cpp: [/\b(c\+\+|cpp|cplusplus)\b/i],
  python: [/\bpython\b/i],
  devops: [/\b(devops|jenkins|docker|kubernetes|ci\/?cd|continuous integration)\b/i],
  databases: [/\b(database|sql|postgres|redis)\b/i],

  // Projects
  projects: [/\b(projects?|built|building|working on|portfolio|github)\b/i],
  aeroforge: [/\b(aeroforge|aero forge|drone|computer vision|opencv)\b/i],
  multiplayer: [/\b(multiplayer|sdk|matchmaking|game|gaming)\b/i],

  // Contact
  contact: [/\b(contact|reach (you|out)|email|get in touch|hire)\b/i],
  resume: [/\b(resume|cv|curriculum vitae)\b/i],
  linkedin: [/\blinkedin\b/i],
  github: [/\bgithub\b/i],

  // General
  help: [/\b(help|how to|what can (you|i)|commands)\b/i],
  thanks: [/\b(thanks|thank you|thx|appreciate)\b/i]
};

/**
 * Detect the intent of a user's question
 */
function detectIntent(question: string): string[] {
  const lowerQuestion = question.toLowerCase();
  const intents: string[] = [];

  for (const [intent, patterns] of Object.entries(QUESTION_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(lowerQuestion)) {
        intents.push(intent);
        break;
      }
    }
  }

  return intents.length > 0 ? intents : ['unknown'];
}

/**
 * Generate a natural response based on detected intents
 */
function generateResponse(intents: string[], question: string): ChatbotResponse {
  const responses: string[] = [];
  const suggestions: string[] = [];

  // Handle specific intents
  if (intents.includes('name')) {
    responses.push(`My name is ${KNOWLEDGE_BASE.personal.name}.`);
    suggestions.push("What do you do?", "Tell me about your experience");
  }

  if (intents.includes('bio') || intents.includes('title')) {
    responses.push(`I'm ${KNOWLEDGE_BASE.personal.name}, a ${KNOWLEDGE_BASE.personal.title}.`);
    responses.push(KNOWLEDGE_BASE.personal.bio);
    suggestions.push("What projects are you working on?", "What are your skills?");
  }

  if (intents.includes('location')) {
    responses.push(`I'm based in ${KNOWLEDGE_BASE.personal.location}.`);
  }

  if (intents.includes('availability')) {
    responses.push(`I'm currently ${KNOWLEDGE_BASE.personal.availability.toLowerCase()}.`);
    responses.push(`Feel free to reach out at ${KNOWLEDGE_BASE.contact.email}`);
    suggestions.push("How can I contact you?", "Show me your resume");
  }

  if (intents.includes('currentJob') || intents.includes('company') || intents.includes('responsibilities')) {
    const job = KNOWLEDGE_BASE.experience.current;
    responses.push(`I currently work as a ${job.title} at ${job.company} in ${job.location}.`);
    responses.push(`I've been in this role since ${job.period.split('–')[0].trim()}.`);
    responses.push("\nKey responsibilities:");
    job.responsibilities.forEach(resp => {
      responses.push(`  • ${resp}`);
    });
    suggestions.push("What's your tech stack?", "Tell me about your projects");
  }

  if (intents.includes('experience') && !intents.includes('currentJob')) {
    const current = KNOWLEDGE_BASE.experience.current;
    const previous = KNOWLEDGE_BASE.experience.previous;
    responses.push(`I have ${KNOWLEDGE_BASE.personal.yearsOfExperience} of professional experience.`);
    responses.push(`\nCurrent: ${current.title} at ${current.company} (${current.period})`);
    responses.push(`Previous: ${previous.title} at ${previous.company} (${previous.period})`);
    suggestions.push("What do you do at your current job?", "What are your skills?");
  }

  if (intents.includes('education')) {
    responses.push("Education:");
    KNOWLEDGE_BASE.education.forEach(edu => {
      responses.push(`\n${edu.degree} - ${edu.status}`);
      responses.push(`${edu.institution}, ${edu.location} (${edu.period})`);
    });
    suggestions.push("What programming languages do you know?", "What projects have you built?");
  }

  if (intents.includes('skills')) {
    responses.push("Here's an overview of my technical skills:\n");
    responses.push(`Languages: ${KNOWLEDGE_BASE.skills.languages.join(', ')}`);
    responses.push(`DevOps: ${KNOWLEDGE_BASE.skills.devops.join(', ')}`);
    responses.push(`Databases: ${KNOWLEDGE_BASE.skills.databases.join(', ')}`);
    responses.push(`Libraries: ${KNOWLEDGE_BASE.skills.libraries.join(', ')}`);
    responses.push("\nMy primary focus is C++ and DevOps automation.");
    suggestions.push("Tell me about AeroForge", "What's your experience with Jenkins?");
  }

  if (intents.includes('cpp')) {
    responses.push("C++ is my primary language! I specialize in C++17/20 development.");
    responses.push("I use it for firmware engineering, real-time systems, and high-performance applications.");
    responses.push("Check out my AeroForge and Multiplayer SDK projects to see C++ in action!");
    suggestions.push("Tell me about AeroForge", "What other languages do you know?");
  }

  if (intents.includes('devops')) {
    responses.push("DevOps is a major part of my work! I currently manage 70+ Jenkins projects.");
    responses.push("My expertise includes CI/CD pipelines, Docker, Kubernetes, and infrastructure automation.");
    responses.push("I've reduced deployment errors by 30% through automated integrations.");
    suggestions.push("What's your current role?", "Tell me about your skills");
  }

  if (intents.includes('projects')) {
    responses.push("I'm working on two major projects:\n");
    responses.push(`1. ${KNOWLEDGE_BASE.projects.aeroforge.name} - ${KNOWLEDGE_BASE.projects.aeroforge.description}`);
    responses.push(`   Tech: ${KNOWLEDGE_BASE.projects.aeroforge.tech.join(', ')}`);
    responses.push(`\n2. ${KNOWLEDGE_BASE.projects.multiplayerSdk.name} - ${KNOWLEDGE_BASE.projects.multiplayerSdk.description}`);
    responses.push(`   Tech: ${KNOWLEDGE_BASE.projects.multiplayerSdk.tech.join(', ')}`);
    suggestions.push("Tell me more about AeroForge", "Tell me about Multiplayer SDK");
  }

  if (intents.includes('aeroforge')) {
    const project = KNOWLEDGE_BASE.projects.aeroforge;
    responses.push(`${project.name} (${project.status})`);
    responses.push(project.description);
    responses.push(`\nTech Stack: ${project.tech.join(', ')}`);
    responses.push("\nKey Features:");
    project.features.slice(0, 5).forEach(feature => {
      responses.push(`  • ${feature}`);
    });
    responses.push(`\nGitHub: ${project.github}`);
    suggestions.push("What other projects do you have?", "What's your experience with OpenCV?");
  }

  if (intents.includes('multiplayer')) {
    const project = KNOWLEDGE_BASE.projects.multiplayerSdk;
    responses.push(`${project.name} (${project.status})`);
    responses.push(project.description);
    responses.push(`\nTech Stack: ${project.tech.join(', ')}`);
    responses.push(`\nPerformance: ${project.metrics.latency} latency, ${project.metrics.concurrentPlayers} concurrent players`);
    responses.push("\nKey Features:");
    project.features.slice(0, 5).forEach(feature => {
      responses.push(`  • ${feature}`);
    });
    suggestions.push("Tell me about AeroForge", "What databases do you use?");
  }

  if (intents.includes('contact')) {
    responses.push("You can reach me through:");
    responses.push(`  • Email: ${KNOWLEDGE_BASE.contact.email}`);
    responses.push(`  • LinkedIn: ${KNOWLEDGE_BASE.contact.linkedin}`);
    responses.push(`  • GitHub: ${KNOWLEDGE_BASE.contact.github}`);
    responses.push(`\nI'm ${KNOWLEDGE_BASE.personal.availability.toLowerCase()}!`);
  }

  if (intents.includes('resume')) {
    responses.push(`You can download my resume at: ${KNOWLEDGE_BASE.contact.resume}`);
    responses.push("Or use the command: nano contact");
  }

  if (intents.includes('linkedin')) {
    responses.push(`Connect with me on LinkedIn: ${KNOWLEDGE_BASE.contact.linkedin}`);
  }

  if (intents.includes('github')) {
    responses.push(`Check out my GitHub: ${KNOWLEDGE_BASE.contact.github}`);
    responses.push("You'll find AeroForge and other projects there!");
  }

  if (intents.includes('help')) {
    responses.push("I can answer questions about:");
    responses.push("  • My background and experience");
    responses.push("  • Technical skills and expertise");
    responses.push("  • Projects (AeroForge, Multiplayer SDK)");
    responses.push("  • Education and career");
    responses.push("  • How to contact me");
    responses.push("\nJust ask naturally, like 'What do you do?' or 'Tell me about your projects'");
    responses.push("You can also use terminal commands like 'ls', 'cat', 'nano', etc.");
  }

  if (intents.includes('thanks')) {
    responses.push("You're welcome! Feel free to ask anything else.");
    responses.push("Type 'help' to see available commands, or just ask me a question!");
  }

  // Unknown intent - provide helpful fallback
  if (intents.includes('unknown') || responses.length === 0) {
    responses.push("I'm not sure I understand that question.");
    responses.push("\nHere are some things you can ask me:");
    suggestions.push(
      "What do you do?",
      "Tell me about your experience",
      "What are your skills?",
      "What projects have you built?",
      "How can I contact you?"
    );
  }

  return {
    answer: responses.join('\n'),
    suggestions: suggestions.length > 0 ? suggestions : undefined
  };
}

/**
 * Main chatbot function - processes a question and returns an answer
 */
export function askChatbot(question: string): ChatbotResponse {
  // Trim and validate input
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      answer: "Please ask me a question! For example:\n  • What do you do?\n  • Tell me about your projects\n  • What are your skills?",
      suggestions: ["What do you do?", "Tell me about your experience", "What projects have you built?"]
    };
  }

  // Detect intent and generate response
  const intents = detectIntent(trimmedQuestion);
  return generateResponse(intents, trimmedQuestion);
}

/**
 * Check if a command looks like a question (for auto-detection)
 */
export function isQuestion(command: string): boolean {
  const trimmed = command.trim();

  // Check if it ends with a question mark
  if (trimmed.endsWith('?')) return true;

  // Check if it starts with question words
  const questionStarters = [
    'what', 'who', 'where', 'when', 'why', 'how',
    'can you', 'could you', 'would you',
    'do you', 'are you', 'is there',
    'tell me', 'show me', 'explain'
  ];

  const lowerCommand = trimmed.toLowerCase();
  return questionStarters.some(starter => lowerCommand.startsWith(starter));
}
