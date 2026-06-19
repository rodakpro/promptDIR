# Dashboard StartPack

A reusable starter for building **app-like dashboards** (kanban boards, CRUD
tools, internal apps) with a consistent design and engineering baseline. See
[`STARTPACK.md`](./STARTPACK.md) for the full stack and requirements rationale.

The visual language matches the **Resonance Radar** reference: neutral canvas
with a faint grid, elevated panels, rounded chips, a restrained orange accent,
an icon sidebar, and a kanban board with status columns — light + dark.

## Stack

Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS 4 (`@theme` tokens) ·
shadcn/ui (Radix + CVA) · TanStack Query v5 · TanStack Table v8 · dnd-kit ·
react-hook-form + Zod · nuqs · next-themes · lucide-react · Space Grotesk.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000  → redirects to /ideas
npm run typecheck    # primary verification gate, must pass
npm run build        # standalone production build
```

## Deploy on Coolify

Use the Dockerfile flow:

- Repository: use the Git URL for this project
- Branch: `main` or your deploy branch
- Build pack: Dockerfile
- Dockerfile path: `Dockerfile`
- Exposed port: `3000`

The app builds with Next.js standalone output and runs `node server.js` inside
the production image. See [`COOLIFY.md`](./COOLIFY.md) for the deployment
checklist.

## What's included

- **Dashboard shell** — icon sidebar with active state + count badges, topbar,
  reusable page header (`components/app-sidebar.tsx`, `components/page-header.tsx`).
- **Kanban board** — draggable cards across status columns (dnd-kit) with
  optimistic status updates via TanStack Query (`components/kanban/`).
- **Data table** — generic, sortable, searchable TanStack Table
  (`components/data-table/data-table.tsx`).
- **URL-driven view state** — `?view=board|list` via nuqs.
- **Theming** — class-based dark mode, no flash (next-themes).
- **Design tokens** — HSL CSS variables surfaced to Tailwind in `app/globals.css`.

## Start a new project from this

```bash
cp -r dashboard-startpack my-new-dashboard && cd my-new-dashboard
rm -rf .git && git init && npm install
# rename: package.json, app/layout.tsx metadata, lib/data.ts nav + seed content
npx shadcn@latest add dialog dropdown-menu select   # add primitives as needed
```

## Wiring a real backend

Everything reads/writes through **`lib/api.ts`**, currently an in-memory stub.
Replace those functions with real fetch/DB calls — the query keys and all
component code stay the same. That's the only file you should need to touch.

## Project layout

```
app/(dashboard)/    sidebar shell + feature screens (ideas/ is the worked example)
components/         app-sidebar, page-header, theme-toggle, kanban/, data-table/, ui/
lib/                utils (cn), types, data (seed), api (the swap point)
```
