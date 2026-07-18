import { RedirectToSignIn, Show } from "@clerk/nextjs";
import type { ReactNode } from "react";

export function OpsAuthGate({ children }: { children: ReactNode }) {
  return (
    <Show when="signed-in" fallback={<RedirectToSignIn />}>
      {children}
    </Show>
  );
}
