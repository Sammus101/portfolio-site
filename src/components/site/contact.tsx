import { buttonVariants } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-4xl px-6 py-16">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Contact
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Placeholder contact info — replace once content is ready.
      </p>
      <a
        href="mailto:placeholder@example.com"
        className={buttonVariants({ variant: "outline", className: "mt-6" })}
      >
        placeholder@example.com
      </a>
    </section>
  );
}
