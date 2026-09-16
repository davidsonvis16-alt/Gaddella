/* ==========================================================================
   GADELLA — image configuration layer
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT TO PUT THE STUDIO'S OWN PHOTOGRAPHY ON THE SITE.

   Every image on the site is a *slot*. A slot ships with `src: null`, which
   renders a clearly marked placeholder plate (public/images/plates/*.svg) —
   a neutral charcoal field stamped "GADELLA · IMAGE SLOT". Nothing on this
   site claims to be GADELLA's work until GADELLA puts it here.

   To publish a real photograph:
     1. Drop the file in  public/images/  (e.g. public/images/hero.jpg)
     2. Set  src: "/images/hero.jpg"  on the matching slot below
     3. Update `alt` to describe that specific photograph
     4. If the photo is licensed from a third party, fill in `credit`

   Optionally provide `srcSet` for responsive delivery, e.g.
     srcSet: "/images/hero-1200.jpg 1200w, /images/hero-2400.jpg 2400w"

   `brief` is the art direction for each slot — what to shoot, and why.
   ========================================================================== */

export type ImageCredit = {
  /** Where the file came from — "GADELLA" for the studio's own work. */
  source: string;
  author?: string;
  /** Link back to the original, required by most third-party licences. */
  sourceUrl?: string;
  /** e.g. "CC BY 4.0", "Unsplash License", "© GADELLA — all rights reserved" */
  license?: string;
  licenseUrl?: string;
};

export type ImageSlot = {
  id: string;
  /** null → the marked placeholder plate is used. Set a path to go live. */
  src: string | null;
  srcSet?: string;
  sizes?: string;
  /** Fallback plate, always present so the layout can never break. */
  plate: string;
  /** Describes the *image*, not the slot. Rewrite when you set `src`. */
  alt: string;
  /** Art direction for whoever shoots or selects the replacement. */
  brief: string;
  /** width / height — reserves space so nothing shifts while loading. */
  aspect: number;
  /** object-position, for crops that need a specific anchor. */
  focal?: string;
  credit?: ImageCredit | null;
};

const plate = (name: string) => `/images/plates/${name}.svg`;

