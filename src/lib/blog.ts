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
    readTime: "6 min read",
    tags: ["AI", "Career", "Junior Dev", "Opinion"],
    content: `
<p>There's a headline that's been making its rounds lately, and if you're a CS student or early-career developer, you've probably already seen some version of it: <strong>"AI will replace junior developers."</strong></p>

<p>It showed up on my feed again last week — this time from a <a href="https://medium.com" target="_blank" rel="noopener noreferrer">Medium article</a> predicting that major tech companies will slow junior developer hiring as AI coding assistants handle more entry-level work. Another report from <a href="https://opentools.ai" target="_blank" rel="noopener noreferrer">OpenTools.ai</a> claims AI tools are promising productivity boosts of up to 55%, shifting demand away from junior coders and toward "AI-prompt engineers."</p>

<p>Cool. Great. Love that for us.</p>

<p>I'm a third-year Computer Science student in Ontario. I work as a junior software developer. I use AI coding tools daily. So when people ask me if I'm worried — yeah, I think about it. But after sitting with it for a while, my answer is more nuanced than just panic or denial.</p>

<h2>The Headlines Aren't Wrong — But They're Not the Full Story</h2>

<p>Let's be real: AI coding tools have gotten impressively good. GitHub Copilot, Claude, Cursor — they can scaffold entire functions, write boilerplate, generate tests, and even debug code with surprising accuracy. I use them myself. When I'm writing firmware validation scripts or spinning up CI/CD pipeline configs, having an AI assistant auto-complete the tedious parts saves real time.</p>

<p>And the data backs it up. According to <a href="https://www.intelegain.com" target="_blank" rel="noopener noreferrer">Intelegain</a>, 84% of developers are already using or planning to use AI tools in their day-to-day work. That's not a fringe trend — that's the new baseline.</p>

<p>So yes, the nature of junior dev work is changing. The days of getting hired purely to write CRUD endpoints or convert Figma designs to React components are numbered. If that's all you can do, you should be worried.</p>

<p>But here's the thing — that was never the whole job anyway.</p>

<h2>What AI Can't Do (Yet)</h2>

<p>I spend a good chunk of my time debugging issues that span multiple systems. A firmware update breaks a host-side validation test. A CI pipeline fails because someone changed an environment variable three repos upstream. A race condition shows up only under specific hardware timing constraints.</p>

<p>AI tools are genuinely helpful for generating code. They're terrible at understanding <em>why</em> code exists in a specific context, how it interacts with systems it's never seen, and what the actual business requirement behind a Jira ticket is when the ticket itself is vague.</p>

<p>The junior devs who will struggle are the ones who treat coding like typing — like the value they provide is translating English requirements into syntax. That's exactly what AI is good at.</p>

<p>The junior devs who will thrive are the ones who understand systems, ask good questions, debug across boundaries, and — crucially — can evaluate whether the AI-generated code is actually correct. Because right now, AI confidently generates wrong code all the time, and someone needs to catch it.</p>

<h2>The Real Shift: From Code Writer to Code Reviewer</h2>

<p>Here's my honest observation from using these tools daily: AI hasn't replaced my job. It's changed what my job looks like.</p>

<p>I spend less time writing boilerplate and more time reviewing, testing, and integrating. I write more tests than I used to because generating them is faster now. I spend more time thinking about architecture and less time on syntax. My pull request descriptions have gotten better because I actually have time to write them properly.</p>

<p>If anything, AI tools have made me <em>more</em> productive in the areas that actually matter for career growth. The mechanical parts got automated. The thinking parts got amplified.</p>

<p>GitHub's chief product officer recently said that 2026 will bring "repository intelligence" — <a href="https://news.microsoft.com" target="_blank" rel="noopener noreferrer">AI that understands not just code but the relationships and history behind it</a>. That means the code you write today might literally be analyzed by an AI agent tomorrow for context, patterns, and quality. If that doesn't motivate you to write clean, well-documented code, I don't know what will.</p>

<h2>My Advice to Fellow Students and Junior Devs</h2>

<p><strong>Don't ignore AI tools.</strong> Use them. Get good at prompting. Understand their limitations. The developers who will be most valuable are the ones who can leverage AI effectively — not the ones who pretend it doesn't exist, and not the ones who blindly accept its output.</p>

<p><strong>Go deeper, not wider.</strong> Instead of learning the 15th JavaScript framework, understand how systems actually work. Learn about networking, operating systems, concurrency, and debugging. These fundamentals are exactly what AI struggles with and what employers actually need.</p>

<p><strong>Build things that require judgment.</strong> AI can generate a REST API. It can't decide whether you need a REST API or a message queue. It can't architect a system that needs to handle failover gracefully. It can't sit in a meeting and figure out that the real requirement is completely different from what the PM wrote down. That's you. That's the value.</p>

<p><strong>Contribute to open source.</strong> According to <a href="https://blogs.nvidia.com" target="_blank" rel="noopener noreferrer">NVIDIA's recent survey</a>, 85% of respondents said open source is moderately to extremely important to their AI strategy. The open source ecosystem is where the next wave of AI tooling is being built. Getting involved now doesn't just look good on a resume — it gives you a front-row seat to how the industry is evolving.</p>

<h2>The Bottom Line</h2>

<p>Should you panic? No. Should you be complacent? Absolutely not.</p>

<p>The AI conversation around junior devs often gets framed as binary — either your job is safe or it's doomed. Reality is messier and more interesting than that. The role of a junior developer is evolving, not disappearing. The bar is moving from "can you write code?" to "can you solve problems, evaluate AI output, and understand systems?"</p>

<p>Personally, I find that more exciting than scary. The grunt work I hated is getting automated. The parts I actually enjoy — debugging complex systems, designing infrastructure, understanding <em>why</em> things break — those are becoming more important, not less.</p>

<p>If you're a student reading this: keep learning, keep building, and start using AI tools <em>critically</em>. Not as a crutch. As a power tool. The ones who figure out how to work alongside AI — not compete against it — are going to have careers that look nothing like what the doomsday headlines predict.</p>

<p>And honestly? I'd rather be starting my career right now, learning to work with AI from day one, than be a senior developer ten years in who suddenly has to adapt. We have the advantage. Let's use it.</p>
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
