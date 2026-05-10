import { ExternalLink } from "lucide-react";

import { commonLinks } from "@/lib/data/visitor-info";
import { SectionHeading } from "./SectionHeading";

export function CommonLinks() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="Sık Kullanılan Bağlantılar"
          title="Resmi ve faydalı sağlık bağlantıları"
          description="Genel sağlık işlemleri ve resmi bilgilendirmeler için sık kullanılan kamu bağlantılarına hızlıca ulaşabilirsiniz."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commonLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border bg-background p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-start justify-between gap-4">
                {link.logoUrl ? (
                  <img 
                    src={link.logoUrl} 
                    alt={`${link.title} Logosu`} 
                    className="h-12 sm:h-16 w-auto object-contain drop-shadow-sm"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <link.icon aria-hidden className="h-6 w-6 text-primary" />
                  </span>
                )}
                <ExternalLink
                  aria-hidden
                  className="h-4 w-4 text-muted-foreground transition group-hover:text-primary"
                />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{link.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
