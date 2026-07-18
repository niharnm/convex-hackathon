import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { parseStaffUserIds } from "@/lib/staff-access";

function isClerkConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY,
  );
}

export async function requireAccount(): Promise<void> {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  await auth.protect();
}

export async function requireStaff(): Promise<void> {
  if (!isClerkConfigured()) {
    redirect("/setup");
  }

  const staffUserIds = parseStaffUserIds(process.env.VUN_STAFF_USER_IDS);

  if (staffUserIds.size === 0) {
    redirect("/setup?reason=staff");
  }

  const { userId } = await auth.protect();

  if (!staffUserIds.has(userId)) {
    notFound();
  }
}
