"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { GoldDefs } from "@/components/fracture/gold-defs";
import { FRAGMENT_ICONS } from "@/components/home/fragment-icons";
import { fracture } from "@/lib/crack";

type Step = { label: string; subtitle: string; text: string };

/**
 * The "A Life in Fragments" cards, joined in reading order by gold seams. The number of columns
 * changes with the viewport, so the seams are routed from the cards' measured boxes: sideways
 * between neighbours in a row, down (with a jog when the next card is in another column) when
 * the next card is on a lower row.
 */
export function FragmentGrid({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [seams, setSeams] = useState<string[]>([]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const cards = [...list.children] as HTMLElement[];
      const box = (el: HTMLElement) => ({
        l: el.offsetLeft, r: el.offsetLeft + el.offsetWidth, t: el.offsetTop, b: el.offsetTop + el.offsetHeight,
      });
      const next: string[] = [];
      for (let i = 0; i < cards.length - 1; i++) {
        const a = box(cards[i]);
        const b = box(cards[i + 1]);
        const ax = (a.l + a.r) / 2, bx = (b.l + b.r) / 2;
        const ay = (a.t + a.b) / 2, by = (b.t + b.b) / 2;
        const opts = { seed: 41 + i * 7, width: 3, jitter: 2, swells: 0 } as const;
        if (b.t >= a.b - 1) {
          const mid = (a.b + b.t) / 2;
          next.push(
            Math.abs(ax - bx) < 2
              ? fracture([[ax, a.b - 1], [bx, b.t + 1]], opts)
              : fracture([[ax, a.b - 1], [ax, mid], [bx, mid], [bx, b.t + 1]], opts),
          );
        } else {
          next.push(fracture([[a.r - 1, ay], [b.l + 1, by]], opts));
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
      className="relative mx-auto grid max-w-6xl grid-cols-1 gap-x-14 gap-y-12 text-left sm:grid-cols-2 lg:grid-cols-3"
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
      {steps.map((step) => {
        const Icon = FRAGMENT_ICONS[step.label];
        return (
          <li
            key={step.label}
            tabIndex={0}
            className="frag group relative z-10 flex min-h-80 flex-col overflow-hidden border border-slate bg-[#14161b] p-5 outline-none transition-colors duration-300 hover:border-gold-600/60 focus:border-gold-600/60"
          >
            <Icon className="size-20 shrink-0 text-gold-600/70 transition-all duration-500 group-hover:size-14 group-hover:text-gold-100 group-focus:size-14 group-focus:text-gold-100" />
            <h3 className="mt-auto font-serif text-[32px] leading-none text-ivory transition-transform duration-500 group-hover:-translate-y-1 group-focus:-translate-y-1">
              {step.label}
            </h3>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
              <p className="body overflow-hidden text-sm text-ash opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100">
                <span className="block pt-3">
                  <span className="mb-2 block font-serif text-lg leading-snug text-ivory">{step.subtitle}</span>
                  {step.text}
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
