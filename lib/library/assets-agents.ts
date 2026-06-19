import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "openai_assistants", "gemini", "n8n", "langchain", "mcp"];

export const agentAssets: LibraryAsset[] = [
  {
    id: "promptdir.agent.content_strategist.v1",
    slug: "content-strategist-agent",
    type: "agent",
    title: "Creator Content Strategist Agent",
    promise: "A role-based agent that plans content and hands off to the right prompt.",
    summary:
      "Turns niche, audience, and offer into pillars, prioritized topics, and a publishing plan, then routes work to specific prompts.",
    category: "content_strategy",
    tags: ["agent", "strategy", "planning"],
    difficulty: "advanced",
    estimatedTimeMinutes: 15,
    bestFor: ["solo_creator", "newsletter_operator", "consultant"],
    notFor: ["one_off_task"],
    useCase:
      "A single prompt answers once and stops. This agent holds the planning role, scores ideas against your goals, and knows which production prompt to hand each task to.",
    whenToUse: [
      "Setting up a content engine, not just one post.",
      "When you want strategy that connects to your offer.",
      "Driving an automated content pipeline."
    ],
    inputs: [
      { name: "niche", type: "string", required: true, description: "The space you operate in." },
      { name: "audience", type: "string", required: true, description: "Who you serve and their stage." },
      { name: "offer", type: "string", required: false, description: "What you sell or will sell." },
      { name: "platforms", type: "array", required: true, description: "Where you publish." }
    ],
    outputFields: [
      { field: "content_pillars", type: "string[]", description: "The durable themes to publish under." },
      { field: "priority_topics", type: "object[]", description: "Topics with angle, business goal, and a score." },
      { field: "publishing_plan", type: "string[]", description: "A concrete near-term plan." },
      { field: "handoffs", type: "string[]", description: "Which production prompt should make each piece." }
    ],
    role: "You are a senior content strategist for creator-led businesses.",
    goals: [
      "Find content ideas that serve the creator's audience.",
      "Connect every piece of content to a business goal.",
      "Prioritize by audience pain and monetization potential."
    ],
    workflowSteps: [
      "Clarify the audience and the business goal.",
      "Generate content themes (pillars).",
      "Score ideas by relevance, novelty, and conversion potential.",
      "Create a publishing plan.",
      "Route each piece to the right production prompt."
    ],
    toolsNeeded: ["web_search_optional", "content_archive_optional", "newsletter_archive_optional"],
    handoffs: [
      "promptdir.content.linkedin_post.v1",
      "promptdir.content.newsletter_issue.v1",
      "promptdir.content.short_video_hook.v1"
    ],
    systemPrompt: "You are a senior content strategist for creator-led businesses.",
    promptTemplate: `Act as my content strategist.

Niche: {{niche}}
Audience: {{audience}}
Offer: {{offer}}
Platforms: {{platforms}}

Step 1: restate the audience and the business goal in one line.
Step 2: propose content pillars.
Step 3: generate priority topics; for each give an angle, the business goal it serves, and a 1-10 score for relevance, novelty, and conversion potential.
Step 4: produce a two-week publishing plan across the platforms.
Step 5: for each planned piece, name which production prompt should write it (LinkedIn post, newsletter issue, or short-video hook).
Be opinionated and prioritize ruthlessly.`,
    exampleOutput: `Goal: turn readers into Audit buyers.
Pillars: Receipts Over Theory, The Solo Stack, Boring Leverage.
Priority topic: "The pricing post that booked 3 calls" — angle: receipts; goal: lead-gen; scores R9/N6/C9.
Plan: Mon LinkedIn (→ linkedin-post-generator), Thu newsletter (→ newsletter-issue-generator)...`,
    compatibleWith: COMPAT,
    automationNotes: "Run as the planning node; pipe each handoff to its prompt in sequence.",
    related: ["promptdir.content.pillar_generator.v1", "promptdir.content.calendar.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.agent.offer_reviewer.v1",
    slug: "offer-reviewer-agent",
    type: "agent",
    title: "Offer Reviewer Agent",
    promise: "A skeptical agent that pressure-tests an offer before you launch it.",
    summary:
      "Reviews an offer end to end — promise, proof, price, and page — and returns prioritized fixes with a launch-readiness call.",
    category: "offer_creation",
    tags: ["agent", "offer", "review"],
    difficulty: "advanced",
    estimatedTimeMinutes: 15,
    bestFor: ["course_creator", "coach", "consultant"],
    notFor: ["idea_stage_only"],
    useCase:
      "Founders fall in love with their own offers and miss the holes. This agent role-plays a sharp, friendly skeptic and tells you what to fix before customers find it.",
    whenToUse: [
      "Before opening cart on any offer.",
      "When a launch underperformed and you need a diagnosis.",
      "Sanity-checking price and positioning."
    ],
    inputs: [
      { name: "offer", type: "string", required: true, description: "The full offer: promise, inclusions, price." },
      { name: "audience", type: "string", required: true, description: "Who it's for and their pain." },
      { name: "proof", type: "string", required: false, description: "Results, testimonials, credentials." },
      { name: "page", type: "string", required: false, description: "The sales page copy, if it exists." }
    ],
    outputFields: [
      { field: "readiness_score", type: "number_1_to_10", description: "How launch-ready the offer is." },
      { field: "strengths", type: "string[]", description: "What's already working." },
      { field: "gaps", type: "object[]", description: "Each weakness, with severity and a fix." },
      { field: "priority_fixes", type: "string[]", description: "The top three things to fix first." },
      { field: "verdict", type: "string", description: "Launch, fix-then-launch, or rework." }
    ],
    role: "You are a skeptical but constructive offer reviewer who has seen many creator launches.",
    goals: [
      "Find the gaps between the offer and a confident purchase.",
      "Separate cosmetic issues from conversion-killers.",
      "Give a clear, honest launch-readiness verdict."
    ],
    workflowSteps: [
      "Assess the promise: is it specific, believable, and wanted?",
      "Check proof against the promise for credibility gaps.",
      "Evaluate price against the value and audience.",
      "Review the page for clarity and objection handling.",
      "Prioritize fixes and give a verdict."
    ],
    toolsNeeded: ["web_search_optional"],
    handoffs: [
      "promptdir.offer.offer_page.v1",
      "promptdir.offer.pricing_strategy.v1",
      "promptdir.research.objection_research.v1"
    ],
    systemPrompt: "You are a skeptical but constructive offer reviewer who has seen many creator launches.",
    promptTemplate: `Review my offer before launch.

Offer (promise, inclusions, price): {{offer}}
Audience and pain: {{audience}}
Proof: {{proof}}
Sales page: {{page}}

Score launch-readiness 1-10. Note the genuine strengths. Then find the gaps — promise believability, proof-to-promise fit, price justification, page clarity, objection handling — and rate each by severity with a concrete fix. Give the top three fixes to do first and a one-line verdict: launch, fix-then-launch, or rework. Be honest, not harsh; your job is to prevent a quiet failure.`,
    exampleOutput: `Readiness: 6/10.
Strengths: clear audience, strong founder story.
Gaps: promise is vague ("grow your business") [high] → tie to one outcome; no proof from zero-audience buyers [high]; price unjustified [med].
Priority fixes: sharpen the promise, add one zero-start case study, show the price math.
Verdict: fix-then-launch.`,
    compatibleWith: COMPAT,
    automationNotes: "Route each gap to the matching prompt (page, pricing, objections) for a fix draft.",
    related: ["promptdir.offer.product_validator.v1", "promptdir.offer.offer_page.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
