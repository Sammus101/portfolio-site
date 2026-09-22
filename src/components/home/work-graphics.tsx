import type { ComponentType } from "react";

import { GoldDefs } from "@/components/fracture/gold-defs";

type GraphicProps = { className?: string };

const W = 400;
const H = 220;

function Frame({ className, children }: GraphicProps & { children: React.ReactNode }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={className}>
      {children}
    </svg>
  );
}

// Deterministic PRNG so server and client render identical trees (same trick as lib/crack.ts).
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// --- Second Brain: a radial dendrogram in the spirit of a phylogenetic "tree of life" — trunks
// from a shared root that fork again and again, each fork bridged by a short arc, thinning out
// into finer twigs toward the rim. A handful of lineages are picked out in gold.
const SB_CENTER = { x: 200, y: 112 };
const SB_R_MIN = 12;
const SB_R_MAX = 98;
const SB_MAX_DEPTH = 3;

function sbPolar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return [SB_CENTER.x + Math.cos(a) * r, SB_CENTER.y + Math.sin(a) * r] as const;
}

function growBranch(
  angle: number,
  rFrom: number,
  depth: number,
  hot: boolean,
  rand: () => number,
  out: { hot: string[]; dim: string[] },
) {
  const remaining = SB_R_MAX - rFrom;
  const stopChance = 0.1 + depth * 0.2;
  if (depth >= SB_MAX_DEPTH || remaining < 12 || rand() < stopChance) {
    const rEnd = rFrom + Math.max(8, remaining * (0.35 + rand() * 0.55));
    const [x1, y1] = sbPolar(angle, rFrom);
    const [x2, y2] = sbPolar(angle, rEnd);
    (hot ? out.hot : out.dim).push(`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`);
    return;
  }

  const rSplit = rFrom + remaining * (0.3 + rand() * 0.28);
  const [x1, y1] = sbPolar(angle, rFrom);
  const [x2, y2] = sbPolar(angle, rSplit);
  (hot ? out.hot : out.dim).push(`M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`);

  // The bridge: a short arc at the split radius joining the two children's angles.
  const spread = (26 + rand() * 22) / (depth * 0.6 + 1);
  const a1 = angle - spread / 2 - rand() * 3;
  const a2 = angle + spread / 2 + rand() * 3;
  const [ax1, ay1] = sbPolar(a1, rSplit);
  const [ax2, ay2] = sbPolar(a2, rSplit);
  (hot ? out.hot : out.dim).push(
    `M${ax1.toFixed(1)},${ay1.toFixed(1)} A${rSplit.toFixed(1)},${rSplit.toFixed(1)} 0 0 1 ${ax2.toFixed(1)},${ay2.toFixed(1)}`,
  );

  growBranch(a1, rSplit, depth + 1, hot, rand, out);
  growBranch(a2, rSplit, depth + 1, hot && rand() < 0.55, rand, out);
}

function buildSecondBrainTree() {
  const rand = rng(11);
  const roots = 9;
  const out = { hot: [] as string[], dim: [] as string[] };
  for (let i = 0; i < roots; i++) {
    const angle = (360 / roots) * i + (rand() - 0.5) * 10;
    growBranch(angle, SB_R_MIN, 0, i % 2 === 0, rand, out);
  }
  return out;
}

const SB_TREE = buildSecondBrainTree();

export function SecondBrainGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <GoldDefs id="work-sb" />
      <circle cx={SB_CENTER.x} cy={SB_CENTER.y} r={SB_R_MAX + 5} fill="none" stroke="var(--border-slate)" strokeDasharray="2 5" />
      <path
        d={SB_TREE.dim.join(" ")}
        fill="none"
        stroke="var(--text-secondary)"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.5}
      />
      <path d={SB_TREE.hot.join(" ")} fill="none" stroke="url(#work-sb)" className="fracture-stroke" />
      <circle cx={SB_CENTER.x} cy={SB_CENTER.y} r={9} fill="none" stroke="var(--gold-600)" opacity={0.4} />
      <circle cx={SB_CENTER.x} cy={SB_CENTER.y} r={5} fill="var(--gold-600)" />
    </Frame>
  );
}

// --- Investing Guide: a thin, jagged line for raw market volatility, with a thicker gold curve
// riding through it as the smoothed, compounding trend.
const CHART_GRID_Y = [190, 154, 118, 82, 46];
const GROWTH_LINE = "M36,182 C160,176 264,146 372,38";
const GROWTH_AREA = `${GROWTH_LINE} L372,190 L36,190 Z`;

const VOL_STEPS = 34;

function buildVolatileLine() {
  const rand = rng(77);
  let smoothed = 0;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= VOL_STEPS; i++) {
    const t = i / VOL_STEPS;
    const x = 36 + t * (372 - 36);
    const trend = 182 - (182 - 38) * Math.pow(t, 2.15);
    const amp = 14 + 46 * t;
    const raw = (rand() - 0.5) * 2 * amp;
    smoothed = smoothed * 0.22 + raw * 0.78;
    const y = Math.min(198, Math.max(20, trend + smoothed));
    pts.push([x, y]);
  }
  return pts;
}

