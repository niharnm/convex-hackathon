"use client";

import { CircleAlert, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <section className="w-full max-w-xl rounded-xl border border-border bg-white p-6 shadow-lifted sm:p-8">
        <span className="grid size-12 place-items-center rounded-lg bg-red-100 text-destructive">
          <CircleAlert aria-hidden="true" className="size-6" />
        </span>
        <p className="eyebrow mt-6 text-destructive">Page unavailable</p>
        <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
          This page could not load
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          No request was changed. Try loading the page again. If it still does
          not open, return later using the same secure link.
        </p>
        <Button className="mt-7" onClick={reset}>
          <RotateCcw aria-hidden="true" /> Try again
        </Button>
      </section>
    </main>
  );
}
