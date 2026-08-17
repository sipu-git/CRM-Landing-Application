"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { CiMountain1 } from "react-icons/ci";
import { BiCloset, BiMenu } from "react-icons/bi";

const links = [
  { label: "Product", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md shadow-[var(--shadow-card)]" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl surface-ink">
            <CiMountain1 className="h-4.5 w-4.5 text-amber" />
          </span>
          <span className="truncate font-display text-lg font-bold">Northpeak</span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/signup"
            className="hidden rounded-xl bg-[image:var(--gradient-amber)] px-4 py-2.5 text-sm font-semibold text-amber-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Start free trial
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border md:hidden"
          >
            {open ? <BiCloset className="h-5 w-5" /> : <BiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-5 pt-2 md:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/signup"
            className="mt-2 block rounded-xl bg-[image:var(--gradient-amber)] px-4 py-3 text-center text-sm font-semibold text-amber-foreground"
          >
            Start free trial
          </a>
        </div>
      )}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[image:var(--gradient-amber)]"
      />
    </motion.header>
  );
}
