import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"];

export const automationAssets: LibraryAsset[] = [
  {
    id: "promptdir.automation.creator_audit.v1",
    slug: "creator-automation-audit",
    type: "checklist",
    title: "Creator Automation Audit",
    promise: "Find the repetitive work worth automating and what to leave alone.",
    summary:
      "Audit your weekly workflow to rank tasks by automation ROI, with the right tool and a first build for each.",
    category: "automation",
    tags: ["audit", "automation", "ops"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 15,
    bestFor: ["solo_creator", "newsletter_operator", "agency_of_one"],
    notFor: ["pre_workflow_beginner"],
    useCase:
      "Automating the wrong thing wastes a weekend. This finds the few tasks where automation actually buys back time and flags the ones better left manual.",
    whenToUse: [
      "When admin is eating your creative time.",
      "Before buying yet another tool.",
      "Quarterly, to prune and tighten your stack."
    ],
    inputs: [
      { name: "weekly_tasks", type: "string", required: true, description: "What you do each week, roughly timed." },
      { name: "tools", type: "string", required: false, description: "Tools you already pay for." },
      { name: "skill_level", type: "string", required: false, description: "Your comfort with automation tools." }
    ],
    outputFields: [
      { field: "ranked_tasks", type: "object[]", description: "Tasks scored by time saved and effort to automate." },
      { field: "leave_manual", type: "string[]", description: "Tasks not worth automating, and why." },
      { field: "first_build", type: "string", description: "The single highest-ROI automation to build first." },
      { field: "tool_pick", type: "string", description: "Recommended tool for the first build." }
    ],
    systemPrompt: "You are an automation consultant who is honest about when not to automate.",
    promptTemplate: `Audit my workflow for automation.

Weekly tasks (with rough time): {{weekly_tasks}}
Tools I have: {{tools}}
My skill level: {{skill_level}}

Rank tasks by ROI: time saved per week against effort to automate and fragility. Flag tasks that should stay manual (judgment, relationships, low frequency). Recommend the single highest-ROI automation to build first, the tool to build it in given my skill level, and a rough outline of the flow. Prefer one robust automation over five brittle ones.`,
    exampleOutput: `First build: auto-draft newsletter from saved links (saves ~3h/wk).
Tool: n8n (you already self-host).
Flow: RSS/Readwise → filter → summarize → draft in Beehiiv.
Leave manual: replying to DMs (relationship), monthly invoicing (low frequency).`,
    compatibleWith: COMPAT,
    automationNotes: "Hand the first_build to the n8n Workflow Planner to get a concrete node plan.",
    related: ["promptdir.automation.n8n_planner.v1", "promptdir.automation.weekly_review.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.automation.n8n_planner.v1",
    slug: "n8n-workflow-planner",
    type: "workflow",
    title: "n8n Workflow Planner",
    promise: "Turn a goal into a concrete, node-by-node automation plan.",
    summary:
      "Describe what you want automated; get a structured n8n/Make plan with trigger, nodes, data shape, and failure handling.",
    category: "automation",
    tags: ["n8n", "make", "workflow"],
    difficulty: "advanced",
    estimatedTimeMinutes: 12,
    bestFor: ["automation_builder", "technical_creator", "agency_of_one"],
    notFor: ["no_code_aversion"],
    useCase:
      "The gap between 'I want this automated' and a working flow is the node plan. This produces a build-ready blueprint you can implement in an afternoon.",
    whenToUse: [
      "After the audit picks a task to automate.",
      "When you know the outcome but not the nodes.",
      "Documenting a flow before you build it."
    ],
    inputs: [
      { name: "goal", type: "string", required: true, description: "What the automation should accomplish." },
      { name: "trigger", type: "string", required: false, description: "What should start it (schedule, webhook, form)." },
      { name: "tools", type: "array", required: false, description: "Apps it must connect (Notion, Gmail, etc.)." }
    ],
    outputFields: [
      { field: "trigger_node", type: "string", description: "The starting trigger and its config." },
      { field: "nodes", type: "object[]", description: "Ordered nodes with purpose and key settings." },
      { field: "data_shape", type: "string", description: "The data passed between steps." },
      { field: "failure_handling", type: "string[]", description: "Retries, error branches, and alerts." }
    ],
    systemPrompt: "You design robust automations. You always plan for failures and rate limits.",
    promptTemplate: `Plan an n8n (or Make) workflow.

Goal: {{goal}}
Trigger: {{trigger}}
Tools to connect: {{tools}}

Produce a node-by-node plan: the trigger and its config, each subsequent node with its purpose and the key settings, and the shape of the data passed between nodes. Include an AI step where useful and specify the prompt it should run. Add failure handling: retries, error branches, dedupe, and a notification on failure. Keep it implementable by one person.`,
    exampleOutput: `Trigger: Schedule (daily 6am).
Nodes: 1) RSS Read → 2) Filter (new only) → 3) OpenAI (summarize to 3 bullets) → 4) Notion (create page) → 5) Slack (notify).
Data shape: {title, url, summary[]}.
Failure: retry 3x on node 3; on fail, Slack alert + skip item.`,
    compatibleWith: COMPAT,
    automationNotes: "This asset is itself the bridge between a prompt and a running automation.",
    related: ["promptdir.automation.creator_audit.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.repurpose.newsletter_to_linkedin.v1",
    slug: "newsletter-to-linkedin",
    type: "workflow",
    title: "Newsletter to LinkedIn System",
    promise: "Spin one newsletter issue into a week of native LinkedIn posts.",
    summary:
      "Break a single issue into multiple platform-native posts, each with its own hook and angle, without sounding recycled.",
    category: "repurposing",
    tags: ["repurposing", "linkedin", "newsletter"],
    difficulty: "beginner",
    estimatedTimeMinutes: 8,
    bestFor: ["newsletter_operator", "consultant", "coach"],
    useCase:
      "Your best thinking goes into the newsletter and then dies in the inbox. This extracts the reusable ideas and reshapes them for LinkedIn so one effort feeds two channels.",
    whenToUse: [
      "After publishing a newsletter issue.",
      "When you want LinkedIn presence without new writing.",
      "Building a repeatable repurposing habit."
    ],
    inputs: [
      { name: "issue", type: "string", required: true, description: "The newsletter issue text." },
      { name: "voice", type: "string", required: false, description: "Voice notes or a sample." },
      { name: "count", type: "number", required: false, description: "How many posts to produce." }
    ],
    outputFields: [
      { field: "posts", type: "object[]", description: "Each post with hook, body, and the idea it pulls from." },
      { field: "carousel_idea", type: "string", description: "One idea reshaped as a carousel outline." },
      { field: "schedule", type: "string[]", description: "A suggested posting order across the week." }
    ],
    systemPrompt: "You repurpose without sounding repurposed. Each post stands alone and reads native to LinkedIn.",
    promptTemplate: `Repurpose this newsletter into LinkedIn posts.

Issue: {{issue}}
Voice: {{voice}}
Number of posts: {{count}}

Pull out the distinct ideas, examples, and one-liners. Turn each into a standalone LinkedIn post with its own hook and angle — do not just chop the issue into pieces. Note which part of the issue each post draws from. Add one carousel outline from the strongest idea and a suggested posting order across the week. Keep my voice.`,
    exampleOutput: `Post 1 — hook: "I almost killed my newsletter at 200 subscribers." (from the intro story)
Post 2 — hook: "Consistency is overrated. Here's what actually compounds." (from section 2)
Carousel: "5 newsletter metrics that lie" (from the data aside).`,
    compatibleWith: COMPAT,
    automationNotes: "Trigger on newsletter publish (webhook); queue posts to Buffer with the schedule.",
    n8n: { trigger: "webhook", nodes: ["OpenAI", "Buffer", "Airtable"], outputs: ["Buffer", "LinkedIn"] },
    related: ["promptdir.content.linkedin_post.v1", "promptdir.content.newsletter_issue.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.repurpose.youtube_to_shorts.v1",
    slug: "youtube-to-shorts",
    type: "workflow",
    title: "YouTube to Shorts Extractor",
    promise: "Mine a long video or transcript for the moments worth clipping.",
    summary:
      "Find the highest-retention moments in a transcript and script them into short-form clips with hooks and captions.",
    category: "repurposing",
    tags: ["repurposing", "shorts", "video"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 10,
    bestFor: ["youtuber", "podcaster", "short_form_creator"],
    useCase:
      "Every long video hides several short ones. This finds the clip-worthy moments and scripts them so you stop guessing what to cut.",
    whenToUse: [
      "After publishing a long video or podcast.",
      "When you want short-form without filming more.",
      "Building a clip backlog from your archive."
    ],
    inputs: [
      { name: "transcript", type: "string", required: true, description: "The video or podcast transcript." },
      { name: "audience", type: "string", required: true, description: "Who the clips should reach." },
      { name: "clip_count", type: "number", required: false, description: "How many clips to extract." }
    ],
    outputFields: [
      { field: "clips", type: "object[]", description: "Each clip: timestamp range, hook, why it works." },
      { field: "scripts", type: "string[]", description: "A tightened script or caption for each clip." },
      { field: "titles", type: "string[]", description: "A title per clip for the platform." }
    ],
    systemPrompt: "You find self-contained, emotionally charged moments. You never invent quotes not in the transcript.",
    promptTemplate: `Extract short-form clips from this transcript.

Transcript: {{transcript}}
Audience: {{audience}}
Number of clips: {{clip_count}}

Find the moments that stand alone and carry tension, surprise, or a strong opinion. For each, give the approximate timestamp range, a spoken hook for the first 2 seconds, why it will retain, a tightened script/caption, and a title. Only use content actually present in the transcript.`,
    exampleOutput: `Clip 1 (04:12-04:58) — hook: "Everyone tells you to niche down. That's half wrong."
Why: contrarian + specific. Title: "The niche advice that backfires".
Script: tighten the tangent into 35s, cut the throat-clearing.`,
    compatibleWith: COMPAT,
    automationNotes: "Feed clips to the Short Video Hook Generator to expand hook variants.",
    related: ["promptdir.content.short_video_hook.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.automation.weekly_review.v1",
    slug: "weekly-creator-review",
    type: "checklist",
    title: "Weekly Creator CEO Review",
    promise: "Run a 20-minute weekly review that keeps the business on track.",
    summary:
      "A structured weekly self-review covering metrics, wins, bottlenecks, and the one priority for next week.",
    category: "business_management",
    tags: ["review", "operations", "focus"],
    difficulty: "beginner",
    estimatedTimeMinutes: 20,
    bestFor: ["solo_creator", "founder", "consultant"],
    useCase:
      "Without a rhythm, a solo business drifts on whatever felt urgent. A weekly review turns reactivity into deliberate progress.",
    whenToUse: [
      "Same time every week (e.g. Friday afternoon).",
      "When weeks blur and progress feels unclear.",
      "Resetting focus after a busy stretch."
    ],
    inputs: [
      { name: "metrics", type: "string", required: true, description: "Key numbers this week (subs, revenue, posts)." },
      { name: "notes", type: "string", required: false, description: "What happened: wins, problems, feelings." },
      { name: "goal", type: "string", required: false, description: "The current quarter or month goal." }
    ],
    outputFields: [
      { field: "scorecard", type: "object", description: "This week vs last on each metric." },
      { field: "wins", type: "string[]", description: "What worked, worth repeating." },
      { field: "bottleneck", type: "string", description: "The single biggest thing slowing progress." },
      { field: "next_priority", type: "string", description: "The one priority for next week." },
      { field: "stop_doing", type: "string", description: "One thing to drop." }
    ],
    systemPrompt: "You are a calm operating partner. You force focus to one priority, not ten.",
    promptTemplate: `Run my weekly review.

Metrics this week: {{metrics}}
Notes: {{notes}}
Current goal: {{goal}}

Compare the metrics to a normal week and flag the meaningful moves (ignore noise). List the real wins worth repeating. Name the single biggest bottleneck between me and the goal. Set exactly one priority for next week and one thing to stop doing. Be honest if I'm busy but not progressing.`,
    exampleOutput: `Scorecard: subs +180 (up), revenue flat, posts 4/5.
Wins: the pricing post drove 3 sales calls — repeat that angle.
Bottleneck: no offer for the calls to convert into.
Next priority: publish the productized "Audit" offer page.
Stop doing: reworking the logo.`,
    compatibleWith: COMPAT,
    automationNotes: "Schedule weekly; pre-fill metrics from analytics; archive each review for trend lines.",
    n8n: { trigger: "schedule", nodes: ["OpenAI", "Notion", "Email"], outputs: ["Notion", "Email"] },
    related: ["promptdir.automation.creator_audit.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
