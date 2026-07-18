import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-blue-100 text-blue-900",
  success: "bg-emerald-100 text-emerald-900",
  warning: "bg-amber-100 text-amber-950",
  danger: "bg-red-100 text-red-900",
} as const;

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
