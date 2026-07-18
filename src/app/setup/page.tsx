import { Clock3, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export default async function SetupPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const { intent } = await searchParams;
  const providerIntent = intent === "provider";

  return (
    <main className="grid min-h-screen bg-background px-5 py-10 sm:place-items-center">
      <section className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-white shadow-lifted">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
          <BrandMark />
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Access unavailable
          </span>
        </div>
        <div className="p-5 sm:p-8">
          <span className="grid size-12 place-items-center rounded-lg bg-[#FFF0EC] text-brand">
            <Clock3 aria-hidden="true" className="size-6" />
          </span>
          <p className="eyebrow mt-6">
            {providerIntent ? "Provider applications" : "Online requests"}
          </p>
          <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            {providerIntent
              ? "Applications are not available here yet"
              : "This account route is not available right now"}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            {providerIntent
              ? "Vun is still preparing the provider application workspace. Signing up will not make a business eligible to receive requests."
              : "No request was submitted. Return to the public site for current service information and try again when online access is available."}
          </p>

          <div className="mt-7 flex items-start gap-3 rounded-lg border border-border bg-canvas p-4">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-success"
            />
            <p className="text-sm leading-6 text-foreground">
              Your request details were not sent to Vun or shared with a
              provider from this page.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Return home</Link>
            </Button>
            {providerIntent ? (
              <Button asChild variant="outline">
                <Link href="/#providers">How provider review works</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
