type Pt = readonly [number, number];

// Deterministic PRNG so server and client render identical paths.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const r1 = (v: number) => Math.round(v * 10) / 10;

type Opts = {
  /** Maximum thickness in SVG units. */
  width?: number;
  /** Sideways wobble of the centerline. */
  jitter?: number;
  /** Distance between vertices along the centerline; smaller = finer, more ragged. */
  step?: number;
  seed?: number;
  /** Number of thinner side cracks that split off the main one. */
  branches?: number;
  /** Internal: branch depth. */
  depth?: number;
};

/** Dense, wobbly centerline through the given waypoints. */
function centerline(points: readonly Pt[], jitter: number, step: number, rand: () => number): Pt[] {
  const out: Pt[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    const segs = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    for (let k = 1; k <= segs; k++) {
      const t = k / segs;
      const off = k === segs ? 0 : (rand() - 0.5) * 2 * jitter;
      out.push([x0 + (x1 - x0) * t + nx * off, y0 + (y1 - y0) * t + ny * off]);
    }
  }
  return out;
}

/**
 * A torn-paper crack as a filled shape. Thickness changes along its length (pinched ends,
 * random swells and chips), and the two edges wander independently so they look ripped rather
 * than drawn. Returns one SVG path `d` (main crack plus branches) meant to be filled, not stroked.
 */
export function fracture(points: readonly Pt[], opts: Opts = {}): string {
  const { width = 7, jitter = 6, step = 14, seed = 1, branches = 2, depth = 0 } = opts;
  const rand = rng(seed);
  const line = centerline(points, jitter, step, rand);
  const n = line.length;

  // Smoothed random thickness so it swells and pinches instead of flickering.
  let thick = 0.6;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    thick = thick * 0.55 + rand() * 0.45 * 1.6;
    const chip = rand() < 0.1 ? 1.9 : 1;
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.7);
    const w = Math.max(0.35, width * envelope * (0.3 + thick) * chip);

    const a = line[Math.max(0, i - 1)];
    const b = line[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const [x, y] = line[i];
    const wl = (w / 2) * (0.6 + rand() * 0.9);
    const wr = (w / 2) * (0.6 + rand() * 0.9);
    left.push([x + nx * wl, y + ny * wl]);
    right.push([x - nx * wr, y - ny * wr]);
  }

  const ring = [...left, ...right.reverse()];
  let d = ring.map(([x, y], i) => `${i ? "L" : "M"}${r1(x)},${r1(y)}`).join(" ") + " Z";

  if (depth < 1) {
    for (let k = 0; k < branches; k++) {
      const at = Math.floor(n * (0.2 + rand() * 0.6));
      const [px, py] = line[at];
      const a = line[Math.max(0, at - 1)];
      const b = line[Math.min(n - 1, at + 1)];
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + (rand() < 0.5 ? -1 : 1) * (0.45 + rand() * 0.55);
      const len = width * (6 + rand() * 9);
      const mid: Pt = [px + Math.cos(ang) * len * 0.5, py + Math.sin(ang) * len * 0.5];
      const end: Pt = [px + Math.cos(ang + (rand() - 0.5) * 0.7) * len, py + Math.sin(ang + (rand() - 0.5) * 0.7) * len];
      d +=
        " " +
        fracture([[px, py], mid, end], {
          width: width * 0.45,
          jitter: jitter * 0.6,
          step: step * 0.8,
          seed: seed * 7 + k + 1,
          branches: 0,
          depth: depth + 1,
        });
    }
  }
  return d;
}
