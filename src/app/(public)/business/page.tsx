import { ClipboardCheck, ShieldCheck } from "lucide-react";

import { requireAccount } from "@/lib/server-auth";

export default async function BusinessPage() {
  await requireAccount();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-20">
      <section className="surface p-6 sm:p-9">
        <p className="eyebrow">Business account</p>
        <h1 className="display-type mt-3 text-4xl text-evergreen sm:text-5xl">
          Start your business profile
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          Tell Vun where you work and which services you provide. Staff reviews
          every application before a business can receive requests.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-evergreen/15 p-5">
            <ClipboardCheck aria-hidden="true" className="size-6 text-amber" />
            <h2 className="mt-4 font-bold text-evergreen">
              Profile onboarding is next
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Business details, service areas, and availability will live here.
            </p>
          </div>
          <div className="rounded-xl border border-evergreen/15 p-5">
            <ShieldCheck aria-hidden="true" className="size-6 text-amber" />
            <h2 className="mt-4 font-bold text-evergreen">
              Review stays human
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Signing up does not approve or fully vet a business, and dispatch
              always requires staff action.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
