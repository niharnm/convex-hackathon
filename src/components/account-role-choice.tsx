"use client";

import { Show, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, Check, House, ShieldAlert, Store } from "lucide-react";
import Link from "next/link";

import { DispatchRail } from "@/components/dispatch-rail";
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
          href={`/setup?intent=${intent === "customer" ? "request" : "provider"}`}
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
    <section aria-labelledby="account-entry-title">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="lg:pt-4">
          <p className="eyebrow">Start with the right path</p>
          <h1
            className="display-type mt-4 text-[2.5rem] font-extrabold leading-tight text-ink sm:text-5xl"
            id="account-entry-title"
          >
            What do you need from Vun?
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            The customer path starts a household request. The provider path
            starts an application. Neither path grants staff access.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Every customer request follows
            </p>
            <DispatchRail className="mt-5" overview />
          </div>
        </div>

        <div className="grid gap-4">
          <article className="overflow-hidden rounded-xl border border-[#E7B1A5] bg-white shadow-lifted">
            <div className="h-1.5 bg-brand" />
            <div className="p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#FFF0EC] text-brand">
                  <House aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
                    Customer
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-extrabold text-ink">
                    Request household help
                  </h2>
                  <p
                    className="mt-2 leading-7 text-muted-foreground"
                    id="customer-account-help"
                  >
                    Continue as a user to complete the safety check, review
                    request details, and track the handoff.
                  </p>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 text-sm font-semibold text-foreground sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="size-4 text-success" />
                  Human review
                </li>
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="size-4 text-success" />
                  Secure request tracking
                </li>
              </ul>

              <AccountAction
                ariaDescribedBy="customer-account-help"
                className="mt-6 h-14 w-full justify-between px-5 text-base"
                clerkConfigured={clerkConfigured}
                intent="customer"
                label="Request help"
                redirectUrl="/request"
                showArrow
                testId="request-help"
              />
            </div>
          </article>

          <article
            className="rounded-xl border border-border bg-canvas p-5 sm:p-6"
            id="provider"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-white text-foreground">
                <Store aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Local service business
                </p>
                <h2 className="mt-1 font-display text-xl font-extrabold text-ink">
                  Apply as a provider
                </h2>
                <p
                  className="mt-2 leading-6 text-muted-foreground"
                  id="business-account-help"
                >
                  Continue as a business to create a profile for staff review.
                  Signup never makes a provider dispatch-eligible.
                </p>
                <AccountAction
                  ariaDescribedBy="business-account-help"
                  className="mt-5 h-11 w-auto px-4"
                  clerkConfigured={clerkConfigured}
                  intent="business"
                  label="Apply as a provider"
                  redirectUrl="/business"
                  testId="apply-as-provider"
                  variant="outline"
                />
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-lg border border-[#F1C9C0] bg-[#FFF2EF] p-4">
        <ShieldAlert
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-brand"
        />
        <p className="text-sm leading-6 text-foreground">
          <strong>Vun is not an emergency service.</strong> Call 911 or the
          appropriate emergency service if anyone is in immediate danger.
        </p>
      </div>
    </section>
  );
}
