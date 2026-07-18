"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function PublicAuthControls() {
  return (
    <div
      className="flex items-center gap-1 sm:gap-2"
      data-testid="public-auth-controls"
    >
      <Show when="signed-out">
        <SignInButton forceRedirectUrl="/request" mode="modal">
          <Button className="px-2.5 sm:px-3" size="sm" variant="ghost">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton
          forceRedirectUrl="/request"
          mode="modal"
          signInForceRedirectUrl="/request"
          unsafeMetadata={{ vunAccountIntent: "customer" }}
        >
          <Button size="sm">Sign up</Button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <Button asChild className="hidden sm:inline-flex" size="sm">
          <Link href="/request">Request help</Link>
        </Button>
        <UserButton />
      </Show>
    </div>
  );
}
