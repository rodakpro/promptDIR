import type { LibraryAsset } from "./types";

const COMPAT = ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"];

export const growthAssets: LibraryAsset[] = [
  {
    id: "promptdir.growth.sponsorship_pitch.v1",
    slug: "sponsorship-pitch-generator",
    type: "prompt",
    title: "Sponsorship Pitch Generator",
    promise: "Write a sponsor pitch that leads with their goals, not your stats.",
    summary:
      "Turn your audience and a target sponsor into a tailored pitch with angle, deliverables, and a clear ask.",
    category: "sales_growth",
    tags: ["sponsorship", "outreach", "monetization"],
    difficulty: "intermediate",
    estimatedTimeMinutes: 10,
    bestFor: ["newsletter_operator", "youtuber", "podcaster"],
    notFor: ["pre_audience_creator"],
    useCase:
      "Most sponsor pitches brag about reach and get ignored. This frames your audience as the sponsor's ideal buyer and proposes a specific, low-risk first placement.",
    whenToUse: [
      "Reaching out to a brand for the first time.",
      "Responding to a sponsor who asked for a media kit.",
      "Pitching a renewal or upsell to a past sponsor."
    ],
    inputs: [
      { name: "audience", type: "string", required: true, description: "Who follows you and what they buy." },
      { name: "sponsor", type: "string", required: true, description: "The brand and what they sell." },
      { name: "metrics", type: "string", required: false, description: "Reach, open rate, engagement, niche fit." },
      { name: "placements", type: "array", required: false, description: "Ad slots you offer (newsletter, video, post)." }
    ],
    outputFields: [
      { field: "subject_line", type: "string", description: "A cold-email subject that earns a reply." },
      { field: "pitch", type: "string", description: "The full pitch, sponsor-goal first." },
      { field: "offer", type: "string", description: "A specific first placement and price band." },
      { field: "proof_points", type: "string[]", description: "Audience-fit signals that matter to them." }
    ],
    systemPrompt:
      "You are a partnerships lead who pitches outcomes for the sponsor, never vanity reach.",
    promptTemplate: `Write a sponsorship pitch.

My audience: {{audience}}
Target sponsor: {{sponsor}}
My metrics: {{metrics}}
Placements I offer: {{placements}}

Open by connecting my audience to the sponsor's buyer. Propose one specific, low-risk first placement with a price band. Use only the metrics I provided as proof — do not invent numbers. Keep it under 180 words, with a subject line and a clear single ask.`,
    exampleOutput: `Subject: Your tool in front of 8k indie founders
Pitch: Your buyers are exactly who reads my newsletter — solo founders shipping their first SaaS...
Offer: one primary newsletter slot, $400, with a 10% renewal discount.
Proof: 41% open rate; 60% are founders; past tool sponsor saw 90 signups.`,
    compatibleWith: COMPAT,
    automationNotes: "Generate per-sponsor variants from a CRM row; track replies in a sheet.",
    n8n: { trigger: "form_submission", nodes: ["OpenAI", "Gmail", "Airtable"], outputs: ["Gmail", "Airtable"] },
    related: ["promptdir.growth.cold_email.v1", "promptdir.research.audience_pain_finder.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.growth.cold_email.v1",
    slug: "cold-email-for-creators",
    type: "prompt",
    title: "Cold Email for Creators",
    promise: "Send a short cold email that gets a reply, not a delete.",
    summary:
      "Write a personal, specific cold email for partnerships, guest spots, or clients — with three subject lines.",
    category: "sales_growth",
    tags: ["cold-email", "outreach", "partnerships"],
    difficulty: "beginner",
    estimatedTimeMinutes: 6,
    bestFor: ["solo_creator", "consultant", "freelancer"],
    useCase:
      "Cold outreach works when it is short, specific, and about them. This avoids the templated tone that gets ignored.",
    whenToUse: [
      "Pitching a collaboration or guest appearance.",
      "Reaching a potential client or partner.",
      "Following up on a warm intro."
    ],
    inputs: [
      { name: "recipient", type: "string", required: true, description: "Who they are and what they care about." },
      { name: "goal", type: "string", required: true, description: "The one thing you want from this email." },
      { name: "hook", type: "string", required: false, description: "A genuine, specific reason you are reaching out." }
    ],
    outputFields: [
      { field: "subject_lines", type: "string[]", description: "Three short, non-spammy subjects." },
      { field: "email", type: "string", description: "A 5-7 sentence email with one ask." },
      { field: "followup", type: "string", description: "A one-line nudge to send in 4 days." }
    ],
    systemPrompt: "You write cold emails that sound human and specific. No flattery, no fake urgency.",
    promptTemplate: `Write a cold email.

Recipient: {{recipient}}
My goal: {{goal}}
Genuine hook: {{hook}}

Keep it under 120 words. Open with a specific, true observation about them (use the hook). Make one clear ask. No flattery, no "I hope this finds you well", no fake deadlines. Give three subject lines and a one-line follow-up for four days later.`,
    exampleOutput: `Subjects: "quick idea for your Thursday issue" / "your churn post — one addition" / "10 min?"
Email: Saw your piece on onboarding emails — the part about day-3 silence matched what I see...
Follow-up: "Bumping this in case it slipped — happy to send the draft first."`,
    compatibleWith: COMPAT,
    automationNotes: "Personalize at scale from a lead list; throttle sends and log replies.",
    related: ["promptdir.growth.dm_followup.v1", "promptdir.growth.sponsorship_pitch.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.growth.dm_followup.v1",
    slug: "dm-follow-up",
    type: "prompt",
    title: "DM Follow-Up Generator",
    promise: "Restart a stalled conversation without being pushy.",
    summary:
      "Craft a warm, low-pressure follow-up DM that adds value and makes replying easy.",
    category: "sales_growth",
    tags: ["dm", "follow-up", "sales"],
    difficulty: "beginner",
    estimatedTimeMinutes: 4,
    bestFor: ["coach", "consultant", "creator"],
    useCase:
      "Most deals die in the follow-up gap. This re-opens a thread with value, not a guilt-trip, so the other person actually replies.",
    whenToUse: [
      "A promising DM went quiet.",
      "Following up after a call or free resource.",
      "Reviving an old lead with a new reason to talk."
    ],
    inputs: [
      { name: "context", type: "string", required: true, description: "What was discussed and when it stalled." },
      { name: "goal", type: "string", required: true, description: "What you want to move toward." },
      { name: "value", type: "string", required: false, description: "Something useful you can offer now." }
    ],
    outputFields: [
      { field: "messages", type: "string[]", description: "Three follow-up options of varying directness." },
      { field: "recommended", type: "string", description: "Which to send and why." }
    ],
    systemPrompt: "You write follow-ups that feel like a helpful nudge from a peer, never a chase.",
    promptTemplate: `Write a DM follow-up.

Context and where it stalled: {{context}}
My goal: {{goal}}
Value I can add now: {{value}}

Give three options: a soft value-add, a direct check-in, and a graceful break-up message. Each under 40 words. Lead with value or a genuine reason, make the reply effortless, and never guilt them. Recommend which to send.`,
    exampleOutput: `1. "Saw this and thought of our chat — [link]. No agenda, just useful."
2. "Still keen to help with the launch — want me to send the outline?"
3. "I'll stop nudging — door's open whenever the timing's right."
Recommended: option 1 (re-opens with value, zero pressure).`,
    compatibleWith: COMPAT,
    automationNotes: "Queue follow-ups from a CRM stage; stop the sequence on reply.",
    related: ["promptdir.growth.cold_email.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  },
  {
    id: "promptdir.growth.newsletter_growth_loop.v1",
    slug: "newsletter-growth-loop",
    type: "workflow",
    title: "Newsletter Growth Loop Builder",
    promise: "Design a repeatable loop that turns each issue into new subscribers.",
    summary:
      "Map a growth loop — referral, share hook, and lead magnet — so every send compounds your list.",
    category: "sales_growth",
    tags: ["growth-loop", "newsletter", "referral"],
    difficulty: "advanced",
    estimatedTimeMinutes: 12,
    bestFor: ["newsletter_operator", "educator"],
    notFor: ["one_off_campaign"],
    useCase:
      "Buying attention is expensive and stops when you stop. A loop makes growth a byproduct of publishing, so the list compounds on its own.",
    whenToUse: [
      "Your list is flat despite steady publishing.",
      "Designing a referral or share mechanic.",
      "Planning a lead magnet that feeds itself."
    ],
    inputs: [
      { name: "audience", type: "string", required: true, description: "Who subscribes and why they share." },
      { name: "asset", type: "string", required: false, description: "A lead magnet or referral reward you can offer." },
      { name: "channels", type: "array", required: false, description: "Where new readers come from today." }
    ],
    outputFields: [
      { field: "loop", type: "string[]", description: "The step-by-step loop, input to re-entry." },
      { field: "share_trigger", type: "string", description: "The moment and reason readers share." },
      { field: "reward", type: "string", description: "What both sharer and new reader get." },
      { field: "metrics", type: "string[]", description: "What to measure to know it works." }
    ],
    systemPrompt: "You design self-reinforcing growth loops, not one-off campaigns.",
    promptTemplate: `Design a newsletter growth loop.

Audience: {{audience}}
Asset/reward available: {{asset}}
Current channels: {{channels}}

Map a loop where publishing leads to sharing leads to new subscribers leads back to publishing. Define the exact share trigger (the moment and the reason), the reward for both sides, and the steps end to end. List the few metrics that prove the loop is compounding (e.g. share rate, K-factor, magnet conversion). Keep it realistic for a solo operator.`,
    exampleOutput: `Loop: great issue → "forward to a friend" CTA with a swipe file unlock → friend subscribes for the file → gets the next issue → forwards again.
Share trigger: the most useful tip, mid-issue.
Reward: sharer unlocks a template; friend gets the file + issue.
Metrics: share rate, magnet conversion, referred %.`,
    compatibleWith: COMPAT,
    automationNotes: "Wire a referral tool (e.g. SparkLoop) and track the share trigger per issue.",
    n8n: { trigger: "webhook", nodes: ["OpenAI", "ConvertKit", "Airtable"], outputs: ["ConvertKit"] },
    related: ["promptdir.offer.lead_magnet.v1", "promptdir.content.newsletter_issue.v1"],
    version: "1.0.0",
    license: "free",
    updatedAt: "2026-06-19"
  }
];
