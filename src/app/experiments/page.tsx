import { PortraitCard } from "@/components/site/portrait-card";
import { SiteHeader } from "@/components/site/header";

// Temporary lab page: three portrait candidates for the hero. Pick one, then this page goes back
// to being a placeholder.
const CANDIDATES = [
  { src: "/images/portraits/a.webp", label: "A — Straight on", seed: 3 },
  { src: "/images/portraits/b.webp", label: "B — Profile (Gemini-cleaned)", seed: 17 },
  { src: "/images/portraits/c.webp", label: "C — Profile (original photo)", seed: 29 },
];

export default function ExperimentsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-16">
        <h1 className="section-header text-[clamp(30px,7vw,44px)] text-ivory uppercase">Portrait candidates</h1>
        <p className="body mt-3 max-w-xl text-ash">Same treatment on all three. Pick the one for the hero.</p>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {CANDIDATES.map((c) => (
            <PortraitCard key={c.src} {...c} />
          ))}
        </div>
      </main>
    </div>
  );
}
