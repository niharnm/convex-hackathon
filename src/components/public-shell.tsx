import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { routes } from "@/contracts/routes";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-evergreen/15 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <BrandMark />
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-3"
          >
            <Link
              className="hidden rounded-md px-3 py-2 text-sm font-semibold text-evergreen hover:bg-evergreen/5 sm:inline-flex"
              href={`${routes.home}#how-it-works`}
            >
              How it works
            </Link>
            <Button asChild size="sm">
              <Link href="/get-started">Get started</Link>
            </Button>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-evergreen/15 bg-evergreen px-5 py-8 text-primary-foreground sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm sm:flex-row">
          <p>Vun is for non-emergency household requests.</p>
          <p>
            For immediate danger, call 911 or the appropriate emergency service.
          </p>
        </div>
      </footer>
    </div>
  );
}
