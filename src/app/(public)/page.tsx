import {
  ArrowRight,
  BadgeCheck,
  CircleSlash2,
  ClipboardCheck,
  EyeOff,
  Headset,
  ShieldAlert,
  Store,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { DispatchRail } from "@/components/dispatch-rail";
import { RequestStartForm } from "@/components/request-start-form";
import { Button } from "@/components/ui/button";
import { publicServiceCategories } from "@/config/public-services";

const processSteps = [
  {
    title: "Describe the problem",
    description: "Share the issue, location, and timing in one request.",
  },
  {
    title: "A person reviews it",
    description: "Staff checks safety, support, and the details still needed.",
  },
  {
    title: "Vun contacts a provider",
    description: "Staff decides which eligible provider to contact and when.",
  },
  {
    title: "Track the handoff",
    description: "Your secure link shows what happened and what comes next.",
  },
] as const;

const trustPractices = [
  {
    icon: ClipboardCheck,
    title: "Human review",
    description: "Every dispatch decision requires a staff action.",
  },
  {
    icon: EyeOff,
    title: "Contact details stay gated",
    description: "Provider contact details appear only after acceptance.",
  },
  {
    icon: BadgeCheck,
    title: "Checks shown separately",
    description: "Verification items keep their own status and review date.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency requests stop",
    description: "Immediate danger is redirected before personal details.",
  },
] as const;

const railDescriptions = {
  "Request received": "Your details enter the review queue.",
  "Human review": "A person checks safety and service fit.",
  "Provider contacted": "Staff reaches out after review.",
  Scheduled: "Timing appears after provider acceptance.",
} as const;

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-border bg-white">
        <div className="section-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-20">
          <div>
            <p className="eyebrow">Household help, reviewed by a person</p>
            <h1 className="display-type mt-4 max-w-3xl text-[2.75rem] font-extrabold leading-[1.03] text-ink sm:text-6xl lg:text-[4rem]">
              Home problem? Tell Vun once.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Describe a non-emergency household issue. A person reviews the
              request and coordinates the next step with a suitable local
              provider when the request is supported.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-canvas p-4 sm:p-5">
              <RequestStartForm />
            </div>
          </div>

          <aside
            aria-labelledby="dispatch-overview-title"
            className="surface overflow-hidden shadow-lifted"
          >
            <div className="flex flex-col gap-3 border-b border-white/10 bg-ink px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  The Vun handoff
                </p>
                <h2
                  className="mt-1 font-display text-lg font-extrabold"
                  id="dispatch-overview-title"
                >
                  One visible dispatch rail
                </h2>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                <Headset aria-hidden="true" className="size-4 text-[#FF8B73]" />
                Human review required
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <DispatchRail descriptions={railDescriptions} overview />
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#F1C9C0] bg-[#FFF2EF] p-4">
                <ShieldAlert
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand"
                />
                <p className="text-sm leading-6 text-foreground">
                  Vun is not an emergency service. Call 911 or the appropriate
                  emergency service for immediate danger.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-background" id="services">
        <div className="section-shell py-14 sm:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Service discovery</p>
              <h2 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
                Start with what needs attention
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                Only staff-published service categories appear here. A request
                is never dispatchable until a person confirms that it is
                supported.
              </p>
            </div>
          </div>

          {publicServiceCategories.length > 0 ? (
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {publicServiceCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <li key={category.slug}>
                    <Link
                      className="group flex min-h-32 flex-col justify-between rounded-xl border border-border bg-white p-4 shadow-control transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md focus-visible:border-brand"
                      href="/get-started"
                    >
                      <Icon aria-hidden="true" className="size-6 text-brand" />
                      <span className="mt-5 font-display text-base font-extrabold text-ink group-hover:text-brand">
                        {category.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-8 grid gap-5 rounded-xl border border-dashed border-input bg-white p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
              <span className="grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground">
                <Wrench aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold text-ink">
                  No service categories are published yet
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Vun will show categories here only after staff configures
                  coverage. You can prepare a local draft before availability is
                  confirmed.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/get-started">Request help</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-white" id="how-it-works">
        <div className="section-shell py-14 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">A managed request, not a directory</p>
            <h2 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              One connected path from problem to handoff
            </h2>
          </div>

          <ol className="mt-10 grid gap-0 border-y border-border md:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                className="relative border-b border-border px-1 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                key={step.title}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-extrabold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#EDF3F7]" id="safety">
        <div className="section-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="eyebrow text-info">Trust and safety</p>
            <h2 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              Specific controls at every handoff
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Vun shows the checks and decisions that actually happen. It does
              not replace emergency services or make unsupported quality claims
              about providers.
            </p>
          </div>

          <ul className="grid border-t border-[#C9D7E0] sm:grid-cols-2">
            {trustPractices.map((practice) => {
              const Icon = practice.icon;

              return (
                <li
                  className="border-b border-[#C9D7E0] py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                  key={practice.title}
                >
                  <Icon aria-hidden="true" className="size-5 text-info" />
                  <h3 className="mt-3 font-display font-extrabold text-ink">
                    {practice.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {practice.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-white" id="providers">
        <div className="section-shell py-14 sm:py-16">
          <div className="grid overflow-hidden rounded-xl border border-border bg-ink text-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-white/10 text-[#FF8B73]">
                  <Store aria-hidden="true" className="size-5" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  For local service businesses
                </p>
              </div>
              <h2 className="display-type mt-5 text-3xl font-extrabold text-white sm:text-4xl">
                Run a local service business?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/70">
                Apply to receive requests that staff has reviewed and approved
                for outreach. Signing up does not make a business eligible for
                dispatch.
              </p>
              <Button
                asChild
                className="mt-7 bg-white text-ink hover:bg-white/90"
              >
                <Link href="/get-started#provider">
                  Apply as a provider <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="border-t border-white/10 bg-white/[0.04] p-6 sm:p-9 lg:border-l lg:border-t-0">
              <p className="font-display text-lg font-extrabold">
                What the application means
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-white/70">
                <li className="flex gap-3">
                  <CircleSlash2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#FF8B73]"
                  />
                  No automatic approval or dispatch eligibility
                </li>
                <li className="flex gap-3">
                  <BadgeCheck
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#FF8B73]"
                  />
                  Individual verification checks stay visible separately
                </li>
                <li className="flex gap-3">
                  <Headset
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#FF8B73]"
                  />
                  Staff controls every provider contact
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
