import { PagePlaceholder } from "@/components/page-placeholder";
import { requireAccount } from "@/lib/server-auth";

export default async function RequestPage() {
  await requireAccount();

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <PagePlaceholder
        description="The customer workstream will add emergency screening, configured service choices, review, and confirmation here."
        eyebrow="Customer intake"
        title="Tell us what needs attention"
      />
    </main>
  );
}
