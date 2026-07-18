import { CircleAlert, LockKeyhole, RotateCcw } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DispatchRail } from "@/components/dispatch-rail";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Request status",
  description: "Track the human-reviewed handoff for a Vun request.",
};

export default function TrackingPage() {
  return (
    <main className="section-shell py-10 sm:py-14 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <section>
          <p className="eyebrow">Request status</p>
          <div className="mt-4 flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
              <CircleAlert aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h1 className="display-type text-3xl font-extrabold text-ink sm:text-4xl">
                This tracking link is not available
              </h1>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                The link may be incomplete, expired, or not connected to a
                request yet. Vun cannot show request or provider details until a
                capability link is validated.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-white p-5 shadow-control sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  Dispatch rail
                </p>
                <h2 className="mt-1 font-display text-lg font-extrabold text-ink">
                  No validated status to display
                </h2>
              </div>
              <LockKeyhole
                aria-hidden="true"
                className="size-5 text-muted-foreground"
              />
            </div>
            <DispatchRail className="mt-6" />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/get-started">Request help</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/track">
                <RotateCcw aria-hidden="true" /> Tracking help
              </Link>
            </Button>
          </div>
        </section>

        <aside className="h-fit rounded-xl border border-border bg-canvas p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            A valid link can show
          </p>
          <ul className="mt-4 divide-y divide-border text-sm leading-6 text-foreground">
            <li className="py-3 first:pt-0">
              The current request status and next human action
            </li>
            <li className="py-3">Timestamps for completed dispatch steps</li>
            <li className="py-3">Provider details only after acceptance</li>
            <li className="py-3">Scheduling details when they are available</li>
            <li className="py-3 last:pb-0">A feedback action after closure</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
