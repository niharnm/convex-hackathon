import type { Metadata } from "next";

import { CustomerIntake } from "@/components/customer-intake";

export const metadata: Metadata = {
  title: "Request help",
  description: "Start a non-emergency household request with a safety check.",
};

export default function RequestPage() {
  return (
    <main className="section-shell py-10 sm:py-14 lg:py-16">
      <CustomerIntake />
    </main>
  );
}
