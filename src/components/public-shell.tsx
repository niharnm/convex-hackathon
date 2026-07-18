import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { routes } from "@/contracts/routes";

const navigation = [
  { href: `${routes.home}#services`, label: "Services" },
  { href: `${routes.home}#how-it-works`, label: "How it works" },
  { href: "/track", label: "Track a request" },
  { href: `${routes.home}#providers`, label: "For providers" },
] as const;

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm font-bold text-foreground transition-colors duration-200 hover:bg-muted hover:text-brand";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="section-shell flex h-16 items-center justify-between gap-3">
          <BrandMark />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 lg:flex"
          >
            {navigation.map((item) => (
              <Link className={navLinkClass} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button asChild>
              <Link href="/get-started">Request help</Link>
            </Button>

            <details className="group relative lg:hidden">
              <summary
                aria-label="Open navigation menu"
                className="grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-border bg-white text-foreground shadow-control transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden"
                role="button"
              >
                <Menu aria-hidden="true" className="size-5 group-open:hidden" />
                <X
                  aria-hidden="true"
                  className="hidden size-5 group-open:block"
                />
              </summary>
              <nav
                aria-label="Mobile navigation"
                className="absolute right-0 top-12 grid w-64 gap-1 rounded-xl border border-border bg-white p-2 shadow-lifted"
              >
                {navigation.map((item) => (
                  <Link
                    className={`${navLinkClass} block px-4 py-3`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-border bg-ink text-white">
        <div className="section-shell grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <BrandMark inverse />
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              A person reviews each supported household request and coordinates
              the next handoff. Vun does not automatically match or dispatch.
            </p>
          </div>
          <div className="max-w-md border-l-2 border-brand pl-4">
            <p className="font-bold">Vun is not an emergency service.</p>
            <p className="mt-1 text-sm leading-6 text-white/70">
              For immediate danger, call 911 or the appropriate emergency
              service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
