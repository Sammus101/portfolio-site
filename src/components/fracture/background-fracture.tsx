/**
 * Page-wide ambient layer, fixed behind everything: dark rock (graded CC0 photo texture +
 * dark pockets, grain and vignette) with no lines on it: the gold lives only in foreground seams. Built entirely from SVG
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
        {/* Keeps the text column readable where the stone catches light. */}
        <linearGradient id="rock-readable" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="var(--bg-void)" />
      <image
        href="/textures/rock-slate.webp"
        width="1440"
        height="900"
        preserveAspectRatio="xMidYMid slice"
        opacity={0.68}
      />
      <rect width="1440" height="900" filter="url(#rock-pockets)" opacity={0.7} />

      <rect width="1440" height="900" filter="url(#rock-grain)" />
      <rect width="1440" height="900" fill="url(#rock-readable)" />
      <rect width="1440" height="900" fill="url(#rock-vignette)" />

    </svg>
  );
}
