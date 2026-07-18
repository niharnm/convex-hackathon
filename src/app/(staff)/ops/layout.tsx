import type { ReactNode } from "react";

import { OpsShell } from "@/components/ops-shell";
import { requireStaff } from "@/lib/server-auth";

export default async function OperationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireStaff();

  return <OpsShell>{children}</OpsShell>;
}
