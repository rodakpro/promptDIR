/** Domain models. One screen ("Ideas") is shipped as a worked example. */

export type IdeaStatus = "new" | "review" | "revising" | "greenlit";

/** Optional sub-grouping shown as labelled rows inside a column. */
export type IdeaStage = "default" | "revised" | "shaped";

export interface Idea {
  id: string;
  title: string;
  summary: string;
  status: IdeaStatus;
  stage: IdeaStage;
  tags: string[];
  author: string;
  createdAt: string; // ISO date
}

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide icon name
  badge?: number;
}

export interface Column {
  status: IdeaStatus;
  label: string;
}
