
import { FiUploadCloud } from "react-icons/fi";
import { Reveal } from "../Reveal";
import { BiPlug } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { BsHeadphones } from "react-icons/bs";

const services = [
    { icon: FiUploadCloud, title: "Onboarding & data migration", copy: "We map and import your spreadsheets or old CRM export, contacts and open deals included." },
    { icon: BiPlug, title: "Integration support", copy: "Email and calendar sync, plus help wiring Northpeak to the tools your team already uses." },
    { icon: FaGraduationCap, title: "Team training", copy: "Live sessions for reps and managers, with role-specific walkthroughs and recordings to keep." },
    { icon: BsHeadphones, title: "Ongoing support", copy: "Email on Starter, priority email and chat on Growth, a named success manager on Enterprise." },
];

export function Services() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal className="max-w-2xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">Switching CRMs is the hard part. That bit's on us.</h2>
                    <p className="mt-4 text-base text-muted-foreground">
                        Beyond the software, every plan comes with people who get your team moved over and running.
                    </p>
                </Reveal>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s, i) => (
                        <Reveal key={s.title} delay={(i % 4) * 80} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent">
                                <s.icon className="h-5 w-5 text-accent-foreground" />
                            </span>
                            <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
