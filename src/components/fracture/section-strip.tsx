import Link from "next/link";

import { GoldDefs } from "@/components/fracture/gold-defs";
import { DESTINATIONS } from "@/content/destinations";
import { fracture } from "@/lib/crack";

// Vertical seam between shards (desktop) and horizontal seam between rows (mobile).
const V_CRACKS = DESTINATIONS.slice(0, -1).map((_, i) =>
  fracture([[24, 0], [17, 60], [30, 112], [19, 162], [24, 210]], { seed: 40 + i, width: 2.6, jitter: 4, swells: 1 }),
);
const H_CRACKS = DESTINATIONS.slice(0, -1).map((_, i) =>
  fracture([[-10, 24], [110, 18], [230, 30], [340, 20], [410, 26]], { seed: 50 + i, width: 2.4, jitter: 4, swells: 1 }),
);
const CORNER_L = fracture([[0, 40], [22, 26], [40, 32], [72, 8]], { seed: 61, width: 2.4, jitter: 3, swells: 1 });
const CORNER_R = fracture([[100, 36], [78, 24], [58, 30], [30, 6]], { seed: 62, width: 2.4, jitter: 3, swells: 1 });

const Gold = GoldDefs;

/**
 * Gateway strip: one continuous surface split into flush shards by gold cracks.
 * Desktop: five columns with vertical cracks. Mobile: stacked rows with horizontal cracks.
 */
export function SectionStrip() {
  return (
    <nav aria-label="Sections" className="relative bg-black/25">
      <ul className="relative grid grid-cols-1 md:grid-cols-5">
        {DESTINATIONS.map((d, i) => (
          <li key={d.index} className="relative min-w-0">
            <Link
              href={d.href}
              className="group relative flex h-full min-h-[132px] flex-col px-6 py-5 transition-colors hover:bg-white/[0.02] md:min-h-[200px]"
            >
              <span className="label absolute top-4 right-4 opacity-55">{d.index}</span>
              <span className="block font-serif text-[44px] leading-none text-ash opacity-55">{d.index}</span>
              <h3 className="mt-2 font-serif text-[22px] leading-[1.15] text-ivory uppercase transition-colors group-hover:text-gold-100">
                {d.title[0]}
                <br />
                {d.title[1]}
              </h3>
              <span className="label mt-auto hidden pt-4 opacity-60 md:block">
                interface
                <br />
                data #{d.index}
              </span>
            </Link>

            {i < DESTINATIONS.length - 1 && (
              <>
                <svg
                  aria-hidden
                  viewBox="0 0 48 210"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute top-0 right-0 hidden h-full w-12 translate-x-1/2 md:block"
                >
                  <Gold id={`ss-v-${i}`} />
                  <path fill={`url(#ss-v-${i})`} filter={`url(#ss-v-${i}-metal)`} d={V_CRACKS[i]} />
                </svg>
                <svg
                  aria-hidden
                  viewBox="0 0 400 48"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full translate-y-1/2 md:hidden"
                >
                  <Gold id={`ss-h-${i}`} />
                  <path fill={`url(#ss-h-${i})`} filter={`url(#ss-h-${i}-metal)`} d={H_CRACKS[i]} />
                </svg>
              </>
            )}
          </li>
        ))}
      </ul>

      <svg aria-hidden viewBox="0 0 100 48" className="pointer-events-none absolute bottom-0 left-0 hidden h-12 w-24 md:block">
        <Gold id="ss-cl" />
        <path fill="url(#ss-cl)" filter="url(#ss-cl-metal)" d={CORNER_L} />
      </svg>
      <svg aria-hidden viewBox="0 0 100 48" className="pointer-events-none absolute right-0 bottom-0 hidden h-12 w-24 md:block">
        <Gold id="ss-cr" />
        <path fill="url(#ss-cr)" filter="url(#ss-cr-metal)" d={CORNER_R} />
      </svg>
    </nav>
  );
}
