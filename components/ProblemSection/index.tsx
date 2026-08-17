import { CgLock } from "react-icons/cg";
import { FiEyeOff } from "react-icons/fi";
import { LuPenOff } from "react-icons/lu";
import { Reveal } from "../Reveal";

const items = [
  {
    icon: CgLock,
    pain: "Leads go cold because nobody followed up.",
    fix: "Every new lead gets an owner and a timed follow-up task the moment it arrives.",
  },
  {
    icon: LuPenOff,
    pain: "Reps forget to update deal stages.",
    fix: "Stage changes fire from real activity, and stale deals nudge their owner automatically.",
  },
  {
    icon: FiEyeOff,
    pain: "Managers hear a deal died a week too late.",
    fix: "Notifications and a live activity trail surface risk while there's still time to act.",
  },
];

export default function Problems() {
  return (

    <section className="border-y border-border bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal as="h2" className="max-w-2xl text-3xl font-bold sm:text-4xl">
          Deals rarely die from bad selling. They die from silence.
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.pain} delay={i * 100}>
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card">
                <it.icon className="h-5 w-5 text-amber-foreground" />
              </span>
              <p className="mt-4 font-display text-lg font-semibold">{it.pain}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.fix}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
