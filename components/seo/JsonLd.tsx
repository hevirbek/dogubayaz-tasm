import { siteConfig } from "@/config/site";

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.asmName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.district,
      addressRegion: siteConfig.city,
      addressCountry: "TR"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00"
      }
    ],
    medicalSpecialty: "FamilyPractice"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
