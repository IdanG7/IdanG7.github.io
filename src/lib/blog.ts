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
    slug: "cuba-blackout-infrastructure-fragility",
    title:
      "Cuba's Blackout and the Fragility of Infrastructure We Take for Granted",
    excerpt:
      "A massive blackout left millions of Cubans without power for days. As someone who works on CI/CD pipelines and deployments, it got me thinking about how fragile the systems we depend on really are.",
    date: "2026-03-26",
    readTime: "7 min read",
    tags: ["Infrastructure", "Systems", "Engineering", "Opinion"],
    content: `
<p>A few weeks ago, a <a href="https://en.wikipedia.org/wiki/2026_Cuban_crisis" target="_blank" rel="noopener noreferrer">massive blackout swept across western Cuba</a>, leaving millions of people without electricity for days. The cause wasn't a cyberattack or a natural disaster — it was cascading infrastructure failure. An aging power grid, starved of maintenance and investment, finally buckled under its own weight.</p>

<p>I read about it on a break between deploys at work. And I'll be honest — my first reaction wasn't political. It was technical. Because the failure pattern Cuba experienced is one I've seen before, just at a much smaller scale: <strong>a system that works fine until it doesn't, because nobody invested in the boring parts.</strong></p>

<h2>What Actually Happened</h2>

<p>Cuba's electrical grid has been deteriorating for years. The country relies on aging thermoelectric plants, many built decades ago, running on fuel that's increasingly hard to source due to economic sanctions and supply chain issues. Maintenance has been deferred, backup systems are limited, and there's minimal redundancy.</p>

<p>When a key generation facility went offline, it triggered a cascading failure — each subsequent plant overloaded and tripped, domino-style, until the entire western grid collapsed. Restoring power wasn't as simple as flipping a switch. <a href="https://en.wikipedia.org/wiki/Cascading_failure" target="_blank" rel="noopener noreferrer">Black-start recovery</a> — bringing a grid back from zero — is one of the hardest problems in power engineering, requiring careful sequencing to avoid triggering another collapse.</p>

<p>Millions of people lost refrigeration, water pumps, hospital equipment, and communication. For days.</p>

<details class="blog-aside">
<summary>What's a cascading failure?</summary>
<p>A cascading failure happens when one component in an interconnected system fails and shifts its load to neighboring components, which then also fail under the increased demand, creating a chain reaction. It's the same principle behind traffic jams (one brake tap ripples backward for miles), financial crises (one bank's failure causes a run on others), and — very relevantly for developers — distributed system outages (one overloaded service causes timeouts in dependent services, which cascade through the entire architecture).</p>
</details>

<h2>Why a Developer Should Care About Power Grids</h2>

<p>You might be thinking: "I write JavaScript. Why should I care about Cuban power infrastructure?" Fair question. Here's why.</p>

<p><strong>The failure pattern is universal.</strong> What happened to Cuba's grid is structurally identical to what happens when a poorly designed microservices architecture falls over. One service gets slow, the services that depend on it start timing out, those timeouts cause retries, the retries increase load, and suddenly your entire system is down because a single database query got expensive.</p>

<p>If you've ever debugged a production incident at 2 AM, you've lived a miniature version of a cascading failure. The lessons from power grid engineering — circuit breakers, load shedding, graceful degradation, redundancy — are the same concepts we use in software. They're not metaphors. They're the same math.</p>

<details class="blog-aside">
<summary>Circuit breakers aren't just for electrical panels</summary>
<p>In software, the <a href="https://martinfowler.com/bliki/CircuitBreaker.html" target="_blank" rel="noopener noreferrer">circuit breaker pattern</a> (popularized by Michael Nygard's <em>Release It!</em>) works exactly like its electrical counterpart. When a downstream service starts failing, the circuit breaker "trips" and stops sending requests to it — preventing the failure from cascading. After a timeout, it allows a few test requests through to check if the service has recovered. Netflix's Hystrix library made this pattern mainstream, and it's now built into most service mesh frameworks.</p>
</details>

<p><strong>Infrastructure debt is real — and invisible until it isn't.</strong> Cuba didn't wake up one morning with a broken grid. It deteriorated over years of deferred maintenance, each shortcut compounding until the whole system was fragile. Sound familiar? That CI/CD pipeline held together with bash scripts and hope? The deployment process that "works fine, just don't touch that config file"? The test suite everyone skips because it's flaky?</p>

<p>Technical debt and infrastructure debt follow the same curve. They're invisible in the good times and catastrophic in the bad times. Cuba's blackout is an extreme example, but the pattern scales all the way down to your team's Jenkins server.</p>

<h2>Resilience as a Skill Set</h2>

<p>Here's what I've been thinking about since reading about the blackout: <strong>resilience engineering is an underrated skill for junior developers.</strong></p>

<p>We spend a lot of time in school learning how to make things work. We spend almost no time learning how to make things <em>keep</em> working when conditions change. But in production, the interesting question is almost never "does this work?" It's "what happens when this fails?"</p>

<p>What happens when your database connection drops? What happens when a third-party API starts responding in 30 seconds instead of 300 milliseconds? What happens when your cloud region goes down? What happens when deployment rolls out a bad config to 10% of your servers?</p>

<p>These aren't hypothetical questions. They're Tuesday.</p>

<p>The best engineers I've worked with think about failure modes instinctively. They add health checks, set up alerting, write runbooks, and design systems that degrade gracefully instead of collapsing completely. That mindset — <em>what's the worst that can happen, and how do we survive it</em> — is more valuable than knowing any specific framework.</p>

<h2>What Cuba Taught Me About My Own Work</h2>

<p>After reading about the blackout, I spent an afternoon looking at the systems I work with and asking: where are our single points of failure?</p>

<p>The answer was uncomfortable. We had a deployment pipeline that depended on a single CI runner with no fallback. A monitoring setup that would silently stop alerting if one service went down. A config file that three people knew about and zero people had documented.</p>

<p>None of these were urgent problems. Everything was "working fine." But so was Cuba's grid — until it wasn't.</p>

<p>I didn't rewrite everything. That's not the point. I documented the config file. I added a health check for the monitoring service. Small things. But the exercise of <em>looking</em> — of asking "what breaks when this breaks?" — was worth every minute.</p>

<details class="blog-aside">
<summary>A simple resilience checklist for your projects</summary>
<p>Ask yourself these questions about any system you maintain: (1) What happens if the primary database goes down? Is there a replica? (2) Do you have alerts for when things fail, or do you find out from users? (3) Can you deploy a rollback in under 5 minutes? (4) Is there a single person who holds critical knowledge that isn't documented? (5) When was the last time you actually tested your backup restoration process? If you can't answer these confidently, you have infrastructure debt — and now is the time to address it, not during an outage.</p>
</details>

<h2>Build Things That Survive</h2>

<p>Cuba's blackout is a human crisis, and I don't want to reduce it to a tech analogy. Real people suffered — and continue to suffer — because of systemic underinvestment in critical infrastructure. That context matters.</p>

<p>But as developers, we can take the lesson seriously: <strong>the systems people depend on deserve to be built with failure in mind.</strong> Whether it's a national power grid or a deployment pipeline, the boring work of redundancy, monitoring, documentation, and maintenance is what separates systems that bend from systems that break.</p>

<p>Next time you're tempted to skip writing that health check, or defer that infrastructure upgrade, or leave that runbook unwritten — remember that every fragile system was "working fine" right up until the moment it wasn't.</p>

<p>Build things that survive. The people who depend on them are counting on it.</p>
`,
  },
  {
    slug: "fifa-world-cup-2026-toronto-tech",
    title:
      "The 2026 FIFA World Cup Is Coming to Canada — What Does That Mean for Toronto Tech?",
    excerpt:
      "Canada is co-hosting the biggest sporting event on the planet this summer. Behind the scenes, there's a massive wave of tech work — and opportunity — that most devs aren't talking about.",
    date: "2026-03-26",
    readTime: "7 min read",
    tags: ["Infrastructure", "Career", "Engineering", "Opinion"],
    content: `
<p>This summer, the <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026" target="_blank" rel="noopener noreferrer">2026 FIFA World Cup</a> kicks off across Canada, the US, and Mexico — the first World Cup with 48 teams and the first time Canada has co-hosted. Toronto's BMO Field and Vancouver's BC Place are on the venue list, and if you live in Ontario like I do, you can already feel it building. Transit expansions, construction projects, and a general buzz that this province hasn't seen since the 2015 Pan Am Games.</p>

<p>But here's the part that caught my attention as a developer: <strong>mega-events like the World Cup are absolute machines for tech work.</strong> And most of it is the kind of unglamorous, critical infrastructure that CS students never think about.</p>

<h2>The Tech Behind a World Cup You Never See</h2>

<p>When you watch a match, you see a pitch, some cameras, and a scoreboard. What you don't see is an enormous technology operation running underneath.</p>

<p><strong>Real-time data pipelines.</strong> FIFA's <a href="https://inside.fifa.com/media-releases/lenovo-tech-world-ai-powered-innovations-world-cup-2026" target="_blank" rel="noopener noreferrer">Enhanced Football Intelligence</a> system tracks every player and the ball using sensor arrays and computer vision — producing terabytes of positional data per match. That data feeds live stats, VAR decisions, broadcast overlays, and the fantasy platforms that millions of fans use. Every millisecond of latency matters.</p>

<p><strong>Ticketing and access control at insane scale.</strong> The 2022 Qatar World Cup sold over <a href="https://www.fifa.com/en/articles/fifa-world-cup-qatar-2022-tm-ticket-sales-reach-2-45-million" target="_blank" rel="noopener noreferrer">2.45 million tickets</a>. The 2026 tournament, with 48 teams across 16 venues, will dwarf that. That's a distributed ticketing system handling spikes that make Black Friday look gentle — with fraud detection, mobile entry, and real-time capacity management across three countries.</p>

<p><strong>Streaming infrastructure.</strong> Billions of viewers worldwide. Multiple camera angles. Multi-language commentary. Instant replays. All delivered at broadcast quality with minimal buffering. The CDN and edge computing work behind live sports streaming is some of the most demanding infrastructure engineering on the planet.</p>

<details class="blog-aside">
<summary>What's VAR, technically?</summary>
<p>The Video Assistant Referee (VAR) system is a real-time video review system that uses multiple synchronized camera feeds, semi-automated offside detection (using limb-tracking technology and ball sensors), and a dedicated operations room. The technical challenge is processing high-resolution feeds from 12+ cameras, running computer vision models for offside detection, and delivering a decision to the referee — all within seconds. It's essentially a distributed real-time system with life-or-death stakes (at least according to football fans).</p>
</details>

<h2>Local Impact: What's Actually Happening in Ontario</h2>

<p>Toronto has been preparing for this for years, and a surprising amount of that preparation is tech-adjacent.</p>

<p>The <a href="https://www.toronto.ca/city-government/accountability-operations-customer-service/long-term-vision-plans-and-strategies/smart-cityto/" target="_blank" rel="noopener noreferrer">City of Toronto's smart city initiatives</a> have accelerated ahead of the tournament. Public Wi-Fi expansion, transit app upgrades, real-time crowd management systems, and digital wayfinding for tourists who don't know the TTC from a Tim Hortons. The Metrolinx GO expansion is leaning heavily on software for scheduling and capacity prediction.</p>

<p>Local companies are hiring for it too. Agencies and consultancies with government contracts need developers for everything from event management platforms to public safety dashboards. If you're looking for contract work or co-op placements this summer, the World Cup pipeline is real — even if the job posting doesn't mention "FIFA" anywhere.</p>

<p>And then there's the startup angle. Every major sporting event spawns a wave of apps — fan engagement platforms, local business discovery tools, transit planners, accessibility guides. If you've ever wanted to ship something that people actually use at scale, building for a World Cup audience is about as high-stakes a proving ground as you'll find.</p>

<h2>What a Junior Dev Can Actually Learn from This</h2>

<p>I'll be honest — you and I probably aren't going to be hired to build FIFA's VAR system. But the World Cup is still a masterclass in the kind of engineering problems that matter in the real world.</p>

<p><strong>Scale isn't abstract anymore.</strong> CS courses teach Big O notation and horizontal scaling in theory. A World Cup makes it visceral. When 500,000 people try to buy tickets at the same time, your naive database query doesn't just slow down — it falls over and makes international news. Following how organizations handle these events (and reading their post-mortems when things go wrong) is genuinely educational.</p>

<p><strong>Reliability beats cleverness.</strong> The systems behind live broadcasting and stadium operations don't get to be down for maintenance. They can't show a loading spinner during a penalty shootout. This kind of engineering — where uptime is non-negotiable and failure is public — teaches you to think about resilience, redundancy, and graceful degradation in ways that a side project never will.</p>

<details class="blog-aside">
<summary>Great post-mortems to learn from</summary>
<p>If you want to understand how large-scale systems fail and recover, read engineering blogs from companies that handle live events. <a href="https://netflixtechblog.com/" target="_blank" rel="noopener noreferrer">Netflix's tech blog</a> on streaming architecture, Ticketmaster's very public failures (and what they reveal about queueing theory), and Cloudflare's incident reports are all goldmines. The pattern is almost always the same: an unexpected interaction between systems under load that nobody anticipated. Learning to think about those interactions is a skill that translates everywhere.</p>
</details>

<p><strong>Soft infrastructure matters.</strong> The World Cup doesn't just need code — it needs localization (English, French, Spanish across three countries), accessibility compliance, data privacy across multiple jurisdictions, and user experiences that work for people who aren't tech-savvy. These are the "boring" problems that junior devs often overlook, but they're exactly what makes software actually usable at scale.</p>

<h2>My Honest Take</h2>

<p>I think most developers, especially students, underestimate how much interesting tech work exists outside of "tech companies." We default to thinking our career options are FAANG, startups, or freelancing. But events like the World Cup remind me that software is everywhere — in stadiums, transit systems, city infrastructure, broadcasting, logistics, public safety.</p>

<p>Ontario is about to host millions of people from around the world. The systems that make that possible — from the apps tourists use to navigate the TTC to the backend that processes entry at BMO Field — are built by developers. And right now, a lot of those teams need help.</p>

<p>If you're a student in Ontario looking for summer work, don't just search "software developer" on LinkedIn. Look at what the city, province, and local organizations are building for the World Cup. Look at the vendors and contractors behind the scenes. Some of the most formative engineering work happens in places you'd never think to look.</p>

<h2>Enjoy the Tournament (and Take Notes)</h2>

<p>This is a once-in-a-generation event happening in our backyard. Whether you're a football fan or not, pay attention to the tech. Watch how the apps perform under load. Notice when systems fail. Read the engineering write-ups that will inevitably follow.</p>

<p>And if you're in Toronto this summer — go to a match if you can. There's something motivating about being in a venue and thinking, <em>"someone had to build the system that let me scan this ticket."</em> Might as well be you next time.</p>
`,
  },
  {
    slug: "agentic-ai-trough-of-disillusionment",
    title:
      "Agentic AI Hit the Trough of Disillusionment — And That's Actually Good News",
    excerpt:
      "Gartner says GenAI is officially in the trough of disillusionment. For junior devs navigating hype cycles, this is the moment that separates real skills from resume buzzwords.",
    date: "2026-03-26",
    readTime: "7 min read",
    tags: ["AI", "Career", "Junior Dev", "Opinion"],
    content: `
<p>If you've been paying attention to the AI discourse lately, you might have noticed a shift. The breathless excitement from a year ago — "AI agents will automate everything!" — has cooled into something more measured. Some would say pessimistic. <a href="https://mitsloan.mit.edu/ideas-made-to-matter/how-to-break-ai-hype-cycle-and-make-good-ai-decisions-your-organization" target="_blank" rel="noopener noreferrer">MIT Sloan</a> is openly discussing AI bubble parallels to the dot-com era, and Gartner has placed generative AI squarely in the <strong>"trough of disillusionment"</strong> on their hype cycle.</p>

<p>For a third-year CS student watching all this from a desk in Ontario, my reaction might surprise you: <em>finally.</em></p>

<details class="blog-aside">
<summary>What's the "trough of disillusionment"?</summary>
<p>Gartner's Hype Cycle is a model that tracks how emerging technologies move through phases: a <strong>Technology Trigger</strong>, a <strong>Peak of Inflated Expectations</strong> (where everyone overpromises), a <strong>Trough of Disillusionment</strong> (where reality sets in and hype fades), the <strong>Slope of Enlightenment</strong> (where practical use cases emerge), and finally the <strong>Plateau of Productivity</strong> (where the tech becomes genuinely useful and boring). Most transformative technologies go through all five phases. The trough isn't death — it's growing up.</p>
</details>

<h2>What Happened to the Hype</h2>

<p>Remember when "agentic AI" was the hottest term in tech? Every startup pitch deck featured autonomous agents that would handle your emails, manage your deployments, and probably do your laundry. LinkedIn influencers were posting about how "AI agents will replace entire engineering teams by 2025."</p>

<p>Well, it's 2026. My laundry is still piling up.</p>

<p>The reality is that <a href="https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained" target="_blank" rel="noopener noreferrer">agentic AI turned out to be the most overhyped trend</a> in the recent AI wave. Autonomous agents are genuinely useful in narrow, well-defined contexts — running CI pipelines, triaging support tickets, summarizing meeting notes. But the vision of fully autonomous AI agents replacing human judgment at scale? That's hit a wall of messy real-world complexity that no amount of prompt engineering can solve.</p>

<p>Companies that went all-in on "agentic everything" are quietly scaling back. The ones that took a more measured approach are actually seeing results. And that's exactly how hype cycles work.</p>

<h2>Why Hype Cycles Matter for Your Career</h2>

<p>Here's the thing nobody tells CS students: <strong>your career will span multiple hype cycles.</strong> AI agents aren't the first, and they won't be the last. Blockchain, the metaverse, Web3, NFTs — each one had a peak where people said "learn this or get left behind," followed by a trough where most of those people quietly updated their LinkedIn headlines back to "Software Engineer."</p>

<p>The <a href="https://mitsloan.mit.edu/ideas-made-to-matter/how-to-break-ai-hype-cycle-and-make-good-ai-decisions-your-organization" target="_blank" rel="noopener noreferrer">MIT Sloan analysis</a> draws direct parallels between AI today and the dot-com bubble. During the dot-com era, the companies that survived weren't the ones with the flashiest pitches — they were the ones building real infrastructure. Amazon sold books. Google organized information. The boring stuff won.</p>

<p>The same pattern is playing out with AI. The companies and developers who will thrive aren't the ones chasing the latest buzzword. They're the ones building practical applications, understanding the fundamentals, and developing judgment about what AI can and can't do.</p>

<details class="blog-aside">
<summary>The dot-com parallel is more specific than you think</summary>
<p>During the dot-com bubble, thousands of companies with "e-" or ".com" in their name raised millions and burned through it all. But the underlying technology — the internet — was real and transformative. The bubble bursting didn't kill the internet. It killed the bad business models. AI is following the same trajectory: the technology is genuinely powerful, but many of the current business models and expectations built around it are unsustainable. The trough filters out the noise so the real signal can emerge.</p>
</details>

<h2>What This Means at the Junior Dev Level</h2>

<p>If you're a student or early-career developer, the trough of disillusionment is actually your friend. Here's why:</p>

<p><strong>The hiring bar is normalizing.</strong> During peak hype, job postings demanded "3+ years of LLM experience" for entry-level roles — which is absurd when the technology is barely older than that. As hype cools, expectations get more realistic. Companies start looking for people who can actually build things rather than people who can recite Sam Altman's latest interview.</p>

<p><strong>The tools are maturing.</strong> Early-hype tools are fragile, poorly documented, and change every week. Post-hype tools are stable, well-tested, and actually useful. Learning AI tools now means you're learning the versions that will stick around, not the ones that'll be deprecated next quarter.</p>

<p><strong>Fundamentals matter more in the trough.</strong> When hype is high, you can get by on vibes and buzzwords. When hype fades, employers want people who understand data structures, system design, networking, and debugging — the skills that let you evaluate whether an AI solution actually makes sense for a given problem. I've written about this before: <a href="/blog/ai-coming-for-junior-dev-jobs">going deeper beats going wider</a>.</p>

<p><strong>It's easier to stand out.</strong> During peak hype, everyone and their dog is posting AI tutorials and side projects. In the trough, the tourists leave. If you're still building, still learning, still contributing — that consistency is visible and valued.</p>

<h2>My Honest Take: The Trough Is Where Real Developers Are Made</h2>

<p>I'll admit — I got caught up in the hype too. Last year I spent weeks trying to build an autonomous agent that could review pull requests end-to-end. It worked about 40% of the time and hallucinated the rest. I learned more from that failure than from any tutorial that promised "build an AI agent in 10 minutes."</p>

<p>That's the gift of the trough. It forces you to confront what actually works versus what sounds impressive in a demo. And confronting that gap is where real engineering skill develops.</p>

<p>The developers I admire most — the senior engineers and maintainers I interact with in <a href="/blog/open-source-eating-ai-world">open source communities</a> — they've all lived through previous hype cycles. They have a pattern-matching instinct for what's real and what's noise. That instinct doesn't come from reading hot takes on X. It comes from building things, watching them fail, and building again.</p>

<details class="blog-aside">
<summary>How to develop your own hype radar</summary>
<p>A few questions I now ask when I see a new AI trend: (1) Does this solve a problem I've actually encountered, or a problem I've only read about in pitch decks? (2) Are the people excited about it builders or marketers? (3) Can I try it myself in under an hour, or does it require "enterprise onboarding"? (4) Is the demo cherry-picked or reproducible? These filters aren't perfect, but they've saved me from chasing at least three dead-end technologies.</p>
</details>

<h2>So What Should You Do?</h2>

<p><strong>Don't abandon AI.</strong> The trough doesn't mean AI is over — it means the unrealistic expectations are over. The underlying technology is still transformative. Keep using AI tools, keep learning how they work under the hood, keep building with them.</p>

<p><strong>But don't bet everything on one trend.</strong> The students who will have the strongest careers are the ones with broad foundations and deep expertise in areas that survive hype cycles. Distributed systems, security, performance engineering, developer tooling — these fields aren't going anywhere regardless of what happens with AI agents.</p>

<p><strong>Be skeptical, not cynical.</strong> There's a difference between "this technology is overhyped right now" and "this technology is useless." Learn to hold both ideas at once: AI is genuinely powerful <em>and</em> most of what people claim about it is exaggerated. That nuance is a superpower in an industry that loves extremes.</p>

<p>The trough of disillusionment isn't a grave. It's a filter. The hype tourists are leaving, the real builders are staying, and the technology is quietly getting better. If you're a junior dev still here, still learning, still building — you're exactly where you need to be.</p>
`,
  },
  {
    slug: "open-source-eating-ai-world",
    title:
      "Open Source Is Eating the AI World — And That Matters If You're a Student",
    excerpt:
      "85% of organizations say open source is critical to their AI strategy. If you're a CS student not contributing yet, you're leaving career leverage on the table.",
    date: "2026-03-26",
    readTime: "6 min read",
    tags: ["AI", "Career", "Junior Dev", "Opinion"],
    content: `
<p>There's a quiet revolution happening in AI, and it's not coming from OpenAI's next model drop or Google's latest keynote. It's happening on GitHub, in messy repos with half-finished READMEs and heated PR discussions. <strong>Open source is becoming the backbone of AI development</strong> — and if you're a student or early-career dev, this is your window to get in.</p>

<p>According to <a href="https://blogs.nvidia.com/blog/state-of-ai-report-2026/" target="_blank" rel="noopener noreferrer">NVIDIA's 2026 State of AI report</a>, 85% of survey respondents said open source is moderately to extremely important to their AI strategy. That's not hobbyists tinkering on weekends — that's enterprises, research labs, and startups all betting on community-driven tools over proprietary black boxes.</p>

<p>As someone who's been lurking in open source communities for a while and only recently started contributing, I wish I'd started sooner. Here's why this matters for people like us.</p>

<h2>The Shift Away from Closed AI</h2>

<p>A year ago, the AI landscape felt like a walled garden. Want to use a frontier model? Pay for API access. Want to fine-tune something? Hope you have enterprise credits. The message was clear: AI belongs to companies with deep pockets.</p>

<p>That narrative is crumbling. <a href="https://ai.meta.com/blog/llama-4-multimodal-intelligence/" target="_blank" rel="noopener noreferrer">Meta's Llama models</a> proved you could release powerful open-weight models and actually benefit from it. Hugging Face has become the npm of machine learning. Projects like <a href="https://github.com/vllm-project/vllm" target="_blank" rel="noopener noreferrer">vLLM</a>, <a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noopener noreferrer">LangChain</a>, and <a href="https://ollama.com/" target="_blank" rel="noopener noreferrer">Ollama</a> are letting individual developers run, deploy, and customize models that would've required a dedicated ML team two years ago.</p>

<p>The reason this shift matters for students: <strong>the barrier to entry just dropped dramatically.</strong> You don't need a GPU cluster or a research appointment. You need a laptop, curiosity, and the willingness to read through some intimidating codebases.</p>

<details class="blog-aside">
<summary>Why do companies open-source their AI?</summary>
<p>It might seem counterintuitive, but open-sourcing AI models can be a strategic advantage. It builds ecosystem lock-in (if everyone fine-tunes your model, they stay in your orbit), attracts top talent who want to work on visible projects, and benefits from community improvements. Meta, for example, gains more from widespread Llama adoption than it would from selling API access — it strengthens their entire AI infrastructure play.</p>
</details>

<h2>Contributing to Open Source Is the Best Career Move Nobody Talks About</h2>

<p>I'll be honest — my first open source contribution was terrifying. I spent three hours reading contribution guidelines, second-guessing whether my fix was "good enough," and almost closed the PR before submitting it. It got merged in two days with a simple "thanks!" from a maintainer.</p>

<p>Here's what I've learned since: <strong>open source contributions are the closest thing to a cheat code for early-career developers.</strong></p>

<p>Think about what a hiring manager sees on your resume versus your GitHub. A resume says "proficient in Python." A merged PR on a real project says "this person can read unfamiliar code, follow conventions, communicate with a team, and ship something useful." There's no comparison.</p>

<p>And in the AI space specifically, contributing now means you're building expertise in tools that companies are actively adopting. If you've contributed to LangChain, or built an integration for an open-source model serving framework, that's not just a side project — that's directly relevant experience.</p>

<details class="blog-aside">
<summary>How to find your first open source contribution</summary>
<p>Start with <a href="https://github.com/topics/good-first-issue" target="_blank" rel="noopener noreferrer">GitHub's "good first issue" label</a>. Filter by language and topic. Don't aim for a massive feature — documentation fixes, test improvements, and small bug fixes are genuinely valued. Projects like <a href="https://github.com/huggingface/transformers" target="_blank" rel="noopener noreferrer">Hugging Face Transformers</a> and <a href="https://github.com/langchain-ai/langchain" target="_blank" rel="noopener noreferrer">LangChain</a> have active communities that welcome newcomers. The key is to start small and be consistent.</p>
</details>

<h2>What This Means for the "AI Will Replace Us" Conversation</h2>

<p>I wrote <a href="/blog/ai-coming-for-junior-dev-jobs">my last post</a> about whether AI coding tools are coming for junior dev jobs. Open source adds an interesting twist to that conversation.</p>

<p>If AI tools are automating the mechanical parts of coding, then the value shifts to understanding systems, making architectural decisions, and — critically — <em>knowing what tools exist and how to use them</em>. Open source is where that knowledge lives. It's where the tools get built, where best practices emerge, and where the community figures out what actually works versus what's just hype.</p>

<p>Being plugged into open source communities means you see trends before they hit mainstream adoption. You understand <em>why</em> a tool works the way it does, not just how to prompt it. That kind of depth is exactly what separates a developer who uses AI tools from one who gets replaced by them.</p>

<p>There's also a practical angle: <a href="https://github.blog/news-insights/product-news/github-copilot-workspace/" target="_blank" rel="noopener noreferrer">GitHub's "repository intelligence" vision</a> — where AI agents understand the full context of a codebase — works best on well-documented, well-structured projects. Open source projects tend to have exactly those qualities because they <em>have</em> to. Contributing to them teaches you habits that make your code more resilient in an AI-augmented world.</p>

<h2>My Honest Take</h2>

<p>I won't pretend open source is all sunshine. Maintainer burnout is real. Some communities are toxic. Not every contribution gets acknowledged. And finding time to contribute while juggling coursework and a job is genuinely hard.</p>

<p>But here's what I keep coming back to: <strong>every hour I've spent reading open source code has made me a better developer than any hour spent watching tutorials.</strong> Reading how experienced engineers structure real projects, handle edge cases, and review each other's code — that's an education you can't get in a classroom.</p>

<p>And with AI making the open source ecosystem even more important, the returns on that investment are only growing. The <a href="https://octoverse.github.com/" target="_blank" rel="noopener noreferrer">GitHub Octoverse report</a> shows open source contributions continuing to accelerate, especially in AI and ML repositories. The community is growing, the tools are maturing, and the opportunities for newcomers have never been better.</p>

<h2>Where to Start This Week</h2>

<p><strong>Pick one project.</strong> Just one. Find something you actually use — a library, a tool, a framework. Read through the open issues. See if there's something small you can tackle. Don't overthink it.</p>

<p><strong>Join the community.</strong> Most projects have a Discord, Slack, or GitHub Discussions page. Lurk for a bit. See how people communicate. Ask a genuine question.</p>

<p><strong>Set a tiny goal.</strong> One PR this month. That's it. A typo fix counts. A test case counts. A documentation clarification counts. The point is to break the seal.</p>

<p>The AI landscape is being shaped right now, in the open, by people who show up and contribute. If you're a student wondering how to stand out in a world where AI can write boilerplate code faster than you can — this is your answer. Don't just <em>use</em> the tools. Help <em>build</em> them.</p>
`,
  },
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

<p>I'm a third-year CS student in Ontario working as a junior developer and using AI tools daily. According to the <a href="https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/" target="_blank" rel="noopener noreferrer">2025 Stack Overflow Developer Survey analysis</a>, most developers using AI tools feel that the changes are incremental, so when people ask if I'm worried, my answer is more nuanced than panic or denial.</p>

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
<p>According to <a href="https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report" target="_blank" rel="noopener noreferrer">CodeRabbit's State of AI vs Human Code Generation report</a>, AI-generated code produces roughly 1.7x more issues than human-written code — sometimes it appears correct at first glance but can behave unexpectedly — like when Copilot produced a function that looked perfect but broke the app due to hidden issues such as not handling all data formats. I only noticed because I remembered a specific error case from a past bug report. If I hadn't double-checked, that bug would have made it to production and cost us serious troubleshooting hours. Stories like this remind me that human judgment still matters — and will probably do so for a long time.</p>
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
