import {Accordion,AccordionContent, AccordionItem,AccordionTrigger} from "@/components/ui/accordion";
import { Reveal } from "../Reveal";

const faqs = [
    {
        q: "How hard is migrating from our current CRM?",
        a: "Export a CSV from your existing tool and we map the columns with you — contacts, companies, open deals and owners. Most teams are live within a day, and we run the import on a sandbox tenant first so you can check it before it goes anywhere near your live data.",
    },
    {
        q: "What happens to the spreadsheets we run today?",
        a: "They come in as-is. Each sheet becomes a set of contacts, leads or deals, and columns we don't recognise are kept as custom fields rather than dropped. You can keep exporting to CSV any time if a spreadsheet is still part of someone's routine.",
    },
    {
        q: "Can automation be turned off or adjusted?",
        a: "Every rule is individually switchable, editable and scopeable to a single pipeline or team. Nothing runs until you enable it, and any action the engine takes is written to the activity timeline so you can see exactly what fired and why.",
    },
    {
        q: "How is our data kept separate from other companies?",
        a: "Northpeak is multi-tenant with isolation enforced at the data layer, so every query is scoped to your tenant. Combined with six role levels, a rep can only reach the records their role allows.",
    },
    {
        q: "Do you have security certifications?",
        a: "We don't currently hold SOC 2 or ISO 27001. What we do have: encryption in transit, managed AWS RDS Postgres with automated backups, role-based access control and a complete audit trail. We're happy to walk your security reviewer through the setup.",
    },
    {
        q: "What's the cancellation policy?",
        a: "Monthly plans cancel any time and run to the end of the billing period. Annual plans can be cancelled at renewal. Either way you can export all of your data before you go — it stays yours.",
    },
];

export function Faq() {
    return (
        <section id="faq" className="border-t border-border bg-secondary/60 py-24">
            <div className="mx-auto grid max-w-5xl gap-10 px-5 lg:px-8">
                <Reveal as="h2" className="text-3xl font-bold sm:text-4xl">
                    Questions buyers actually ask
                </Reveal>
                <Reveal delay={80}>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((f) => (
                            <AccordionItem key={f.q} value={f.q}>
                                <AccordionTrigger className="text-left font-display text-base font-semibold">
                                    {f.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                                    {f.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Reveal>
            </div>
        </section>
    );
}
