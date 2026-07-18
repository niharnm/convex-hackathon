import { PagePlaceholder } from "@/components/page-placeholder";

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PagePlaceholder
      description={`Provider ${id} will show dispatch contacts, coverage, availability, restrictions, and dated verification records.`}
      eyebrow="Provider detail"
      title="Provider operating record"
    />
  );
}
