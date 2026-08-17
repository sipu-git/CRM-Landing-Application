import { BiBot, BiRadio } from "react-icons/bi";
import { BsInbox, BsRouter } from "react-icons/bs";
import { LuReceiptText } from "react-icons/lu";
import { Reveal } from "../Reveal";

const steps = [
  { icon: BsInbox, title: "Capture", copy: "A lead arrives from a web form, a CSV import, or a rep typing it in on a call." },
  { icon: BsRouter, title: "Organize", copy: "It lands in the right pipeline stage and gets the right owner, based on rules you set." },
  { icon: BiBot, title: "Nurture, automatically", copy: "The right message goes out on time, follow-up tasks appear, and stalling deals get flagged." },
  { icon: BiRadio, title: "Track live", copy: "Everyone watching that deal sees each edit the second it happens — no refresh, no guessing." },
  { icon: LuReceiptText, title: "Close & report", copy: "Invoice and report straight from the same record. Nothing gets re-entered anywhere." },
];

export function Workflow() {
  return (
    <section id="workflow" className="surface-ink py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber">The loop</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Event, decision, action — running all day</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Northpeak reacts to what actually happens in your CRM. Here's the full path a deal takes,
            from first touch to paid invoice.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 100}
              className="relative rounded-2xl border border-white/10 bg-ink-elevated/70 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber/15">
                  <s.icon className="h-5 w-5 text-amber" />
                </span>
                <span className="font-display text-sm font-bold tabular-nums text-ink-muted">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.copy}</p>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -right-2 top-1/2 hidden h-px w-4 bg-amber/40 lg:block"
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
