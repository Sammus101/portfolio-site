"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { GoldDefs } from "@/components/fracture/gold-defs";
import { FRAGMENT_ICONS } from "@/components/home/fragment-icons";
import { fracture } from "@/lib/crack";

type Step = { label: string; subtitle: string; text: string };

// Depth of the icon band: seams between cards in a row run at this depth so they stay level
// even when one card is open and taller than its neighbours.
const SEAM_Y = 52;

// Chipped outlines in a 100x100 box (stretched to the card), one per card, plus a short hairline
// crack near a corner. The left/right edges stay straight through the seam band near the top so
// the gold seams always land on a clean edge; all the breakage is on the corners and lower edges.
const PIECES = [
  { edge: "3,0 88,0 100,9 100,100 9,100 0,94 0,6", crack: "100,84 93,88 91,95 86,100" },
  { edge: "0,0 58,0 61,3.5 100,0 100,88 94,100 0,100", crack: "0,80 7,84 10,92 17,95" },
  { edge: "0,7 7,0 100,0 100,100 44,100 41,95 20,100 0,100", crack: "100,70 94,76 96,86 90,92" },
  { edge: "0,0 100,0 100,93 89,100 0,100 0,72 2.5,68 0,63", crack: "30,100 34,92 29,86 33,78" },
  { edge: "0,0 92,0 100,10 100,100 0,100 0,91 4,87 0,81", crack: "100,90 92,93 88,100" },
];

/**
 * The "A Life in Fragments" cards, joined in reading order by gold seams. Each card rests as an
 * icon and a name; hovering (mouse) or clicking/tapping opens it to show the text. From the xl
 * breakpoint the cards sit in one row and the open card widens while the others narrow; below
 * that they form a grid and the open card grows downward.
 *
 * The seams are routed from the cards' measured boxes (the column count changes with the
 * viewport, and cards resize as they open): sideways between neighbours in a row, down with a
 * jog when the next card is on a lower row.
 */
export function FragmentGrid({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [seams, setSeams] = useState<string[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  // Hover wins while the pointer is over a card; otherwise the last clicked card stays open.
  const open = hovered ?? pinned;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const cards = [...list.children].filter((c): c is HTMLElement => c instanceof HTMLElement && c.tagName === "LI");
      const box = (el: HTMLElement) => ({
        l: el.offsetLeft, r: el.offsetLeft + el.offsetWidth, t: el.offsetTop, b: el.offsetTop + el.offsetHeight,
      });
      const next: string[] = [];
      for (let i = 0; i < cards.length - 1; i++) {
        const a = box(cards[i]);
        const b = box(cards[i + 1]);
        const ax = (a.l + a.r) / 2, bx = (b.l + b.r) / 2;
        const opts = { seed: 41 + i * 7, width: 3, jitter: 2, swells: 0 } as const;
        if (b.t >= a.t + SEAM_Y * 2) {
          // next card sits on a lower row: leave from the bottom of this one, arrive at the top
          const mid = (a.b + b.t) / 2;
          next.push(
            Math.abs(ax - bx) < 2
              ? fracture([[ax, a.b - 1], [bx, b.t + 1]], opts)
              : fracture([[ax, a.b - 1], [ax, mid], [bx, mid], [bx, b.t + 1]], opts),
          );
        } else {
          next.push(fracture([[a.r - 1, a.t + SEAM_Y], [b.l + 1, b.t + SEAM_Y]], opts));
        }
      }
      setSeams(next);
      setSize({ w: list.offsetWidth, h: list.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    [...list.children].forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  }, [steps.length]);

  return (
    <ol
      ref={listRef}
      className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-x-10 gap-y-10 text-left sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:h-[19rem]"
    >
      {size.w > 0 && (
        <svg
          aria-hidden
          viewBox={`0 0 ${size.w} ${size.h}`}
          width={size.w}
          height={size.h}
          className="pointer-events-none absolute top-0 left-0 overflow-visible"
        >
          <GoldDefs id="frag-seam" />
          <g fill="url(#frag-seam)" filter="url(#frag-seam-metal)">
            {seams.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
        </svg>
      )}
      {steps.map((step, i) => {
        const Icon = FRAGMENT_ICONS[step.label];
        const isOpen = open === i;
        const piece = PIECES[i % PIECES.length];
        return (
          <li
            key={step.label}
            data-open={isOpen}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(null)}
            className="frag group relative z-10 w-full transition-[flex-grow,height] duration-500 ease-out xl:h-48 xl:min-w-0 xl:flex-1 xl:basis-0 xl:data-[open=true]:h-[19rem] xl:data-[open=true]:grow-[3.4]"
          >
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 size-full overflow-visible"
            >
              <polygon
                points={piece.edge}
                vectorEffect="non-scaling-stroke"
                className="fill-[#14161b] stroke-slate stroke-1 transition-colors duration-500 group-data-[open=true]:stroke-gold-600/60"
              />
              <polyline
                points={piece.crack}
                fill="none"
                vectorEffect="non-scaling-stroke"
                className="stroke-gold-600/50 stroke-1 transition-opacity duration-500 group-data-[open=true]:opacity-0"
              />
            </svg>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setPinned(pinned === i ? null : i)}
              className="relative flex h-full min-h-36 w-full cursor-pointer flex-col overflow-hidden p-5 text-left outline-none focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-gold-600"
            >
              <Icon className="size-14 shrink-0 text-gold-600/70 transition-colors duration-300 group-data-[open=true]:text-gold-100" />
              <span className="mt-auto block pt-6 font-serif text-[28px] leading-none text-ivory transition-transform duration-500 group-data-[open=true]:-translate-y-1">
                {step.label}
              </span>
              <span className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-data-[open=true]:grid-rows-[1fr]">
                <span className="body block overflow-hidden text-[13px] leading-5 text-ash opacity-0 transition-opacity duration-500 group-data-[open=true]:opacity-100 xl:w-[26rem]">
                  <span className="block pt-3">
                    <span className="mb-2 block font-serif text-lg leading-snug text-ivory">{step.subtitle}</span>
                    {step.text}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
