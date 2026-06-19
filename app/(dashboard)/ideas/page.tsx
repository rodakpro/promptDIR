import { Suspense } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { IdeasView } from "./ideas-view";

export default function IdeasPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Ideas"
        description="Your idea radar — review, refine, greenlight, or set aside."
        action={
          <Button>
            <Plus />
            New idea
          </Button>
        }
      />
      <Suspense fallback={null}>
        <IdeasView />
      </Suspense>
    </div>
  );
}
