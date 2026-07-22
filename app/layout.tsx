import type { Metadata } from "next";
import { Archivo, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// One family, two voices. The `wdth` axis lets the display voice stretch
// to an expanded 125% while the body voice stays at normal width.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "Portfolio of Abdul Rehman, Full-Stack Developer building with React, Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${archivo.variable} ${fragmentMono.variable}`}
    >
      <body id="top" className="min-h-dvh bg-backstage text-bone antialiased">
        <a
          href="#work"
          className="sr-only rounded-[var(--radius-sm)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-iron focus:px-4 focus:py-2 focus:text-bone"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
