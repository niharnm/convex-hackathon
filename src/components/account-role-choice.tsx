"use client";

import { Show, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, House, ShieldAlert, Store } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type AccountIntent = "customer" | "business";

interface AccountActionProps {
  ariaDescribedBy: string;
  className: string;
  clerkConfigured: boolean;
  intent: AccountIntent;
  label: string;
  redirectUrl: string;
  showArrow?: boolean;
  testId: string;
  variant?: "default" | "outline";
}

function AccountAction({
  ariaDescribedBy,
  className,
  clerkConfigured,
  intent,
  label,
  redirectUrl,
  showArrow = false,
  testId,
  variant = "default",
}: AccountActionProps) {
  const content = (
    <>
      {label}
      {showArrow ? <ArrowRight aria-hidden="true" /> : null}
    </>
  );

  if (!clerkConfigured) {
    return (
      <Button asChild className={className} size="lg" variant={variant}>
        <Link
          aria-describedby={ariaDescribedBy}
          data-testid={testId}
          href="/setup"
        >
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <>
      <Show when="signed-in">
        <Button asChild className={className} size="lg" variant={variant}>
          <Link
            aria-describedby={ariaDescribedBy}
            data-testid={testId}
            href={redirectUrl}
          >
            {content}
          </Link>
        </Button>
      </Show>
      <Show when="signed-out">
        <SignUpButton
          forceRedirectUrl={redirectUrl}
          mode="modal"
          signInForceRedirectUrl={redirectUrl}
          unsafeMetadata={{ vunAccountIntent: intent }}
        >
          <Button
            aria-describedby={ariaDescribedBy}
            className={className}
            data-testid={testId}
            size="lg"
            variant={variant}
          >
            {content}
          </Button>
        </SignUpButton>
      </Show>
    </>
  );
}

export function AccountRoleChoice({
  clerkConfigured,
}: {
  clerkConfigured: boolean;
}) {
  return (
    <section
      aria-labelledby="account-entry-title"
      className="surface relative overflow-hidden p-6 sm:p-9"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1.5 bg-amber"
      />

      <p className="eyebrow">Choose your path</p>
      <h1
        className="display-type mt-3 text-4xl leading-tight text-evergreen sm:text-5xl"
        id="account-entry-title"
      >
        How are you using Vun?
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Choose a path, then sign in or create an account. You can still use Vun
        personally if you also run a business.
      </p>

      <div className="mt-8 rounded-xl border border-evergreen/15 bg-evergreen/[0.045] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-amber/25 text-evergreen">
            <House aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-evergreen">
              I need help at home
            </h2>
            <p
              className="mt-1 leading-6 text-muted-foreground"
              id="customer-account-help"
            >
              Request non-emergency household help and track updates.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <AccountAction
            ariaDescribedBy="customer-account-help"
            className="h-14 w-full justify-between px-5 text-base"
            clerkConfigured={clerkConfigured}
            intent="customer"
            label="Continue as a user"
            redirectUrl="/request"
            showArrow
            testId="continue-as-user"
          />
        </div>
      </div>

      <div aria-hidden="true" className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-evergreen/15" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-evergreen/60">
          For local providers
        </span>
        <span className="h-px flex-1 bg-evergreen/15" />
      </div>

      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-evergreen/20 text-evergreen">
          <Store aria-hidden="true" className="size-4" />
        </span>
        <div>
          <h2 className="font-bold text-evergreen">
            Own a local service business?
          </h2>
          <p
            className="mt-1 max-w-xl leading-6 text-muted-foreground"
            id="business-account-help"
          >
            Create a business profile and apply to receive staff-approved
            requests.
          </p>
          <div className="mt-4">
            <AccountAction
              ariaDescribedBy="business-account-help"
              className="h-11 w-auto px-4"
              clerkConfigured={clerkConfigured}
              intent="business"
              label="Continue as a business"
              redirectUrl="/business"
              testId="continue-as-business"
              variant="outline"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl bg-evergreen p-4 text-primary-foreground">
        <ShieldAlert
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-amber"
        />
        <p className="text-sm leading-6">
          Vun is not an emergency service. Call 911 or the appropriate emergency
          service if anyone is in immediate danger.
        </p>
      </div>
    </section>
  );
}
