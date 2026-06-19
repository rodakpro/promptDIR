import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sources = [
  {
    title: "Saved links inbox",
    type: "Links",
    owner: "Research",
    freshness: "Daily"
  },
  {
    title: "YouTube transcript queue",
    type: "Video",
    owner: "Content",
    freshness: "Weekly"
  },
  {
    title: "Customer language notes",
    type: "Notes",
    owner: "Positioning",
    freshness: "Manual"
  }
];

export default function SourcesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Sources"
        description="Input streams that feed the dashboard with links, notes, transcripts, and proof."
        action={
          <Button>
            <Plus />
            Add source
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Source registry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-border-soft">
            <table className="w-full text-left text-sm">
              <thead className="bg-panel-soft text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-bold">Source</th>
                  <th className="px-4 py-3 font-bold">Type</th>
                  <th className="px-4 py-3 font-bold">Owner</th>
                  <th className="px-4 py-3 font-bold">Freshness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {sources.map((source) => (
                  <tr key={source.title}>
                    <td className="px-4 py-3 font-semibold">{source.title}</td>
                    <td className="px-4 py-3">
                      <Badge>{source.type}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted">{source.owner}</td>
                    <td className="px-4 py-3 text-muted">{source.freshness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
