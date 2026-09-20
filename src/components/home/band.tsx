import { GoldDefs } from "@/components/fracture/gold-defs";
import { fracture } from "@/lib/crack";

// One torn gold seam per band edge, each with its own seed so no two look alike.
const TEARS = [11, 27, 43, 59, 71].map((seed) =>
  fracture(
    [[-20, 24 + (seed % 5)], [260, 18], [520, 30], [800, 20], [1080, 29], [1460, 22]],
    { seed, width: 3, jitter: 5, swells: 2 },
  ),
);

/** Full-width homepage band. `tear` (0-4) draws a torn gold seam along its bottom edge. */
export function Band({
  id,
  title,
  tear,
  className = "",
  children,
}: {
  id?: string;
  title: string;
  tear?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 text-center md:py-24 lg:px-16">
        <h2 className="section-header text-[clamp(30px,7vw,44px)] text-ivory uppercase">{title}</h2>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
      {tear !== undefined && (
        <svg
          aria-hidden
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 w-full translate-y-1/2 md:h-12"
        >
          <GoldDefs id={`tear-${tear}`} />
          <path d={TEARS[tear]} fill={`url(#tear-${tear})`} filter={`url(#tear-${tear}-metal)`} />
        </svg>
      )}
    </section>
  );
}
