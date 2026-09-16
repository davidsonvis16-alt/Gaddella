/* ==========================================================================
   GADELLA — artists
   --------------------------------------------------------------------------
   EVERY ARTIST BELOW IS A PLACEHOLDER. The names, biographies and years are
   written as structure, not as fact — they describe nobody. Replace each
   record with a real artist before the site goes live, and set
   `placeholder: false` once you have.
   ========================================================================== */

import type { ImageId } from "./images";

export type Artist = {
  id: string;
  name: string;
  /** Shown in the tight index list, e.g. "W. M." */
  short: string;
  role: string;
  specialties: string[];
  bio: string;
  /** A second, longer paragraph for the artist's own page. */
  note: string;
  imageId: ImageId;
  since: string;
  instagram?: string;
  /** Marks the record as not-yet-real. Keep true until it describes a person. */
  placeholder: boolean;
};

export const ARTISTS: Artist[] = [
  {
    id: "Artist1",
    name: "Artist1.",
    short: "Artist1.",
    role: "Founder · Resident artist",
    specialties: ["Blackwork", "Realism"],
    bio: "Heavy blackwork built around the space it leaves behind.",
    note: "Works large and slowly, usually across several sittings. Prefers to design on the body rather than from a flat stencil, and will turn down an idea that does not suit the placement.",
    imageId: "artist01",
    since: "PLACEHOLDER",
    instagram: "https://instagram.com/",
    placeholder: true,
  },
  {
    id: "Artist2",
    name: "Artist2.",
    short: "Arist2.",
    role: "Resident artist",
    specialties: ["Fine line", "Minimal"],
    bio: "Fine line work where the restraint is the point.",
    note: "Single-needle and micro-realist pieces, often small and deliberately quiet. Spends as long on placement as on the drawing itself.",
    imageId: "artist02",
    since: "PLACEHOLDER",
    instagram: "https://instagram.com/",
    placeholder: true,
  },
  {
    id: "Artist3",
    name: "Artist3",
    short: "Artist3",
    role: "Resident artist",
    specialties: ["Neo traditional", "Illustrative"],
    bio: "Illustrative pieces with a firm, confident line.",
    note: "Draws everything by hand before it reaches skin. Enjoys narrative work — pieces that carry a figure, an animal, or a scene the client has been carrying around for years.",
    imageId: "artist03",
    since: "PLACEHOLDER",
    instagram: "https://instagram.com/",
    placeholder: true,
  },
  {
    id: "Artist4",
    name: "Artist4.",
    short: "Artist4.",
    role: "Resident artist",
    specialties: ["Black & grey", "Realism"],
    bio: "Black and grey realism, patient with gradients.",
    note: "Portrait and object realism in black and grey. Builds tone in layers across sessions rather than forcing it in one, which is why the healed work holds.",
    imageId: "artist04",
    since: "PLACEHOLDER",
    instagram: "https://instagram.com/",
    placeholder: true,
  },
];

export const getArtist = (id: string): Artist | undefined => ARTISTS.find((a) => a.id === id);
