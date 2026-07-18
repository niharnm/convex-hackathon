import { PagePlaceholder } from "@/components/page-placeholder";

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ trackingToken: string }>;
}) {
  const { trackingToken } = await params;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <PagePlaceholder
        description={`A privacy-safe timeline will load for tracking reference ${trackingToken.slice(0, 6)}… once the customer feature is connected.`}
        eyebrow="Request status"
        title="Your request handoff"
      />
    </main>
  );
}
