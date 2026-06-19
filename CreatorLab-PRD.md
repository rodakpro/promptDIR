# CreatorLab.pro — Product Spec / PRD

**Version:** 0.1 (foundation)
**Date:** 2026-06-19
**Owner:** Greg (grzegorz@rodak.pro)
**Status:** Draft for build

---

## 0. TL;DR

CreatorLab.pro is a **prompt + agent + checklist + workflow library for creator-solopreneurs**, delivered in two parallel formats: a human-readable web library and a **machine-readable JSON library exposed over a stateless distribution API**.

The differentiator is the API. It is **not an inference API** — CreatorLab never runs an AI model, never accepts user code/files/emails/customer data, and never stores user prompts or transcripts. The API simply serves versioned JSON prompt/agent/skill definitions as links that the user's *own* LLM, CLI, MCP server, or n8n workflow consumes. Execution stays entirely on the user's side.

> **Positioning line:** *Not just prompts. Prompts that become agents, automations, and business workflows — privately, on your own stack.*

---

## 1. The privacy-first principle (read this first)

This principle governs every other decision in the document. CreatorLab is a **content distribution layer**, not a compute layer.

What CreatorLab does:

- Serves JSON definitions (prompts, agents, checklists, workflows) over the web and via API links.
- Issues API keys that gate access and let paid users serve their *own* curated JSON libraries.
- Provides human-readable pages, examples, and automation notes.

What CreatorLab explicitly does **not** do (verbatim constraint from product owner, translated):

- Does **not** accept code, files, emails, or customer data.
- Does **not** store users' prompts or transcripts.
- Does **not** run an AI model on CreatorLab's side.
- All analysis/execution stays local — in the user's CLI, skill, or MCP.

Practical consequences that ripple through the whole build:

1. No server-side LLM calls, no token billing, no GPU/inference cost. The cost model is just hosting + bandwidth + a thin metadata DB for keys.
2. The "interactive tools" idea (in-browser generators) must either (a) be dropped, or (b) run with the *user's own* LLM key client-side so no data touches the server. See §6.3 — this is an open decision.
3. Compliance/marketing story is strong: "we never see your data" is the headline trust feature, identical in spirit to akademia.pl/api.
4. The API can be almost entirely **static** — JSON files served from a CDN/edge — with a lightweight auth check. This keeps it cheap and fast.

---

## 2. Target user & jobs-to-be-done

**Primary user:** the creator-solopreneur — a one-person content-led business (newsletter operator, educator/coach, indie consultant, YouTuber/short-form creator) who uses AI to run the whole operation alone.

**Secondary user:** the builder/automator — a creator (or their freelancer) wiring prompts into n8n/Make/Zapier, an MCP server, Cursor, or a custom app.

Core jobs the library serves, in the order a solo business actually hits them:

1. Find content ideas worth publishing.
2. Write posts/newsletters/scripts/threads faster and in their own voice.
3. Validate offers before building them.
4. Package knowledge into products.
5. Automate repetitive content + ops work.
6. Build lightweight AI agents that chain the above.

---

## 3. Differentiation vs. akademia.pl

| Dimension | akademia.pl | CreatorLab.pro |
|---|---|---|
| Audience | Firms, broad business | Creator-solopreneurs |
| Market/language | Polish | Global English |
| Domains | Business, AI, code, marketing | Content, audience, offers, automation |
| Catalog | Prompt + checklist | Prompt + checklist + **agent + workflow + JSON** |
| Usage | Copy-paste | Copy-paste **+ API/automation/MCP** |
| Framing | Business use cases | Creator **business operating system** |
| Data model | (n/a) | **Stateless, privacy-first distribution API** |

CreatorLab is intentionally **narrower and deeper**: fewer domains, but each asset ships human + JSON + automation notes, and the API turns the library into infrastructure rather than a copy-paste site.

---

## 4. Content model

Every asset exists in **two synchronized representations**: a human MDX page and a machine JSON file. They share an `id` and `slug`; the JSON is the source of truth for structured fields and the MDX renders from/with it.

### 4.1 Asset types

1. **Prompt** — a single reusable prompt (e.g. "Validate a digital product idea").
2. **Checklist** — a decision or QC asset (e.g. "Is this offer ready to sell?").
3. **Agent** — a role-based worker with goals, workflow, and handoffs (e.g. "Content Strategist Agent").
4. **Workflow** — a multi-step process chaining prompts/agents (e.g. "YouTube video → newsletter + LinkedIn posts").

