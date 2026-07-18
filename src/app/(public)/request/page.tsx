import { PagePlaceholder } from "@/components/page-placeholder";

export default function RequestPage() {
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
