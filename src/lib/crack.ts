type Pt = readonly [number, number];

// Deterministic PRNG so server and client render identical paths.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** Smooth 1-D value noise in [0,1]: random lattice values, cosine-interpolated. */
function noise1d(rand: () => number, cells: number) {
  const lattice = Array.from({ length: cells + 2 }, () => rand());
  return (x: number) => {
    const i = Math.max(0, Math.floor(x));
    const f = Math.max(0, x) - i;
    const t = (1 - Math.cos(f * Math.PI)) / 2;
    const a = lattice[Math.min(i, lattice.length - 1)];
    const b = lattice[Math.min(i + 1, lattice.length - 1)];
    return a + (b - a) * t;
  };
}

const r1 = (v: number) => Math.round(v * 10) / 10;
/**
 * Closed polygon path. Every polygon is wound the same way: seams and fills are drawn together
 * as one path with the default nonzero fill rule, and opposite windings would cancel where they
 * overlap and punch thin holes of bare stone through the gold.
 */
function poly(pts: readonly Pt[]): string {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    area += x0 * y1 - x1 * y0;
  }
  const ordered = area < 0 ? [...pts].reverse() : pts;
  return `M${ordered.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" L")} Z`;
}

/**
 * Angular path through the waypoints: long straight runs with sharp bends. Extra vertices are
 * dropped in between (about every `spacing` units) and nudged sideways so the run is never a
 * perfect line. The first point stays exact so seams can share an apex.
 */
export function wander(points: readonly Pt[], jitter: number, seed: number, spacing = 60): Pt[] {
  const rand = rng(seed);
  const out: Pt[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    const cuts = Math.max(1, Math.round(len / spacing));
    for (let k = 1; k <= cuts; k++) {
      const t = k / cuts;
      const isEnd = i === points.length - 1 && k === cuts;
      const off = isEnd ? 0 : (rand() - 0.5) * 2 * jitter;
      out.push([x0 + (x1 - x0) * t + nx * off, y0 + (y1 - y0) * t + ny * off]);
    }
  }
  return out;
}

/** Re-emit the polyline with a vertex every `step` units (corners are kept). */
function resample(line: readonly Pt[], step: number): Pt[] {
  const out: Pt[] = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const [x0, y0] = line[i - 1];
    const [x1, y1] = line[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const k = Math.max(1, Math.round(len / step));
    for (let j = 1; j <= k; j++) out.push([x0 + ((x1 - x0) * j) / k, y0 + ((y1 - y0) * j) / k]);
  }
  return out;
}

function arcLengths(pts: readonly Pt[]): number[] {
  const arc = [0];
  for (let i = 1; i < pts.length; i++) arc.push(arc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return arc;
}

/** Unit normal at each vertex (central difference, so corners average out). */
function normalAt(pts: readonly Pt[], i: number): Pt {
  const a = pts[Math.max(0, i - 1)];
  const b = pts[Math.min(pts.length - 1, i + 1)];
  const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [-(b[1] - a[1]) / l, (b[0] - a[0]) / l];
}

type RibbonOpts = {
  width: number;
  /** Start at full width instead of pinched (used for arms that meet at a joint). */
  fullStart?: boolean;
  swells?: number;
  /** Thinnest the ribbon may get anywhere, including the tips. */
  minWidth?: number;
};

/**
 * Torn ribbon around an angular centerline. Thickness varies a lot along its length (hairline,
 * swells, pinches) and both edges are ragged at a fine scale, like ripped paper.
 */
function ribbon(
  line: readonly Pt[],
  rand: () => number,
  { width, fullStart = false, swells = 0, minWidth = 1.8 }: RibbonOpts,
): string {
  const pts = resample(line, 5);
  const n = pts.length;
  if (n < 3) return "";
  const arc = arcLengths(pts);
  const total = arc[n - 1] || 1;

  const low = noise1d(rand, Math.ceil(total / 42) + 1);
  const hiL = noise1d(rand, Math.ceil(total / 5) + 1);
  const hiR = noise1d(rand, Math.ceil(total / 5) + 1);

  const bumps = Array.from({ length: swells }, () => ({
    at: total * (0.12 + rand() * 0.76),
    sigma: 12 + rand() * 24,
    amp: width * (2.8 + rand() * 4.5),
  }));
  const pinches = Array.from({ length: Math.round(total / 190) }, () => ({
    at: total * (0.1 + rand() * 0.8),
    sigma: 6 + rand() * 8,
  }));

  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const s = arc[i];
    const t = s / total;
    const env = fullStart ? Math.pow(1 - t, 0.7) : Math.pow(Math.sin(Math.PI * t), 0.5);
    let w = width * (0.3 + 1.7 * low(s / 42));
    for (const b of bumps) w += b.amp * Math.exp(-((s - b.at) ** 2) / (2 * b.sigma ** 2));
    for (const q of pinches) w *= 1 - 0.78 * Math.exp(-((s - q.at) ** 2) / (2 * q.sigma ** 2));
    w = Math.max(minWidth, w * env);

    const [nx, ny] = normalAt(pts, i);
    // Edge roughness can thin a side, but never below 40% of the minimum width.
    const wl = Math.max(minWidth * 0.4, (w / 2) * (0.55 + 0.9 * hiL(s / 5)));
    const wr = Math.max(minWidth * 0.4, (w / 2) * (0.55 + 0.9 * hiR(s / 5)));
    left.push([pts[i][0] + nx * wl, pts[i][1] + ny * wl]);
    right.push([pts[i][0] - nx * wr, pts[i][1] - ny * wr]);
  }
  return poly([...left, ...right.reverse()]);
}

