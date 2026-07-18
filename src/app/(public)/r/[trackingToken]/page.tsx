import { PagePlaceholder } from "@/components/page-placeholder";

export default function TrackingPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <PagePlaceholder
        description="A privacy-safe timeline will load after this tracking link is validated and the customer feature is connected."
        eyebrow="Request status"
        title="Your request handoff"
      />
    </main>
  );
}
