type Hub = { label: string; angle: number; radius: number; hot?: boolean };

const HUBS: Hub[] = [
  { label: "Ethics", angle: -62, radius: 150, hot: true },
  { label: "Product", angle: -12, radius: 158 },
  { label: "AI", angle: 38, radius: 150, hot: true },
  { label: "Capital", angle: 86, radius: 156 },
  { label: "Systems", angle: 132, radius: 148, hot: true },
  { label: "Craft", angle: 176, radius: 158 },
  { label: "Theory", angle: 222, radius: 150 },
  { label: "Education", angle: 268, radius: 156 },
];

const SIZE = 600;
const C = SIZE / 2;
const OUTER = 250;
const FAN = 15;

// Small seeded PRNG so the graph is identical on every render.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const n = (v: number) => Math.round(v * 100) / 100;
const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [n(C + Math.cos(a) * r), n(C + Math.sin(a) * r)] as const;
};

export function KnowledgeGraph({ className }: { className?: string }) {
  const rand = rng(42);

  const ringDots = Array.from({ length: 150 }, (_, i) => polar((i / 150) * 360, OUTER + 4));

  const fans = HUBS.map((hub) => {
    const [hx, hy] = polar(hub.angle, hub.radius);
    return Array.from({ length: FAN }, (_, i) => {
      const spread = 46;
      const a = hub.angle - spread / 2 + (i / (FAN - 1)) * spread + (rand() - 0.5) * 3;
      const [ex, ey] = polar(a, OUTER);
      const [cx, cy] = polar(hub.angle + (a - hub.angle) * 0.35, hub.radius + (OUTER - hub.radius) * 0.55);
      return { hx, hy, ex, ey, cx, cy };
    });
  });

  return (
    <svg
      role="img"
      aria-label="Knowledge graph: a second brain linking AI, ethics, product, capital and other territories"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
    >
      <defs>
        <linearGradient id="kg-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={SIZE} y2={SIZE}>
          <stop offset="0" stopColor="var(--seam-hi)" />
          <stop offset="1" stopColor="var(--seam-lo)" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r={72} fill="none" stroke="var(--border-slate)" strokeDasharray="2 5" />
      <circle cx={C} cy={C} r={OUTER - 60} fill="none" stroke="var(--border-slate)" strokeDasharray="2 5" />

      {/* fans: thin branches from each hub out to the rim */}
      <g fill="none" stroke="var(--text-secondary)" strokeWidth={0.6} opacity={0.5}>
        {fans.map((fan, h) =>
          fan.map((f, i) => (
            <path key={`${h}-${i}`} d={`M${f.hx},${f.hy} Q${f.cx},${f.cy} ${f.ex},${f.ey}`} />
          )),
        )}
      </g>

      {/* spokes from the center to each hub */}
      <g fill="none" strokeWidth={1}>
        {HUBS.map((hub) => {
          const [hx, hy] = polar(hub.angle, hub.radius);
          const [mx, my] = polar(hub.angle + 14, hub.radius * 0.55);
          const d = `M${C},${C} Q${mx},${my} ${hx},${hy}`;
          return hub.hot ? (
            <path key={hub.label} d={d} className="fracture-stroke" stroke="url(#kg-gold)" />
          ) : (
            <path key={hub.label} d={d} stroke="var(--border-slate)" />
          );
        })}
      </g>

      <g fill="var(--gold-600)" opacity={0.75}>
        {ringDots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.1} />
        ))}
      </g>

      <g>
        {HUBS.map((hub) => {
          const [hx, hy] = polar(hub.angle, hub.radius);
          const [lx, ly] = polar(hub.angle, hub.radius + 22);
          const right = Math.cos((hub.angle * Math.PI) / 180) >= 0;
          return (
            <g key={hub.label}>
              <circle cx={hx} cy={hy} r={hub.hot ? 4.5 : 3.5} fill="var(--gold-600)" />
              <text
                x={lx}
                y={ly}
                textAnchor={right ? "start" : "end"}
                dominantBaseline="middle"
                className="fill-ash font-mono text-[11px] uppercase max-sm:text-[16px]"
              >
                {hub.label}
              </text>
            </g>
          );
        })}
      </g>

      <text x={C} y={C - 4} textAnchor="middle" className="fill-ivory font-serif text-[20px] max-sm:text-[24px]">
        Second Brain
      </text>
      <text
        x={C}
        y={C + 16}
        textAnchor="middle"
        className="fill-ash font-mono text-[10px] uppercase max-sm:text-[14px]"
      >
        Knowledge Garden
      </text>
    </svg>
  );
}
