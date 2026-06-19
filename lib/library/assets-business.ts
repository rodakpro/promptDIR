import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"];

export const businessAssets: LibraryAsset[] = [
  {
    id: "promptdir.business.decision_journal.v1",
    slug: "decision-journal",
    type: "prompt",
    title: "Decision Journal",
    promise: "Make a hard call clearer by writing it down the right way.",
    summary:
      "Structure a decision — options, assumptions, reversibility, and a pre-mortem — so you choose with a clear head.",
    category: "business_management",
    tags: ["decision", "clarity", "operations"],
    difficulty: "beginner",
    estimatedTimeMinutes: 10,
    bestFor: ["solo_creator", "founder", "consultant"],
    useCase:
      "Solo founders make big calls alone and second-guess them. A decision journal slows the moment down, surfaces the real assumptions, and leaves a record to learn from.",
    whenToUse: [
      "Facing a meaningful, hard-to-reverse choice.",
      "Stuck going in circles on an option.",
      "Recording why you decided, to review later."
    ],
    inputs: [
      { name: "decision", type: "string", required: true, description: "The choice you are facing." },
      { name: "options", type: "string", required: true, description: "The realistic options on the table." },
      { name: "constraints", type: "string", required: false, description: "Time, money, energy, or values at stake." }
    ],
    outputFields: [
      { field: "framing", type: "string", description: "The decision restated in one clear sentence." },
      { field: "assumptions", type: "string[]", description: "What must be true for each option to win." },
      { field: "reversibility", type: "string", description: "How easily each option can be undone." },
      { field: "pre_mortem", type: "string[]", description: "How this could go wrong in 6 months." },
      { field: "recommendation", type: "string", description: "A leaning, with the trigger to revisit." }
    ],
    systemPrompt: "You are a calm thinking partner. You expose assumptions and avoid false certainty.",
    promptTemplate: `Help me journal this decision.

Decision: {{decision}}
Options: {{options}}
Constraints: {{constraints}}

Restate the decision in one sentence. For each option, list the assumptions that must hold and how reversible it is. Run a quick pre-mortem: if this goes badly in six months, why? Give a leaning and the specific signal that should make me revisit it. Do not pretend to be certain.`,
    exampleOutput: `Framing: Should I drop the membership to focus on the course?
Assumptions: course converts the same audience; members won't churn loudly.
Reversibility: high — I can relaunch the membership later.
Pre-mortem: course flops and I killed recurring revenue for nothing.
Leaning: pause membership, pre-sell course; revisit if pre-sale < 20.`,
    compatibleWith: COMPAT,
    automationNotes: "Append each entry to a Notion decision log with a review date.",
    related: ["promptdir.business.project_prioritizer.v1", "promptdir.automation.weekly_review.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.business.project_prioritizer.v1",
    slug: "project-prioritizer",
    type: "checklist",
    title: "Project Prioritizer",
    promise: "Rank your project list by impact and effort, then pick one.",
    summary:
      "Score competing projects on impact, effort, and momentum so you commit to the few that matter.",
    category: "business_management",
    tags: ["prioritization", "focus", "planning"],
    difficulty: "beginner",
    estimatedTimeMinutes: 8,
    bestFor: ["solo_creator", "founder", "freelancer"],
    useCase:
      "A solo operator's list is always longer than the week. This forces a ranking so you stop spreading thin and ship the high-leverage few.",
    whenToUse: [
      "Your to-do list has more than you can do.",
      "Planning a quarter or a sprint.",
      "Deciding what to drop."
    ],
    inputs: [
      { name: "projects", type: "string", required: true, description: "The projects or ideas competing for time." },
      { name: "goal", type: "string", required: false, description: "The outcome this period should move." },
      { name: "capacity", type: "string", required: false, description: "Realistic hours you have." }
    ],
    outputFields: [
      { field: "ranked", type: "object[]", description: "Projects scored by impact, effort, and momentum." },
      { field: "do_now", type: "string", description: "The single project to commit to first." },
      { field: "park", type: "string[]", description: "What to explicitly defer or drop." }
    ],
    systemPrompt: "You force ruthless focus. One priority beats five half-done projects.",
    promptTemplate: `Prioritize my projects.

Projects: {{projects}}
Goal this period: {{goal}}
Capacity: {{capacity}}

Score each on impact (toward the goal), effort, and momentum (already moving). Rank them. Name the single project to do first and why. List what to park or drop outright. Be honest if I am taking on too much for my capacity.`,
    exampleOutput: `Ranked: 1) launch the Audit offer (high impact, low effort, has momentum) 2) YouTube channel (high impact, high effort) ...
Do now: ship the Audit offer page this week.
Park: the podcast and the rebrand — not this quarter.`,
    compatibleWith: COMPAT,
    automationNotes: "Map ranked output to a Notion board; carry do_now into the weekly review.",
    related: ["promptdir.business.decision_journal.v1", "promptdir.automation.weekly_review.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.business.revenue_planner.v1",
    slug: "revenue-stream-planner",
    type: "prompt",
    title: "Revenue Stream Planner",
    promise: "Map how a creator business actually adds up to its income goal.",
    summary:
      "Turn an income target into a realistic mix of revenue streams with the math and the riskiest assumption.",
    category: "business_management",
    tags: ["revenue", "monetization", "planning"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 12,
    bestFor: ["solo_creator", "coach", "consultant"],
    useCase:
      "A vague income goal stays a wish. This breaks the number into concrete streams and the units each must sell, so you can see if the plan is real.",
    whenToUse: [
      "Setting an annual or monthly income goal.",
      "Deciding whether to add a new revenue stream.",
      "Sanity-checking if the math actually works."
    ],
    inputs: [
      { name: "goal", type: "string", required: true, description: "Target income and timeframe." },
      { name: "assets", type: "string", required: true, description: "What you can sell: products, services, sponsorships." },
      { name: "audience", type: "string", required: false, description: "Size and buying power of your audience." }
    ],
    outputFields: [
      { field: "mix", type: "object[]", description: "Each stream with price, units, and revenue." },
      { field: "total", type: "string", description: "How the mix sums to the goal." },
      { field: "riskiest", type: "string", description: "The assumption most likely to break the plan." },
      { field: "first_move", type: "string", description: "The one stream to build or fix first." }
    ],
    systemPrompt: "You are a pragmatic revenue planner who shows the math and flags fantasy numbers.",
    promptTemplate: `Plan my revenue streams.

Goal: {{goal}}
What I can sell: {{assets}}
Audience: {{audience}}

Propose a realistic mix of streams. For each, give a price, the units needed, and the revenue. Show how the mix sums to the goal. Flag the riskiest assumption (usually a conversion rate or audience size). Recommend the single stream to build or fix first. If the goal needs unrealistic conversion, say so and suggest a saner target.`,
    exampleOutput: `Mix: course $299 × 60 = $17,940; coaching $1,500 × 6 = $9,000; sponsors $400 × 12 = $4,800.
Total: ~$31.7k toward the $30k goal.
Riskiest: 60 course sales needs ~2% of the list — tight.
First move: build the course pre-sale to de-risk the biggest line.`,
    compatibleWith: COMPAT,
    automationNotes: "Feed the mix into a spreadsheet model; track actuals against units monthly.",
    related: ["promptdir.offer.pricing_strategy.v1", "promptdir.business.ninety_day_plan.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.business.ninety_day_plan.v1",
    slug: "90-day-creator-business-plan",
    type: "workflow",
    title: "90-Day Creator Business Plan",
    promise: "Turn a big goal into a focused, weekly 90-day plan.",
    summary:
      "Break one quarter goal into monthly milestones and a weekly cadence you can actually sustain solo.",
    category: "business_management",
    tags: ["planning", "quarter", "operating-rhythm"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 15,
    bestFor: ["solo_creator", "founder", "consultant"],
    notFor: ["team_okr_process"],
    useCase:
      "Annual plans are too abstract and daily lists are too short-sighted. Ninety days is long enough to matter and short enough to stay focused.",
    whenToUse: [
      "At the start of a quarter.",
      "After a launch, to plan the next push.",
      "When you feel busy but directionless."
    ],
    inputs: [
      { name: "goal", type: "string", required: true, description: "The one outcome for the next 90 days." },
      { name: "starting_point", type: "string", required: false, description: "Where you are now (list, revenue, offers)." },
      { name: "capacity", type: "string", required: false, description: "Hours per week you can commit." }
    ],
    outputFields: [
      { field: "north_star", type: "string", description: "The single measurable 90-day outcome." },
      { field: "monthly_milestones", type: "string[]", description: "A milestone for each of the three months." },
      { field: "weekly_cadence", type: "string[]", description: "The repeating weekly rhythm to hit them." },
      { field: "guardrails", type: "string[]", description: "What to say no to for 90 days." }
    ],
    systemPrompt: "You build sustainable 90-day plans for one person, not corporate OKRs.",
    promptTemplate: `Build my 90-day plan.

Goal: {{goal}}
Starting point: {{starting_point}}
Weekly capacity: {{capacity}}

Set one measurable north-star outcome. Break it into three monthly milestones. Define a realistic weekly cadence (what recurs every week) that adds up to the milestones within my capacity. List guardrails — the things I will say no to for 90 days to protect focus. Keep it sustainable, not heroic.`,
    exampleOutput: `North star: 1,000 new subscribers and a $5k product launch.
Month 1: ship lead magnet + 2 posts/week. Month 2: build the course. Month 3: launch.
Weekly cadence: 1 newsletter, 3 LinkedIn posts, 2 hours product build, 1 review.
Guardrails: no new platforms, no rebrand, no free consulting.`,
    compatibleWith: COMPAT,
    automationNotes: "Drop milestones and cadence into a planner; review against the weekly CEO review.",
    related: ["promptdir.automation.weekly_review.v1", "promptdir.business.revenue_planner.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