A JSON asset is just the machine-readable form of any of the four — not a fifth type.

### 4.2 Taxonomy (top-level categories)

Organized around the real jobs of a solo creator-business:

1. Audience Research
2. Content Strategy
3. Content Production
4. Repurposing
5. Offer Creation
6. Sales & Growth
7. Automation
8. Business Management

Each asset has exactly one primary `category` and free-form `tags`.

### 4.3 Canonical IDs & versioning

- `id` format: `creatorlab.<category>.<name>.v<major>` — e.g. `creatorlab.offer.product_validator.v1`.
- `slug` format: kebab-case, human URL — e.g. `digital-product-validator`.
- Semantic-ish versioning in `version` (`1.0.0`); breaking prompt changes bump the major and the `id` suffix (`.v2`), so old links never silently change behavior. This is the key reason the API is trustworthy for automations.
- `updated_at` ISO date on every asset.

---

## 5. JSON schemas

Three schemas: **prompt/checklist** (shared), **agent**, and **collection** (a curated library — the paid primitive). All are JSON, repo-stored, served as-is over the API.

### 5.1 Prompt / Checklist schema

```json
{
  "id": "creatorlab.offer.product_validator.v1",
  "slug": "digital-product-validator",
  "type": "prompt",                       // "prompt" | "checklist"
  "title": "Digital Product Idea Validator",
  "summary": "Evaluate whether a creator's product idea has real demand and what to validate first.",
  "category": "offer_creation",
  "tags": ["validation", "offer", "creator", "presale"],
  "difficulty": "beginner",               // beginner | intermediate | advanced
  "estimated_time_minutes": 10,
  "best_for": ["solo_creator", "newsletter_operator", "coach", "educator"],
  "not_for": ["large_marketing_team"],
  "inputs": {
    "audience":   { "type": "string", "required": true,  "description": "Who the creator serves." },
    "problem":    { "type": "string", "required": true,  "description": "The problem the product solves." },
    "offer_idea": { "type": "string", "required": true,  "description": "The product/service/template/course idea." },
    "proof":      { "type": "string", "required": false, "description": "Comments, emails, paid clients, waitlist, questions." },
    "channels":   { "type": "array", "items": "string", "required": false, "description": "Distribution channels." }
  },
  "output_schema": {
    "demand_score": "number_1_to_10",
    "ideal_buyer": "string",
    "main_risks": ["string"],
    "validation_tests": ["string"],
    "pre_sale_angle": "string",
    "next_action": "string"
  },
  "system_prompt": "You are a practical, skeptical creator-business strategist.",
  "prompt_template": "Evaluate this product idea for a solo creator. Be direct and evidence-based. Audience: {{audience}}. Problem: {{problem}}. Offer idea: {{offer_idea}}. Proof: {{proof}}. Channels: {{channels}}. Return the result using the required output schema.",
  "examples": [
    { "inputs": { "audience": "indie SaaS founders", "problem": "no time for marketing", "offer_idea": "a weekly done-for-you content pack" }, "output": { "demand_score": 7, "ideal_buyer": "pre-PMF solo founders with revenue", "next_action": "run a 10-person presale" } }
  ],
  "compatible_with": ["chatgpt", "claude", "gemini", "n8n", "make", "zapier", "mcp", "api"],
  "automation_notes": "Map inputs to a form trigger; pipe output JSON to Notion/Docs.",
  "n8n": {
    "recommended_trigger": "form_submission",
    "recommended_nodes": ["OpenAI", "Google Docs", "Notion"],
    "output_destination": ["Notion", "Google Docs", "Email"]
  },
  "version": "1.0.0",
  "license": "free",                      // "free" | "pro"
  "updated_at": "2026-06-18"
}
```

Checklists use the same schema with `type: "checklist"`; their `output_schema` typically returns a `checks[]` array of `{ item, status, fix }` and a `ready: boolean`.

### 5.2 Agent schema

