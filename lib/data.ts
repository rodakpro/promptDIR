import type { Column, Idea, NavItem } from "./types";

/** Sidebar navigation — edit here, not in JSX. */
export const navItems: NavItem[] = [
  { label: "Ideas", href: "/ideas", icon: "Lightbulb" },
  { label: "Interests", href: "/interests", icon: "Tag" },
  { label: "Sources", href: "/sources", icon: "FolderOpen" },
  { label: "Prompts", href: "/prompts", icon: "Wand2" },
  { label: "Todos", href: "/todos", icon: "ListChecks", badge: 2 }
];

/** Kanban columns, left to right. */
export const columns: Column[] = [
  { status: "new", label: "New" },
  { status: "review", label: "Review" },
  { status: "revising", label: "Revising" },
  { status: "greenlit", label: "Greenlit" }
];

/** Seed content — swap for a real API in lib/api.ts. */
export const seedIdeas: Idea[] = [
  {
    id: "idea-1",
    title: "A rough kernel waiting to be shaped",
    summary: "A quick note jotted down to revisit and develop later.",
    status: "new",
    stage: "default",
    tags: ["Resonance Radar"],
    author: "You",
    createdAt: "2026-06-08"
  },
  {
    id: "idea-2",
    title: "What changed after a revision pass",
    summary: "A reworked idea, back in the Review column above the shaped ones.",
    status: "review",
    stage: "revised",
    tags: ["Resonance Radar"],
    author: "You",
    createdAt: "2026-06-08"
  },
  {
    id: "idea-3",
    title: "Why most agent demos look fake",
    summary:
      "Most agent demos feel staged because they are — cherry-picked happy paths and hidden retries.",
    status: "review",
    stage: "shaped",
    tags: ["Agent Skills", "Claude Code"],
    author: "You",
    createdAt: "2026-06-08"
  },
  {
    id: "idea-4",
    title: "The five-minute idea radar",
    summary: "How to drain your idea backlog without losing the good ones.",
    status: "revising",
    stage: "default",
    tags: ["Resonance Radar", "Spec-Driven Development"],
    author: "You",
    createdAt: "2026-06-08"
  },
  {
    id: "idea-5",
    title: "Human-approved publishing loop",
    summary: "Automation drafts; a person greenlights before anything ships.",
    status: "greenlit",
    stage: "default",
    tags: ["Workflow"],
    author: "You",
    createdAt: "2026-06-08"
  }
];
