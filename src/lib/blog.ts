export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-coming-for-junior-dev-jobs",
    title: "AI Coding Tools Are Coming for Junior Dev Jobs — Should I Panic?",
    excerpt:
      "Predictions say junior developer hiring will slow as AI handles entry-level work. Here's my honest take as someone in that exact position.",
    date: "2026-03-24",
    readTime: "7 min read",
    tags: ["AI", "Career", "Junior Dev", "Opinion"],
    content: `
<p>If you're a CS student or new developer, you've probably heard: <strong>"AI will replace junior developers."</strong></p>

<p>It showed up on my feed again last week, this time from a <a href="https://www.cio.com/article/4062024/demand-for-junior-developers-softens-as-ai-takes-over.html" target="_blank" rel="noopener noreferrer">CIO article</a> predicting that major tech companies will slow junior developer hiring as AI coding assistants handle more entry-level work. Another report from <a href="https://www.index.dev/blog/developer-productivity-statistics-with-ai-tools" target="_blank" rel="noopener noreferrer">Index.dev</a> claims AI tools offer productivity boosts of up to 55%, shifting demand away from junior coders and toward "AI-prompt engineers."</p>

<details class="blog-aside">
<summary>What's an "AI-prompt engineer"?</summary>
<p>Someone who specializes in designing effective prompts and workflows to get the most useful and accurate outputs from AI tools. For example, they might craft detailed instructions or troubleshoot the results to ensure the AI produces code or content that truly fits a project's needs.</p>
</details>

<p>Cool. Great. Love that for us.</p>

<p>I'm a third-year CS student in Ontario working as a junior developer and using AI tools daily. According to a <a href="https://www.rbcx.com/resources/ai-adoption-report" target="_blank" rel="noopener noreferrer">report from RBCx</a>, most people using AI tools feel that the changes are incremental, so when people ask if I'm worried, my answer is more nuanced than panic or denial.</p>

<h2>The Headlines Aren't Wrong — But They're Not the Full Story</h2>

<p>Let's be real: AI coding tools have gotten impressively good. GitHub Copilot, Claude, and Cursor — they can scaffold entire functions, write boilerplate, generate tests, and even debug code with surprising accuracy. I use them myself. When I'm writing firmware validation scripts or spinning up CI/CD pipeline configs, having an AI assistant auto-complete the tedious parts saves real time.</p>

<p>And the data backs it up. According to the <a href="https://survey.stackoverflow.co/2025/ai/" target="_blank" rel="noopener noreferrer">2025 Stack Overflow Developer Survey</a>, 84% of developers are already using or planning to use AI tools in their day-to-day work. That's not a fringe trend — that's the new baseline.</p>

<p>So yes, the nature of junior dev work is changing. If your skills are limited to only CRUD endpoints or converting Figma designs into React components, you should be concerned.</p>

<details class="blog-aside">
<summary>How to future-proof your career</summary>
<p>Focus on skills AI can't easily replicate — like learning core system design concepts, debugging real-world issues, and understanding how different tech stack components interact. Take on projects that challenge you to think beyond code, such as improving performance or designing for scalability. Even reading and understanding an existing codebase or participating in code reviews can help you stay relevant.</p>
</details>

<p>But here's the thing — that was never the whole job anyway.</p>

<h2>What AI Can't Do (Yet)</h2>

<p>Much of my time goes to debugging issues that cross multiple systems, where automated tools can't easily help.</p>

<p>AI tools are genuinely helpful for generating code. They're terrible at understanding <em>why</em> code exists in a specific context, how it interacts with systems it's never seen, and what the actual business requirement behind a Jira ticket is when the ticket itself is vague.</p>

<p>The junior devs who will struggle are the ones who treat coding like typing — like the value they provide is translating English requirements into syntax. That's exactly what AI is good at.</p>

<p>The junior devs who will thrive are the ones who understand systems, ask good questions, debug across boundaries, and, crucially, can evaluate whether the AI-generated code is actually correct. Right now, AI confidently generates wrong code all the time, and someone needs to catch it.</p>

<details class="blog-aside">
<summary>A real example of AI getting it wrong</summary>
<p>According to <a href="https://copilotcraft.dev/blog/ai-code-review-pitfalls" target="_blank" rel="noopener noreferrer">CopilotCraft</a>, sometimes AI-generated code may appear correct at first glance but can behave unexpectedly — like when Copilot produced a function that looked perfect but broke the app due to hidden issues such as not handling all data formats. I only noticed because I remembered a specific error case from a past bug report. If I hadn't double-checked, that bug would have made it to production and cost us serious troubleshooting hours. Stories like this remind me that human judgment still matters — and will probably do so for a long time.</p>
</details>

<h2>The Real Shift: From Code Writer to Code Reviewer</h2>

<p>Here's my honest observation from using these tools daily: AI hasn't replaced my job — it's changed it.</p>

<p>Now I spend more time reviewing, testing, and thinking about architecture, less on syntax. Generating tests is faster, and my pull request descriptions have improved.</p>

<p>If anything, AI tools have made me <em>more</em> productive in the areas that actually matter for career growth. The mechanical parts got automated. The thinking parts got amplified.</p>

<p>GitHub's chief product officer recently said that 2026 will bring "repository intelligence" — <a href="https://appliedai.tools/microsoft/github-repository-intelligence-github-copilot/" target="_blank" rel="noopener noreferrer">AI that understands not just code but the relationships and history behind it</a>. That means the code you write today might literally be analyzed by an AI agent tomorrow for context, patterns, and quality. If that doesn't motivate you to write clean, well-documented code, I don't know what will.</p>

<h2>My Advice to Fellow Students and Junior Devs</h2>

<p><strong>Don't ignore AI tools.</strong> Use them. Get good at prompting. Understand their limitations. The developers who will be most valuable are the ones who can leverage AI effectively — not the ones who pretend it doesn't exist, and not the ones who blindly accept its output.</p>

<p><strong>Go deeper, not wider.</strong> Instead of another framework, learn how systems work — networking, OS, concurrency, and debugging. These are fundamentals AI struggles with, and employers value.</p>

<details class="blog-aside">
<summary>Where to start going deeper</summary>
<p>Try courses like <strong>CS50</strong> for basics, or books like <em>Computer Systems: A Programmer's Perspective</em>. Build something like a simple shell or TCP server to understand real systems. Set a goal to master one area — such as DNS by setting up a home server, or debugging C code.</p>
</details>

<p><strong>Build things that require judgment.</strong> AI can generate a REST API. It can't decide whether you need a REST API or a message queue. It can't architect a system that gracefully handles failover. It can't sit in a meeting and figure out that the real requirement is completely different from what the PM wrote down. That's you. That's the value.</p>

<p><strong>Contribute to open source.</strong> Open source is crucial for AI development and provides a front-row seat to industry shifts.</p>

<details class="blog-aside">
<summary>Getting started with open source</summary>
<p>Find beginner-friendly projects on GitHub or join newcomer communities. Even a small contribution — a question or a documentation edit — can open opportunities. According to <a href="https://blogs.nvidia.com/blog/state-of-ai-report-2026/" target="_blank" rel="noopener noreferrer">NVIDIA's State of AI report</a>, 85% of respondents said open source is moderately to extremely important to their AI strategy.</p>
</details>

<h2>The Bottom Line</h2>

<p>Should you panic? No. Should you be complacent? Absolutely not.</p>

<p>The conversation about junior developers and AI often focuses on whether these roles will vanish or survive unchanged. My main argument is that junior developer jobs aren't disappearing — they are evolving. The key is a shift from just writing code to embracing roles that solve problems, critically evaluate AI-generated code, and deeply understand complex systems. Adapting to this new reality by growing these skills will keep you relevant and valuable, not replaceable.</p>

<p>I find these changes more exciting than scary. The tedious work is getting automated, letting me focus on complex problems and design.</p>

<p>If you're a student reading this, don't wait. Start integrating AI into your workflow, analyze its strengths and weaknesses, and build impactful projects now. Set clear, specific goals, take concrete action today, and carve out your place in tech's future.</p>

<p>Be proactive: adapt now, learn deliberately, and leverage AI intentionally. Build real-world skills to make yourself indispensable. Decide today to lead your future in tech — your unique advantage starts with decisive action.</p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
