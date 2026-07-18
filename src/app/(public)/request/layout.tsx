import type { ReactNode } from "react";

import { requireAccount } from "@/lib/server-auth";

export default async function RequestAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAccount();

  return children;
}
