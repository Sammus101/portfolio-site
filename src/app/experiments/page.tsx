import { SiteHeader } from "@/components/site/header";

export default function ExperimentsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-16">
        <h1 className="section-header text-[clamp(30px,7vw,44px)] text-ivory uppercase">Experiments</h1>
        <p className="body mt-3 max-w-xl text-ash">Coming soon.</p>
      </main>
    </div>
  );
}
