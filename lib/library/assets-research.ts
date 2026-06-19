import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"];

export const researchAssets: LibraryAsset[] = [
  {
    id: "promptdir.research.audience_pain_finder.v1",
    slug: "audience-pain-finder",
    type: "prompt",
    title: "Audience Pain Finder",
    promise: "Surface the urgent, specific problems your audience will pay to solve.",
    summary:
      "Extract ranked pains, the words people use, and the moments those pains spike, from whatever you know about your audience.",
    category: "audience_research",
    tags: ["pain", "research", "positioning"],
    difficulty: "beginner",
    estimatedTimeMinutes: 10,
    bestFor: ["solo_creator", "coach", "consultant", "course_creator"],
    notFor: ["mass_market_brand"],
    useCase:
      "You can only sell what people already feel as a problem. This separates nice-to-know topics from the few painful, urgent ones worth building around.",
    whenToUse: [
      "Before choosing what to teach or sell.",
      "When your content gets polite nods but no replies.",
      "Shaping a lead magnet or product around a real ache."
    ],
    inputs: [
      { name: "audience", type: "string", required: true, description: "Who you serve, as specifically as possible." },
      { name: "context", type: "string", required: false, description: "What you already know: notes, comments, DMs." },
      { name: "offer", type: "string", required: false, description: "What you might sell, if known." }
    ],
    outputFields: [
      { field: "ranked_pains", type: "object[]", description: "Pains with urgency and willingness-to-pay scores." },
      { field: "trigger_moments", type: "string[]", description: "When each pain becomes acute." },
      { field: "exact_language", type: "string[]", description: "Phrases the audience uses verbatim." },
      { field: "content_angles", type: "string[]", description: "Angles that speak to the top pains." }
    ],
    systemPrompt: "You are a customer researcher. You distinguish vitamins from painkillers and say so plainly.",
    promptTemplate: `Find the real pains of this audience.

Audience: {{audience}}
What I already know: {{context}}
Possible offer: {{offer}}

List the likely problems, then rank them by urgency (how much it hurts now) and willingness to pay (would they spend to fix it). For each top pain, name the trigger moment when it spikes and the words this audience would actually use to describe it. Finish with three content angles aimed at the most painful, most fundable problems. Be skeptical of pains that sound important but nobody pays to solve.`,
    exampleOutput: `Top pain: "I post consistently but my list isn't growing." Urgency 8/10, WTP 7/10.
Trigger: after a launch flops despite steady posting.
Language: "shouting into the void", "vanity metrics", "no one's converting".
Angles: growth loops that don't need going viral; the 100-true-fans math.`,
    compatibleWith: COMPAT,
    automationNotes: "Combine with Comment Mining to ground the pains in real source text.",
    related: ["promptdir.research.comment_mining.v1", "promptdir.research.objection_research.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.research.comment_mining.v1",
    slug: "comment-mining-prompt",
    type: "prompt",
    title: "Comment Mining Prompt",
    promise: "Turn a pile of comments and replies into clustered insight and content.",
    summary:
      "Paste raw comments; get themes, recurring questions, emotional language, and ready-to-write content prompts.",
    category: "audience_research",
    tags: ["comments", "mining", "voice-of-customer"],
    difficulty: "beginner",
    estimatedTimeMinutes: 8,
    bestFor: ["solo_creator", "youtuber", "newsletter_operator"],
    useCase:
      "Your comments and replies are the richest free research you own, and they sit unread. This mines them for patterns you can build content and offers on.",
    whenToUse: [
      "After a post or video gets meaningful engagement.",
      "When you have a backlog of DMs or replies.",
      "Looking for the next thing to make."
    ],
    inputs: [
      { name: "comments", type: "string", required: true, description: "Raw pasted comments, replies, or DMs." },
      { name: "goal", type: "string", required: false, description: "What you're trying to learn or make." }
    ],
    outputFields: [
      { field: "themes", type: "object[]", description: "Clusters with frequency and a representative quote." },
      { field: "questions", type: "string[]", description: "Recurring questions worth answering publicly." },
      { field: "objections", type: "string[]", description: "Doubts and pushback to address." },
      { field: "content_prompts", type: "string[]", description: "Specific pieces to make next." }
    ],
    systemPrompt: "You are a qualitative analyst. You quote real language and never invent quotes.",
    promptTemplate: `Mine these comments for insight.

Comments: {{comments}}
Goal: {{goal}}

Cluster them into themes with an approximate frequency and one real representative quote per theme (quote only what's present, never fabricate). Pull out recurring questions, objections, and the emotional words people use. End with a short list of specific content pieces I should make next, each tied to a theme.`,
    exampleOutput: `Theme: pricing confusion (≈30%) — "I never know what to charge."
Questions: How do I raise rates with existing clients? Hourly or value-based?
Objections: "Sounds great for people with an audience already."
Make next: a teardown of three pricing models with real numbers.`,
    compatibleWith: COMPAT,
    automationNotes: "Trigger from a YouTube/Disqus export; route content_prompts into your idea board.",
    n8n: { trigger: "webhook", nodes: ["OpenAI", "Notion", "Google Sheets"], outputs: ["Notion"] },
    related: ["promptdir.research.audience_pain_finder.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.research.competitor_analyzer.v1",
    slug: "competitor-content-analyzer",
    type: "prompt",
    title: "Competitor Content Analyzer",
    promise: "Map what a competitor publishes so you can find the gap you own.",
    summary:
      "Analyze a competitor's content to expose their angles, formats, and blind spots, and where you can differentiate.",
    category: "audience_research",
    tags: ["competitor", "gap-analysis", "positioning"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 12,
    bestFor: ["solo_creator", "consultant", "founder"],
    useCase:
      "Copying a competitor makes you a worse version of them. Mapping them shows the angle they ignore, which is the one you can own.",
    whenToUse: [
      "Entering a niche with established players.",
      "When your content feels interchangeable with others.",
      "Looking for an underserved sub-topic."
    ],
    inputs: [
      { name: "competitor", type: "string", required: true, description: "Who, and a sample of their content." },
      { name: "your_edge", type: "string", required: false, description: "Your unfair advantage or unique view." },
      { name: "audience", type: "string", required: true, description: "Who you both want to reach." }
    ],
    outputFields: [
      { field: "their_angles", type: "string[]", description: "Recurring positions and themes they push." },
      { field: "formats", type: "string[]", description: "Formats and cadences they rely on." },
      { field: "blind_spots", type: "string[]", description: "Topics and angles they avoid or do weakly." },
      { field: "your_wedge", type: "string", description: "The differentiated position to take." }
    ],
    systemPrompt: "You are a positioning strategist. You find contrast, not imitation.",
    promptTemplate: `Analyze this competitor and find my wedge.

Competitor (and sample content): {{competitor}}
My edge: {{your_edge}}
Shared audience: {{audience}}

Identify their core angles, the formats and cadence they lean on, and the audience needs they serve well. Then find their blind spots: topics they avoid, audiences they talk past, or angles they handle weakly. Recommend one differentiated wedge for me that uses my edge and doesn't try to beat them at their own game.`,
    exampleOutput: `Their angles: enterprise-grade rigor, long essays, authority tone.
Blind spots: nothing for true beginners; no short-form; no real numbers shared.
Your wedge: the transparent beginner — small, specific, with receipts.`,
    compatibleWith: COMPAT,
    automationNotes: "Pair with the Niche Opportunity Finder to validate the wedge has demand.",
    related: ["promptdir.research.niche_opportunity.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.research.niche_opportunity.v1",
    slug: "niche-opportunity-finder",
    type: "prompt",
    title: "Niche Opportunity Finder",
    promise: "Pressure-test a niche for demand, competition, and your fit before committing.",
    summary:
      "Score a niche on demand, monetization, competition, and personal fit, with the riskiest assumption to test first.",
    category: "audience_research",
    tags: ["niche", "validation", "strategy"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 10,
    bestFor: ["new_creator", "pivoting_creator", "founder"],
    useCase:
      "Picking the wrong niche costs you a year. This stress-tests a direction before you sink time into it.",
    whenToUse: [
      "Choosing or narrowing a niche.",
      "Deciding whether to pivot.",
      "Comparing two or three directions."
    ],
    inputs: [
      { name: "niche", type: "string", required: true, description: "The niche or sub-niche to evaluate." },
      { name: "background", type: "string", required: false, description: "Your skills, story, and unfair advantages." },
      { name: "goal", type: "string", required: false, description: "Audience, income, or impact goal." }
    ],
    outputFields: [
      { field: "scores", type: "object", description: "Demand, monetization, competition, fit (1-10)." },
      { field: "buyer", type: "string", description: "Who in this niche actually pays." },
      { field: "risks", type: "string[]", description: "The main reasons this could fail." },
      { field: "riskiest_assumption", type: "string", description: "The first thing to validate cheaply." }
    ],
    systemPrompt: "You are a candid niche analyst. You would rather kill a bad idea early than be encouraging.",
    promptTemplate: `Evaluate this niche.

Niche: {{niche}}
My background: {{background}}
My goal: {{goal}}

Score it 1-10 on: demand (are people searching/asking), monetization (is there money and who holds it), competition (how crowded and beatable), and personal fit (can I sustain this for years). Name the real buyer, the main risks, and the single riskiest assumption I should test before committing — plus the cheapest way to test it.`,
    exampleOutput: `Scores — demand 7, monetization 8, competition 6, fit 9.
Buyer: solo agency owners doing $5-20k/mo.
Risks: easy to attract broke beginners instead of buyers.
Riskiest assumption: that owners will pay for systems vs DIY. Test: pre-sell a $200 workshop to 50 of them.`,
    compatibleWith: COMPAT,
    automationNotes: "Run the riskiest assumption through the Pre-Sale Test prompt.",
    related: ["promptdir.offer.product_validator.v1", "promptdir.research.competitor_analyzer.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.research.objection_research.v1",
    slug: "objection-research-prompt",
    type: "prompt",
    title: "Objection Research Prompt",
    promise: "Predict the objections that block the sale and how to answer each.",
    summary:
      "Map the doubts, fears, and competing priorities that stop a buyer, with a content or copy answer for each.",
    category: "audience_research",
    tags: ["objections", "sales", "copy"],
    difficulty: "beginner",
    estimatedTimeMinutes: 8,
    bestFor: ["course_creator", "coach", "consultant"],
    useCase:
      "People rarely say no to your offer; they say no to an unspoken objection. Surfacing them lets you answer in content before the buyer even asks.",
    whenToUse: [
      "Writing a sales page or launch emails.",
      "When traffic is fine but conversion is low.",
      "Planning content that pre-handles doubts."
    ],
    inputs: [
      { name: "offer", type: "string", required: true, description: "What you're selling and the price." },
      { name: "audience", type: "string", required: true, description: "Who you're selling to." },
      { name: "proof", type: "string", required: false, description: "Results, testimonials, credentials you have." }
    ],
    outputFields: [
      { field: "objections", type: "object[]", description: "Each objection with type and likely frequency." },
      { field: "answers", type: "string[]", description: "A reframe or proof for each objection." },
      { field: "content_to_make", type: "string[]", description: "Posts that defuse the top objections." }
    ],
    systemPrompt: "You are a conversion strategist who knows the real objection is rarely the stated one.",
    promptTemplate: `Map objections to this offer.

Offer and price: {{offer}}
Audience: {{audience}}
Proof I have: {{proof}}

List the likely objections grouped by type: price, trust, timing, fit, and "I can do it myself". For each, mark how common it is and give a concrete reframe or proof point to answer it (use my proof where relevant, don't invent results). Then list three pieces of content that pre-handle the most common objections before someone hits the sales page.`,
    exampleOutput: `Objection (trust, common): "Does this work for someone with no audience?"
Answer: show the two case studies that started from zero; reframe as a system, not a megaphone.
Make: a post titled "How the no-audience version of this works".`,
    compatibleWith: COMPAT,
    automationNotes: "Feed answers into the Offer Page Generator's FAQ section.",
    related: ["promptdir.offer.offer_page.v1", "promptdir.research.audience_pain_finder.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
