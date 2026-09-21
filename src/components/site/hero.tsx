import { GoldDefs } from "@/components/fracture/gold-defs";
import { PortraitCard } from "@/components/site/portrait-card";
import { home } from "@/content/home";
import { fracture, join } from "@/lib/crack";

// Foreground seams (kintsugi): thin angular cracks. Where two meet, the gap between them fills
// with gold. Coordinates are in the 1440x640 viewBox, which is anchored to the bottom edge.
const SEAMS_DESKTOP = [
  fracture([[1372, 0], [1346, 90], [1396, 190], [1362, 290], [1418, 380], [1440, 410]], { seed: 3, width: 3, jitter: 10, branches: 1 }),
  // horizon seam, in three parts so the joints can sit between them
  fracture([[-20, 626], [120, 630], [240, 620], [340, 628]], { seed: 21, width: 3, jitter: 5, swells: 1 }),
  fracture([[340, 628], [470, 620], [570, 632], [690, 622], [770, 626]], { seed: 22, width: 3, jitter: 5, swells: 2 }),
  join([[770, 626], [790, 565], [850, 505], [930, 470], [1010, 528]], [[770, 626], [900, 618], [1000, 628], [1100, 620], [1215, 626]], { seed: 8, reach: 125, width: 3, jitter: 8 }),
  join([[1215, 626], [1232, 600], [1290, 566], [1360, 510], [1440, 480]], [[1215, 626], [1310, 632], [1440, 626]], { seed: 12, reach: 85, width: 3, jitter: 7 }),
  join([[340, 628], [300, 572], [250, 540], [160, 508], [60, 470], [-10, 455]], [[340, 628], [240, 620], [120, 630], [-20, 624]], { seed: 5, reach: 100, width: 3, jitter: 7 }),
];

const SEAMS_MOBILE = [
  fracture([[400, 0], [372, 120], [404, 240], [378, 330]], { seed: 14, width: 3, jitter: 9, branches: 1 }),
  fracture([[-20, 694], [30, 698], [86, 690]], { seed: 16, width: 3, jitter: 4, swells: 1 }),
  join([[86, 690], [60, 640], [30, 560], [-10, 500]], [[86, 690], [200, 684], [300, 694], [410, 688]], { seed: 15, reach: 100, width: 3, jitter: 7 }),
];

function Seams({ paths, id, className, viewBox }: { paths: string[]; id: string; className: string; viewBox: string }) {
  return (
    <svg aria-hidden className={className} viewBox={viewBox} preserveAspectRatio="xMidYMax slice">
      <GoldDefs id={id} />
      <g fill={`url(#${id})`} filter={`url(#${id}-metal)`}>
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
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
            {home.hero.name}
          </h1>
          <p className="mt-4 font-serif text-[clamp(18px,4.6vw,22px)] leading-snug text-ivory/90">
            {home.hero.subtitle}
          </p>
          <p className="mt-8 max-w-[30rem] font-serif text-[clamp(22px,5vw,30px)] leading-snug text-ivory italic">
            &ldquo;{home.hero.quote}&rdquo;
          </p>
          <a
            href={home.hero.cta.href}
            className="nav-link mt-10 inline-block border border-gold-600 px-5 py-3 text-ivory transition-colors hover:bg-gold-600/10 hover:text-gold-100"
          >
            [{home.hero.cta.label}]
          </a>
        </div>
        <div className="md:col-span-5 md:-mt-6 lg:-mr-4">
          <PortraitCard src="/images/portraits/hero.webp" alt="Portrait of Samuel Ehret" seed={3} className="mx-auto" />
        </div>
      </div>
    </section>
  );
}
