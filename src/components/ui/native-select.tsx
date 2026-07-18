import * as React from "react";

import { cn } from "@/lib/utils";

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    className={cn(
      "flex h-12 w-full rounded-lg border border-input bg-white px-3.5 py-2 text-base shadow-control transition-[border-color,box-shadow] duration-200 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));

NativeSelect.displayName = "NativeSelect";