type Opts = {
  /** Hairline thickness; swells go to several times this. */
  width?: number;
  /** Sideways wobble between waypoints. */
  jitter?: number;
  seed?: number;
  /** Thin angular side cracks that split off. */
  branches?: number;
  /** Wider "chip" swells along the seam. */
  swells?: number;
};

/** A kintsugi seam: thin angular crack, ragged-edged, that swells and pinches and ends in points. */
export function fracture(points: readonly Pt[], opts: Opts = {}): string {
  const { width = 2.4, jitter = 8, seed = 1, branches = 0, swells } = opts;
  const rand = rng(seed);
  const line = wander(points, jitter, seed);
  const total = line.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - line[i - 1][0], p[1] - line[i - 1][1]) : 0), 0);
  let d = ribbon(line, rand, { width, swells: swells ?? Math.max(1, Math.round(total / 240)) });

  for (let k = 0; k < branches; k++) {
    const at = 1 + Math.floor(rand() * Math.max(1, line.length - 2));
    const p = line[Math.min(at, line.length - 1)];
    const a = line[Math.max(0, at - 1)];
    const b = line[Math.min(line.length - 1, at + 1)];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + (rand() < 0.5 ? -1 : 1) * (0.5 + rand() * 0.6);
    const len = 50 + rand() * 70;
    const bend = (rand() - 0.5) * 0.9;
    const pts: Pt[] = [
      p,
      [p[0] + Math.cos(ang) * len * 0.5, p[1] + Math.sin(ang) * len * 0.5],
      [p[0] + Math.cos(ang + bend) * len, p[1] + Math.sin(ang + bend) * len],
    ];
    d += " " + ribbon(pts, rand, { width: width * 0.55, fullStart: true, minWidth: 1.3 });
  }
  return d;
}

/** The vertices of `line` up to `dist` along it, ending exactly at that distance. */
function upTo(line: readonly Pt[], dist: number): Pt[] {
  const out: Pt[] = [line[0]];
  let run = 0;
  for (let i = 1; i < line.length; i++) {
    const seg = Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]);
    if (run + seg >= dist) {
      const t = (dist - run) / (seg || 1);
      out.push([line[i - 1][0] + (line[i][0] - line[i - 1][0]) * t, line[i - 1][1] + (line[i][1] - line[i - 1][1]) * t]);
      return out;
    }
    run += seg;
    out.push(line[i]);
  }
  return out;
}

/** Torn line from `a` to `b` by repeated midpoint displacement; stays close to the straight line. */
function tornEdge(a: Pt, b: Pt, apex: Pt, rand: () => number): Pt[] {
  let pts: Pt[] = [a, b];
  const gap = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = -(b[1] - a[1]) / gap;
  const ny = (b[0] - a[0]) / gap;
  for (let level = 0; level < 4; level++) {
    const next: Pt[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [p, q] = [pts[i], pts[i + 1]];
      const seg = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const m: Pt = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      // Displacement fades to zero at both ends so the torn edge stays attached to the seams.
      const along = ((m[0] - a[0]) * (b[0] - a[0]) + (m[1] - a[1]) * (b[1] - a[1])) / (gap * gap);
      const env = Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, along))), 0.8);
      const side = (rand() - 0.5) * 2 * seg * 0.24 * env;
      const pull = (rand() - 0.5) * (level === 0 ? 0.1 : 0.06) * env;
      next.push(p, [m[0] + nx * side + (apex[0] - m[0]) * pull, m[1] + ny * side + (apex[1] - m[1]) * pull]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

type JoinOpts = Opts & {
  /** Roughly how far along each arm the gold fills the space between them. */
  reach?: number;
};

/**
 * Two seams that meet at a shared first point (the apex). The gap between them fills with gold
 * completely, like a torn-out piece rebuilt: the fill runs right up to both seams and ends in a
 * ragged torn edge. Both seams carry on beyond it as thin cracks. The arrays must start at the
 * same point.
 */
export function join(armA: readonly Pt[], armB: readonly Pt[], opts: JoinOpts = {}): string {
  const { width = 2.6, jitter = 9, seed = 1, reach = 130, swells = 1 } = opts;
  const rand = rng(seed * 13 + 5);
  const A = wander(armA, jitter, seed);
  const B = wander(armB, jitter, seed + 50);
  const apex = A[0];

  const a = upTo(A, reach * (0.6 + rand() * 0.8));
  const b = upTo(B, reach * (0.6 + rand() * 0.8));
  const ea = a[a.length - 1];
  const eb = b[b.length - 1];

  // The fill's sides run exactly along both seam centerlines, so each seam ribbon overlaps the fill
  // and no sliver of stone can show between the gold and a crack. Only the far edge is torn.
  const far = tornEdge(ea, eb, apex, rand).slice(1, -1);

  let d = poly([...a, ...far, ...[...b].reverse().slice(0, -1)]);

  d += " " + ribbon(A, rand, { width, fullStart: true, swells });
  d += " " + ribbon(B, rand, { width, fullStart: true, swells });
  return d;
}
