/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — studio details
   Replace every value here with the studio's real information before launch.
   Anything still marked PLACEHOLDER is not real and must not be published.
   ========================================================================== */

export const SITE = {
  name: "GADELLAA ARTS TATTOO STUDIO",
  /** Compact wordmark for the nav bar and footer, where the full name won't fit. */
  shortName: "GADELLAA ARTS",
  /** The hero wordmark, one entry per line. */
  wordmark: ["Gadellaa Arts", "Tattoo Studio"],
  tagline: "Wear your ink.",
  positioning: "Premium tattoo studio",
  city: "Nyeri",
  country: "Kenya",
  region: "Nyeri County",
  locality: "Nyeri, Kenya",

  description:
    "GADELLAA ARTS TATTOO STUDIO is a tattoo studio in Nyeri, Kenya. Custom tattoos and body piercing — illustrative, fine line, floral, lettering and minimal work.",

  url: "https://gadella.co.ke", // PLACEHOLDER — set the studio's real domain

  contact: {
    email: "studio@gadella.co.ke", // PLACEHOLDER — the price list gives no email
    // Call or WhatsApp, from the studio's price list.
    phone: "0706 061 606",
    phoneHref: "tel:+254706061606",
    whatsapp: "https://wa.me/254706061606",
    address: "PLACEHOLDER — street address, Nyeri, Kenya",
    hours: "Tuesday – Saturday, 10:00 – 18:00 · By appointment",
  },

  social: [
    { label: "Instagram", handle: "@tattoos_by_gadellaa", href: "https://instagram.com/tattoos_by_gadellaa" },
    // The price list writes this as "tattoos by gadellaa" — confirm the exact TikTok handle.
    { label: "TikTok", handle: "@tattoos_by_gadellaa", href: "https://www.tiktok.com/@tattoos_by_gadellaa" },
  ],

  nav: [
    { label: "Work", to: "/work" },
    { label: "Studio", to: "/studio" },
    { label: "Prices", to: "/prices" },
    { label: "Artist", to: "/artist" },
    { label: "Book", to: "/booking" },
  ],
} as const;

/** Schema.org LocalBusiness — helps the studio surface for searches around Nyeri. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.contact.email,
    telephone: "+254 706 061 606",
    image: `${SITE.url}/images/work/tiger-shoulder.jpg`,
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