```json
{
  "id": "creatorlab.agent.content_strategist.v1",
  "slug": "content-strategist-agent",
  "type": "agent",
  "title": "Creator Content Strategist Agent",
  "summary": "Plans content topics, angles, and publishing priorities for a solo creator.",
  "category": "content_strategy",
  "tags": ["agent", "content", "strategy"],
  "role": "You are a senior content strategist for creator-led businesses.",
  "goals": [
    "Find content ideas that serve the creator's audience",
    "Connect content to business goals",
    "Prioritize ideas by audience pain and monetization potential"
  ],
  "inputs": {
    "niche":     { "type": "string", "required": true },
    "audience":  { "type": "string", "required": true },
    "offer":     { "type": "string", "required": false },
    "platforms": { "type": "array", "items": "string", "required": true }
  },
  "tools_needed": ["web_search_optional", "content_archive_optional", "newsletter_archive_optional"],
  "workflow": [
    "Clarify audience and business goal",
    "Generate content themes",
    "Score ideas by relevance, novelty, and conversion potential",
    "Create publishing plan",
    "Suggest repurposing paths"
  ],
  "output_schema": {
    "content_pillars": ["string"],
    "priority_topics": [
      { "topic": "string", "angle": "string", "business_goal": "string", "score": "number" }
    ],
    "publishing_plan": ["string"],
    "repurposing_ideas": ["string"]
  },
  "handoff_prompts": [
    "creatorlab.content.linkedin_post.v1",
    "creatorlab.content.newsletter_issue.v1",
    "creatorlab.content.short_video_hook.v1"
  ],
  "compatible_with": ["chatgpt", "claude", "openai_assistants", "n8n", "langchain", "mcp"],
  "version": "1.0.0",
  "license": "free",
  "updated_at": "2026-06-18"
}
```

The `handoff_prompts` field is what turns the library into a graph: agents reference prompt IDs, so a client (or MCP server) can resolve a whole chain from one entry point. This is a deliberate moat — the value compounds with library size.

### 5.3 Collection schema (the paid primitive)

A **collection** is a user-curated set of asset IDs served at the user's own API link. Free users browse the public catalog; paid users create/modify collections and get a personal link/endpoint.

```json
{
  "id": "col_8fk2...",                    // server-generated
  "owner": "user_123",                    // never exposed publicly
  "slug": "gregs-newsletter-stack",
  "title": "Greg's Newsletter Stack",
  "description": "My go-to prompts for running the newsletter.",
  "visibility": "private",                // private | unlisted | public
  "items": [
    { "ref": "creatorlab.content.newsletter_issue.v1" },
    { "ref": "creatorlab.repurpose.newsletter_to_linkedin.v1" },
    { "ref": "creatorlab.custom.user_123.cold_open.v1", "custom": true }
  ],
  "version": "1.4.0",
  "updated_at": "2026-06-19"
}
```

Notes:

- `items[].ref` points at catalog assets by `id`. Paid users may also add **custom assets** they author (namespaced under their user id, e.g. `creatorlab.custom.user_123.*`), stored as their JSON — still never executed server-side.
- A collection resolves to a JSON document the user pastes as a link into their LLM/MCP/n8n: "here is my prompt library, use it." That is the "just a link for another LLM with JSON files" model.

---

## 6. The distribution API

Stateless, read-mostly, privacy-first. Think of it as a CDN for JSON prompt definitions with a thin auth layer.

### 6.1 Public (no key) endpoints

Static JSON, cacheable at the edge, great for SEO and developer trust:

```
GET /api/prompts                       # list (paginated, free assets)
GET /api/prompts/:id                   # single asset JSON
GET /api/agents
GET /api/agents/:id
GET /api/categories                    # taxonomy
GET /api/categories/:category          # assets in a category
GET /api/search?q=...&type=...&tag=...
```

Also exposed as raw files for zero-API consumption (and SEO):

```
GET /json/creatorlab.offer.product_validator.v1.json
GET /json/creatorlab.agent.content_strategist.v1.json
GET /packs/creatorlab-free-library.json   # the full free pack (lead magnet)
```

### 6.2 Authenticated (API key) endpoints

The key identifies the account and unlocks rate limits + private collections. It does **not** authorize any server-side execution — there is none.

```
GET  /api/me                           # account + plan + limits
GET  /api/collections                  # caller's collections
POST /api/collections                  # create
PUT  /api/collections/:id              # add/remove/modify items
DELETE /api/collections/:id
GET  /api/collections/:id              # resolved JSON of a collection
POST /api/custom-assets                # paid: upload a user-authored JSON asset (stored, never run)
```

Auth: `Authorization: Bearer clp_live_...`. Keys are created/rotated/revoked in the dashboard. Each key carries the plan's rate limit.

### 6.3 The "link for another LLM" pattern (core UX)

The headline use case. A user gets a stable URL that returns JSON their AI tool ingests:

```
https://creatorlab.pro/api/collections/gregs-newsletter-stack?key=clp_live_...
# or a tokenized share link that doesn't expose the raw key:
https://creatorlab.pro/l/gregs-newsletter-stack/Zx9Q   → returns the collection JSON
```

