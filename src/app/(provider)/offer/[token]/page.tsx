import { PagePlaceholder } from "@/components/page-placeholder";

export default async function OfferPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-12 sm:px-8 sm:py-20">
      <PagePlaceholder
        description={`The secure offer experience will validate ${token.slice(0, 6)}… and reveal only the job details needed to accept or decline.`}
        eyebrow="Provider offer"
        title="Can you take this request?"
      />
    </main>
  );
}
