'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { BsArrowRight } from "react-icons/bs";
import { BiPlayCircle } from "react-icons/bi";
import Link from "next/link";
// import { useAuth } from "../auth/AuthProvider";

const timeline = [
  { label: "Lead created", detail: "Website form — Alpine Industries", time: "10:04:12" },
  { label: "Auto-assigned", detail: "Owner set to Maya R. (territory rule)", time: "10:04:12" },
  { label: "Intro email sent", detail: "Template: inbound first touch", time: "10:04:14" },
  { label: "Follow-up task created", detail: "Due tomorrow, 9:00 AM", time: "10:04:14" },
];
const APP_DASHBOARD_URL = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard` : "/dashboard";

export function Hero() {
  const reduced = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);
  // const { user, openAuth } = useAuth();
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.97]);

  // function handleTrialClick(e: React.MouseEvent) {
  //   if (user) {
  //     return;
  //   }
  //   e.preventDefault();
  //   openAuth("signup");
  // }

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[image:var(--gradient-amber)] opacity-20 blur-[120px]"
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8">
        <div>
          <Reveal className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-teal live-dot" />
            Real-time CRM with a working automation engine
          </Reveal>
          <Reveal as="h1" delay={60} className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.85rem]">
            Your pipeline keeps moving <span className="text-amber-grad">while you close deals</span>
          </Reveal>
          <Reveal as="p" delay={120} className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Northpeak watches every lead, deal and activity as it happens — then assigns owners, sends
            the follow-up, and creates the task before anyone has to remember. Your whole team sees
            each change the second it lands.
          </Reveal>
          <Reveal delay={180} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={APP_DASHBOARD_URL}
              // onClick={handleTrialClick}
              className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-amber)] px-5 py-3.5 text-sm font-semibold text-amber-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
            >
              <BsArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#workflow"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <BiPlayCircle className="h-4 w-4" /> See how it works
            </Link>
          </Reveal>
          <Reveal delay={240} className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
            Six built-in roles, from rep to admin · Running in production on Render + AWS RDS Postgres
          </Reveal>
        </div>

        <Reveal delay={120} className="relative" ref={shellRef}>
          <motion.img
            style={{ y, scale }}
            src="./hero/hero-dashboard.jpg"
            alt="Northpeak deal pipeline with a live activity feed updating alongside it"
            width={1600}
            height={1104}
            fetchPriority="high"
            decoding="async"
            className="w-full rounded-2xl border border-border bg-card shadow-[var(--shadow-float)]"
          />
          <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:absolute sm:-bottom-10 sm:-left-8 sm:mt-0 sm:w-[19rem]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Automation run
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-teal live-dot" /> Live
              </span>
            </div>
            <ol className="mt-3 space-y-3">
              {timeline.map((t) => (
                <li key={t.label} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{t.detail}</p>
                  </div>
                  <span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground">
                    {t.time}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
