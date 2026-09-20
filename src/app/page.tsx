import { Explore, Fragments, Mind, Now, SelectedWork } from "@/components/home/sections";
import { Hero } from "@/components/site/hero";
import { SiteHeader } from "@/components/site/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Fragments />
        <Mind />
        <SelectedWork />
        <Now />
        <Explore />
      </main>
    </div>
  );
}
