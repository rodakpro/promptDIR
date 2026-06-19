import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const prompts = [
  {
    name: "Angle extractor",
    description: "Finds the strongest editorial angles from rough notes and source snippets.",
    model: "Research",
    status: "Ready"
  },
  {
    name: "Revision critic",
    description: "Scores draft clarity, source support, and audience fit before approval.",
    model: "Review",
    status: "Draft"
  },
  {
    name: "Channel transformer",
    description: "Turns a greenlit idea into channel-specific outlines and hooks.",
    model: "Publishing",
    status: "Ready"
  }
];

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Prompts"
        description="Reusable prompt blocks for research, review, transformation, and approval."
        action={
          <Button>
            <Plus />
            New prompt
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {prompts.map((prompt) => (
          <Card key={prompt.name}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{prompt.name}</CardTitle>
                <Badge variant={prompt.status === "Ready" ? "accent" : "default"}>
                  {prompt.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted">{prompt.description}</p>
              <div className="rounded-lg bg-panel-soft px-3 py-2 text-xs font-semibold text-muted">
                {prompt.model} workflow
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
