import type { ComponentType } from "react";

// Small line icons for the "A Life in Fragments" cards. Each is a resting drawing that comes alive
// while its card is hovered or focused; the motion lives in globals.css under `.frag` (f-* classes).
type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

// A sprout that grows: stem draws upward, leaves unfurl.
function Leaf({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8 56h48" opacity=".5" />
      <path className="f-stem" pathLength={1} d="M32 56C32 44 31 34 33 16" />
      <path className="f-leaf f-leaf-a" d="M32 40C22 40 15 34 14 26c10 0 17 5 18 14z" />
      <path className="f-leaf f-leaf-b" d="M32.5 30c8-1 14-6 16-14-9 0-15 5-16 14z" />
      <path className="f-leaf f-leaf-c" d="M33 16c-4-3-4-8 0-11 4 3 4 8 0 11z" />
    </Svg>
  );
}

// A globe that turns: meridians squeeze through the centre in turn.
function Globe({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="32" cy="32" r="22" />
      <path d="M11 24h42M11 40h42" opacity=".55" />
      <ellipse className="f-meridian" cx="32" cy="32" rx="22" ry="22" />
      <ellipse className="f-meridian f-meridian-b" cx="32" cy="32" rx="22" ry="22" />
      <path d="M32 10v44" opacity=".5" />
    </Svg>
  );
}

// A lens sweeping over a field of data points.
function Research({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g opacity=".7" fill="currentColor" stroke="none">
        <circle cx="14" cy="46" r="1.8" />
        <circle cx="26" cy="52" r="1.8" />
        <circle cx="40" cy="48" r="1.8" />
        <circle cx="50" cy="40" r="1.8" />
        <circle cx="20" cy="34" r="1.8" />
        <circle cx="44" cy="26" r="1.8" />
      </g>
      <g className="f-lens">
        <circle cx="26" cy="26" r="11" />
        <path d="M34 34l12 12" strokeWidth="2.6" />
      </g>
    </Svg>
  );
}

// Layers that assemble into a product.
function Product({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path className="f-layer f-layer-1" d="M32 40l20-9-20-9-20 9z" />
      <path className="f-layer f-layer-2" d="M12 38l20 9 20-9" />
      <path className="f-layer f-layer-3" d="M12 46l20 9 20-9" />
    </Svg>
  );
}

const AI_LINKS = [
  "M14 20L32 14", "M14 20L32 32", "M14 44L32 32", "M14 44L32 50", "M14 32L32 14", "M14 32L32 50",
  "M32 14L50 32", "M32 32L50 32", "M32 50L50 32",
];
const AI_NODES = [[14, 20], [14, 32], [14, 44], [32, 14], [32, 32], [32, 50], [50, 32]];

// A small network whose signals pulse through it.
function AI({ className }: IconProps) {
  return (
    <Svg className={className}>
      <g opacity=".55">
        {AI_LINKS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="f-signal">
        {AI_LINKS.map((d) => (
          <path key={d} d={d} pathLength={1} />
        ))}
      </g>
      <g fill="currentColor" stroke="none">
        {AI_NODES.map(([x, y], i) => (
          <circle key={i} className="f-node" style={{ animationDelay: `${i * 0.18}s` }} cx={x} cy={y} r="2.6" />
        ))}
      </g>
    </Svg>
  );
}

export const FRAGMENT_ICONS: Record<string, ComponentType<IconProps>> = {
  Biology: Leaf,
  "Climate Science": Globe,
  Research,
  Product,
  "Technology & AI": AI,
};
