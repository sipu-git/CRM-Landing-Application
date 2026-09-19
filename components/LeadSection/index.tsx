'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BiCheckCircle, BiUserPlus } from "react-icons/bi";
import { LuListChecks, LuMailCheck } from "react-icons/lu";
import { Reveal } from "../Reveal";
import { BsArrowRight } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { createProject } from "@/features/projects/slice";
import { createProjectClientSchema } from "@/features/projects/validate";
import type {
    CreateProjectPayload,
    Source,
    ProjectType,
} from "@/features/projects/types";
import { useContactAutofill } from "@/hooks/use-project";

const sources: { label: string; value: Source }[] = [
    { label: "Website form", value: "WEBSITE" },
    { label: "Referral", value: "REFERAL" },
    { label: "Social media", value: "SOCIAL_MEDIA" },
    { label: "Event or conference", value: "EVENT" },
    { label: "Webinar", value: "WEBINAR" },
    { label: "Other", value: "OTHER" },
];

const projectTypes: { label: string; value: ProjectType }[] = [
    { label: "Web Application", value: "Web_Application" },
    { label: "Mobile Application", value: "Mobile_Application" },
    { label: "Desktop Application", value: "Desktop_Application" },
    { label: "SaaS Platform", value: "SaaS_Platform" },
    { label: "AI / ML Application", value: "AI_ML_Application" },
    { label: "Automation System", value: "Automation_System" },
    { label: "IoT Application", value: "IoT_Application" },
];

const whatHappens = [
    {
        icon: BiUserPlus,
        title: "Project created & owner assigned",
        detail: "Company and contact linked automatically",
        time: "instantly",
    },
    {
        icon: LuMailCheck,
        title: "Intro email sent",
        detail: "Your inbound first-touch template",
        time: "instantly",
    },
    {
        icon: LuListChecks,
        title: "Follow-up task created",
        detail: "On the owner's list for tomorrow, 9:00 AM",
        time: "1 day later",
    },
    {
        icon: BiCheckCircle,
        title: "Stale check scheduled",
        detail: "Flagged to the manager if untouched",
        time: "3 days later",
    },
];

const initialForm = {
    companyId: "",
    contactId: "",
    company_name: "",
    source: sources[0].value as Source,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    designation: "",
    description: "",
    project_name: "",
    project_type: projectTypes[0].value as ProjectType,
    timeline: "",
    budget: "",
};

