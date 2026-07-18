import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export const dispatchSteps = [
  "Request received",
  "Human review",
  "Provider contacted",
  "Scheduled",
] as const;

type DispatchState = "complete" | "active" | "upcoming" | "overview";

export function DispatchRail({
  activeStep,
  className,
  completedThrough = -1,
  descriptions,
  overview = false,
  timestamps,
}: {
  activeStep?: number;
  className?: string;
  completedThrough?: number;
  descriptions?: Partial<Record<(typeof dispatchSteps)[number], string>>;
  overview?: boolean;
  timestamps?: Partial<Record<(typeof dispatchSteps)[number], string>>;
}) {
  return (
    <ol
      aria-label="Vun dispatch progress"
      className={cn("dispatch-rail", className)}
      data-orientation="responsive"
    >
      {dispatchSteps.map((step, index) => {
        const state: DispatchState = overview
          ? "overview"
          : index <= completedThrough
            ? "complete"
            : index === activeStep
              ? "active"
              : "upcoming";
        const timestamp = timestamps?.[step];

        return (
          <li data-state={state} key={step}>
            <span className="dispatch-marker" aria-hidden="true">
              {state === "complete" ? <Check className="size-4" /> : index + 1}
            </span>
            <div className="min-w-0 pb-1">
              <p
                className={cn(
                  "text-sm font-bold leading-5",
                  state === "upcoming"
                    ? "text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {step}
              </p>
              {descriptions?.[step] ? (
                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {descriptions[step]}
                </p>
              ) : null}
              {timestamp ? (
                <time className="mt-1 block text-xs font-semibold text-muted-foreground">
                  {timestamp}
                </time>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
