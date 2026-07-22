import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";

// TEMPORARY style-guide / review page. Replaced in a later phase.

const swatches: { name: string; token: string; hex: string; dark?: boolean }[] =
  [
    { name: "backstage", token: "--color-backstage", hex: "#0E0D0C" },
    { name: "iron", token: "--color-iron", hex: "#1C1B19" },
    { name: "bone", token: "--color-bone", hex: "#F5F1E8", dark: true },
    { name: "dim", token: "--color-dim", hex: "#8B8579" },
    {
      name: "houselights",
      token: "--color-houselights",
      hex: "#EDE8DD",
      dark: true,
    },
    { name: "carbon", token: "--color-carbon", hex: "#17150F" },
  ];

function Swatch({
  name,
  hex,
  dark,
}: {
  name: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div className="frame">
      <div className="h-24" style={{ background: hex }} />
      <div className="flex items-center justify-between px-3 py-2">
        <span className="mono-label" style={{ color: "var(--color-bone)" }}>
          {name}
        </span>
        <span className="mono-label">{hex}</span>
      </div>
      {dark && <span className="sr-only">light value</span>}
    </div>
  );
}

function DemoScreen({ label }: { label: string }) {
  return (
    <div className="frame screenlight aspect-video flex items-end p-5">
      <MonoLabel>{label}</MonoLabel>
    </div>
  );
}

// TEMPORARY test rig — verifies the header's active link + underline colour
// re-light per chapter tint while scrolling. Replaced from Prompt 3 onward.
const TEST_SECTIONS = [
  { id: "work", label: "Work", tint: "#FF7A29" },
  { id: "capabilities", label: "Capabilities", tint: "#4C7DFF" },
  { id: "process", label: "Process", tint: "#1E9E6A" },
  { id: "about", label: "About", tint: "#C99A6B" },
];

export default function StyleGuidePage() {
  return (
    <main>
      {/* TEMPORARY — active-section / tint verification rig */}
      {TEST_SECTIONS.map((s) => (
        <section
          key={s.id}
          id={s.id}
          data-section={s.id}
          data-tint={s.tint}
          style={{ "--tint": s.tint } as React.CSSProperties}
          className="flex min-h-[90vh] items-center justify-center border-b border-[var(--line-dark)]"
        >
          <h2 className="display text-[9vw] text-bone">{s.label}</h2>
        </section>
      ))}

      {/* Colour swatches */}
      <Section>
        <MonoLabel index={1}>Palette</MonoLabel>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </Section>

      {/* Display type specimen */}
      <Section>
        <MonoLabel index={2}>Display voice — Archivo expanded</MonoLabel>
        <h1 className="display mt-6 text-[9vw] text-bone">Abdul Rehman</h1>
        <p className="display mt-2 text-[3vw] text-dim">Full-Stack Developer</p>
      </Section>

      {/* Mono labels */}
      <Section>
        <MonoLabel index={3}>Mono labels</MonoLabel>
        <div className="mt-6 flex flex-col gap-3">
          <MonoLabel>Selected Work</MonoLabel>
          <MonoLabel index={4}>Case Study</MonoLabel>
          <MonoLabel>React · Next.js · TypeScript</MonoLabel>
        </div>
      </Section>

      {/* Buttons */}
      <Section>
        <MonoLabel index={5}>Buttons</MonoLabel>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="#" variant="primary">
            View the work
          </Button>
          <Button href="#" variant="ghost">
            Live site
          </Button>
        </div>
      </Section>

      {/* Screenlight — default (monochrome) tint */}
      <Section>
        <MonoLabel index={6}>Screenlight — default tint (monochrome)</MonoLabel>
        <div className="mt-6 max-w-2xl">
          <DemoScreen label="Default · tint = bone" />
        </div>
      </Section>

      {/* Screenlight — chapter tint override */}
      <Section tint="#FF7A29">
        <MonoLabel index={7}>Screenlight — chapter tint #FF7A29</MonoLabel>
        <p className="mt-4 max-w-xl text-sm text-dim">
          Inside this Section the tint is overridden. Selection colour, the
          focus ring, button hover states and the screenlight glow below all
          shift to the client colour — and nothing outside this Section does.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="#" variant="primary">
            Tinted primary
          </Button>
          <Button href="#" variant="ghost">
            Tinted ghost
          </Button>
        </div>
        <div className="mt-6 max-w-2xl">
          <DemoScreen label="Tinted · tint = #FF7A29" />
        </div>
      </Section>

      {/* Houselights — the one light section */}
      <Section light>
        <MonoLabel index={8}>Houselights (About) surface</MonoLabel>
        <p className="mt-4 max-w-xl text-carbon">
          The single light room: houselights background, carbon text. Everything
          else on the site lives in the dark.
        </p>
      </Section>
    </main>
  );
}
