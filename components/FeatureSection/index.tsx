import { BiBell, BiHistory, BiTargetLock } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { LuReceiptText } from "react-icons/lu";
import { PiKanbanBold } from "react-icons/pi";
import { Reveal } from "../Reveal";

const modules = [
    { icon: FaUserSecret, label: "Contacts", copy: "One record per person, with every call, email and deal attached to it." },
    { icon: BiTargetLock, label: "Leads", copy: "Capture, score and route inbound leads to an owner within seconds." },
    { icon: PiKanbanBold, label: "Deal pipeline", copy: "Drag deals through stages; values and forecasts recalculate as you go." },
    { icon: BiHistory, label: "Activity timeline", copy: "A chronological record of calls, notes, emails and stage changes per deal." },
    { icon: LuReceiptText, label: "Invoicing", copy: "Raise and track invoices from the won deal — no re-typing line items." },
    { icon: FiZap, label: "Automation", copy: "Rules that watch CRM events and act: email, task, assignment, alert." },
    { icon: BiBell, label: "Notifications", copy: "The right person gets pinged, in-app, when something needs them." },
    { icon: BsShieldCheck, label: "Audit & permissions", copy: "Six roles from rep to admin, plus a full log of who changed what." },
];

export function Features() {
    return (
        <section id="features" className="py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-foreground">Modules</p>
                    <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Everything the deal touches, in one place</h2>
                </Reveal>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {modules.map((m, i) => (
                        <Reveal
                            key={m.label}
                            delay={(i % 4) * 80}
                            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
                        >
                            <m.icon className="h-5 w-5 text-amber-foreground" />
                            <h3 className="mt-4 font-display text-base font-semibold">{m.label}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.copy}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
