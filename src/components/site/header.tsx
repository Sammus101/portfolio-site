"use client";

import Link from "next/link";
import { useState } from "react";

import { DESTINATIONS } from "@/content/destinations";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-border">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 lg:px-16">
        <Link href="/" className="nav-wordmark text-ivory">
          Samuel Ehret
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 min-[880px]:flex lg:gap-6">
          {DESTINATIONS.map((d) => (
            <Link key={d.href} href={d.href} className="nav-link text-ivory transition-colors hover:text-gold-600">
              {d.navLabel}
            </Link>
          ))}
          <span aria-hidden className="status-orb ml-2 inline-block size-3 rounded-full" />
        </nav>

        <button
          type="button"
          className="nav-link flex items-center gap-3 text-ivory min-[880px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="status-orb inline-block size-3 rounded-full" />
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-void px-6 pb-4 min-[880px]:hidden"
        >
          {DESTINATIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              onClick={() => setOpen(false)}
              className="nav-link border-t border-border py-4 text-ivory first:border-t-0 hover:text-gold-600"
            >
              <span className="mr-3 text-gold-600">{d.index}</span>
              {d.navLabel}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
