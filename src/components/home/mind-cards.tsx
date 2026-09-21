"use client";

import { useState } from "react";

type Topic = { label: string; subtitle: string; text: string };

// Deliberately uneven: each card has its own tilt, drop, resting height, side gap and chipped
// outline, so the row reads as pieces that happen to sit near each other rather than a grid.
// `edge` is the outline in a 100x100 box (stretched to the card); `crack` is a hairline of gold.
const PIECES = [
  { rot: -0.7, dy: 0, h: 168, ml: 0, grow: 1, edge: "0,0 91,0 100,9 100,100 7,100 0,92", crack: "78,0 73,11 79,21 72,34" },
  { rot: 0.5, dy: 46, h: 204, ml: 12, grow: 1.15, edge: "6,0 100,0 100,90 93,100 0,100 0,8", crack: "0,62 9,58 14,66 24,63" },
  { rot: -0.4, dy: 14, h: 152, ml: 4, grow: 0.9, edge: "0,0 100,0 100,94 88,100 0,100", crack: "100,30 92,34 90,44 82,48" },
  { rot: 0.8, dy: 58, h: 188, ml: 26, grow: 1.05, edge: "0,7 9,0 100,0 100,100 0,100", crack: "40,100 44,88 38,80 43,70" },
  { rot: -0.6, dy: 26, h: 176, ml: 8, grow: 1, edge: "0,0 100,0 100,100 10,100 0,91", crack: "62,0 66,10 60,17 64,28" },
];

/**
 * "What Occupies My Mind": five cards that rest as a name and open (hover, click or tap) to show
 * a subtitle and text. Unlike the timeline above they have no seams between them and no shared
 * baseline; from the xl breakpoint they sit in one loose row, and opening a card straightens it
 * and widens it while the others give way.
 */
export function MindCards({ topics }: { topics: Topic[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const open = hovered ?? pinned;

  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-x-8 gap-y-6 text-left sm:grid-cols-2 xl:flex xl:h-[22rem] xl:gap-x-5">
      {topics.map((topic, i) => {
        const p = PIECES[i % PIECES.length];
        const isOpen = open === i;
        return (
          <li
            key={topic.label}
            data-open={isOpen}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(null)}
            style={
              {
                "--rot": `${p.rot}deg`,
                "--dy": `${p.dy}px`,
                "--h": `${p.h}px`,
                "--ml": `${p.ml}px`,
                "--grow": p.grow,
              } as React.CSSProperties
            }
            className="group relative w-full rotate-(--rot) transition-[flex-grow,height,rotate] duration-500 ease-out data-[open=true]:rotate-0 sm:even:mt-10 xl:h-(--h) xl:min-w-0 xl:translate-y-(--dy) xl:ml-(--ml) xl:flex-(--grow) xl:basis-0 xl:data-[open=true]:h-[18rem] xl:data-[open=true]:grow-[3.4] xl:even:mt-0"
          >
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 size-full overflow-visible"
            >
              <polygon
                points={p.edge}
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="miter"
                className="fill-[#14161b] stroke-slate stroke-1 transition-colors duration-500 group-data-[open=true]:stroke-gold-600/60"
              />
              <polyline
                points={p.crack}
                fill="none"
                vectorEffect="non-scaling-stroke"
                className="stroke-gold-600/50 stroke-1 transition-opacity duration-500 group-data-[open=true]:opacity-0"
              />
            </svg>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setPinned(pinned === i ? null : i)}
              className="relative flex h-full min-h-32 w-full cursor-pointer flex-col overflow-hidden p-5 text-left outline-none focus-visible:outline-1 focus-visible:-outline-offset-6 focus-visible:outline-gold-600"
            >
              <span className="mt-auto block pt-6 font-serif text-[26px] leading-none text-ivory xl:text-[24px] transition-transform duration-500 group-data-[open=true]:-translate-y-1">
                {topic.label}
              </span>
              <span className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-data-[open=true]:grid-rows-[1fr]">
                <span className="body block overflow-hidden text-[13px] leading-5 text-ash opacity-0 transition-opacity duration-500 group-data-[open=true]:opacity-100 xl:w-[22rem]">
                  <span className="block pt-3">
                    <span className="mb-2 block font-serif text-lg leading-snug text-ivory">{topic.subtitle}</span>
                    {topic.text}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
