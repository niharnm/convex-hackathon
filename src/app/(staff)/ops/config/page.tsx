import { PagePlaceholder } from "@/components/page-placeholder";
import { requireStaff } from "@/lib/server-auth";

export default async function ConfigurationPage() {
  await requireStaff();

  return (
    <PagePlaceholder
      description="Configure service areas, postal codes, operating hours, categories, and required verification checks without changing code."
      eyebrow="Service configuration"
      title="Define where the promise applies"
    />
  );
}
