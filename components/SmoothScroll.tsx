'use client';

import { useEffect } from "react";
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: import("lenis").default | undefined;
    let raf = 0;
    let cancelled = false;

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || !href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (!target || !lenis) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -84, duration: 1.1 });
      history.replaceState(null, "", href);
    };

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      document.documentElement.classList.add("lenis-active");

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      document.addEventListener("click", onAnchorClick);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      document.documentElement.classList.remove("lenis-active");
      lenis?.destroy();
    };
  }, []);

  return null;
}