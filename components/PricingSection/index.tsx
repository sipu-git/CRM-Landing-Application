'use client'
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";
import { BiCheck } from "react-icons/bi";

const rows = [
    "Best for",
    "Seats",
    "Pipelines",
    "Automation",
    "Real-time collaboration",
    "Roles & permissions",
    "Support",
] as const;

const tiers = [
    {
        name: "Starter",
        monthly: 29,
        annual: 24,
        cta: "Start free trial",
        href: "/signup?plan=starter",
        values: [
            "Small teams getting started",
            "Up to 5",
            "1",
            "Basic rules",
            true,
            "Basic",
            "Email",
        ],
    },
    {
        name: "Growth",
        monthly: 79,
        annual: 65,
        popular: true,
        cta: "Start free trial",
        href: "/signup?plan=growth",
        values: [
            "Growing sales teams",
            "Up to 25",
            "Unlimited",
            "Full automation engine",
            true,
            "Full RBAC",
            "Priority email + chat",
        ],
    },
    {
        name: "Enterprise",
        monthly: null,
        annual: null,
        cta: "Talk to sales",
        href: "mailto:sales@northpeak.app?subject=Northpeak%20Enterprise",
        values: [
            "Larger orgs, custom needs",
            "Unlimited",
            "Unlimited",
            "Full automation + custom rules",
            true,
            "Full RBAC + custom roles",
            "Dedicated success manager",
        ],
    },
];

export function Pricing() {
    const [annual, setAnnual] = useState(true);

    return (
        <section id="pricing" className="border-y border-border bg-secondary/60 py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal className="max-w-2xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">Pricing that tracks how your team grows</h2>
                    <p className="mt-4 text-base text-muted-foreground">
                        Per user, per month. Seats, automation depth and support are what change between plans.
                    </p>
                </Reveal>

                <Reveal delay={80} className="mt-8 inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
                    {(["Monthly", "Annual"] as const).map((label) => {
                        const isAnnual = label === "Annual";
                        return (
                            <button
                                key={label}
                                onClick={() => setAnnual(isAnnual)}
                                aria-pressed={annual === isAnnual}
                                className={cn(
                                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                    annual === isAnnual ? "bg-ink text-ink-foreground" : "text-muted-foreground",
                                )}
                            >
                                {label}
                                {isAnnual && (
                                    <span className={cn("ml-1.5 text-xs", annual ? "text-amber" : "text-amber-foreground")}>
                                        −18%
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </Reveal>

                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                    {tiers.map((t, i) => (
                        <Reveal
                            key={t.name}
                            delay={i * 90}
                            className={cn(
                                "flex flex-col rounded-2xl border p-6",
                                t.popular
                                    ? "border-transparent shadow-[var(--shadow-float)] surface-ink"
                                    : "border-border bg-card shadow-[var(--shadow-card)]",
                            )}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-display text-xl font-bold">{t.name}</h3>
                                {t.popular && (
                                    <span className="shrink-0 rounded-full bg-[image:var(--gradient-amber)] px-2.5 py-1 text-[11px] font-semibold text-amber-foreground">
                                        Most popular
                                    </span>
                                )}
                            </div>
                            <p className="mt-4 font-display text-4xl font-bold">
                                {t.monthly === null ? (
                                    "Custom"
                                ) : (
                                    <>
                                        ${annual ? t.annual : t.monthly}
                                        <span className={cn("text-sm font-medium", t.popular ? "text-ink-muted" : "text-muted-foreground")}>
                                            /user/mo
                                        </span>
                                    </>
                                )}
                            </p>
                            <ul className="mt-6 space-y-3 text-sm">
                                {rows.map((row, idx) => (
                                    <li key={row} className="flex items-start justify-between gap-4">
                                        <span className={t.popular ? "text-ink-muted" : "text-muted-foreground"}>{row}</span>
                                        <span className="text-right font-medium">
                                            {t.values[idx] === true ? <BiCheck className="ml-auto h-4 w-4 text-teal" /> : String(t.values[idx])}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={t.href}
                                className={cn("mt-7 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5", t.popular
                                    ? "bg-[image:var(--gradient-amber)] text-amber-foreground"
                                    : "bg-ink text-ink-foreground",
                                )}
                            >
                                {t.cta}
                            </a>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={120} className="mt-6 text-sm text-muted-foreground">
                    No credit card required to start · Cancel anytime · Export your data whenever you like
                </Reveal>
            </div>
        </section>
    );
}
