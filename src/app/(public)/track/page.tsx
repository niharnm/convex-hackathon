import { Link2, LockKeyhole, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DispatchRail } from "@/components/dispatch-rail";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Track a request",
  description: "Open the private link attached to a Vun household request.",
};

export default function TrackRequestPage() {
  return (
    <main className="section-shell py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Track a request</p>
        <h1 className="display-type mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
          Your secure link opens the dispatch rail
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Vun does not expose a public request search. Open the private tracking
          link connected to your request to see its status and next action.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-white p-5 shadow-control sm:p-7">
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
            <span className="grid size-12 place-items-center rounded-lg bg-[#FFF0EC] text-brand">
              <Link2 aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-extrabold text-ink">
                Use the full link you received
              </h2>
              <p className="mt-2 leading-7 text-muted-foreground">
                If the link is incomplete or expired, request a new one through
                the same Vun contact that handled the request. Never post the
                link publicly; it acts as access to request status.
              </p>
            </div>
          </div>

          <div className="mt-7 border-t border-border pt-6">
            <DispatchRail />
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#C9D7E0] bg-[#EDF3F7] p-4">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-info"
          />
          <p className="text-sm leading-6 text-foreground">
            Provider contact and scheduling information remain hidden until the
            relevant handoff is accepted and available.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/get-started">Request help</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <LockKeyhole aria-hidden="true" /> Return home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
