import type { Metadata } from "next";
import { Archivo, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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
      <body className="min-h-dvh bg-backstage text-bone antialiased">
        {children}
      </body>
    </html>
  );
}
