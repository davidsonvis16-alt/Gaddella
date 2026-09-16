/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — the artist
   --------------------------------------------------------------------------
   The studio has one artist, who does every tattoo and piercing.
   The name is taken from the studio's Instagram (@tattoos_by_gadellaa) —
   confirm it, and fill in `since`, before launch.
   ========================================================================== */

import { SITE } from "./site";

export type Artist = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  /** A second, longer paragraph for the artist's page. */
  note: string;
  since: string;
  instagram?: string;
};

export const ARTIST: Artist = {
  id: "gadellaa",
  name: "Gadellaa",
  role: "Founder · Tattoo & piercing artist",
  specialties: ["Illustrative", "Fine line", "Floral", "Lettering", "Minimal", "Body piercing"],
  bio: "Every tattoo and piercing in the studio, from one pair of hands.",
  note: "From a small name in script to a full chest piece or a set of ear piercings, every session is handled start to finish by the same artist — the consultation, the design and the aftercare.",
  since: "PLACEHOLDER",
  instagram: SITE.social[0].href,
};
