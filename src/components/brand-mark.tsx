import Link from "next/link";

import { routes } from "@/contracts/routes";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      className="inline-flex items-center gap-3 rounded-md font-semibold text-evergreen"
      href={routes.home}
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-full border-2 border-evergreen bg-amber font-bold text-ink shadow-[3px_3px_0_#173F35]"
      >
        V
      </span>
      {compact ? null : <span className="text-lg tracking-tight">Vun</span>}
    </Link>
  );
}
