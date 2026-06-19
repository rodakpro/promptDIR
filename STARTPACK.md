# Dashboard StartPack

A reusable foundation for building **app-like dashboards** (kanban boards, CRUD
tools, internal apps) with a consistent look and engineering baseline. Cloned at
the start of every new dashboard project so you never rebuild the shell, the
design tokens, theming, data fetching, tables, or drag-and-drop again.

The visual language is lifted from the **Resonance Radar** reference UI: a quiet
neutral canvas, a faint grid background, white/elevated panels, rounded chips and
badges, a restrained **orange accent**, an icon sidebar, and a kanban board with
status columns. Same tokens, light + dark, every project.

---

## 1. Stack

Modernized baseline (latest stable of the same family the brand already uses).

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, `output: "standalone"`) | Server components, routing, Docker-friendly standalone output |
| UI runtime | **React 19** | Matches the framework; Actions/`useOptimistic` for snappy CRUD |
| Language | **TypeScript 5** (`strict`) | `tsc --noEmit` is the primary verification gate |
| Styling | **Tailwind CSS 4** (CSS-first `@theme`) | No JS config file; tokens live in CSS next to the palette |
| Components | **shadcn/ui** (Radix UI + CVA + `tailwind-merge`) | Own the source, not a black-box library; accessible primitives |
| Server state | **TanStack Query v5** | Caching, mutations, optimistic updates for CRUD |
| Tables | **TanStack Table v8** | Headless, sortable/filterable data tables |
| Drag & drop | **dnd-kit** | Accessible kanban card/column reordering |
| Forms | **react-hook-form + Zod** | Typed schemas, shared client/server validation |
| URL state | **nuqs** | Filter/search state in the URL (the board's filter bar) |
| Theming | **next-themes** | Class-based dark mode, no flash, no custom script |
| Icons | **lucide-react** | Matches the sidebar/iconography in the reference |
| Font | **Space Grotesk** via `next/font/google` | Brand sans, exposed as `--font-sans` |
| Lint/format | **ESLint (flat config) + Prettier** | Committed config so `lint` is non-interactive |
| Deploy | **Docker → Coolify** | `commit → push main → autodeploy`, same as existing repos |

Deliberately **not** included by default (add per project when actually needed):
a database/ORM (Drizzle or Prisma), an auth provider (Auth.js / Clerk),
analytics, and an email/ESP integration. The data layer ships as a typed
in-memory stub behind TanStack Query so screens are real and clickable on day
one, and swapping in a real backend touches only the query/mutation functions.

---

## 2. Design tokens

Colors are **HSL** CSS variables defined once and surfaced to Tailwind. Light is
`:root`, dark overrides under `.dark`. These values are carried over from the
reference UI so every StartPack project looks like part of the same product
family.

```
            light                dark
--canvas        220 24% 99%      224 30% 7%     page background
--panel          0 0% 100%       224 26% 11%    cards / sidebar
--panel-soft    220 24% 97%      224 20% 15%    hover / nested
--surface-soft  220 22% 97%      224 26% 9%     section panels
--border-soft   220 16% 90%      220 14% 22%    hairlines
--text          224 32% 10%      220 22% 96%    body text
--muted         222 14% 38%      220 14% 66%    secondary text
--accent         22 90% 50%       22 92% 56%    orange — CTAs, active nav, links
--accent-2       28 90% 56%       28 92% 62%    orange highlight / gradients
--warning        34 94% 52%       34 94% 60%    badges / counts
```

**Rules (keep dark mode working):**

- Always use tokens (`bg-panel`, `border-border`, `text-foreground`,
  `text-muted`), never hardcoded `bg-white` / `text-black` / `border-black/10`.
- `text-white` is only safe on `bg-accent` (orange in both themes) or an element
  that is dark in both themes. Never put it on a token surface that inverts.
- Orange is a **restrained accent** — CTAs, active nav item, links, small marks,
  count badges. Avoid large orange-tinted surfaces; use `surface-soft` for panels.
- Radii: chips/badges are fully rounded (`rounded-full`), cards `rounded-xl`,
  controls `rounded-lg`. Hairline borders + soft shadows, never heavy borders.
- Headings `font-black tracking-tight`; card titles `font-bold` (Space Grotesk
  tops out at 700, so `font-black` renders ~700).

---

## 3. Folder conventions

```
app/
  layout.tsx                 # fonts, <ThemeProvider>, metadata
  globals.css                # Tailwind 4 @import + @theme tokens + utilities
  providers.tsx              # TanStack Query + theme providers (client)
  page.tsx                   # → redirect to the default dashboard route
  (dashboard)/
    layout.tsx               # sidebar + topbar shell (the persistent frame)
    [feature]/page.tsx       # one folder per feature screen
components/
  app-sidebar.tsx            # icon nav, active state, counts
  theme-toggle.tsx
  page-header.tsx            # title + description + primary action (reused)
  kanban/                    # board, column, card, drag context
  data-table/                # generic TanStack Table + toolbar/filters
  ui/                        # shadcn primitives (button, card, badge, ...)
lib/
  utils.ts                   # cn() = clsx + tailwind-merge
  types.ts                   # domain models
  data.ts                    # sample/seed content (swap for real API)
  api.ts                     # query + mutation fns (the single swap point)
hooks/                       # use-* client hooks
```

**Data-driven content:** screen copy and seed data live in `lib/data.ts` /
`lib/types.ts`, never inline in JSX — change content by editing data, not markup.
Section/screen components are **server components**; anything with hooks, motion,
state, or DnD is a client component (`"use client"`).

---

## 4. Requirements

**Functional baseline every dashboard inherits:**

- Persistent shell: collapsible icon **sidebar** with active-route highlighting
  and optional count badges; a content area with a reusable **page header**
  (title, description, primary action).
- **Kanban board**: status columns with counts, draggable cards (dnd-kit),
  optimistic status changes via TanStack Query, sub-grouping within a column,
  card actions (duplicate, promote, archive).
- **Data table**: sortable columns, column filters, global search, pagination,
  row selection — generic and reused across features (TanStack Table).
- **Filter bar**: subject/status/origin style dropdowns whose state lives in the
  **URL** (nuqs) so views are shareable and survive reload.
- **Theming**: light/dark with no flash on load, user toggle, respects
  `prefers-color-scheme` on first visit.
- **Forms/CRUD**: create/edit dialogs backed by react-hook-form + Zod, optimistic
  list updates, toast feedback.

**Non-functional:**

- `npm run typecheck` (`tsc --noEmit`) must pass — primary gate before commit.
- `npm run lint` runs non-interactively (flat ESLint config committed).
- Accessible: keyboard-navigable nav, dialogs, and drag-and-drop (dnd-kit
  keyboard sensor); visible focus rings; AA contrast on text tokens.
- Responsive from ~360px up; sidebar collapses to icons / off-canvas on mobile.
- `prefers-reduced-motion` respected (animations reduced to near-zero).
- Builds as a standalone Docker image; deploys via Coolify autodeploy on `main`.

---

## 5. Starting a new project

```bash
# 1. clone the StartPack into a new repo
cp -r dashboard-startpack my-new-dashboard && cd my-new-dashboard
rm -rf .git && git init

# 2. install + run
npm install
npm run dev            # http://localhost:3000

# 3. verify
npm run typecheck      # must pass

# 4. add a shadcn component when you need it
npx shadcn@latest add dialog dropdown-menu table

# 5. rename the product
#    - package.json "name"
#    - app/layout.tsx metadata
#    - lib/data.ts (nav items, seed content)
```

**To wire a real backend:** replace the functions in `lib/api.ts` (currently an
in-memory stub) with real fetch/DB calls. Component code and TanStack Query keys
stay the same — this is the only file that should change.

**Commands:** `dev` · `build` (standalone) · `start` · `typecheck` (gate) ·
`lint`.