They paste that link into ChatGPT/Claude as context, point an MCP server at it, or use an HTTP-request node in n8n. CreatorLab returns JSON and nothing else — no model invoked, no input data accepted, nothing logged beyond a rate-limit counter.

> **Open decision (6.3-A):** in-browser interactive generators. Because we never run a model server-side, any "try it" tool must call the user's own LLM key directly from the browser (BYO-key), or be cut from the MVP. **Recommendation:** cut from MVP; ship BYO-key client-side tools in Phase 2. Flagged for your call.

### 6.4 Privacy & data guarantees (publish these verbatim)

- The API accepts no code, files, emails, or customer data.
- We do not store user prompts or transcripts.
- We do not run an AI model on our side.
- We store only: account, API keys (hashed), collection definitions, and aggregate rate-limit counters.
- Analysis/execution always stays local — in your CLI, skill, MCP, or automation tool.

### 6.5 Rate limits (indicative, tune later)

- Public/no-key: e.g. 60 req/min per IP, heavy edge caching.
- Free key: e.g. 1,000 req/day.
- Pro key: e.g. 50,000 req/day + private collections + custom assets.

---

## 7. Site architecture

### 7.1 Public pages

```
/                         Homepage
/prompts                  Prompt library (filter by category/tag/type)
/prompts/[category]
/prompts/[category]/[slug]   Individual prompt page
/checklists
/agents
/agents/[slug]
/workflows
/json                     JSON library landing (how to consume)
/api                      Developer docs
/use-cases                Creator use-case pages (SEO)
/pricing
/login  /dashboard        (paid: keys + collections)
```

### 7.2 Prompt page layout (template)

Every asset page renders these sections, in order:

1. Title
2. Short promise (one line)
3. Creator use case
4. When to use
5. Inputs required
6. Prompt (copy button)
7. Output format
8. Example output
9. JSON version (view + download + "open raw" link)
10. Automation use (n8n/Make/Zapier/MCP notes)
11. Related prompts (from handoffs/tags)
12. Upgrade CTA

> Default CTA: *Want to automate this prompt? Download the JSON version or connect it to n8n.*

This dual layout (human + JSON + automation) is the reason every page serves both copy-paste users and builders.

---

## 8. Tech architecture

Chosen direction from your answers: **GitHub repo of files as source of truth**, plan the paid stack (undecided).

### 8.1 MVP stack

- **Next.js** (App Router) + **Tailwind** + **MDX** for content pages.
- **JSON + MDX files in the repo** as source of truth; build step validates every JSON against the schemas (zod/JSON Schema) so broken assets can't ship.
- API routes serve JSON straight from the repo content (statically generated + edge-cached). No DB needed for the public library.
- Email capture via Beehiiv/ConvertKit (gated downloads).
- n8n for the automation example templates.
- Hosting: Vercel (or Cloudflare Pages) — both give cheap edge caching, which suits a static JSON API.

### 8.2 Repo structure

```
/content/prompts/*.mdx
/content/checklists/*.mdx
/content/agents/*.mdx
/content/workflows/*.mdx
/content/json/*.json              # canonical machine assets (source of truth)
/content/packs/*.json             # bundled free/pro packs
/schemas/                         # zod / JSON Schema definitions
/scripts/validate.ts              # CI: validate all JSON, check id/slug uniqueness, handoff refs resolve
/app/api/...                      # Next.js API routes
```

CI gate: `validate.ts` must pass — unique ids/slugs, every `handoff_prompts`/`items[].ref` resolves to a real asset, every JSON matches its schema. This keeps the API trustworthy as the library grows.

### 8.3 When the database becomes necessary

Only when paid collections/keys arrive (Phase 4). At that point add **Supabase or Postgres** for: users, API keys (store only a hash), collections, and custom assets. The public library stays in the repo. This is the **hybrid** end-state, reached lazily — you don't pay DB complexity until paid features need it.

---

## 9. Free vs. paid

### 9.1 Free (public)

- Browse all public prompt/agent/checklist/workflow pages.
- Copy prompts; view + download basic JSON.
- Download the free JSON pack (email-gated).
- Public API (no key) for free assets.
- Newsletter with weekly prompt drops.

### 9.2 Email-gated

- Full JSON pack download, n8n workflow templates, favorites/export — in exchange for email.

### 9.3 Paid (Pro)