export function LeadForm() {
    const reduced = useReducedMotion();
    const dispatch = useAppDispatch();
    const { createStatus } = useAppSelector((state) => state.projects);

    const [submitted, setSubmitted] = useState(false);
    const [company, setCompany] = useState("");
    const [form, setForm] = useState(initialForm);

    const { match } = useContactAutofill(form.email);

    useEffect(() => {
        if (!match) return;

        setForm((f) => ({
            ...f,
            contactId: match.contactId,
            first_name: match.first_name ?? f.first_name,
            last_name: match.last_name ?? f.last_name,
            companyId: match.companyId ?? f.companyId,
            company_name: match.company?.name ?? f.company_name,
            contact_phone: match.phone ?? f.phone,
            designation: match.designation ?? f.designation,
        }));
    }, [match]);

    const set = (key: keyof typeof form) => (value: string) =>
        setForm((f) => ({ ...f, [key]: value }));

    const submitting = createStatus === "loading";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: CreateProjectPayload = {
            company_name: form.company_name.trim(),
            source: form.source,
            first_name: form.first_name.trim() || undefined,
            last_name: form.last_name.trim() || undefined,
            email: form.email.trim() || undefined,
            phone: form.phone.trim() || undefined,
            designation: form.designation.trim() || undefined,
            description: form.description.trim() || undefined,
            project_name: form.project_name.trim(),
            project_type: form.project_type,
            timeline: form.timeline.trim() || undefined,
            budget: form.budget.trim() || undefined,
            // owner_id: form.owner_id.trim() || undefined,
        };

        const parsed = createProjectClientSchema.safeParse(payload);

        if (!parsed.success) {
            toast.error(
                parsed.error.issues[0]?.message ??
                "Please check the form fields."
            );
            return;
        }

        const result = await dispatch(createProject(payload));

        if (createProject.fulfilled.match(result)) {
            setCompany(form.company_name);
            setSubmitted(true);

            toast.success(
                `${form.company_name} is in the pipeline — project created.`
            );
        } else {
            toast.error(
                (result.payload as string) ??
                "Could not create the project. Please try again."
            );
        }
    };

    const field = "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25";

    return (
        <section id="lead-form" className="py-24 w-full">
            <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-6 lg:px-8 grid-cols-1 md:grid-cols-2 items-start">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-foreground">
                        Try the capture step
                    </p>

                    <h2 className="mt-4 text-2xl font-bold sm:text-4xl">
                        Create a project and watch the automation take over
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        This is the same form your team uses to bring on a new
                        client. Fill it in and you'll see exactly what fires
                        the moment a project lands — company and contact
                        created, owner assigned, first email, follow-up task,
                        and the stale check that catches it if nobody moves.
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
                                    <p className="truncate text-sm font-semibold">
                                        {w.title}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                        {w.detail}
                                    </p>
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
                            <h3 className="font-display text-lg font-semibold">
                                New project
                            </h3>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-teal">
                                <span className="h-1.5 w-1.5 rounded-full bg-teal live-dot" />
                                Live
                            </span>
                        </div>

                        <AnimatePresence mode="wait" initial={false}>
                            {submitted ? (
                                <motion.div
                                    key="done"
                                    initial={{
                                        opacity: 0,
                                        y: reduced ? 0 : 14,
                                    }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="mt-6 rounded-xl border border-white/10 bg-ink-elevated/70 p-5"
                                >
                                    <BiCheckCircle className="h-6 w-6 text-teal" />

                                    <p className="mt-3 font-display text-lg font-semibold">
                                        {company} is in the pipeline
                                    </p>

                                    <p className="mt-2 text-sm text-ink-muted">
                                        Company and contact were created, owner
                                        assigned, intro email sent, and a
                                        follow-up task queued for tomorrow
                                        morning. In your real workspace this
                                        record appears on every teammate's
                                        board instantly.
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

                                                <span className="min-w-0 flex-1 truncate">
                                                    {w.title}
                                                </span>

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
                                    <div className="">
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Contact email
                                            </span>

                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) =>
                                                    set("email")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="dana@harbourline.com"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Company *
                                            </span>

                                            <input required value={form.company_name}
                                                onChange={(e) =>
                                                    set("company_name")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Harbourline"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Lead source *
                                            </span>

                                            <select
                                                required
                                                value={form.source}
                                                onChange={(e) =>
                                                    set("source")(
                                                        e.target.value
                                                    )
                                                }
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            >
                                                {sources.map((s) => (
                                                    <option
                                                        key={s.value}
                                                        value={s.value}
                                                    >
                                                        {s.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                First name
                                            </span>

                                            <input
                                                value={form.first_name}
                                                onChange={(e) =>
                                                    set("first_name")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Dana"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Last name
                                            </span>

                                            <input
                                                value={form.last_name}
                                                onChange={(e) =>
                                                    set("last_name")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Whitfield"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>


                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Contact phone
                                            </span>

                                            <input
                                                value={form.phone}
                                                onChange={(e) =>
                                                    set("phone")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="+1 555 0134"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Designation
                                            </span>

                                            <input
                                                value={form.designation}
                                                onChange={(e) =>
                                                    set("designation")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="VP of Sales"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Project name *
                                            </span>

                                            <input
                                                required
                                                value={form.project_name}
                                                onChange={(e) =>
                                                    set("project_name")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Website redesign"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Project type *
                                            </span>

                                            <select
                                                required
                                                value={form.project_type}
                                                onChange={(e) =>
                                                    set("project_type")(
                                                        e.target.value
                                                    )
                                                }
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            >
                                                {projectTypes.map((type) => (
                                                    <option
                                                        key={type.value}
                                                        value={type.value}
                                                    >
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Timeline
                                            </span>

                                            <input
                                                value={form.timeline}
                                                onChange={(e) =>
                                                    set("timeline")(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="3 months"
                                                className={cn(
                                                    field,
                                                    "text-foreground"
                                                )}
                                            />
                                        </label>

                                        <label className="grid gap-1.5">
                                            <span className="text-xs font-medium text-ink-muted">
                                                Budget
                                            </span>

                                            <input
                                                type="text"
                                                // min="0"
                                                value={form.budget}
                                                onChange={(e) => set("budget")(e.target.value)}
                                                placeholder="25000"
                                                className={cn(field,"text-foreground")}
                                            />
                                        </label>
                                    </div>
                                    <label className="grid gap-1.5">
                                        <span className="text-xs font-medium text-ink-muted">Description</span>
                                        <textarea
                                            value={form.description}
                                            onChange={(e) => set("description")(e.target.value)}
                                            placeholder="Brief project description"
                                            rows={4}
                                            className={cn(field, "text-foreground")}
                                        />
                                    </label>
                                    <motion.button
                                        type="submit"
                                        disabled={submitting}
                                        {...(reduced
                                            ? {}
                                            : {
                                                whileHover: { y: -2 },
                                                whileTap: {
                                                    scale: 0.985,
                                                },
                                            })}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-amber)] px-5 py-3.5 text-sm font-semibold text-amber-foreground disabled:opacity-70"
                                    >
                                        {submitting
                                            ? "Creating…"
                                            : "Project Enquiry"}

                                        <BsArrowRight className="h-4 w-4" />
                                    </motion.button>

                                    <p className="text-xs text-ink-muted">
                                        This creates a real project in your
                                        workspace. Need help getting set up?{" "}
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
