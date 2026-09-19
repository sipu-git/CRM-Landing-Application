import { Reveal } from "../Reveal";

const quotes = [
  {
    img: "./testimonial/testimonial-1.jpg",
    quote:
      "[TESTIMONIAL — replace before launch] We cut our average follow-up time from two days to under an hour, because nobody has to remember to send anything.",
    name: "Dana Whitfield",
    role: "VP Sales",
    company: "Harbourline",
  },
  {
    img: "./testimonial/testimonial-2.jpg",
    quote:
      "[TESTIMONIAL — replace before launch] I stopped running a Monday pipeline meeting to find out what changed. I can see it as it happens.",
    name: "Marcus Ellery",
    role: "Founder",
    company: "Cadence Labs",
  },
  {
    img: "./testimonial/testimonial-3.jpg",
    quote:
      "[TESTIMONIAL — replace before launch] Migration took an afternoon. Four spreadsheets and 3,000 contacts came over clean, owners and all.",
    name: "Rina Takeda",
    role: "Sales Operations Manager",
    company: "Northwind Supply",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal as="h2" className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          What changes in the first month
        </Reveal>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 90}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)] transition-all hover:border-amber/30"
            >
              <p className="text-sm sm:text-base leading-relaxed break-words text-foreground">
                “{q.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border/40">
                <img
                  src={q.img}
                  alt={`${q.name}, ${q.role} at ${q.company}`}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-full object-cover border border-border"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{q.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {q.role}, {q.company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
