import { KnowledgeGraph } from "@/components/fracture/knowledge-graph";
import { fracture } from "@/lib/crack";

// Foreground seams: kept off the graph's centre label, running along its rim and into the strip below.
const SEAMS_DESKTOP = [
  fracture([[1372, 0], [1346, 90], [1396, 190], [1362, 290], [1418, 380], [1440, 410]], { seed: 3, width: 5.0, jitter: 9, branches: 3 }),
  fracture([[1010, 530], [930, 470], [850, 505], [790, 565], [770, 640]], { seed: 8, width: 4.5, jitter: 8, branches: 2 }),
  fracture([[1440, 480], [1360, 510], [1290, 565], [1230, 605], [1215, 640]], { seed: 12, width: 4.0, jitter: 7, branches: 2 }),
  fracture([[0, 400], [80, 470], [170, 505], [260, 565], [340, 640]], { seed: 5, width: 4.5, jitter: 8, branches: 3 }),
  // the tear where the hero surface meets the strip
  fracture([[-20, 634], [360, 624], [760, 638], [1100, 626], [1460, 636]], { seed: 21, width: 4.0, jitter: 4, step: 18, branches: 4 }),
];

const SEAMS_MOBILE = [
  fracture([[400, 0], [372, 120], [404, 240], [378, 330]], { seed: 14, width: 4.5, jitter: 8, branches: 2 }),
  fracture([[-10, 430], [40, 520], [30, 610], [86, 700]], { seed: 15, width: 4.0, jitter: 7, branches: 2 }),
  fracture([[-20, 698], [120, 690], [260, 702], [410, 694]], { seed: 16, width: 4.0, jitter: 4, step: 16, branches: 3 }),
];

function Seams({ paths, id, className, viewBox }: { paths: string[]; id: string; className: string; viewBox: string }) {
  return (
    <svg aria-hidden className={className} viewBox={viewBox} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--seam-hi)" />
          <stop offset="1" stopColor="var(--seam-lo)" />
        </linearGradient>
      </defs>
      <g className="fracture-fill" fill={`url(#${id})`}>
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex-1 overflow-hidden">
      <Seams
        paths={SEAMS_DESKTOP}
        id="hero-gold"
        viewBox="0 0 1440 640"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      />
      <Seams
        paths={SEAMS_MOBILE}
        id="hero-gold-m"
        viewBox="0 0 390 700"
        className="pointer-events-none absolute inset-0 h-full w-full md:hidden"
      />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-14 md:min-h-[560px] md:grid-cols-12 md:px-10 md:py-10 lg:px-16">
        <div className="md:col-span-7">
          <h1 className="hero-title text-[clamp(44px,12vw,72px)] text-ivory uppercase md:text-[clamp(44px,6.4vw,92px)]">
            Samuel Ehret
          </h1>
          <p className="mt-4 font-serif text-[clamp(18px,4.6vw,22px)] leading-snug text-ivory/90">
            Technology &amp; Product Professional / Thinker / Investor / Lifelong Learner
          </p>
          <p className="body mt-8 max-w-[34rem] text-ash">
            Building, thinking, and investing at the intersections of human systems, capital, and
            technology. An attempt to weave fragmented insights into cohesive forms.
          </p>
        </div>
        <div className="md:col-span-5 md:-mt-10 lg:-mr-8">
          <KnowledgeGraph className="mx-auto h-auto w-full max-w-[520px]" />
        </div>
      </div>
    </section>
  );
}
