import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";

import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vun | Finding help for YOU",
    template: "%s | Vun",
  },
  description:
    "Describe a non-emergency household problem once. A person reviews it and coordinates a local service introduction.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${sourceSans.variable} font-sans`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
