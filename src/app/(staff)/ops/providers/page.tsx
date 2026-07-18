import { PagePlaceholder } from "@/components/page-placeholder";
import { requireStaff } from "@/lib/server-auth";

export default async function ProvidersPage() {
  await requireStaff();

  return (
    <PagePlaceholder
      description="Manage provider coverage, availability, restrictions, probation, and each verification check separately."
      eyebrow="Provider directory"
      title="Coverage you can explain"
    />
  );
}
