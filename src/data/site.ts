/* ==========================================================================
   GADELLA — studio details
   Replace every value here with the studio's real information before launch.
   Anything still marked PLACEHOLDER is not real and must not be published.
   ========================================================================== */

export const SITE = {
  name: "GADELLA",
  tagline: "Real art. Lasts longer.",
  positioning: "Premium tattoo studio",
  city: "Nyeri",
  country: "Kenya",
  region: "Nyeri County",
  locality: "Nyeri, Kenya",

  description:
    "GADELLA is a premium tattoo studio in Nyeri, Kenya. Custom fine line, blackwork, realism and minimal tattoos, made with intention by artists who take the work seriously.",

  url: "https://gadella.co.ke", // PLACEHOLDER — set the studio's real domain

  contact: {
    // PLACEHOLDER — replace with the studio's real details
    email: "studio@gadella.co.ke",
    phone: "+254 700 000 000",
    address: "PLACEHOLDER — street address, Nyeri, Kenya",
    hours: "Tuesday – Saturday, 10:00 – 18:00 · By appointment",
  },

  social: [
    { label: "Instagram", handle: "@gadella.tattoo", href: "https://instagram.com/" }, // PLACEHOLDER
    { label: "TikTok", handle: "@gadella.tattoo", href: "https://tiktok.com/" }, // PLACEHOLDER
  ],

  nav: [
    { label: "Work", to: "/work" },
    { label: "Studio", to: "/studio" },
    { label: "Artists", to: "/artists" },
    { label: "Book", to: "/booking" },
  ],
} as const;

/** Schema.org LocalBusiness — helps GADELLA surface for searches around Nyeri. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.contact.email,
    telephone: SITE.contact.phone,
    image: `${SITE.url}/images/plates/og.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "KE",
    },
    areaServed: { "@type": "City", name: SITE.city },
    openingHours: "Tu-Sa 10:00-18:00",
    sameAs: SITE.social.map((s) => s.href),
  };
}
