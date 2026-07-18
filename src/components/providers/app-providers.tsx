"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ComponentProps, ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexClient = convexUrl ? new ConvexReactClient(convexUrl) : null;

// Clerk expects complete CSS colors; Vun's Tailwind v3 tokens store HSL channels.
export const clerkAppearance = {
  theme: shadcn,
  variables: {
    colorBackground: "hsl(var(--card))",
    colorBorder: "hsl(var(--border))",
    colorDanger: "hsl(var(--destructive))",
    colorForeground: "hsl(var(--card-foreground))",
    colorInput: "hsl(var(--input))",
    colorInputForeground: "hsl(var(--card-foreground))",
    colorModalBackdrop: "hsl(var(--foreground) / 0.58)",
    colorMuted: "hsl(var(--muted))",
    colorMutedForeground: "hsl(var(--muted-foreground))",
    colorNeutral: "hsl(var(--foreground))",
    colorPrimary: "hsl(var(--primary))",
    colorPrimaryForeground: "hsl(var(--primary-foreground))",
    colorRing: "hsl(var(--ring) / 0.35)",
    fontFamily: "var(--font-source-sans), Arial, sans-serif",
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
} satisfies NonNullable<ComponentProps<typeof ClerkProvider>["appearance"]>;

export function AppProviders({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    return convexClient ? (
      <ConvexProvider client={convexClient}>{children}</ConvexProvider>
    ) : (
      children
    );
  }

  return (
    <ClerkProvider
      appearance={clerkAppearance}
      publishableKey={clerkPublishableKey}
    >
      {convexClient ? (
        <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
      ) : (
        children
      )}
    </ClerkProvider>
  );
}
