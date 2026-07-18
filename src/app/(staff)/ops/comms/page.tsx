import { PagePlaceholder } from "@/components/page-placeholder";
import { requireStaff } from "@/lib/server-auth";

export default async function CommunicationsPage() {
  await requireStaff();

  return (
    <PagePlaceholder
      description="Inspect clearly labeled simulated calls and messages, failure scenarios, and manual retries."
      eyebrow="Mock communications"
      title="Nothing leaves this system"
    />
  );
}