const VOLATILE_LINE = buildVolatileLine();
const VOLATILE_PATH = `M${VOLATILE_LINE.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")}`;

// Regular buy-ins along the volatile line — dollar-cost averaging, same amount at fixed intervals
// regardless of where the market happens to be.
const DCA_COUNT = 9;
const DCA_POINTS = Array.from({ length: DCA_COUNT }, (_, i) => {
  const idx = Math.round((i / (DCA_COUNT - 1)) * VOL_STEPS);
  return VOLATILE_LINE[idx];
});

export function InvestingGraphic({ className }: GraphicProps) {
  return (
    <Frame className={className}>
      <defs>
        <linearGradient id="work-inv-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--seam-lo)" />
          <stop offset="0.5" stopColor="var(--gold-600)" />
          <stop offset="1" stopColor="var(--gold-100)" />
        </linearGradient>
        <linearGradient id="work-inv-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--gold-600)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--gold-600)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g stroke="var(--border-slate)" strokeDasharray="2 5">
        {CHART_GRID_Y.map((y) => (
          <line key={y} x1={36} y1={y} x2={372} y2={y} />
        ))}
      </g>
      <line x1={36} y1={190} x2={372} y2={190} stroke="var(--border-slate)" />

      <path d={GROWTH_AREA} fill="url(#work-inv-area)" stroke="none" />
      <path
        d={VOLATILE_PATH}
        fill="none"
        stroke="var(--text-secondary)"
        strokeWidth={1.2}
        strokeLinejoin="round"
        opacity={0.65}
      />
      <g fill="var(--text-secondary)">
        {DCA_POINTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.2} />
        ))}
      </g>
      <path
        d={GROWTH_LINE}
        fill="none"
        stroke="url(#work-inv-line)"
        strokeWidth={2.6}
        strokeLinecap="round"
        className="fracture-stroke"
      />
      <circle cx={372} cy={38} r={4} fill="var(--gold-600)" />
    </Frame>
  );
}

// --- Master's Thesis: an outline of Switzerland, traced from the reference in
// design/inspiration/swissmap.png (more to come — flows, markers, whatever comes next).
const SWITZERLAND = [
  [215.8, 40.6], [232.5, 50.8], [243.6, 50.4], [264.1, 63.1], [266.5, 69.3], [257.9, 82.0],
  [259.2, 89.7], [274.3, 92.6], [277.6, 100.4], [288.2, 104.9], [297.6, 94.2], [301.3, 94.6],
  [304.6, 102.4], [300.5, 116.8], [305.0, 122.1], [298.9, 126.6], [287.8, 121.7], [285.4, 130.3],
  [290.3, 133.1], [290.3, 147.5], [284.5, 147.9], [280.0, 139.3], [263.2, 143.8], [256.7, 138.0],
  [256.3, 131.1], [251.4, 129.4], [250.1, 143.8], [238.3, 161.4], [242.0, 170.0], [238.3, 179.4],
  [232.1, 176.1], [231.7, 170.4], [226.0, 164.6], [227.2, 159.7], [218.6, 156.9], [210.4, 147.9],
  [209.2, 134.4], [196.1, 146.6], [198.6, 152.4], [192.0, 164.6], [186.3, 165.5], [183.0, 170.4],
  [167.5, 166.3], [162.5, 171.2], [146.6, 171.2], [132.7, 154.0], [134.3, 136.4], [130.2, 133.1],
  [112.6, 138.0], [111.8, 146.2], [106.1, 152.4], [96.6, 152.8], [95.0, 147.9], [101.5, 145.0],
  [103.2, 138.9], [99.9, 133.9], [102.0, 122.1], [117.9, 111.4], [118.7, 99.2], [128.6, 93.0],
  [140.8, 75.4], [146.6, 72.5], [138.8, 70.5], [144.5, 60.3], [161.3, 66.0], [163.8, 60.3],
  [174.0, 53.7], [176.1, 58.2], [183.8, 55.4], [189.2, 57.4], [197.7, 52.5], [210.0, 56.2],
  [212.5, 52.9], [207.6, 47.2],
] as const;

export function ThesisGraphic({ className }: GraphicProps) {
  const d = `M${SWITZERLAND.map(([x, y]) => `${x},${y}`).join(" L")} Z`;
  return (
    <Frame className={className}>
      <path d={d} fill="none" stroke="var(--gold-600)" strokeLinejoin="round" className="fracture-stroke" />
    </Frame>
  );
}

export const WORK_GRAPHICS: Record<string, ComponentType<GraphicProps>> = {
  "second-brain": SecondBrainGraphic,
  "masters-thesis": ThesisGraphic,
  "investing-guide": InvestingGraphic,
};
