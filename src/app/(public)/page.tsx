import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { routes } from "@/contracts/routes";

const steps = [
  {
    title: "Describe what happened",
    description:
      "Share the household issue, timing, and the best way to reach you.",
  },
  {
    title: "A person reviews it",
    description:
      "A dispatcher checks safety, service fit, and available local providers.",
  },
  {
    title: "Follow one clear handoff",
    description:
      "Track the introduction and tell us whether the issue was resolved.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Human-backed household help</p>
          <h1 className="display-type max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.035em] text-evergreen sm:text-7xl">
            One request. A clearer path to local help.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Tell us about a non-emergency household problem once. A dispatcher
            reviews it and coordinates a service introduction—without making you
            browse a directory.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-6 text-base" size="lg">
              <Link href={routes.request}>
                Request help <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <a
              className="inline-flex h-12 items-center justify-center rounded-md border border-evergreen/30 px-6 font-semibold text-evergreen hover:bg-evergreen/5"
              href="#how-it-works"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="surface relative overflow-hidden p-7 shadow-lifted sm:p-9">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-8 w-[3px] bg-amber"
          />
          <div className="relative space-y-8 pl-8">
            <div>
              <p className="text-sm font-semibold text-evergreen/70">
                Request received
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">
                Kitchen sink leaking today
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-evergreen/70">
                Human review
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">
                Safety and service fit confirmed
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-evergreen/70">
                Provider handoff
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">
                Shared only after acceptance
              </p>
            </div>
          </div>
          <div className="mt-9 flex items-start gap-3 rounded-xl bg-evergreen p-4 text-primary-foreground">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-amber"
            />
            <p className="text-sm leading-6">
              This is not an emergency line. Immediate danger should go to 911
              or the appropriate emergency service.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-y border-evergreen/15 bg-[#EAE4D7]"
        id="how-it-works"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex max-w-3xl items-start gap-4">
            <Headphones aria-hidden="true" className="mt-1 size-7 text-amber" />
            <div>
              <p className="eyebrow">A single handoff, not a marketplace</p>
              <h2 className="display-type mt-3 text-4xl text-evergreen sm:text-5xl">
                What happens after you ask
              </h2>
            </div>
          </div>
          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li className="surface p-6" key={step.title}>
                <div className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-amber font-bold text-ink">
                    {index + 1}
                  </span>
                  <CheckCircle2
                    aria-hidden="true"
                    className="size-5 text-evergreen"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-evergreen">
                  {step.title}
                </h3>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
