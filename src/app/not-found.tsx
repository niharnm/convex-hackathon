import { Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <section className="w-full max-w-xl rounded-xl border border-border bg-white p-6 shadow-lifted sm:p-8">
        <span className="grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground">
          <Compass aria-hidden="true" className="size-6" />
        </span>
        <p className="eyebrow mt-6">Page not found</p>
        <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
          That page is not here
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Check the link or return home. If this was a request tracking link,
          use the complete private link you received.
        </p>
        <Button asChild className="mt-7">
          <Link href="/">Return home</Link>
        </Button>
      </section>
    </main>
  );
}
