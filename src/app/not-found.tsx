import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <section className="surface max-w-lg p-8 text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="display-type mt-3 text-4xl text-evergreen">
          That handoff is not here
        </h1>
        <p className="mt-4 text-muted-foreground">
          Check the link or return to Vun to start a new request.
        </p>
        <Button asChild className="mt-7">
          <Link href="/">Return home</Link>
        </Button>
      </section>
    </main>
  );
}