- **API keys**: create/rotate/revoke, higher rate limits.
- **Curated collections**: create/add/remove/modify your own libraries, served at your own link/endpoint.
- **Custom assets**: author and store your own JSON prompts/agents (namespaced, never executed server-side).
- Premium JSON packs, premium agent packs, n8n workflow templates.
- Later: "Creator Business OS" bundle, community, workshops, consulting.

### 9.4 Auth & billing (undecided — recommendation)

You chose "just plan it." Recommendation for this product shape: **Supabase Auth + Stripe**. Rationale: Supabase doubles as the Phase-4 database, Stripe is the standard for subscriptions, and the combo is fast to ship. Clerk + Stripe is the alternative if you want a more polished auth UX and are willing to run a separate DB. Decision can wait until Phase 4 — nothing earlier depends on it.

---

## 10. MVP content: first 25 assets

Quality over volume — 25 strong assets, not 200 weak ones.

**Content (7):** Content Pillar Generator · 30-Day Content Calendar · LinkedIn Post Generator · Newsletter Issue Generator · Short Video Hook Generator · Creator Voice Rewriter · Remove-AI-Tone Editor

**Research (5):** Audience Pain Finder · Comment Mining Prompt · Competitor Content Analyzer · Niche Opportunity Finder · Objection Research Prompt

**Business / Offers (6):** Digital Product Validator · Lead Magnet Generator · Offer Page Generator · Pricing Strategy Prompt · Creator Service Packaging Prompt · Pre-Sale Test Prompt

**Automation (5):** Creator Automation Audit · n8n Workflow Planner · Content Repurposing Workflow · Newsletter Research Workflow · AI Agent Handoff Prompt

**Agents (2):** Content Strategist Agent · Offer Reviewer Agent

Each ships as paired MDX + JSON, with at least one worked example and automation notes.

---

## 11. JSON library distribution channels

1. **Individual JSON files** (`/json/<id>.json`) — SEO + developers.
2. **Full free pack** (`creatorlab-free-library.json`) — lead magnet.
3. **GitHub repo** (`creatorlab-prompt-library`) — credibility + community + contributions.
4. **API** (`/api/...`) — SaaS/product expansion.
5. **n8n-ready templates** — each asset's `n8n` block + importable workflow JSON.

Flagship free asset: **"Creator Solopreneur JSON Library — 25 prompts, agents, checklists & workflows for running a creator business with AI,"** scaling to 100 over time, updated weekly via the newsletter.

---

## 12. Roadmap

**Phase 1 — Library foundation.** Taxonomy, three schemas + CI validation, 25 assets, homepage, library page, JSON landing, public no-key API + raw JSON files, email capture. *Goal: a useful, indexable, copy-and-pasteable library that already serves JSON.*

**Phase 2 — Automation layer.** n8n/Make/Zapier templates and per-asset automation sections, webhook/MCP consumption examples, optional BYO-key client-side generators.

**Phase 3 — Developer surface.** Polished `/api` docs, full free pack + GitHub repo, search API, MCP server reference implementation that points at the public API.

**Phase 4 — Paid layer.** Supabase + Stripe, accounts, API keys, curated collections, custom assets, premium packs; the hybrid DB lands here.

---

## 13. Success metrics (suggested)

- Phase 1: organic traffic to prompt pages, JSON file fetches, email signups, copy-button clicks.
- Phase 2–3: API requests/day, GitHub stars, n8n template imports.
- Phase 4: free→paid conversion, active collections, paid API keys, MRR.

---

## 14. Open decisions (need your call)

1. **(6.3-A) Interactive in-browser tools** — cut from MVP, or ship BYO-key client-side? *Recommendation: cut for MVP, BYO-key in Phase 2.*
2. **Custom assets in free tier?** — should free users author any custom JSON, or is authoring strictly Pro? *Recommendation: Pro-only, to anchor the paid value.*
3. **Public/unlisted collections** — allow creators to publish collections publicly (a discovery/virality lever), or keep collections private-only at launch?
4. **Licensing** — confirm the public assets are free to reuse commercially (MIT-style) vs. attribution-required. Affects the GitHub repo and trust.
5. **Auth/billing** — confirm Supabase+Stripe (default) before Phase 4, or name your stack.
6. **Brand voice / language** — English-only global, or Polish + English given the akademia.pl adjacency?

---

*End of v0.1. Next concrete step once decisions above are made: scaffold the repo (schemas + CI + 1 sample asset rendering human+JSON), then author the 25 assets.*
