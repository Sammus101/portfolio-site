import Link from "next/link";

import { Band } from "@/components/home/band";
import { FragmentGrid } from "@/components/home/fragment-grid";
import { MindCards } from "@/components/home/mind-cards";
import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { WORK_GRAPHICS } from "@/components/home/work-graphics";

export function Fragments() {
  const { title, steps } = home.fragments;
  return (
    <Band title={title} tear={0}>
      <FragmentGrid steps={steps} />
    </Band>
  );
}

export function Mind() {
  const { title, topics } = home.mind;
  return (
    <Band title={title} tear={1}>
      <MindCards topics={topics} />
    </Band>
  );
}

export function SelectedWork() {
  const { title, viewAll } = home.selectedWork;
  return (
    <Band id="work" title={title} tear={2}>
      <ul className="mx-auto grid max-w-5xl gap-4 text-left md:grid-cols-3">
        {projects.slice(0, 3).map((p, i) => {
          const Graphic = WORK_GRAPHICS[p.id];
          return (
            <li key={p.id} className="flex flex-col border border-slate bg-surface">
              {Graphic && (
                <div className="aspect-[16/10] w-full border-b border-slate bg-void/40">
                  <Graphic className="h-full w-full" />
                </div>
              )}
              <div className="flex min-h-44 flex-1 flex-col p-5">
                <span className="label">
                  [{String(i + 1).padStart(2, "0")}. {p.title}]
                </span>
                <p className="body mt-3 text-sm text-ash">{p.description}</p>
                <span className="label mt-auto pt-4 text-ash">{p.tags.join(" · ")}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mx-auto mt-8 max-w-5xl md:text-right">
        <Link href={viewAll.href} className="nav-link text-ivory transition-colors hover:text-gold-600">
          {viewAll.label} →
        </Link>
      </div>
    </Band>
  );
}

export function Now() {
  const { title, items } = home.now;
  return (
    <Band title={title} tear={3} className="bg-black/25">
      <p className="mx-auto max-w-4xl font-serif text-[clamp(22px,5vw,32px)] leading-relaxed text-ivory">
        {items.map((item, i) => (
          <span key={item}>
            {i > 0 && (
              <span aria-hidden className="mx-2 text-gold-600 md:mx-3">
                ·
              </span>
            )}
            <span className="inline-block">{item}</span>
          </span>
        ))}
      </p>
    </Band>
  );
}

export function Explore() {
  const { title, links } = home.explore;
  return (
    <Band title={title}>
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-serif text-[clamp(38px,10vw,72px)] leading-none">
        {links.map((l, i) => (
          <li key={l.label} className="flex items-center gap-4">
            {i > 0 && (
              <span aria-hidden className="hidden text-[0.4em] text-gold-600 sm:inline">
                ✦
              </span>
            )}
            <Link href={l.href} className="text-ivory transition-colors hover:text-gold-100">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}
