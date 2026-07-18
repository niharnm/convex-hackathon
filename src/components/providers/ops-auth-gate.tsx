import { RedirectToSignIn, Show } from "@clerk/nextjs";
import type { ReactNode } from "react";

// Presentation only. Protected resources still call requireStaff server-side.
export function OpsAuthGate({
  children,
  staffAuthorized,
}: {
  children: ReactNode;
  staffAuthorized: boolean;
}) {
  if (!staffAuthorized) {
    return null;
  }

  return (
    <Show when="signed-in" fallback={<RedirectToSignIn />}>
      {children}
    </Show>
  );
}
