"use client";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { FaMountain } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const columns = [{
    title: "Product",
    links: [
      { label: "Modules", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "mailto:hello@northpeak.app" },
      { label: "Book a demo", href: "mailto:sales@northpeak.app?subject=Northpeak%20demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Migration guide", href: "/guides/migration" },
      { label: "Docs", href: "/docs" },
      { label: "Support", href: "mailto:support@northpeak.app" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Data processing", href: "/dpa" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl surface-ink">
                <FaMountain className="h-4.5 w-4.5 text-amber" />
              </span>
              <span className="font-display text-lg font-bold">Northpeak</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A multi-tenant CRM with a real automation engine and live collaboration, for small and
              mid-size sales teams.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: LiaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: BsTwitter, href: "https://twitter.com", label: "X" },
                { Icon: BsGithub, href: "https://github.com", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-semibold">{col.title}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Northpeak. Hosted on Render with AWS RDS Postgres.
        </p>
      </div>
    </footer>
  );
}
