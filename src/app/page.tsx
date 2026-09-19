import { SectionStrip } from "@/components/fracture/section-strip";
import { Hero } from "@/components/site/hero";
import { SiteHeader } from "@/components/site/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <SectionStrip />
      </main>
    </div>
  );
}
