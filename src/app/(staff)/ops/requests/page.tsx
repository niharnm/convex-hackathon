import { PagePlaceholder } from "@/components/page-placeholder";
import { requireStaff } from "@/lib/server-auth";

export default async function RequestsPage() {
  await requireStaff();

  return (
    <PagePlaceholder
      description="Review safety, classify the request, inspect provider eligibility, and approve each dispatch manually."
      eyebrow="Dispatcher queue"
      title="Requests needing attention"
    />
  );
}
