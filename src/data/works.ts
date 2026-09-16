/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — portfolio
   --------------------------------------------------------------------------
   One record per finished piece. Each maps to an image slot in data/images.ts.
   Pieces photographed from more than one angle use the first angle here; the
   second angle is used elsewhere on the site (see PLACEMENTS in images.ts).
   ========================================================================== */

import type { ImageId } from "./images";

export const STYLES = ["Illustrative", "Fine line", "Floral", "Lettering", "Minimal"] as const;
export type Style = (typeof STYLES)[number];

export type Work = {
  id: string;
  title: string;
  style: Style;
  /** Artist id from data/artists.ts, when the piece is credited to one artist. */
  artistId?: string;
  placement: string;
  description: string;
  imageId: ImageId;
  /** Shown in the featured deck on the home page, in this order. */
  featured?: number;
};

export const WORKS: Work[] = [
  {
    id: "tiger-shoulder",
    title: "Tiger",
    style: "Illustrative",
    placement: "Shoulder",
    description: "A tiger's head drawn to wrap the curve of the shoulder.",
    imageId: "tigerShoulder",
    featured: 1,
  },
  {
    id: "snake-and-flowers",
    title: "Snake & flowers",
    style: "Floral",
    placement: "Shoulder blade",
    description: "A patterned snake winding through three blossoms.",
    imageId: "snakeShoulderBlade",
    featured: 2,
  },
  {
    id: "compass-forearm",
    title: "Compass",
    style: "Fine line",
    placement: "Forearm",
    description: "Cross, mountains, compass, sunset and globe, stacked down the forearm to an arrowhead.",
    imageId: "compassForearm",
    featured: 3,
  },
  {
    id: "pocket-watch",
    title: "Pocket watch",
    style: "Illustrative",
    placement: "Chest",
    description: "A pocket watch chest piece with Roman numerals and heavy filigree shading.",
    imageId: "pocketWatchChest",
    featured: 4,
  },
  {
    id: "sun-and-moon",
    title: "Sun & moon",
    style: "Fine line",
    placement: "Thigh",
    description: "Sun and crescent moon faces, framed by leaves and small stars.",
    imageId: "sunMoonThigh",
  },
  {
    id: "sunflowers",
    title: "Sunflowers",
    style: "Floral",
    placement: "Hip",
    description: "A shaded cluster of sunflowers and daisies following the line of the hip.",
    imageId: "sunflowersHip",
  },
  {
    id: "one-piece",
    title: "One Piece",
    style: "Illustrative",
    placement: "Forearm",
    description: "The Straw Hat Jolly Roger bursting out of swirling anime clouds.",
    imageId: "onePieceForearm",
  },
  {
    id: "veni-vidi-vici",
    title: "Veni vidi vici",
    style: "Lettering",
    placement: "Ribs",
    description: "Serif capitals set vertically down the ribs.",
    imageId: "veniVidiViciRibs",
  },
  {
    id: "flower-stem",
    title: "Flower stem",
    style: "Fine line",
    placement: "Upper back",
    description: "A single flowering stem between the shoulder blades.",
    imageId: "flowerUpperBack",
  },
  {
    id: "chinese-characters",
    title: "格里芬 — Griffin",
    style: "Lettering",
    placement: "Chest",
    description: "A name written in three Chinese characters, running down the chest.",
    imageId: "chineseCharactersChest",
  },
  {
    id: "crowned-dollar",
    title: "Crowned dollar",
    style: "Illustrative",
    placement: "Upper arm",
    description: "A dripping dollar sign wearing a crown.",
    imageId: "crownedDollarArm",
  },
  {
    id: "prince-script",
    title: "Prince",
    style: "Lettering",
    placement: "Chest",
    description: "A name in flowing script, finished with a small star.",
    imageId: "princeScriptChest",
  },
  {
    id: "dragon",
    title: "Dragon",
    style: "Minimal",
    placement: "Wrist",
    description: "A small flying dragon with two sparkle stars.",
    imageId: "dragonWrist",
  },
  {
    id: "butterfly",
    title: "Butterfly",
    style: "Minimal",
    placement: "Thigh",
    description: "A monarch butterfly, solid outline with fine vein detail.",
    imageId: "butterflyThigh",
  },
];

/** The home page deck, in deliberate order. */
export const FEATURED: Work[] = WORKS.filter((w) => w.featured).sort(
  (a, b) => (a.featured ?? 0) - (b.featured ?? 0),
);

export const FILTERS = ["All", ...STYLES] as const;
export type Filter = (typeof FILTERS)[number];
