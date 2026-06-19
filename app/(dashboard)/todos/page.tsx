import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const todos = [
  {
    task: "Review revised agent-demo angle",
    owner: "Editor",
    priority: "High",
    due: "Today"
  },
  {
    task: "Add source scoring to saved links inbox",
    owner: "Ops",
    priority: "Medium",
    due: "Tomorrow"
  },
  {
    task: "Convert greenlit idea into launch thread",
    owner: "Content",
    priority: "Medium",
    due: "This week"
  }
];

export default function TodosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Todos"
        description="Operational tasks that move ideas from capture to review, revision, and publishing."
        action={
          <Button>
            <Plus />
            New todo
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Open tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {todos.map((todo) => (
              <div
                key={todo.task}
                className="flex flex-col gap-3 rounded-xl border border-border-soft bg-panel-soft p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{todo.task}</p>
                  <p className="mt-1 text-sm text-muted">{todo.owner}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={todo.priority === "High" ? "count" : "default"}>
                    {todo.priority}
                  </Badge>
                  <Badge>{todo.due}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
