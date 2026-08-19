'use client'
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BiCheckCircle, BiUserPlus } from "react-icons/bi";
import { LuListChecks, LuMailCheck } from "react-icons/lu";
import { Reveal } from "../Reveal";
import { BsArrowRight } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/stores/hooks"; // adjust to your actual typed-hooks path
import { createProject } from "@/features/projects/slice"; // adjust to your actual slice path
import { createProjectClientSchema } from "@/features/projects/validate"; // adjust path
import type { CreateProjectPayload, Source } from "@/features/projects/types"; // adjust path

const sources: { label: string; value: Source }[] = [
    { label: "Website form", value: "WEBSITE" },
    { label: "Referral", value: "REFERAL" },
    { label: "Social media", value: "SOCIAL_MEDIA" },
    { label: "Event or conference", value: "EVENT" },
    { label: "Webinar", value: "WEBINAR" },
    { label: "Other", value: "OTHER" },
];

const whatHappens = [
    { icon: BiUserPlus, title: "Project created & owner assigned", detail: "Company and contact linked automatically", time: "instantly" },
    { icon: LuMailCheck, title: "Intro email sent", detail: "Your inbound first-touch template", time: "instantly" },
    { icon: LuListChecks, title: "Follow-up task created", detail: "On the owner's list for tomorrow, 9:00 AM", time: "1 day later" },
    { icon: BiCheckCircle, title: "Stale check scheduled", detail: "Flagged to the manager if untouched", time: "3 days later" },
];

const initialForm = {
    full_name: "",
    email: "",
    company: "",
    phone: "",
    designation: "",
    project_name: "",
    source: sources[0].value as Source,
    notes: "",
};

export function LeadForm() {
    const reduced = useReducedMotion();
    const dispatch = useAppDispatch();
    const { createStatus } = useAppSelector((state) => state.projects);
    const [submitted, setSubmitted] = useState(false);
    const [company, setCompany] = useState("");
    const [form, setForm] = useState(initialForm);

    const set = (key: keyof typeof form) => (value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    const submitting = createStatus === "loading";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const [first_name, ...rest] = form.full_name.trim().split(" ");
        const last_name = rest.join(" ") || undefined;

        const payload: CreateProjectPayload = {
            company_name: form.company.trim(),
            source: form.source,
            first_name,
            last_name,
            contact_email: form.email.trim() || undefined,
            contact_phone: form.phone.trim() || undefined,
            designation: form.designation.trim() || undefined,
            project_name: form.project_name.trim(),
        };

        const parsed = createProjectClientSchema.safeParse(payload);
        if (!parsed.success) {
            toast.error(parsed.error.issues[0]?.message ?? "Please check the form fields.");
            return;
        }

        const result = await dispatch(createProject(payload));
        if (createProject.fulfilled.match(result)) {
            setCompany(form.company);
            setSubmitted(true);
            toast.success(`${form.company} is in the pipeline — project created.`);
        } else {
            toast.error((result.payload as string) ?? "Could not create the project. Please try again.");
        }
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
                        Create a project and watch the automation take over
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        This is the same form your team uses to bring on a new client. Fill it in and you'll see
                        exactly what fires the moment a project lands — company and contact created, owner
                        assigned, first email, follow-up task, and the stale check that catches it if nobody moves.
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
                            <h3 className="font-display text-lg font-semibold">New project</h3>
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
                                        {company} is in the pipeline
                                    </p>
                                    <p className="mt-2 text-sm text-ink-muted">
                                        Company and contact were created, owner assigned, intro email sent, and a
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
                                        onClick={() => {
                                            setSubmitted(false);
                                            setForm(initialForm);
                                        }}
                                        className="mt-6 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
                                    >
                                        Create another project
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
                                                value={form.full_name}
                                                onChange={(e) => set("full_name")(e.target.value)}
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
                                            <span className="text-xs font-medium text-ink-muted">Project name *</span>
                                            <input
                                                required
                                                value={form.project_name}
                                                onChange={(e) => set("project_name")(e.target.value)}
                                                placeholder="Website redesign"
                                                className={cn(field, "text-foreground")}
                                            />
                                        </label>
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">Designation</span>
                                            <input
                                                value={form.designation}
                                                onChange={(e) => set("designation")(e.target.value)}
                                                placeholder="VP of Sales"
                                                className={cn(field, "text-foreground")}
                                            />
                                        </label>
                                        <label className="grid gap-1.5 sm:col-span-2">
                                            <span className="text-xs font-medium text-ink-muted">Lead source</span>
                                            <select
                                                value={form.source}
                                                onChange={(e) => set("source")(e.target.value)}
                                                className={cn(field, "text-foreground")}
                                            >
                                                {sources.map((s) => (
                                                    <option key={s.value} value={s.value}>
                                                        {s.label}
                                                    </option>
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
                                        disabled={submitting}
                                        {...(reduced ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.985 } })}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-amber)] px-5 py-3.5 text-sm font-semibold text-amber-foreground disabled:opacity-70"
                                    >
                                        {submitting ? "Creating…" : "Create project"} <BsArrowRight className="h-4 w-4" />
                                    </motion.button>
                                    <p className="text-xs text-ink-muted">
                                        This creates a real project in your workspace. Need help getting set up?{" "}
                                        <a
                                            href="mailto:sales@northpeak.app?subject=Northpeak%20project%20setup"
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