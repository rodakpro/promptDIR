import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"];

export const offerAssets: LibraryAsset[] = [
  {
    id: "promptdir.offer.product_validator.v1",
    slug: "digital-product-validator",
    type: "checklist",
    title: "Digital Product Idea Validator",
    promise: "Score demand and pick the smallest test before you build the product.",
    summary:
      "Evaluate whether a creator's product idea has real demand, expose the risks, and choose the cheapest validation step.",
    category: "offer_creation",
    tags: ["validation", "offer", "presale"],
    difficulty: "beginner",
    estimatedTimeMinutes: 10,
    bestFor: ["solo_creator", "newsletter_operator", "coach", "educator"],
    notFor: ["large_marketing_team"],
    useCase:
      "Most creator products fail because they were built before anyone proved they wanted them. This forces a demand check and a small test first.",
    whenToUse: [
      "You have a course, template, or product idea.",
      "Before spending weeks building anything.",
      "Choosing between two product directions."
    ],
    inputs: [
      { name: "audience", type: "string", required: true, description: "Who the creator serves." },
      { name: "problem", type: "string", required: true, description: "The problem the product solves." },
      { name: "offer_idea", type: "string", required: true, description: "The product, course, template, or resource." },
      { name: "proof", type: "string", required: false, description: "Comments, waitlist, paid clients, questions." },
      { name: "channels", type: "array", required: false, description: "Distribution channels you have." }
    ],
    outputFields: [
      { field: "demand_score", type: "number_1_to_10", description: "How strong the demand signal is." },
      { field: "ideal_buyer", type: "string", description: "The specific person most likely to buy." },
      { field: "main_risks", type: "string[]", description: "What could make this flop." },
      { field: "validation_tests", type: "string[]", description: "Cheap tests ranked by speed." },
      { field: "pre_sale_angle", type: "string", description: "How to frame a pre-sale." },
      { field: "next_action", type: "string", description: "The single next step." }
    ],
    systemPrompt:
      "You are a practical, skeptical creator-business strategist. Be direct and evidence-based; encouragement is not your job.",
    promptTemplate: `Evaluate this product idea for a solo creator.

Audience: {{audience}}
Problem: {{problem}}
Offer idea: {{offer_idea}}
Proof so far: {{proof}}
Channels: {{channels}}

Score demand 1-10 and justify it from the proof, not optimism. Name the ideal buyer specifically. List the main risks. Give validation tests ranked from cheapest/fastest to most involved. Propose a pre-sale angle. End with the single next action. If demand is weak, say so and suggest what to change.`,
    exampleOutput: `Demand score: 6/10 — interest is real but unpaid; no waitlist yet.
Ideal buyer: freelance designers at $3-6k/mo who just lost a retainer.
Risks: audience likes free tips, untested willingness to pay.
Tests: 1) DM 15 people a one-line offer, 2) a waitlist page, 3) a $99 pre-sale.
Next action: run test 1 this week.`,
    compatibleWith: COMPAT,
    automationNotes: "If demand_score >= 7, hand off to the Pre-Sale Test prompt automatically.",
    n8n: { trigger: "form_submission", nodes: ["OpenAI", "Notion"], outputs: ["Notion", "Email"] },
    related: ["promptdir.offer.presale_test.v1", "promptdir.agent.offer_reviewer.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.offer.lead_magnet.v1",
    slug: "lead-magnet-generator",
    type: "prompt",
    title: "Lead Magnet Generator",
    promise: "Design a lead magnet people actually want, tied to your paid offer.",
    summary:
      "Generate lead magnet concepts that solve one urgent problem fast and set up the next purchase, not just an email grab.",
    category: "sales_growth",
    tags: ["lead-magnet", "list-building", "funnel"],
    difficulty: "beginner",
    estimatedTimeMinutes: 8,
    bestFor: ["newsletter_operator", "coach", "course_creator"],
    useCase:
      "A random PDF grows a list of people who never buy. A lead magnet aligned to your offer attracts the right buyer and warms them up.",
    whenToUse: [
      "Starting or rebooting list growth.",
      "When subscribers join but never convert.",
      "Launching a new paid offer that needs a top of funnel."
    ],
    inputs: [
      { name: "audience", type: "string", required: true, description: "Who you want on the list." },
      { name: "paid_offer", type: "string", required: true, description: "The product the magnet should lead toward." },
      { name: "quick_win", type: "string", required: false, description: "A fast result you can help them get." }
    ],
    outputFields: [
      { field: "concepts", type: "object[]", description: "Three magnet ideas with format and promise." },
      { field: "recommended", type: "string", description: "The best fit and why." },
      { field: "title_options", type: "string[]", description: "Five title options for the pick." },
      { field: "bridge_to_offer", type: "string", description: "How it leads to the paid offer." }
    ],
    systemPrompt: "You design lead magnets that pre-qualify buyers, not vanity opt-ins.",
    promptTemplate: `Design a lead magnet.

Audience: {{audience}}
Paid offer it should lead to: {{paid_offer}}
Quick win I can deliver: {{quick_win}}

Give three concepts (each with format, the one urgent problem it solves, and the promise). Pick the strongest and say why it pre-qualifies buyers for the paid offer. Offer five title options. Describe the natural bridge from the magnet to the paid offer. Favor magnets that deliver a result in under 15 minutes over long ebooks.`,
    exampleOutput: `Concepts: 1) a Notion pricing calculator, 2) a 5-email "raise your rates" course, 3) a swipe file of cold DMs.
Recommended: the calculator — it makes the pricing pain concrete and the course is the obvious next step.
Titles: "What Should You Actually Charge?" ...`,
    compatibleWith: COMPAT,
    automationNotes: "Route the chosen title to a landing page builder; tag opt-ins for the offer sequence.",
    related: ["promptdir.offer.offer_page.v1", "promptdir.offer.product_validator.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.offer.offer_page.v1",
    slug: "offer-page-generator",
    type: "prompt",
    title: "Offer Page Generator",
    promise: "Draft a full sales page section by section, grounded in real proof.",
    summary:
      "Produce a structured offer page: headline, problem, promise, what's inside, proof, pricing, FAQ, and a clear CTA.",
    category: "offer_creation",
    tags: ["sales-page", "copy", "conversion"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 15,
    bestFor: ["course_creator", "coach", "consultant"],
    notFor: ["enterprise_sales"],
    useCase:
      "Staring at a blank sales page is where launches stall. This gives you a complete, ordered draft you can tighten instead of inventing structure under pressure.",
    whenToUse: [
      "Building a page for a course, cohort, or service.",
      "Rewriting a page that gets traffic but no sales.",
      "Turning validated demand into a real offer."
    ],
    inputs: [
      { name: "offer", type: "string", required: true, description: "What it is, what's included, and the price." },
      { name: "audience", type: "string", required: true, description: "Who it's for and their pain." },
      { name: "proof", type: "string", required: false, description: "Testimonials, results, credentials." },
      { name: "objections", type: "array", required: false, description: "Known objections to pre-empt." }
    ],
    outputFields: [
      { field: "headline", type: "string", description: "Primary headline plus two alternatives." },
      { field: "sections", type: "object[]", description: "Each page section with drafted copy." },
      { field: "faq", type: "object[]", description: "Objection-handling Q&A." },
      { field: "cta", type: "string", description: "The primary call to action." }
    ],
    systemPrompt: "You are a direct-response copywriter. Specific beats clever. You never fabricate testimonials or results.",
    promptTemplate: `Write an offer page.

Offer (incl. price and inclusions): {{offer}}
Audience and their pain: {{audience}}
Proof available: {{proof}}
Objections to handle: {{objections}}

Draft these sections in order: headline (+2 alternatives), the problem stated in the reader's words, the promise/outcome, what's inside, who it's for / not for, proof (use only real proof provided), pricing with justification, an FAQ that defuses the objections, and a final CTA. Keep claims honest and concrete. Flag any place where I should add a real testimonial.`,
    exampleOutput: `Headline: "Stop guessing what to charge — price every project in 10 minutes."
Sections: Problem → "You quote, then immediately wonder if you left money on the table..."
FAQ: "Does this work without an audience?" → ...
[ADD TESTIMONIAL: a before/after rate result]`,
    compatibleWith: COMPAT,
    automationNotes: "Pull objections from the Objection Research prompt to fill the FAQ.",
    related: ["promptdir.research.objection_research.v1", "promptdir.offer.pricing_strategy.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.offer.pricing_strategy.v1",
    slug: "pricing-strategy-prompt",
    type: "prompt",
    title: "Pricing Strategy Prompt",
    promise: "Set a defensible price with tiers, anchors, and a rationale you can hold.",
    summary:
      "Analyze value, audience, and positioning to recommend a price, optional tiers, and how to present it without flinching.",
    category: "offer_creation",
    tags: ["pricing", "monetization", "strategy"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 10,
    bestFor: ["coach", "consultant", "course_creator", "freelancer"],
    useCase:
      "Creators routinely underprice out of fear. This grounds the number in value and positioning so you can name it with confidence.",
    whenToUse: [
      "Launching a new offer.",
      "When you suspect you're undercharging.",
      "Designing tiers or a payment plan."
    ],
    inputs: [
      { name: "offer", type: "string", required: true, description: "What it is and the outcome it delivers." },
      { name: "audience", type: "string", required: true, description: "Buyer and their budget reality." },
      { name: "positioning", type: "string", required: false, description: "Premium, accessible, or in between." },
      { name: "comparables", type: "string", required: false, description: "What similar offers cost." }
    ],
    outputFields: [
      { field: "recommended_price", type: "string", description: "The number and the logic behind it." },
      { field: "tiers", type: "object[]", description: "Optional good/better/best structure." },
      { field: "anchors", type: "string[]", description: "What to compare the price against." },
      { field: "presentation", type: "string", description: "How to present the price on the page." }
    ],
    systemPrompt: "You price on value and outcome, not hours. You are comfortable recommending higher prices when justified.",
    promptTemplate: `Recommend pricing for this offer.

Offer and outcome: {{offer}}
Audience and budget: {{audience}}
Positioning: {{positioning}}
Comparable offers: {{comparables}}

Recommend a price and justify it from the value of the outcome, not effort. Propose optional tiers if they fit. Suggest anchors that make the price feel reasonable. Describe how to present the price (framing, payment plan, guarantee). Note the risks of going too low. Give a confident, specific number, not a range to hide behind.`,
    exampleOutput: `Recommended: $499 — the outcome (one new $4k client) is 8x the price.
Tiers: $299 self-serve / $499 + templates / $1,500 with a call.
Anchors: one client pays for it 8x; a day of your time costs more.
Presentation: lead with the outcome, show the 8x math, offer a 3-pay plan.`,
    compatibleWith: COMPAT,
    automationNotes: "Feed recommended_price into the Offer Page Generator's pricing section.",
    related: ["promptdir.offer.offer_page.v1", "promptdir.offer.service_packaging.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.offer.service_packaging.v1",
    slug: "creator-service-packaging-prompt",
    type: "prompt",
    title: "Creator Service Packaging Prompt",
    promise: "Turn vague 'I do consulting' into productized packages people can buy.",
    summary:
      "Convert a fuzzy service into clear, scoped packages with deliverables, boundaries, and an easy yes.",
    category: "offer_creation",
    tags: ["productized-service", "packaging", "scope"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 12,
    bestFor: ["consultant", "freelancer", "agency_of_one"],
    useCase:
      "Selling hours invites scope creep and price haggling. Productized packages make the offer legible and protect your time.",
    whenToUse: [
      "Moving from hourly to fixed-scope work.",
      "When every client engagement looks different and chaotic.",
      "Designing a clear ladder from small to flagship."
    ],
    inputs: [
      { name: "service", type: "string", required: true, description: "What you do and for whom." },
      { name: "outcomes", type: "string", required: true, description: "Results clients actually want." },
      { name: "constraints", type: "string", required: false, description: "Time, capacity, things you won't do." }
    ],
    outputFields: [
      { field: "packages", type: "object[]", description: "Named packages with scope, deliverables, price band." },
      { field: "boundaries", type: "string[]", description: "What's explicitly out of scope." },
      { field: "entry_offer", type: "string", description: "A low-risk first step for new clients." },
      { field: "upsell_path", type: "string", description: "How clients move up the ladder." }
    ],
    systemPrompt: "You productize services. You protect the operator's time with clear scope and boundaries.",
    promptTemplate: `Package this service.

Service: {{service}}
Outcomes clients want: {{outcomes}}
My constraints: {{constraints}}

Design two or three named packages, each with a clear scope, concrete deliverables, a turnaround, and a price band. Make boundaries explicit so scope creep is hard. Propose a low-risk entry offer to start relationships and an upsell path to the flagship. Name packages for the outcome, not the activity.`,
    exampleOutput: `Packages: "Audit" ($750, 1 week) → "Rebuild" ($3,500, 3 weeks) → "Partner" ($2k/mo retainer).
Boundaries: one revision round; no ad management; async only.
Entry offer: the $750 Audit, creditable toward Rebuild.`,
    compatibleWith: COMPAT,
    automationNotes: "Pair with Pricing Strategy to set the price bands; render packages on the offer page.",
    related: ["promptdir.offer.pricing_strategy.v1", "promptdir.offer.offer_page.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.offer.presale_test.v1",
    slug: "pre-sale-test-prompt",
    type: "prompt",
    title: "Pre-Sale Test Prompt",
    promise: "Design a real pre-sale that proves demand with money, not likes.",
    summary:
      "Plan a pre-sale: the offer, the page, the ask, the pricing, and the threshold that means go or no-go.",
    category: "offer_creation",
    tags: ["presale", "validation", "launch"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 12,
    bestFor: ["course_creator", "coach", "newsletter_operator"],
    useCase:
      "Surveys and waitlists lie; payment doesn't. A pre-sale tells you whether to build before you build.",
    whenToUse: [
      "After an idea scores well on validation.",
      "When you want proof before committing weeks of work.",
      "Funding a build with real revenue."
    ],
    inputs: [
      { name: "offer_idea", type: "string", required: true, description: "What you'd pre-sell." },
      { name: "audience", type: "string", required: true, description: "Who you'd sell it to and your reach." },
      { name: "build_cost", type: "string", required: false, description: "Time/effort to actually build it." }
    ],
    outputFields: [
      { field: "presale_offer", type: "string", description: "The exact pre-sale offer and incentive." },
      { field: "price_and_terms", type: "string", description: "Price, founding discount, refund terms." },
      { field: "go_threshold", type: "string", description: "The number of sales that means build it." },
      { field: "outreach_plan", type: "string[]", description: "Where and how to drive the pre-sale." },
      { field: "kill_criteria", type: "string", description: "What result means stop." }
    ],
    systemPrompt: "You design honest pre-sales with a clear go/no-go threshold. No fake scarcity.",
    promptTemplate: `Design a pre-sale test.

Offer idea: {{offer_idea}}
Audience and my reach: {{audience}}
Cost to build: {{build_cost}}

Define the pre-sale offer (with a genuine founding-member incentive), the price and refund terms, and a specific go threshold (number of buyers) that justifies building. Give an outreach plan using the reach I have. State the kill criteria — the result that means I should not build this. Keep it honest: refundable, real deadline, no manufactured scarcity.`,
    exampleOutput: `Pre-sale: founding cohort at $149 (will be $299), fully refundable until launch.
Go threshold: 20 paid in 10 days.
Outreach: 3 emails to the list, 5 LinkedIn posts, 30 personal DMs.
Kill criteria: under 8 sales → reshape the offer or audience.`,
    compatibleWith: COMPAT,
    automationNotes: "Track buyers in a sheet; auto-email founders when the threshold is hit.",
    related: ["promptdir.offer.product_validator.v1", "promptdir.research.niche_opportunity.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
