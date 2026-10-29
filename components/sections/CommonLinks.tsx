import { commonLinks } from "@/lib/data/visitor-info";
import { SectionHeading } from "./SectionHeading";

export function CommonLinks() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading eyebrow="Sık Kullanılan Bağlantılar" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {commonLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2 shadow-card transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.logoUrl ? (
                <img
                  src={link.logoUrl}
                  alt=""
                  className="h-6 w-auto max-w-16 shrink-0 object-contain"
                />
              ) : (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center text-primary">
                  <link.icon aria-hidden className="h-4 w-4" />
                </span>
              )}
              <span className="text-sm font-medium leading-5 text-foreground">
                {link.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
