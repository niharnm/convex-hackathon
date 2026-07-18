"use client";

import { ArrowRight, MapPin, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { publicServiceCategories } from "@/config/public-services";
import { requestDraftStorageKey, type RequestDraft } from "@/lib/request-draft";

interface FieldErrors {
  need?: string;
  postalCode?: string;
}

export function RequestStartForm() {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState("");
  const [need, setNeed] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    const trimmedPostalCode = postalCode.trim();
    const trimmedNeed = need.trim();

    if (trimmedPostalCode.length < 3) {
      nextErrors.postalCode = "Enter a ZIP or postal code.";
    }

    if (trimmedNeed.length < 3) {
      nextErrors.need = "Tell us briefly what needs attention.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const draft: RequestDraft = {
      need: trimmedNeed,
      postalCode: trimmedPostalCode,
      version: 1,
    };

    try {
      window.sessionStorage.setItem(
        requestDraftStorageKey,
        JSON.stringify(draft),
      );
    } catch (error) {
      if (!(error instanceof DOMException)) {
        throw error;
      }
    }

    router.push("/get-started");
  }

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-[0.75fr_1.25fr]">
        <div>
          <Label className="mb-2 flex items-center gap-2" htmlFor="postal-code">
            <MapPin aria-hidden="true" className="size-4 text-brand" />
            ZIP or postal code
          </Label>
          <Input
            aria-describedby={
              errors.postalCode ? "postal-code-error" : undefined
            }
            aria-invalid={Boolean(errors.postalCode)}
            autoComplete="postal-code"
            id="postal-code"
            maxLength={10}
            onChange={(event) => setPostalCode(event.target.value)}
            placeholder="e.g. 94582"
            value={postalCode}
          />
          {errors.postalCode ? (
            <p
              className="mt-1.5 text-sm font-semibold text-destructive"
              id="postal-code-error"
            >
              {errors.postalCode}
            </p>
          ) : null}
        </div>

        <div>
          <Label
            className="mb-2 flex items-center gap-2"
            htmlFor="service-need"
          >
            <Wrench aria-hidden="true" className="size-4 text-brand" />
            What needs fixing?
          </Label>
          {publicServiceCategories.length > 0 ? (
            <NativeSelect
              aria-describedby={errors.need ? "service-need-error" : undefined}
              aria-invalid={Boolean(errors.need)}
              className="h-12 bg-white text-base"
              id="service-need"
              onChange={(event) => setNeed(event.target.value)}
              value={need}
            >
              <option value="">Choose a service</option>
              {publicServiceCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </NativeSelect>
          ) : (
            <Input
              aria-describedby={errors.need ? "service-need-error" : undefined}
              aria-invalid={Boolean(errors.need)}
              id="service-need"
              onChange={(event) => setNeed(event.target.value)}
              placeholder="Describe the household problem"
              value={need}
            />
          )}
          {errors.need ? (
            <p
              className="mt-1.5 text-sm font-semibold text-destructive"
              id="service-need-error"
            >
              {errors.need}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button className="h-12 px-6" type="submit">
          Request help <ArrowRight aria-hidden="true" />
        </Button>
        <p className="text-sm leading-5 text-muted-foreground">
          Nothing is sent until you review it. Not for emergencies.
        </p>
      </div>
    </form>
  );
}
