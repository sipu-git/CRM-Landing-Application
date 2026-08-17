import { Reveal } from "../Reveal";

export function Realtime() {
    return (
        <section className="py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
                <Reveal className="relative">
                    <img
                        src="./collaboration/collaboration.jpg"
                        alt="Two colleagues reviewing the same deal record on a shared laptop screen"
                        width={1400}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-float)]"
                    />
                    <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:absolute sm:-bottom-8 sm:right-4 sm:mt-0 sm:w-64">
                        <div className="flex items-center gap-2">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-amber text-[11px] font-bold text-amber-foreground">MR</span>
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[11px] font-bold text-ink-foreground">JD</span>
                            <span className="text-xs text-muted-foreground">both viewing</span>
                        </div>
                        <p className="mt-3 text-sm font-semibold">Velocity Networks · $80,000</p>
                        <p className="mt-1 text-xs text-teal">Stage → Negotiation, just now</p>
                    </div>
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        No more “is this still current?” Slack messages.
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        When one teammate edits a deal, everyone else looking at it sees the change land instantly —
                        stage, amount, owner, notes. Two people can work the same account without overwriting each
                        other or comparing screenshots afterwards.
                    </p>
                    <ul className="mt-7 grid gap-3 text-sm">
                        {[
                            "Live presence: see who else has the record open",
                            "Edits, notes and stage moves stream in without a refresh",
                            "Notifications route to the person who actually owns the next step",
                        ].map((t) => (
                            <li key={t} className="flex gap-3 rounded-xl border border-border bg-card p-3.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                                {t}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
