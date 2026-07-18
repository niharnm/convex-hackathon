"use client";

import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  FileLock2,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  parseRequestDraft,
  requestDraftStorageKey,
  type RequestDraft,
} from "@/lib/request-draft";

type SafetyAnswer = "danger" | "safe" | null;
type IntakeStage = "safety" | "emergency" | "unavailable";

const intakeSteps = ["Safety", "Request details", "Review"] as const;

export function CustomerIntake() {
  const [answer, setAnswer] = useState<SafetyAnswer>(null);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<IntakeStage>("safety");
  const [draft, setDraft] = useState<RequestDraft | null>(null);

  const activeStep = stage === "safety" || stage === "emergency" ? 0 : 1;

  function handleSafetySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!answer) {
      setError("Choose the option that matches the situation.");
      return;
    }

    setError(null);

    if (answer === "danger") {
      setStage("emergency");
      return;
    }

    let storedDraft: RequestDraft | null = null;

    try {
      storedDraft = parseRequestDraft(
        window.sessionStorage.getItem(requestDraftStorageKey),
      );
    } catch (storageError) {
      if (!(storageError instanceof DOMException)) {
        throw storageError;
      }
    }

    setDraft(storedDraft);
    setStage("unavailable");
  }

  function resetSafety() {
    setAnswer(null);
    setError(null);
    setStage("safety");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-12">
      <aside aria-label="Request progress">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Request progress
        </p>
        <ol className="mt-4 grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-0">
          {intakeSteps.map((step, index) => {
            const complete = index < activeStep;
            const active = index === activeStep;

            return (
              <li
                aria-current={active ? "step" : undefined}
                className="relative flex min-w-0 flex-col gap-2 border-t-2 border-border pt-3 lg:flex-row lg:items-center lg:border-l-2 lg:border-t-0 lg:py-4 lg:pl-4"
                key={step}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                    complete
                      ? "bg-success text-white"
                      : active
                        ? "bg-brand text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`truncate text-xs font-bold sm:text-sm ${
                    active || complete
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ol>
      </aside>

      <section aria-live="polite" className="min-w-0">
        {stage === "safety" ? (
          <form noValidate onSubmit={handleSafetySubmit}>
            <p className="eyebrow">Safety check</p>
            <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              Is anyone in immediate danger?
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Answer this before sharing contact details. Vun cannot handle
              emergencies or situations that need an immediate emergency
              response.
            </p>

            <fieldset
              className="mt-7 grid gap-3"
              aria-describedby={error ? "safety-error" : undefined}
            >
              <legend className="sr-only">Immediate danger</legend>
              <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-white p-4 shadow-control transition-colors duration-200 hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-[#FFF4F1]">
                <input
                  checked={answer === "danger"}
                  className="mt-1 size-4 accent-[#C93C1F]"
                  name="safety"
                  onChange={() => setAnswer("danger")}
                  type="radio"
                  value="danger"
                />
                <span>
                  <span className="block font-display font-extrabold text-ink">
                    Yes, there is immediate danger
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    Someone may be hurt, unsafe, or needs emergency help now.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-white p-4 shadow-control transition-colors duration-200 hover:border-brand/50 has-[:checked]:border-brand has-[:checked]:bg-[#FFF4F1]">
                <input
                  checked={answer === "safe"}
                  className="mt-1 size-4 accent-[#C93C1F]"
                  name="safety"
                  onChange={() => setAnswer("safe")}
                  type="radio"
                  value="safe"
                />
                <span>
                  <span className="block font-display font-extrabold text-ink">
                    No immediate danger
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    This is a non-emergency household service request.
                  </span>
                </span>
              </label>
            </fieldset>

            {error ? (
              <p
                className="mt-3 text-sm font-bold text-destructive"
                id="safety-error"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="sticky bottom-4 mt-7 rounded-xl border border-border bg-white/95 p-3 shadow-lifted backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
              <Button
                className="w-full justify-between sm:w-auto"
                type="submit"
              >
                Continue <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </form>
        ) : null}

        {stage === "emergency" ? (
          <div role="alert">
            <span className="grid size-12 place-items-center rounded-lg bg-red-100 text-destructive">
              <ShieldAlert aria-hidden="true" className="size-6" />
            </span>
            <p className="eyebrow mt-6 text-destructive">
              Emergency request stopped
            </p>
            <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              Contact emergency services now
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Vun cannot review or dispatch this request. Call 911 or the
              appropriate emergency service for your location. No personal
              details were requested or submitted here.
            </p>
            <Button className="mt-7" onClick={resetSafety} variant="outline">
              <ArrowLeft aria-hidden="true" /> Change my answer
            </Button>
          </div>
        ) : null}

        {stage === "unavailable" ? (
          <div>
            <span className="grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground">
              <CircleAlert aria-hidden="true" className="size-6" />
            </span>
            <p className="eyebrow mt-6">Request details</p>
            <h1 className="display-type mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              Online requests are not open yet
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Vun has not published service categories or connected request
              submission in this workspace. No provider was contacted and no
              request was created.
            </p>

            {draft ? (
              <div className="mt-7 rounded-xl border border-border bg-white p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <FileLock2
                    aria-hidden="true"
                    className="size-5 text-success"
                  />
                  Draft kept only in this browser tab
                </div>
                <dl className="mt-4 grid gap-4 sm:grid-cols-[0.65fr_1.35fr]">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Postal code
                    </dt>
                    <dd className="mt-1 font-semibold text-foreground">
                      {draft.postalCode}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Household issue
                    </dt>
                    <dd className="mt-1 font-semibold text-foreground">
                      {draft.need}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Return home</Link>
              </Button>
              <Button onClick={resetSafety} variant="outline">
                <ArrowLeft aria-hidden="true" /> Review safety answer
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
