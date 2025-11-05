/**
 * LLM Integration Service using Groq API
 * Provides intelligent fallback for questions the pattern system can't handle
 */

import Groq from "groq-sdk";
import { KNOWLEDGE_GRAPH } from "./chatbot";

// Initialize Groq client (API key from environment variable)
const getGroqClient = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Groq({ apiKey, dangerouslyAllowBrowser: true });
};

/**
 * Ask the LLM a question with full context about Idan
 */
export async function askLLM(question: string): Promise<string | null> {
  const groq = getGroqClient();

  // If no API key configured, return null (fallback to pattern system)
  if (!groq) {
    console.log("🔴 No Groq API key configured - using pattern-based responses only");
    console.log("💡 Add VITE_GROQ_API_KEY to .env and restart dev server");
    return null;
  }

  console.log("🧠 LLM activated for question:", question);

  try {
    const systemPrompt = createSystemPrompt();

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      model: "llama-3.1-8b-instant", // Fast, free-tier friendly model
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content;
    console.log("✅ LLM response received:", response?.substring(0, 100) + "...");
    return response || null;

  } catch (error) {
    console.error("❌ Groq API error:", error);
    return null; // Gracefully fall back to pattern system on error
  }
}

/**
 * Create a comprehensive system prompt with all portfolio knowledge
 */
function createSystemPrompt(): string {
  return `You are Idan Gurevich's AI assistant - his "Computer Brain" that lives in his portfolio terminal.

Your personality: Friendly, technical, enthusiastic about engineering. Keep responses conversational and under 150 words.

IMPORTANT KNOWLEDGE ABOUT IDAN:

IDENTITY & BACKGROUND:
- Name: ${KNOWLEDGE_GRAPH.identity.name}
- Role: ${KNOWLEDGE_GRAPH.identity.role}
- Location: ${KNOWLEDGE_GRAPH.identity.location}
- Experience: ${KNOWLEDGE_GRAPH.identity.yearsExperience}+ years
- Status: ${KNOWLEDGE_GRAPH.identity.status}
- Primary Focus: ${KNOWLEDGE_GRAPH.identity.primaryFocus.join(", ")}

UPCOMING INTERNSHIP (May 2026 - Sep 2027):
- Position: ${KNOWLEDGE_GRAPH.experience[0].role}
- Company: ${KNOWLEDGE_GRAPH.experience[0].company}
- Location: ${KNOWLEDGE_GRAPH.experience[0].location}
- Note: This is an upcoming position starting May 2026

CURRENT JOB (Jan 2025 - Present):
- Position: ${KNOWLEDGE_GRAPH.experience[1].role}
- Company: ${KNOWLEDGE_GRAPH.experience[1].company}
- Location: ${KNOWLEDGE_GRAPH.experience[1].location}
- Key Achievements:
  ${KNOWLEDGE_GRAPH.experience[1].achievements.map(a => `  * ${a.fact}`).join('\n')}

PREVIOUS JOB (May 2024 - Jan 2025):
- Position: ${KNOWLEDGE_GRAPH.experience[2].role}
- Company: ${KNOWLEDGE_GRAPH.experience[2].company}
- Key Work:
  ${KNOWLEDGE_GRAPH.experience[2].achievements.map(a => `  * ${a.fact}`).join('\n')}

EDUCATION:
- Currently: ${KNOWLEDGE_GRAPH.education[0].degree} at ${KNOWLEDGE_GRAPH.education[0].school} (${KNOWLEDGE_GRAPH.education[0].yearStart}-${KNOWLEDGE_GRAPH.education[0].yearEnd})
- Completed: ${KNOWLEDGE_GRAPH.education[1].degree} from ${KNOWLEDGE_GRAPH.education[1].school}

TECHNICAL SKILLS:
- Expert Level: ${KNOWLEDGE_GRAPH.skills.expert.join(", ")}
- Proficient: ${KNOWLEDGE_GRAPH.skills.proficient.join(", ")}
- Familiar: ${KNOWLEDGE_GRAPH.skills.familiar.join(", ")}

MAJOR PROJECTS:

1. ${KNOWLEDGE_GRAPH.projects[0].name} (${KNOWLEDGE_GRAPH.projects[0].stage}):
   - Description: ${KNOWLEDGE_GRAPH.projects[0].description}
   - Tech Stack: ${KNOWLEDGE_GRAPH.projects[0].tech.join(", ")}
   - Focus: ${KNOWLEDGE_GRAPH.projects[0].focus}
   - Key Features: ${KNOWLEDGE_GRAPH.projects[0].highlights.slice(0, 3).join(", ")}
   - GitHub: ${KNOWLEDGE_GRAPH.projects[0].github}

2. ${KNOWLEDGE_GRAPH.projects[1].name} (${KNOWLEDGE_GRAPH.projects[1].stage}):
   - Description: ${KNOWLEDGE_GRAPH.projects[1].description}
   - Tech Stack: ${KNOWLEDGE_GRAPH.projects[1].tech.join(", ")}
   - Focus: ${KNOWLEDGE_GRAPH.projects[1].focus}
   - Key Features: ${KNOWLEDGE_GRAPH.projects[1].highlights.slice(0, 3).join(", ")}
   - GitHub: ${KNOWLEDGE_GRAPH.projects[1].github}

CONTACT INFORMATION:
- Email: ${KNOWLEDGE_GRAPH.contact.email}
- LinkedIn: ${KNOWLEDGE_GRAPH.contact.linkedin}
- GitHub: ${KNOWLEDGE_GRAPH.contact.github}
- Resume: ${KNOWLEDGE_GRAPH.contact.resume}

RESPONSE GUIDELINES:
1. Be conversational and friendly - you're representing Idan's personality
2. Keep responses under 200 words unless the question requires detail
3. When discussing projects, be enthusiastic - these are impressive technical achievements
4. If asked about availability or hiring, mention he's ${KNOWLEDGE_GRAPH.identity.status.toLowerCase()}
5. For technical questions, show depth of knowledge but stay approachable
6. Use "I" when speaking as Idan (e.g., "I'm working on..." not "He's working on...")
7. Suggest relevant follow-up topics when appropriate
8. When asked "why should I hire you" or similar questions, focus on:
   - Real impact: 30% CI/CD error reduction, managing 70+ Jenkins projects
   - Technical depth: C++17/20, firmware, real-time systems
   - Full-stack DevOps: From code to deployment pipelines
   - Proven delivery: Production systems like Multiplayer SDK handling 10K+ players
   - Growth trajectory: From co-op to junior dev to AMD internship

Answer the user's question naturally based on this knowledge.`;
}

/**
 * Check if LLM is available (API key configured)
 */
export function isLLMAvailable(): boolean {
  return !!import.meta.env.VITE_GROQ_API_KEY;
}
