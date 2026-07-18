import Link from "next/link";

import { routes } from "@/contracts/routes";
import { cn } from "@/lib/utils";

export function BrandMark({
  compact = false,
  inverse = false,
}: {
  compact?: boolean;
  inverse?: boolean;
}) {
  return (
    <Link
      aria-label="Vun home"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md font-display font-extrabold",
        inverse ? "text-white" : "text-ink",
      )}
      href={routes.home}
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-[0.65rem] bg-brand text-base font-extrabold text-white shadow-[inset_0_-2px_0_rgb(31_37_41_/_18%)]"
      >
        V
      </span>
      {compact ? null : <span className="text-xl tracking-[-0.04em]">Vun</span>}
    </Link>
  );
}
