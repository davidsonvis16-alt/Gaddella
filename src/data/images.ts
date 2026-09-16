/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — image configuration layer
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT TO CHANGE THE PHOTOGRAPHY ON THE SITE.

   Every image on the site is a *slot*. Each slot points at a photograph of
   the studio's own work in  public/images/work/ , named after the piece and
   its placement (e.g. tiger-shoulder.jpg).

   To swap or add a photograph:
     1. Drop the file in  public/images/work/  — name it  <design>-<placement>.jpg
     2. Point  src  at it on the matching slot below
     3. Update `alt` to describe that specific photograph

   Optionally provide `srcSet` for responsive delivery, e.g.
     srcSet: "/images/work/tiger-shoulder-1200.jpg 1200w, /images/work/tiger-shoulder-2400.jpg 2400w"
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
  src: string;
  srcSet?: string;
  sizes?: string;
  /** Describes the photograph. */
  alt: string;
  /** width / height — reserves space so nothing shifts while loading. */
  aspect: number;
  /** object-position, for crops that need a specific anchor. */
  focal?: string;
  credit?: ImageCredit | null;
};

const work = (name: string) => `/images/work/${name}.jpg`;

/** Every photo is a phone shot at 3:4, or 4:3 for the two landscape frames. */
const PORTRAIT = 3 / 4;
const LANDSCAPE = 4 / 3;

export const IMAGES = {
  /* ---- the pieces ------------------------------------------------------ */
  tigerShoulder: {
    id: "tigerShoulder",
    src: work("tiger-shoulder"),
    alt: "Tiger head tattoo in black linework wrapping a client's shoulder, photographed in the studio.",
    aspect: PORTRAIT,
    focal: "65% 45%",
  },
  pocketWatchChest: {
    id: "pocketWatchChest",
    src: work("pocket-watch-chest-piece"),
    alt: "Pocket watch chest piece with Roman numerals and filigree scrollwork, bold black shading.",
    aspect: PORTRAIT,
    focal: "55% 40%",
  },
  sunflowersHip: {
    id: "sunflowersHip",
    src: work("sunflowers-hip"),
    alt: "Cluster of shaded sunflowers and daisies tattooed across a client's hip.",
    aspect: PORTRAIT,
    focal: "40% 60%",
  },
  compassForearm: {
    id: "compassForearm",
    src: work("compass-forearm"),
    alt: "Forearm piece stacking a cross, mountains, compass, yin-yang sunset and globe, ending in an arrowhead.",
    aspect: PORTRAIT,
    focal: "50% 50%",
  },
  compassForearmAlt: {
    id: "compassForearmAlt",
    src: work("compass-forearm-2"),
    alt: "The compass and mountains forearm piece under the studio ring light.",
    aspect: PORTRAIT,
    focal: "50% 55%",
  },
  onePieceForearm: {
    id: "onePieceForearm",
    src: work("one-piece-forearm"),
    alt: "One Piece anime forearm tattoo — the Straw Hat Jolly Roger breaking out of swirling clouds.",
    aspect: LANDSCAPE,
    focal: "50% 55%",
  },
  onePieceForearmAlt: {
    id: "onePieceForearmAlt",
    src: work("one-piece-forearm-2"),
    alt: "The One Piece forearm tattoo resting on a wrapped studio bench beside the phone rig.",
    aspect: LANDSCAPE,
    focal: "55% 60%",
  },
  snakeShoulderBlade: {
    id: "snakeShoulderBlade",
    src: work("snake-and-flowers-shoulder-blade"),
    alt: "Patterned snake winding through three flowers down a client's shoulder blade.",
    aspect: PORTRAIT,
    focal: "50% 60%",
  },
  snakeShoulderBladeAlt: {
    id: "snakeShoulderBladeAlt",
    src: work("snake-and-flowers-shoulder-blade-2"),
    alt: "The snake and flowers shoulder blade piece framed by the studio ring light.",
    aspect: PORTRAIT,
    focal: "45% 60%",
  },
  sunMoonThigh: {
    id: "sunMoonThigh",
    src: work("sun-and-moon-thigh"),
    alt: "Fine line sun and crescent moon with faces, leaves and small stars on the back of a thigh.",
    aspect: PORTRAIT,
    focal: "50% 60%",
  },
  flowerUpperBack: {
    id: "flowerUpperBack",
    src: work("flower-fine-line-upper-back"),
    alt: "Delicate fine line flower stem between a client's shoulder blades.",
    aspect: PORTRAIT,
    focal: "50% 65%",
  },
  veniVidiViciRibs: {
    id: "veniVidiViciRibs",
    src: work("veni-vidi-vici-ribs"),
    alt: "\"VENI·VIDI·VICI\" in serif capitals running down a client's ribs.",
    aspect: PORTRAIT,
    focal: "55% 55%",
  },
  chineseCharactersChest: {
    id: "chineseCharactersChest",
    src: work("chinese-characters-chest"),
    alt: "Three Chinese characters, 格里芬 (Griffin), tattooed vertically down the chest.",
    aspect: PORTRAIT,
    focal: "65% 55%",
  },
  princeScriptChest: {
    id: "princeScriptChest",
    src: work("prince-script-chest"),
    alt: "\"Prince\" in flowing script with a small star, tattooed on the upper chest.",
    aspect: PORTRAIT,
    focal: "50% 45%",
  },
  crownedDollarArm: {
    id: "crownedDollarArm",
    src: work("crowned-dollar-upper-arm"),
    alt: "Dripping dollar sign wearing a crown, tattooed on the back of an upper arm.",
    aspect: PORTRAIT,
    focal: "60% 50%",
  },
  dragonWrist: {
    id: "dragonWrist",
    src: work("dragon-wrist"),
    alt: "Small flying dragon with two sparkle stars on the inner wrist.",
    aspect: PORTRAIT,
    focal: "35% 55%",
  },
  butterflyThigh: {
    id: "butterflyThigh",
    src: work("butterfly-thigh"),
    alt: "Monarch butterfly tattoo on the upper thigh.",
    aspect: PORTRAIT,
    focal: "25% 60%",
  },
} satisfies Record<string, ImageSlot>;

export type ImageId = keyof typeof IMAGES;

/**
 * Where the second-angle photographs appear outside the gallery. Tattoo
 * photos are only used where the work itself is the subject — never as
 * stand-ins for artist portraits or pictures of the studio.
 */
export const PLACEMENTS = {
  hero: "onePieceForearmAlt",
  heroPortrait: "compassForearmAlt",
  booking: "snakeShoulderBladeAlt",
} as const satisfies Record<string, ImageId>;

/** Look up a slot. Throws in dev if an id is wrong, rather than rendering nothing. */
export function getImage(id: ImageId): ImageSlot {
  const slot = IMAGES[id];
  if (!slot && import.meta.env.DEV) {
    throw new Error(`[images] unknown image id: "${String(id)}"`);
  }
  return slot;
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
