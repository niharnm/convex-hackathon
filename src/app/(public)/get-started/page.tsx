import type { Metadata } from "next";

import { AccountRoleChoice } from "@/components/account-role-choice";

export const metadata: Metadata = {
  title: "Request help or apply",
  description:
    "Request household help as a customer or apply as a local service business.",
};

export default function GetStartedPage() {
  const clerkConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY,
  );

  return (
    <main className="section-shell py-10 sm:py-14 lg:py-16">
      <AccountRoleChoice clerkConfigured={clerkConfigured} />
    </main>
  );
}
