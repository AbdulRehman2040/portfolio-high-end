import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "Abdul Rehman — Full-Stack Developer",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Credibility />
      <Work />
      <Capabilities />
      <Process />
    </main>
  );
}