export const IMAGES = {
  /* ---- hero ------------------------------------------------------------ */
  hero: {
    id: "hero",
    src: null,
    plate: plate("hero"),
    alt: "GADELLA tattoo studio in Nyeri — placeholder image slot.",
    brief:
      "Landscape. An artist mid-session, working on a client's forearm. Dark studio, single warm key light from the left, black clothing, machine and ink caps in frame. Shoot wide with the subject off-centre right so the headline can sit in the left third.",
    aspect: 2400 / 1350,
    focal: "60% 50%",
    credit: null,
  },
  heroPortrait: {
    id: "heroPortrait",
    src: null,
    plate: plate("hero-portrait"),
    alt: "GADELLA tattoo studio in Nyeri — placeholder image slot.",
    brief:
      "Portrait crop of the same hero moment, for phones. Keep the artist's hands and the machine in the lower two thirds; leave the top clear for the wordmark.",
    aspect: 1400 / 1900,
    focal: "50% 45%",
    credit: null,
  },

  /* ---- work ------------------------------------------------------------ */
  workFineLine01: {
    id: "workFineLine01",
    src: null,
    plate: plate("work-fine-line-01"),
    alt: "Fine line tattoo — placeholder image slot.",
    brief: "Close crop of a healed fine line piece on a forearm. Soft directional light, skin texture visible, no flash.",
    aspect: 0.8,
    credit: null,
  },
  workBlackwork01: {
    id: "workBlackwork01",
    src: null,
    plate: plate("work-blackwork-01"),
    alt: "Blackwork tattoo — placeholder image slot.",
    brief: "Blackwork along the spine, shot from directly behind. Hard side light to bring out the negative space.",
    aspect: 0.8,
    credit: null,
  },
  workRealism01: {
    id: "workRealism01",
    src: null,
    plate: plate("work-realism-01"),
    alt: "Realism tattoo — placeholder image slot.",
    brief: "Black and grey realism on a forearm, arm turned slightly toward the light so the gradients read.",
    aspect: 0.8,
    credit: null,
  },
  workMinimal01: {
    id: "workMinimal01",
    src: null,
    plate: plate("work-minimal-01"),
    alt: "Minimal tattoo — placeholder image slot.",
    brief: "A small minimal piece on a calf. Lots of clean skin around it — the emptiness is the composition.",
    aspect: 0.8,
    credit: null,
  },
  workNeo01: {
    id: "workNeo01",
    src: null,
    plate: plate("work-neo-01"),
    alt: "Neo traditional tattoo — placeholder image slot.",
    brief: "Neo traditional upper arm piece. Keep the light even so the line weight stays honest.",
    aspect: 0.8,
    credit: null,
  },
  workFineLine02: {
    id: "workFineLine02",
    src: null,
    plate: plate("work-fine-line-02"),
    alt: "Fine line tattoo — placeholder image slot.",
    brief: "Fine line sternum piece. Shoot square-on, chest lit softly from above.",
    aspect: 0.8,
    credit: null,
  },
  workBlackwork02: {
    id: "workBlackwork02",
    src: null,
    plate: plate("work-blackwork-02"),
    alt: "Blackwork tattoo — placeholder image slot.",
    brief: "Blackwork shoulder cap, three-quarter angle, deep shadow behind the subject.",
    aspect: 0.8,
    credit: null,
  },
  workRealism02: {
    id: "workRealism02",
    src: null,
    plate: plate("work-realism-02"),
    alt: "Realism tattoo — placeholder image slot.",
    brief: "A realism study — tight crop, only part of the piece in frame. Detail over completeness.",
    aspect: 0.8,
    credit: null,
  },
  workMinimal02: {
    id: "workMinimal02",
    src: null,
    plate: plate("work-minimal-02"),
    alt: "Minimal tattoo — placeholder image slot.",
    brief: "Minimal wrist piece on a high-key background — one bright frame to break the dark run.",
    aspect: 0.8,
    credit: null,
  },
  workNeo02: {
    id: "workNeo02",
    src: null,
    plate: plate("work-neo-02"),
    alt: "Neo traditional tattoo — placeholder image slot.",
    brief: "Neo traditional thigh piece, subject seated, natural window light.",
    aspect: 0.8,
    credit: null,
  },
  workBlackwork03: {
    id: "workBlackwork03",
    src: null,
    plate: plate("work-blackwork-03"),
    alt: "Blackwork tattoo — placeholder image slot.",
    brief: "Full back blackwork, shot far enough back to hold the whole composition.",
    aspect: 0.8,
    credit: null,
  },
  workFineLine03: {
    id: "workFineLine03",
    src: null,
    plate: plate("work-fine-line-03"),
    alt: "Fine line tattoo — placeholder image slot.",
    brief: "Fine line ankle piece, low angle, floor of the studio slightly out of focus behind.",
    aspect: 0.8,
    credit: null,
  },

  /* ---- artists --------------------------------------------------------- */
  artist01: {
    id: "artist01",
    src: null,
    plate: plate("artist-01"),
    alt: "GADELLA artist portrait — placeholder image slot.",
    brief: "Editorial portrait. Black clothing, dark background, one soft key. Calm, direct, unstyled — no props.",
    aspect: 0.8,
    credit: null,
  },
  artist02: {
    id: "artist02",
    src: null,
    plate: plate("artist-02"),
    alt: "GADELLA artist portrait — placeholder image slot.",
    brief: "Same lighting setup as the other portraits so the set reads as one series. Vary only the pose.",
    aspect: 0.8,
    credit: null,
  },
  artist03: {
    id: "artist03",
    src: null,
    plate: plate("artist-03"),
    alt: "GADELLA artist portrait — placeholder image slot.",
    brief: "Three-quarter turn, eyes off camera. Keep the crop tight from mid-chest.",
    aspect: 0.8,
    credit: null,
  },
  artist04: {
    id: "artist04",
    src: null,
    plate: plate("artist-04"),
    alt: "GADELLA artist portrait — placeholder image slot.",
    brief: "Hands in frame if the artist is comfortable — it connects the portrait to the craft.",
    aspect: 0.8,
    credit: null,
  },
  artistWide: {
    id: "artistWide",
    src: null,
    plate: plate("artist-wide"),
    alt: "A GADELLA artist at the station — placeholder image slot.",
    brief:
      "Tall frame. An artist at the station, seen from the side, concentrating. This runs full-bleed next to the artists headline, so leave the right edge quiet.",
    aspect: 1600 / 1800,
    focal: "50% 40%",
    credit: null,
  },

  /* ---- studio ---------------------------------------------------------- */
  studioInterior: {
    id: "studioInterior",
    src: null,
    plate: plate("studio-interior"),
    alt: "GADELLA studio interior — placeholder image slot.",
    brief: "Wide interior of the Nyeri studio, empty, daylight. Straight lines, symmetrical if the room allows.",
    aspect: 1.6,
    credit: null,
  },
  studioStation: {
    id: "studioStation",
    src: null,
    plate: plate("studio-station"),
    alt: "A GADELLA workstation — placeholder image slot.",
    brief: "One workstation, prepared and untouched: chair, lamp, tray, wrapped machine. Nobody in frame.",
    aspect: 0.8,
    credit: null,
  },
  studioDetail: {
    id: "studioDetail",
    src: null,
    plate: plate("studio-detail"),
    alt: "Equipment detail at GADELLA — placeholder image slot.",
    brief: "Macro on tools — needle cartridges, ink caps, a machine on its stand. Shallow depth of field.",
    aspect: 1,
    credit: null,
  },
  studioWaiting: {
    id: "studioWaiting",
    src: null,
    plate: plate("studio-waiting"),
    alt: "The waiting area at GADELLA — placeholder image slot.",
    brief: "Waiting area, high key, bright and plain. This is the one light frame in a dark sequence.",
    aspect: 1.6,
    credit: null,
  },
  studioLight: {
    id: "studioLight",
    src: null,
    plate: plate("studio-light"),
    alt: "Light study inside GADELLA — placeholder image slot.",
    brief: "A quiet corner — light falling across a wall or the floor. Almost nothing in it. Pure atmosphere.",
    aspect: 0.8,
    credit: null,
  },

  /* ---- booking --------------------------------------------------------- */
  booking: {
    id: "booking",
    src: null,
    plate: plate("booking"),
    alt: "GADELLA studio at dusk — placeholder image slot.",
    brief:
      "Wide, dark, calm. The studio after hours with one lamp on. Text sits on the left third, so keep that area unbusy.",
    aspect: 2,
    focal: "60% 50%",
    credit: null,
  },
} satisfies Record<string, ImageSlot>;

export type ImageId = keyof typeof IMAGES;

/** Look up a slot. Throws in dev if an id is wrong, rather than rendering nothing. */
export function getImage(id: ImageId): ImageSlot {
  const slot = IMAGES[id];
  if (!slot && import.meta.env.DEV) {
    throw new Error(`[images] unknown image id: "${String(id)}"`);
  }
  return slot;
}

/** The URL actually rendered: the studio's photograph if set, otherwise the plate. */
export function resolveSrc(slot: ImageSlot): string {
  return slot.src ?? slot.plate;
}

/** True while a slot is still showing its placeholder — used to badge the UI honestly. */
export function isPlaceholder(slot: ImageSlot): boolean {
  return slot.src === null;
}

/** Every credit that needs to appear in the footer / colophon. */
export function collectCredits(): ImageCredit[] {
  const seen = new Set<string>();
  const out: ImageCredit[] = [];
  for (const slot of Object.values(IMAGES) as ImageSlot[]) {
    const c = slot.credit;
    if (!c) continue;
    const key = `${c.source}|${c.author ?? ""}|${c.sourceUrl ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c);
  }
  return out;
}
