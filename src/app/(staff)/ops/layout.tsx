import type { ReactNode } from "react";

import { OpsAuthGate } from "@/components/providers/ops-auth-gate";
import { OpsShell } from "@/components/ops-shell";

export default function OperationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OpsAuthGate>
      <OpsShell>{children}</OpsShell>
    </OpsAuthGate>
  );
}
