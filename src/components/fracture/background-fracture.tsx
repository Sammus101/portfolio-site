import { fracture } from "@/lib/crack";

// Ambient gold cracks: dim, sparse, never clustered on one section.
const GOLD_CRACKS = [
  fracture([[0, 230], [180, 190], [300, 250], [470, 215]], { seed: 31, width: 3.0, jitter: 8, branches: 2 }),
  fracture([[420, 0], [390, 120], [450, 260], [400, 420], [440, 560]], { seed: 32, width: 3.5, jitter: 9, branches: 3 }),
  fracture([[0, 760], [200, 740], [420, 790], [640, 760]], { seed: 33, width: 3.0, jitter: 8, branches: 2 }),
  fracture([[1440, 640], [1300, 690], [1120, 660], [980, 720]], { seed: 34, width: 3.0, jitter: 8, branches: 2 }),
];

// Fissures in the rock itself: dark, thin, with a faint lit lip. More of them than gold ones.
const FISSURES = [
  fracture([[130, 0], [180, 140], [120, 300], [190, 470], [150, 640], [210, 900]], { seed: 71, width: 3.2, jitter: 14, step: 16, branches: 4 }),
  fracture([[0, 520], [220, 470], [420, 540], [700, 500], [980, 560]], { seed: 72, width: 2.6, jitter: 12, step: 16, branches: 3 }),
  fracture([[620, 0], [590, 160], [660, 330], [610, 520], [690, 720], [640, 900]], { seed: 73, width: 3.0, jitter: 14, step: 16, branches: 4 }),
  fracture([[880, 120], [1000, 220], [1150, 190], [1300, 300], [1440, 260]], { seed: 74, width: 2.4, jitter: 11, step: 16, branches: 3 }),
  fracture([[1100, 900], [1160, 740], [1110, 600], [1220, 460], [1180, 300]], { seed: 75, width: 3.0, jitter: 13, step: 16, branches: 3 }),
  fracture([[300, 900], [380, 780], [340, 690], [470, 600]], { seed: 76, width: 2.2, jitter: 10, step: 14, branches: 2 }),
  fracture([[760, 900], [820, 800], [780, 700], [900, 610], [860, 520]], { seed: 77, width: 2.4, jitter: 11, step: 14, branches: 2 }),
];

/**
 * Page-wide ambient layer, fixed behind everything: dark rock (graded CC0 photo texture +
 * dark pockets, fissures, grain and vignette) with a sparse dim gold crack network on top. Built entirely from SVG
 * filters plus one 1800px WebP texture. Foreground seams stay brighter than this layer.
 */
export function BackgroundFracture() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Dark pockets: pushes some areas deeper than the void. */}
        <filter id="rock-pockets" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.0045 0.007" numOctaves="4" seed="23" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3.2 1.9" />
        </filter>
        <filter id="rock-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        </filter>
        <radialGradient id="rock-vignette" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.7" />
        </radialGradient>
        <linearGradient id="bgf-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--seam-hi)" />
          <stop offset="1" stopColor="var(--seam-lo)" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="var(--bg-void)" />
      <image
        href="/textures/rock-dark.webp"
        width="1440"
        height="900"
        preserveAspectRatio="xMidYMid slice"
        opacity={0.4}
      />
      <rect width="1440" height="900" filter="url(#rock-pockets)" opacity={0.7} />

      <g fill="#050507" stroke="rgba(245,242,235,0.07)" strokeWidth={0.6} opacity={0.9}>
        {FISSURES.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <rect width="1440" height="900" filter="url(#rock-grain)" />
      <rect width="1440" height="900" fill="url(#rock-vignette)" />

      <g className="fracture-fill" fill="url(#bgf-gold)" opacity={0.28}>
        {GOLD_CRACKS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
