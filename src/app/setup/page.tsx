import Link from "next/link";
import { KeyRound } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <section className="surface max-w-xl p-7 sm:p-10">
        <BrandMark />
        <div className="mt-8 flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-amber/25 text-evergreen">
            <KeyRound aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="eyebrow">Account setup required</p>
            <h1 className="display-type mt-2 text-4xl text-evergreen">
              Account access stays locked
            </h1>
            <p className="mt-4 leading-7 text-muted-foreground">
              Add the Clerk development keys and issuer domain described in
              .env.example before opening customer, business, or dispatcher
              account routes. Staff access also requires an explicit Clerk user
              ID allowlist.
            </p>
          </div>
        </div>
        <Button asChild className="mt-8" variant="outline">
          <Link href="/">Return to the public site</Link>
        </Button>
      </section>
    </main>
  );
}
