import {
  BadgeCheck,
  CircleAlert,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

import { requireAccount } from "@/lib/server-auth";

export const metadata: Metadata = {
  title: "Provider application",
  description: "Create a local service business profile for staff review.",
};

const reviewAreas = [
  {
    icon: ClipboardList,
    title: "Business profile",
    description: "Business details, services, coverage, and dispatch contacts.",
  },
  {
    icon: BadgeCheck,
    title: "Individual verification checks",
    description: "Each required check keeps its own status and review date.",
  },
  {
    icon: ShieldCheck,
    title: "Staff eligibility decision",
    description: "Only staff can approve outreach for a reviewed request.",
  },
] as const;

export default async function BusinessPage() {
  await requireAccount();

  return (
    <main className="section-shell py-10 sm:py-14 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
        <section>
          <p className="eyebrow">Provider application</p>
          <h1 className="display-type mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
            Build a profile for staff review
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Tell Vun how your business operates. Staff reviews the profile and
            each verification item before a business can receive an approved
            request.
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#E7D1A8] bg-[#FFF8E8] p-5">
            <CircleAlert
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-warning"
            />
            <div>
              <h2 className="font-display font-extrabold text-ink">
                The application form is not connected yet
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                No business details or documents can be submitted from this page
                right now. Your account remains separate from provider
                eligibility.
              </p>
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-border bg-white p-5 shadow-control sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Review sequence
          </p>
          <ol className="mt-5 divide-y divide-border">
            {reviewAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <li
                  className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  key={area.title}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-brand">0{index + 1}</p>
                    <h2 className="mt-1 font-display font-extrabold text-ink">
                      {area.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </main>
  );
}
