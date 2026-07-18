import Link from "next/link";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/brand-mark";
import { routes } from "@/contracts/routes";

const navigation = [
  { href: routes.opsRequests, label: "Requests" },
  { href: routes.opsProviders, label: "Providers" },
  { href: routes.opsConfig, label: "Configuration" },
  { href: routes.opsCommunications, label: "Communications" },
];

export function OpsShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#EEE9DE]">
      <header className="border-b border-evergreen/20 bg-evergreen text-primary-foreground">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between gap-5 px-4 py-3 sm:px-6">
          <div className="rounded-lg bg-cream px-3 py-2">
            <BrandMark compact />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Dispatch workspace</p>
            <p className="text-xs text-primary-foreground/70">
              Human approval required
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[92rem] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[15rem_1fr]">
        <aside className="surface h-fit p-2">
          <nav
            aria-label="Operations navigation"
            className="grid gap-1 sm:grid-cols-4 lg:grid-cols-1"
          >
            {navigation.map((item) => (
              <Link
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-evergreen hover:bg-evergreen hover:text-primary-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
