import { BsArrowRight } from "react-icons/bs";
import { Reveal } from "../Reveal";
import { FaCalendarDays } from "react-icons/fa6";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden surface-ink py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[image:var(--gradient-amber)] opacity-15 blur-[140px]"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal as="h2" className="text-3xl font-bold sm:text-[2.75rem] sm:leading-tight">
          Ready to stop losing deals to a full inbox?
        </Reveal>
        <Reveal as="p" delay={80} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
          Start free, import your pipeline, and let the first automation run today. Or talk to someone
          who'll show you how other teams set theirs up.
        </Reveal>
        <Reveal delay={140} className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-amber)] px-5 py-3.5 text-sm font-semibold text-amber-foreground transition-transform hover:-translate-y-0.5"
          >
            Start free trial <BsArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:sales@northpeak.app?subject=Northpeak%20demo"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            <FaCalendarDays className="h-4 w-4" /> Book a demo
          </a>
        </Reveal>
      </div>
    </section>
  );
}
