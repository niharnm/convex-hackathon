import { PagePlaceholder } from "@/components/page-placeholder";

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PagePlaceholder
      description={`Request ${id} will show intake, safety review, eligible providers, offers, communications, and audit history.`}
      eyebrow="Request detail"
      title="Review before dispatch"
    />
  );
}
