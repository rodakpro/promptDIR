/**
 * PromptDir library domain model.
 *
 * One typed source of truth per asset. The human-readable page and the
 * machine-readable JSON contract are both derived from this object, so they
 * can never drift apart.
 */

export type AssetType = "prompt" | "checklist" | "agent" | "workflow";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CategoryId =
  | "audience_research"
  | "content_strategy"
  | "content_production"
  | "repurposing"
  | "offer_creation"
  | "sales_growth"
  | "automation"
  | "business_management";

export interface AssetInput {
  /** Variable name used inside the prompt template, e.g. "audience". */
  name: string;
  type: "string" | "array" | "number";
  required: boolean;
  description: string;
}

export interface AssetOutputField {
  field: string;
  /** Machine type hint surfaced in the JSON contract, e.g. "number_1_to_10". */
  type: string;
  /** Human explanation shown on the page. */
  description: string;
}

export interface N8nHints {
  trigger: string;
  nodes: string[];
  outputs: string[];
}

export interface LibraryAsset {
  id: string;
  slug: string;
  type: AssetType;
  title: string;
  /** One-line promise shown under the title. */
  promise: string;
  summary: string;
  category: CategoryId;
  tags: string[];
  difficulty: Difficulty;
  estimatedTimeMinutes: number;
  bestFor: string[];
  notFor?: string[];

  /** Narrative: the creator situation this serves. */
  useCase: string;
  /** Concrete moments to reach for it. */
  whenToUse: string[];

  inputs: AssetInput[];
  outputFields: AssetOutputField[];

  systemPrompt?: string;
  promptTemplate: string;
  exampleOutput: string;

  /** Agent-only fields. */
  role?: string;
  goals?: string[];
  workflowSteps?: string[];
  toolsNeeded?: string[];
  handoffs?: string[];

  compatibleWith: string[];
  automationNotes: string;
  n8n?: N8nHints;

  /** Related asset ids (resolved to live links where they exist). */
  related?: string[];

  version: string;
  license: "free" | "pro";
  updatedAt: string;
}

/** Shape returned by the public JSON API / raw .json files. */
export interface JsonAsset {
  id: string;
  slug: string;
  type: AssetType;
  title: string;
  summary: string;
  category: CategoryId;
  tags: string[];
  difficulty: Difficulty;
  best_for: string[];
  not_for?: string[];
  inputs: Record<string, { type: string; required: boolean; description: string }>;
  output_schema: Record<string, string>;
  system_prompt?: string;
  prompt_template?: string;
  role?: string;
  goals?: string[];
  workflow?: string[];
  tools_needed?: string[];
  handoff_prompts?: string[];
  compatible_with: string[];
  automation_notes: string;
  n8n?: N8nHints;
  version: string;
  license: "free" | "pro";
  updated_at: string;
}
