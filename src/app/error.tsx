"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <section className="surface max-w-lg p-8 text-center">
        <p className="eyebrow">This page could not load</p>
        <h1 className="display-type mt-3 text-4xl text-evergreen">
          Try the handoff again
        </h1>
        <p className="mt-4 text-muted-foreground">
          The request was not changed. Retry, or return later if the problem
          continues.
        </p>
        <Button className="mt-7" onClick={reset}>
          Retry
        </Button>
      </section>
    </main>
  );
}
