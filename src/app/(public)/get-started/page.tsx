import type { Metadata } from "next";

import { AccountRoleChoice } from "@/components/account-role-choice";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Sign in or create a Vun account as a customer or local service business.",
};

export default function GetStartedPage() {
  const clerkConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY,
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
      <AccountRoleChoice clerkConfigured={clerkConfigured} />
    </main>
  );
}
