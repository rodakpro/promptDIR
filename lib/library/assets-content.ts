import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"];

export const contentAssets: LibraryAsset[] = [
  {
    id: "promptdir.content.pillar_generator.v1",
    slug: "content-pillar-generator",
    type: "prompt",
    title: "Content Pillar Generator",
    promise: "Turn a niche and an offer into 4-6 durable content pillars.",
    summary:
      "Define the handful of themes you publish under so every post ladders up to your positioning and your offer.",
    category: "content_strategy",
    tags: ["pillars", "positioning", "strategy"],
    difficulty: "beginner",
    estimatedTimeMinutes: 10,
    bestFor: ["solo_creator", "newsletter_operator", "coach", "educator"],
    notFor: ["large_marketing_team"],
    useCase:
      "You post about whatever crosses your mind, so your feed reads as random and nobody can say what you stand for. Pillars give you a small, repeatable set of themes that compound into a recognizable point of view.",
    whenToUse: [
      "Starting a new channel or newsletter from scratch.",
      "Rebooting an account that has drifted off-topic.",
      "Briefing a freelancer or an automation on what to write about."
    ],
    inputs: [
      { name: "niche", type: "string", required: true, description: "The space you operate in." },
      { name: "audience", type: "string", required: true, description: "Who you serve and their stage." },
      { name: "offer", type: "string", required: false, description: "What you sell or plan to sell." },
      { name: "platforms", type: "array", required: true, description: "Where you publish." }
    ],
    outputFields: [
      { field: "pillars", type: "string[]", description: "4-6 named themes." },
      { field: "pillar_rationale", type: "string[]", description: "Why each pillar earns attention and trust." },
      { field: "sample_topics", type: "string[]", description: "Three concrete topics per pillar." },
      { field: "offer_link", type: "string[]", description: "How each pillar connects back to the offer." }
    ],
    systemPrompt:
      "You are a content strategist for creator-led businesses. You are concrete, opinionated, and allergic to generic advice.",
    promptTemplate: `Design content pillars for a solo creator.

Niche: {{niche}}
Audience: {{audience}}
Offer: {{offer}}
Platforms: {{platforms}}

Return 4-6 pillars. For each: a short memorable name, one sentence on why it earns trust with this audience, three concrete topic ideas, and how it connects back to the offer. Avoid generic buckets like "tips" or "inspiration". Make every pillar specific enough that a stranger could guess the creator's worldview from the names alone.`,
    exampleOutput: `1. Receipts Over Theory — proof-driven build logs. Topics: a teardown of my own funnel, a failed launch post-mortem, real MRR screenshots. Links to offer: positions the paid course as battle-tested.
2. The Solo Stack — the exact tools one person runs a business on...
3. Boring Leverage — automations that quietly remove busywork...`,
    compatibleWith: COMPAT,
    automationNotes:
      "Feed the output into the 30-Day Content Calendar to schedule against each pillar.",
    n8n: { trigger: "manual_or_form", nodes: ["OpenAI", "Notion"], outputs: ["Notion", "Google Docs"] },
    related: ["promptdir.content.calendar.v1", "promptdir.agent.content_strategist.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.content.calendar.v1",
    slug: "30-day-content-calendar",
    type: "prompt",
    title: "30-Day Content Calendar Generator",
    promise: "Get a month of publishing planned against your pillars in one pass.",
    summary:
      "Turn pillars, platforms, and a cadence into a dated 30-day plan with formats, hooks, and a weekly rhythm.",
    category: "content_strategy",
    tags: ["calendar", "planning", "cadence"],
    difficulty: "beginner",
    estimatedTimeMinutes: 12,
    bestFor: ["solo_creator", "newsletter_operator", "coach"],
    notFor: ["large_marketing_team"],
    useCase:
      "Planning day-by-day drains the energy you need for writing. A calendar removes the daily what-do-I-post decision and lets you batch.",
    whenToUse: [
      "At the start of a month or a launch runway.",
      "When you keep skipping days because nothing is queued.",
      "Right after defining or refreshing your pillars."
    ],
    inputs: [
      { name: "pillars", type: "array", required: true, description: "Your content pillars." },
      { name: "platforms", type: "array", required: true, description: "Channels to plan for." },
      { name: "cadence", type: "string", required: true, description: "Posts per week per platform." },
      { name: "offer", type: "string", required: false, description: "What a portion of posts should drive toward." }
    ],
    outputFields: [
      { field: "calendar", type: "object[]", description: "Dated entries with pillar, format, and hook." },
      { field: "weekly_themes", type: "string[]", description: "A focus for each of the four weeks." },
      { field: "promo_ratio", type: "string", description: "Balance of value vs offer posts." }
    ],
    systemPrompt: "You are a pragmatic editorial planner. You plan for a tired solo operator, not a content factory.",
    promptTemplate: `Create a 30-day content calendar.

Pillars: {{pillars}}
Platforms: {{platforms}}
Cadence: {{cadence}}
Offer to support: {{offer}}

Output a dated list (Day 1..30) where each entry has: date, platform, pillar, format, a one-line hook, and whether it is value or promo. Keep promo under 20% of posts. Group the month into four weekly themes. Stagger formats so the same platform never repeats the same format two posts in a row.`,
    exampleOutput: `Week 1 theme: Establish the problem.
Day 1 — LinkedIn — Receipts Over Theory — story post — "I lost $4k on a launch nobody wanted. Here's the signal I ignored." (value)
Day 2 — Newsletter — The Solo Stack — listicle — "7 tools I'd buy again" (value)
Day 3 — X — Boring Leverage — thread — "Automations that paid for themselves" (value)`,
    compatibleWith: COMPAT,
    automationNotes: "Map the calendar array to rows in Notion/Airtable; trigger drafts from each row.",
    n8n: { trigger: "schedule", nodes: ["OpenAI", "Airtable", "Notion"], outputs: ["Airtable", "Notion"] },
    related: ["promptdir.content.pillar_generator.v1", "promptdir.content.linkedin_post.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.content.linkedin_post.v1",
    slug: "linkedin-post-generator",
    type: "prompt",
    title: "LinkedIn Post Generator",
    promise: "Draft a scroll-stopping LinkedIn post in your voice, not a template's.",
    summary:
      "Turn one idea into a hooked, skimmable LinkedIn post with a clear takeaway and a soft call to engage.",
    category: "content_production",
    tags: ["linkedin", "writing", "social"],
    difficulty: "beginner",
    estimatedTimeMinutes: 6,
    bestFor: ["solo_creator", "consultant", "coach", "founder"],
    notFor: ["broadcast_brand_account"],
    useCase:
      "You have the idea but stall on the blank post box. This gets you a strong first draft you can cut down, fast.",
    whenToUse: [
      "You have a lesson, story, or observation worth a post.",
      "You want to repurpose a newsletter section for LinkedIn.",
      "You need to keep a daily posting streak without burning out."
    ],
    inputs: [
      { name: "idea", type: "string", required: true, description: "The core point or story." },
      { name: "audience", type: "string", required: true, description: "Who should care." },
      { name: "voice", type: "string", required: false, description: "Tone notes or a sample of your writing." },
      { name: "cta", type: "string", required: false, description: "What you want readers to do." }
    ],
    outputFields: [
      { field: "hook", type: "string", description: "First line engineered to stop the scroll." },
      { field: "post", type: "string", description: "Full post body, short lines, white space." },
      { field: "alt_hooks", type: "string[]", description: "Three alternative opening lines." }
    ],
    systemPrompt:
      "You write like a sharp practitioner, not a LinkedIn influencer. No emojis unless asked, no broetry clichés, no 'Agree?' bait.",
    promptTemplate: `Write a LinkedIn post.

Idea: {{idea}}
Audience: {{audience}}
Voice: {{voice}}
Desired action: {{cta}}

Open with a concrete, specific first line (no throat-clearing). Keep lines short with white space between thoughts. Deliver one clear takeaway. End with a soft, genuine invitation to engage that fits the action. Then give three alternative hooks. Avoid hashtags and avoid the words "thrilled", "excited", and "game-changer".`,
    exampleOutput: `Hook: A client almost fired me over a $200 invoice. The real problem wasn't the price.

Post: ...short lines, one lesson about scoping...

Alt hooks:
- I undercharged for two years. Here's what it actually cost me.
- "Can you just send it over?" is the most expensive sentence in freelancing.`,
    compatibleWith: COMPAT,
    automationNotes: "Pipe the post field to a Buffer/LinkedIn node; keep alt_hooks for A/B testing.",
    n8n: { trigger: "form_submission", nodes: ["OpenAI", "LinkedIn", "Buffer"], outputs: ["LinkedIn", "Buffer"] },
    related: ["promptdir.content.voice_rewriter.v1", "promptdir.repurpose.newsletter_to_linkedin.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.content.newsletter_issue.v1",
    slug: "newsletter-issue-generator",
    type: "prompt",
    title: "Newsletter Issue Generator",
    promise: "Go from a rough idea to a structured newsletter draft with a strong open.",
    summary:
      "Produce a full issue: subject lines, a hooked opener, a main section with one idea, and a clean sign-off.",
    category: "content_production",
    tags: ["newsletter", "email", "writing"],
    difficulty: "beginner",
    estimatedTimeMinutes: 15,
    bestFor: ["newsletter_operator", "educator", "consultant"],
    notFor: ["transactional_email"],
    useCase:
      "The weekly send is the heartbeat of a creator business and also the easiest thing to skip. This gives you a draft worth editing instead of a blank page.",
    whenToUse: [
      "Your regular issue is due and you have a topic but no structure.",
      "You want to turn a single insight into a teaching issue.",
      "You need three subject lines to test."
    ],
    inputs: [
      { name: "topic", type: "string", required: true, description: "What the issue is about." },
      { name: "audience", type: "string", required: true, description: "Who subscribes and why." },
      { name: "key_point", type: "string", required: true, description: "The one thing they should remember." },
      { name: "cta", type: "string", required: false, description: "Optional ask (reply, link, product)." }
    ],
    outputFields: [
      { field: "subject_lines", type: "string[]", description: "Three subject lines, different angles." },
      { field: "preview_text", type: "string", description: "Inbox preview line." },
      { field: "body", type: "string", description: "Full issue with opener, main section, sign-off." },
      { field: "p_s", type: "string", description: "Optional P.S. carrying the CTA." }
    ],
    systemPrompt: "You write warm, useful, specific newsletters. One idea per issue. No filler.",
    promptTemplate: `Draft a newsletter issue.

Topic: {{topic}}
Audience: {{audience}}
Key point they must remember: {{key_point}}
Call to action: {{cta}}

Give three subject lines (curiosity, benefit, and contrarian angles) plus preview text. Write an opener that earns the next line, one main section that teaches the key point with a concrete example, and a short sign-off. If a CTA is given, carry it in a natural P.S. Keep paragraphs short. Write at a grade-8 reading level.`,
    exampleOutput: `Subjects:
- The pricing mistake I made for two years
- How to raise prices without losing clients
- Cheap clients cost the most

Preview: A 3-step script that doubled my rate.

Body: Hey — quick story...`,
    compatibleWith: COMPAT,
    automationNotes: "Send body to Beehiiv/ConvertKit draft via API; A/B test subject_lines.",
    n8n: { trigger: "schedule", nodes: ["OpenAI", "ConvertKit", "Beehiiv"], outputs: ["ConvertKit", "Beehiiv"] },
    related: ["promptdir.repurpose.newsletter_to_linkedin.v1", "promptdir.content.voice_rewriter.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.content.short_video_hook.v1",
    slug: "short-video-hook-generator",
    type: "prompt",
    title: "Short Video Hook Generator",
    promise: "Get ten thumb-stopping first lines for Reels, Shorts, and TikTok.",
    summary:
      "Generate hooks engineered for the first two seconds, plus a matching on-screen text and a retention beat.",
    category: "content_production",
    tags: ["short-form", "video", "hooks"],
    difficulty: "beginner",
    estimatedTimeMinutes: 5,
    bestFor: ["short_form_creator", "coach", "educator"],
    notFor: ["long_form_only"],
    useCase:
      "Short-form lives or dies in the first two seconds. Most creators bury the hook. This front-loads tension so the view count has a chance.",
    whenToUse: [
      "You have a video idea but a weak opening.",
      "Your watch-time drops in the first three seconds.",
      "You want to batch hooks for a week of clips."
    ],
    inputs: [
      { name: "topic", type: "string", required: true, description: "What the clip teaches or shows." },
      { name: "audience", type: "string", required: true, description: "Who you want to stop." },
      { name: "format", type: "string", required: false, description: "Talking head, screen-record, b-roll, etc." }
    ],
    outputFields: [
      { field: "hooks", type: "string[]", description: "Ten spoken first lines." },
      { field: "on_screen_text", type: "string[]", description: "A matching caption for each hook." },
      { field: "retention_beat", type: "string", description: "A line to re-hook at the 3-5s mark." }
    ],
    systemPrompt: "You write short-form hooks that create an open loop in under two seconds. No 'in this video'.",
    promptTemplate: `Write 10 short-video hooks.

Topic: {{topic}}
Audience: {{audience}}
Format: {{format}}

Each hook is a spoken first line under 12 words that creates curiosity, stakes, or a pattern interrupt. For each, give a tight on-screen caption. Then give one retention beat to drop at 3-5 seconds so viewers don't bounce. No "in this video", no "let me show you", no slow build-ups.`,
    exampleOutput: `1. "Stop posting daily. It's killing your reach." / caption: DAILY ≠ GROWTH
2. "I deleted 90% of my content and grew faster."
...
Retention beat: "But the third one is the part everyone skips —"`,
    compatibleWith: COMPAT,
    automationNotes: "Pair hooks with the Repurposing workflow to script full clips from a long-form source.",
    n8n: { trigger: "form_submission", nodes: ["OpenAI", "Google Sheets"], outputs: ["Google Sheets", "Notion"] },
    related: ["promptdir.repurpose.youtube_to_shorts.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.content.voice_rewriter.v1",
    slug: "creator-voice-rewriter",
    type: "prompt",
    title: "Creator Voice Rewriter",
    promise: "Rewrite any draft so it sounds like you, using a sample of your writing.",
    summary:
      "Feed a sample of your real writing and a draft; get the draft rewritten to match your rhythm, vocabulary, and quirks.",
    category: "content_production",
    tags: ["voice", "editing", "rewrite"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 5,
    bestFor: ["solo_creator", "newsletter_operator", "ghostwriting_client"],
    useCase:
      "AI drafts are useful but generic. This closes the gap between a fast draft and something that actually sounds like you, so you publish without cringing.",
    whenToUse: [
      "You drafted with AI and it reads sterile.",
      "A freelancer's copy is good but off-voice.",
      "You want a reusable voice profile for future prompts."
    ],
    inputs: [
      { name: "voice_sample", type: "string", required: true, description: "200-400 words you actually wrote." },
      { name: "draft", type: "string", required: true, description: "The text to rewrite." },
      { name: "keep", type: "string", required: false, description: "Anything that must not change (facts, links)." }
    ],
    outputFields: [
      { field: "rewrite", type: "string", description: "The draft in your voice." },
      { field: "voice_profile", type: "string", description: "A reusable description of your voice." },
      { field: "changes", type: "string[]", description: "What was adjusted and why." }
    ],
    systemPrompt: "You are an editor who mimics a writer's voice without inventing facts.",
    promptTemplate: `Rewrite a draft in the writer's voice.

Voice sample (the real writer): {{voice_sample}}
Draft to rewrite: {{draft}}
Must keep unchanged: {{keep}}

First, infer the writer's voice: sentence length, vocabulary, rhythm, punctuation habits, level of formality, signature moves. Then rewrite the draft to match it while preserving all facts and anything in "must keep". Do not add claims that aren't in the draft. Output the rewrite, a reusable voice profile I can paste into future prompts, and a short list of what you changed.`,
    exampleOutput: `Rewrite: ...
Voice profile: Short declaratives. Dry humor. Em-dashes over commas. Opens with a confession. Avoids adjectives.
Changes: cut three hedging phrases; broke two long sentences; swapped "utilize" for "use".`,
    compatibleWith: COMPAT,
    automationNotes: "Store voice_profile once and prepend it to every other content prompt.",
    related: ["promptdir.content.linkedin_post.v1", "promptdir.content.ai_tone_editor.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.content.ai_tone_editor.v1",
    slug: "remove-ai-tone-editor",
    type: "checklist",
    title: "Remove-AI-Tone Editor",
    promise: "Strip the tells that make writing read as AI-generated.",
    summary:
      "A diagnostic pass that flags and rewrites the clichés, hedges, and rhythms that scream 'a model wrote this'.",
    category: "content_production",
    tags: ["editing", "quality", "ai-detection"],
    difficulty: "beginner",
    estimatedTimeMinutes: 4,
    bestFor: ["solo_creator", "newsletter_operator", "ghostwriter"],
    useCase:
      "Readers increasingly recognize AI cadence and trust it less. This removes the obvious tells so your writing reads human.",
    whenToUse: [
      "Before publishing anything drafted with AI.",
      "When copy feels smooth but oddly hollow.",
      "Editing a batch of repurposed posts."
    ],
    inputs: [
      { name: "draft", type: "string", required: true, description: "The text to de-slop." },
      { name: "register", type: "string", required: false, description: "Casual, professional, punchy, etc." }
    ],
    outputFields: [
      { field: "checks", type: "object[]", description: "Each tell found, with location and a fix." },
      { field: "clean_version", type: "string", description: "The rewritten, de-AI'd text." },
      { field: "ready", type: "boolean", description: "Whether it passes the human-read bar." }
    ],
    systemPrompt: "You are a ruthless line editor who hunts AI tells.",
    promptTemplate: `Edit this draft to remove AI tells.

Draft: {{draft}}
Target register: {{register}}

Scan for and fix: "it's not just X, it's Y" constructions, "in today's fast-paced world", "delve", "tapestry", "navigate the landscape", triplet lists everywhere, hedging ("can", "may", "often") stacked together, uniform sentence length, em-dash overuse, and empty summaries. For each tell, note where it appears and rewrite it. Then output a clean version and a true/false on whether it now reads human. Keep all facts intact.`,
    exampleOutput: `Checks:
- "navigate the ever-changing landscape" (para 1) → "keep up"
- triplet list in para 2 → cut to one example
- 6 sentences of identical length → varied
Clean version: ...
Ready: true`,
    compatibleWith: COMPAT,
    automationNotes: "Run as a final node after any generation step before publishing.",
    related: ["promptdir.content.voice_rewriter.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
