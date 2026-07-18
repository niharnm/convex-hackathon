import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Number — Hackathon Pitch",
  description: "One phone number that turns a household problem into a trusted local service connection.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
