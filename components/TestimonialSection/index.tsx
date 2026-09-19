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
    <section className="lg:py-24 py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 md:px-6 lg:px-8 grid-cols-1 items-start">
        <Reveal as="h2" className="max-w-2xl text-3xl font-bold sm:text-4xl">
          What changes in the first month
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 90}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-base leading-relaxed">“{q.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={q.img}
                  alt={`${q.name}, ${q.role} at ${q.company}`}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{q.name}</p>
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
