/**
 * THE SINGLE SWAP POINT.
 *
 * An in-memory data layer so screens are real and clickable on day one.
 * Replace the bodies below with real fetch/DB calls when wiring a backend —
 * component code and TanStack Query keys stay exactly the same.
 */
import type { Idea, IdeaStatus } from "./types";
import { seedIdeas } from "./data";

let ideas: Idea[] = [...seedIdeas];

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const queryKeys = {
  ideas: ["ideas"] as const
};

export async function fetchIdeas(): Promise<Idea[]> {
  await delay();
  return [...ideas];
}

export async function updateIdeaStatus(id: string, status: IdeaStatus): Promise<Idea> {
  await delay();
  ideas = ideas.map((i) => (i.id === id ? { ...i, status } : i));
  const updated = ideas.find((i) => i.id === id);
  if (!updated) throw new Error(`Idea ${id} not found`);
  return updated;
}

export async function createIdea(input: Omit<Idea, "id" | "createdAt">): Promise<Idea> {
  await delay();
  const idea: Idea = {
    ...input,
    id: `idea-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  ideas = [idea, ...ideas];
  return idea;
}

export async function deleteIdea(id: string): Promise<void> {
  await delay();
  ideas = ideas.filter((i) => i.id !== id);
}
