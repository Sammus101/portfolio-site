/**
 * Metallic gold for seam fills. Inside one <svg>, render <GoldDefs id="x" /> once, then paint with
 * fill={`url(#x)`} filter={`url(#x-metal)`}. The gradient gives broad light/dark bands; the
 * filter adds fine, lit noise so the surface catches light unevenly like leaf or powder.
 * Each <svg> needs its own copy (defs inside a display:none svg can't be referenced).
 */
export function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6d5119" />
        <stop offset="0.16" stopColor="#b8964a" />
        <stop offset="0.3" stopColor="#e6cd8c" />
        <stop offset="0.44" stopColor="#94742a" />
        <stop offset="0.6" stopColor="#c9a55b" />
        <stop offset="0.74" stopColor="#7d5f1f" />
        <stop offset="0.88" stopColor="#d9bd78" />
        <stop offset="1" stopColor="#78591b" />
      </linearGradient>
      <filter id={`${id}-metal`} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.03 0.08" numOctaves="3" seed="9" result="grain" />
        <feDiffuseLighting in="grain" surfaceScale="2.4" diffuseConstant="1.1" lightingColor="#ffffff" result="lit">
          <feDistantLight azimuth="235" elevation="50" />
        </feDiffuseLighting>
        <feComposite in="SourceGraphic" in2="lit" operator="arithmetic" k1="1.3" k2="0" k3="0" k4="0" result="metal" />
        <feComposite in="metal" in2="SourceGraphic" operator="in" result="clipped" />
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="blur" />
        <feFlood floodColor="#c2a466" floodOpacity="0.16" />
        <feComposite in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="clipped" />
        </feMerge>
      </filter>
    </defs>
  );
}
