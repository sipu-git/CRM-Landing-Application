'use client'
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BiCheckCircle, BiUserPlus } from "react-icons/bi";
import { LuListChecks, LuMailCheck } from "react-icons/lu";
import { Reveal } from "../Reveal";
import { BsArrowRight } from "react-icons/bs";

const teamSizes = ["1–5 reps", "6–25 reps", "26–100 reps", "100+ reps"];
const sources = [
    "Website form",
    "Referral",
    "Outbound",
    "Event or conference",
    "Existing CRM import",
];

const whatHappens = [
    { icon: BiUserPlus, title: "Lead created & auto-assigned", detail: "Routed to a rep by your territory rules", time: "instantly" },
    { icon: LuMailCheck, title: "Intro email sent", detail: "Your inbound first-touch template", time: "instantly" },
    { icon: LuListChecks, title: "Follow-up task created", detail: "On the owner's list for tomorrow, 9:00 AM", time: "1 day later" },
    { icon: BiCheckCircle, title: "Stale check scheduled", detail: "Flagged to the manager if untouched", time: "3 days later" },
];

export function LeadForm() {
    const reduced = useReducedMotion();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        teamSize: teamSizes[1] as string,
        source: sources[0] as string,
        notes: "",
    });

    const set = (key: keyof typeof form) => (value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
            toast.error("Name, work email and company are required.");
            return;
        }
        setSubmitted(true);
        toast.success(`Lead created for ${form.company} — owner assigned and follow-up scheduled.`);
    };

    const field =
        "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25";

    return (
        <section id="lead-form" className="py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-foreground">
                        Try the capture step
                    </p>
                    <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                        Create a lead and watch the automation take over
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        This is the same form your website would post into Northpeak. Fill it in and you'll see
                        exactly what fires the moment a lead lands — assignment, first email, follow-up task, and
                        the stale check that catches it if nobody moves.
                    </p>

                    <ol className="mt-8 space-y-3">
                        {whatHappens.map((w, i) => (
                            <Reveal
                                as="li"
                                key={w.title}
                                delay={i * 100}
                                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
                            >
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent">
                                    <w.icon className="h-4 w-4 text-accent-foreground" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">{w.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">{w.detail}</p>
                                </div>
                                <span className="ml-auto shrink-0 text-[11px] font-medium text-amber-foreground">
                                    {w.time}
                                </span>
                            </Reveal>
                        ))}
                    </ol>
                </Reveal>

                <Reveal delay={100}>
                    <div className="rounded-2xl border border-white/10 p-6 shadow-[var(--shadow-float)] surface-ink">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="font-display text-lg font-semibold">New lead</h3>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-teal">
                                <span className="h-1.5 w-1.5 rounded-full bg-teal live-dot" /> Live
                            </span>
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            {submitted ? (
                                <motion.div
                                    key="done"
                                    initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="mt-6 rounded-xl border border-white/10 bg-ink-elevated/70 p-5"
                                >
                                    <BiCheckCircle className="h-6 w-6 text-teal" />
                                    <p className="mt-3 font-display text-lg font-semibold">
                                        {form.company} is in the pipeline
                                    </p>
                                    <p className="mt-2 text-sm text-ink-muted">
                                        Owner assigned from your {form.source.toLowerCase()} rule, intro email sent, and a
                                        follow-up task queued for tomorrow morning. In your real workspace this record
                                        appears on every teammate's board instantly.
                                    </p>
                                    <ol className="mt-5 space-y-2.5">
                                        {whatHappens.map((w, i) => (
                                            <motion.li
                                                key={w.title}
                                                initial={{ opacity: 0, x: reduced ? 0 : -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.25 + i * 0.35, duration: 0.4 }}
                                                className="flex items-center gap-2.5 text-sm"
                                            >
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                                                <span className="truncate">{w.title}</span>
                                                <span className="ml-auto shrink-0 text-[11px] tabular-nums text-ink-muted">
                                                    {w.time}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ol>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
                                    >
                                        Create another lead
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={onSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 grid gap-4"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Full name *</span>
                                            <input
                                                required
                                                value={form.name}
                                                onChange={(e) => set("name")(e.target.value)}
                                                placeholder="Dana Whitfield"
                                                className={cn(field, "text-foreground")}
                                            />
                                        </label>
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Work email *</span>
                                            <input
                                                required
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => set("email")(e.target.value)}
                                                placeholder="dana@harbourline.com"
                                                className={cn(field, "text-foreground")}
                                            />
                                        </label>
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Company *</span>
                                            <input
                                                required
                                                value={form.company}
                                                onChange={(e) => set("company")(e.target.value)}
                                                placeholder="Harbourline"
                                                className={cn(field, "text-foreground")}
                                            />
                                        </label>
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Phone</span>
                                            <input
                                                value={form.phone}
                                                onChange={(e) => set("phone")(e.target.value)}
                                                placeholder="+1 555 0134"
                                                className={cn(field, "text-foreground")}
                                            />
                                        </label>
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Sales team size</span>
                                            <select
                                                value={form.teamSize}
                                                onChange={(e) => set("teamSize")(e.target.value)}
                                                className={cn(field, "text-foreground")}
                                            >
                                                {teamSizes.map((t) => (
                                                    <option key={t}>{t}</option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Lead source</span>
                                            <select
                                                value={form.source}
                                                onChange={(e) => set("source")(e.target.value)}
                                                className={cn(field, "text-foreground")}
                                            >
                                                {sources.map((s) => (
                                                    <option key={s}>{s}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium text-ink-muted">What are they looking for?</span>
                                        <textarea
                                            rows={3}
                                            value={form.notes}
                                            onChange={(e) => set("notes")(e.target.value)}
                                            placeholder="Moving off spreadsheets, 12 reps, needs invoicing in the same place."
                                            className={cn(field, "resize-y text-foreground")}
                                        />
                                    </label>
                                    <motion.button
                                        type="submit"
                                        {...(reduced ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.985 } })}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-amber)] px-5 py-3.5 text-sm font-semibold text-amber-foreground"
                                    >
                                        Create lead <BsArrowRight className="h-4 w-4" />
                                    </motion.button>
                                    <p className="text-xs text-ink-muted">
                                        Demo form — nothing is stored. Want it wired to your workspace?{" "}
                                        <a
                                            href="mailto:sales@northpeak.app?subject=Northpeak%20lead%20capture"
                                            className="underline underline-offset-2"
                                        >
                                            Talk to us
                                        </a>
                                        .
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
