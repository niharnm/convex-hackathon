import { CircleAlert, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export default function OfferPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-8">
          <BrandMark />
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <section className="rounded-xl border border-border bg-white p-5 shadow-control sm:p-8">
          <span className="grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground">
            <CircleAlert aria-hidden="true" className="size-6" />
          </span>
          <p className="eyebrow mt-6">Provider offer</p>
          <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            This offer link is not available
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            The capability link could not be validated. No customer details,
            internal notes, or raw access token can be shown. Ask the Vun staff
            contact who sent the offer for a current link.
          </p>
          <div className="mt-7 flex items-start gap-3 rounded-lg border border-border bg-canvas p-4">
            <LockKeyhole
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-foreground"
            />
            <p className="text-sm leading-6 text-foreground">
              Accept and decline actions appear only after the link and offer
              state are validated.
            </p>
          </div>
          <Button asChild className="mt-7" variant="outline">
            <Link href="/">Return to Vun</Link>
          </Button>
        </section>
      </div>
    </main>
  );
}
