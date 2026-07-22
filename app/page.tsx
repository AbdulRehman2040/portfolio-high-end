import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Abdul Rehman — Full-Stack Developer",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Credibility />
      <Work />
    </main>
  );
}
