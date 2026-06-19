import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const interests = [
  {
    name: "Resonance Radar",
    description: "Signals around idea capture, editorial review, and weekly publishing flow.",
    count: 14,
    status: "Active"
  },
  {
    name: "Agent Skills",
    description: "Reusable workflows, coding agents, and human-approved automation patterns.",
    count: 9,
    status: "Watching"
  },
  {
    name: "Creator Ops",
    description: "Systems for turning research into assets, approvals, and repeatable output.",
    count: 7,
    status: "Active"
  }
];

export default function InterestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Interests"
        description="Clusters that keep related ideas, sources, prompts, and todos connected."
        action={
          <Button>
            <Plus />
            New interest
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {interests.map((interest) => (
          <Card key={interest.name}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{interest.name}</CardTitle>
                <Badge variant={interest.status === "Active" ? "accent" : "default"}>
                  {interest.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted">{interest.description}</p>
              <div className="flex items-center justify-between border-t border-border-soft pt-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Linked ideas
                </span>
                <span className="text-2xl font-black">{interest.count}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
