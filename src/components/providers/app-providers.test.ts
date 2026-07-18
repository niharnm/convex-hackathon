import { describe, expect, it } from "vitest";

import { clerkAppearance } from "@/components/providers/app-providers";

describe("Clerk appearance", () => {
  it("converts Vun's HSL channel tokens into complete Clerk colors", () => {
    expect(clerkAppearance.variables).toMatchObject({
      colorBackground: "hsl(var(--card))",
      colorForeground: "hsl(var(--card-foreground))",
      colorModalBackdrop: "hsl(var(--foreground) / 0.58)",
      colorPrimary: "hsl(var(--primary))",
      colorPrimaryForeground: "hsl(var(--primary-foreground))",
    });
  });
});
