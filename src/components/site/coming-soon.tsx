import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-24">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          This section is still under construction.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
