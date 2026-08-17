import { LuKeyRound, LuScrollText, LuServerCog } from "react-icons/lu";
import { Reveal } from "../Reveal";
import { Lock } from "lucide-react";

const items = [
    { icon: Lock, title: "Multi-tenant isolation", copy: "Every tenant's records are scoped at the data layer. Your data never sits in another company's view." },
    { icon: LuKeyRound, title: "Role-based permissions", copy: "Six roles from rep to admin: reps see their book, managers see the whole floor." },
    { icon: LuScrollText, title: "Full audit trail", copy: "Who changed what, when, and from where — on contacts, deals and invoices alike." },
    { icon: LuServerCog, title: "Production infrastructure", copy: "Hosted on Render with managed AWS RDS Postgres, with automated backups and encryption in transit." },
];

export function Security() {
    return (
        <section className="border-y border-border bg-secondary/60 py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal className="max-w-2xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">Your customer data, handled properly</h2>
                    <p className="mt-4 text-base text-muted-foreground">
                        You're putting your entire revenue history into this. Here's exactly how it's protected.
                    </p>
                </Reveal>
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {items.map((it, i) => (
                        <Reveal key={it.title} delay={(i % 2) * 90} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                            <span className="mt-0.5 h-5 w-5 shrink-0 text-amber-foreground" />
                            <div className="min-w-0">
                                <h3 className="font-display text-base font-semibold">{it.title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.copy}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
