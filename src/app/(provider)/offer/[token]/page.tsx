import { PagePlaceholder } from "@/components/page-placeholder";

export default function OfferPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-12 sm:px-8 sm:py-20">
      <PagePlaceholder
        description="The secure offer experience will reveal only the job details needed to accept or decline after the capability link is validated."
        eyebrow="Provider offer"
        title="Can you take this request?"
      />
    </main>
  );
}
