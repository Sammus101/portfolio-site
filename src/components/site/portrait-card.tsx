import { GoldDefs } from "@/components/fracture/gold-defs";
import { fracture } from "@/lib/crack";

// Cracks run across the portrait in a 400x500 box. Each variant gets its own seed so the three
// photos don't share one pattern.
function cracks(seed: number) {
  return [
    fracture([[290, -10], [262, 90], [300, 170], [270, 260], [312, 350], [300, 510]], { seed, width: 2.6, jitter: 10, branches: 1 }),
    fracture([[-10, 330], [90, 350], [180, 322], [270, 346], [410, 330]], { seed: seed + 1, width: 2.6, jitter: 8, swells: 1 }),
    fracture([[150, -10], [128, 70], [160, 140], [140, 210]], { seed: seed + 2, width: 2.2, jitter: 8 }),
  ];
}

/**
 * A cut-out portrait treated in the site's style: graded monochrome, gold seams that only exist
 * on the figure (the image's own alpha masks the overlay), fading into the stone at the bottom.
 */
export function PortraitCard({ src, label, seed }: { src: string; label: string; seed: number }) {
  const id = `portrait-${seed}`;
  const mask = { maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" };
  return (
    <figure className="flex flex-col items-center">
      <div className="relative aspect-[4/5] w-full max-w-[400px]" style={mask}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="absolute inset-0 h-full w-full object-fill" />
        <svg aria-hidden viewBox="0 0 400 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <GoldDefs id={id} />
          <g fill={`url(#${id})`} filter={`url(#${id}-metal)`}>
            {cracks(seed).map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </svg>
      </div>
      <figcaption className="label mt-4">{label}</figcaption>
    </figure>
  );
}
