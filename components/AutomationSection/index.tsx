'use client';
import { useEffect, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import { FiAlertTriangle, FiZap } from "react-icons/fi";
import { BiUserCheck } from "react-icons/bi";
import { LuListChecks, LuMailCheck } from "react-icons/lu";

const feed = [
    { icon: BiUserCheck, title: "Lead auto-assigned", detail: "Sunfield Solutions → Priya N.", time: "09:41" },
    { icon: LuMailCheck, title: "Follow-up email sent", detail: "Sequence: proposal nudge, step 2", time: "09:41" },
    { icon: LuListChecks, title: "Task created", detail: "Call Alpine Industries — due 9:00 AM", time: "09:44" },
    { icon: FiAlertTriangle, title: "Deal flagged stale", detail: "Global Heights untouched 3 days", time: "09:52" },
];

export function Automation() {
    const ref = useRef<HTMLDivElement | null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (e) => {
                if (e[0]?.isIntersecting) {
                    io.disconnect();
                    feed.forEach((_, i) => setTimeout(() => setCount(i + 1), i * 550));
                }
            },
            { threshold: 0.3 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section className="border-y border-border bg-secondary/60 py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:px-8">
                <Reveal>
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-foreground">
                        <FiZap className="h-4 w-4" /> Automation engine
                    </p>
                    <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                        You set the goal. Northpeak works out the how.
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        Rules are written the way you'd say them out loud. The engine listens to CRM events in real
                        time, decides which rules apply to that specific deal, and takes the action itself —
                        adjusting timing based on what the contact has already received so nobody gets double-emailed.
                    </p>
                    <div className="mt-7 rounded-2xl border border-border bg-card p-5 shadow-(--shadow-card">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Example rule
                        </p>
                        <p className="mt-2 font-display text-lg leading-snug">
                            “When a deal sits untouched for <span className="text-amber-grad">3 days</span>,
                            automatically create a follow-up task for the owner.”
                        </p>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                        Every rule can be paused, edited or scoped to one pipeline. Nothing fires that you didn't
                        switch on.
                    </p>
                </Reveal>

                <Reveal delay={100}>
                    <div
                        ref={ref}
                        className="rounded-2xl border border-white/10 p-5 shadow-(--shadow-float) surface-ink sm:p-6"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-base font-semibold">Activity feed</h3>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-teal">
                                <span className="h-1.5 w-1.5 rounded-full bg-teal live-dot" /> Live
                            </span>
                        </div>
                        <ol className="mt-5 space-y-3">
                            {feed.map((f, i) => (
                                <li
                                    key={f.title}
                                    data-shown={i < count}
                                    className="reveal flex items-start gap-3 rounded-xl border border-white/10 bg-ink-elevated/70 p-3.5"
                                >
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber/15">
                                        <f.icon className="h-4 w-4 text-amber" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold">{f.title}</p>
                                        <p className="truncate text-xs text-ink-muted">{f.detail}</p>
                                    </div>
                                    <span className="ml-auto shrink-0 text-[11px] tabular-nums text-ink-muted">
                                        {f.time}
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
