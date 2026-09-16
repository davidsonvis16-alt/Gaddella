/* ==========================================================================
   GADELLA — portfolio
   --------------------------------------------------------------------------
   Placeholder records. Each one maps to an image slot in data/images.ts and an
   artist in data/artists.ts. Replace the copy, keep the shape.
   ========================================================================== */

import type { ImageId } from "./images";

export const STYLES = ["Fine line", "Blackwork", "Realism", "Minimal", "Neo traditional"] as const;
export type Style = (typeof STYLES)[number];

export type Work = {
  id: string;
  style: Style;
  /** Artist id from data/artists.ts */
  artistId: string;
  placement: string;
  description: string;
  imageId: ImageId;
  /** Shown in the featured deck on the home page, in this order. */
  featured?: number;
};

export const WORKS: Work[] = [
  {
    id: "w-01",
    style: "Fine line",
    artistId: "njeri-w",
    placement: "Forearm",
    description: "Single-needle linework, carried across the forearm in one pass.",
    imageId: "workFineLine01",
    featured: 1,
  },
  {
    id: "w-02",
    style: "Blackwork",
    artistId: "wanjiku-m",
    placement: "Spine",
    description: "Bold blackwork with controlled negative space.",
    imageId: "workBlackwork01",
    featured: 2,
  },
  {
    id: "w-03",
    style: "Realism",
    artistId: "amara-o",
    placement: "Forearm",
    description: "Black and grey realism, built up over three sittings.",
    imageId: "workRealism01",
    featured: 3,
  },
  {
    id: "w-04",
    style: "Minimal",
    artistId: "njeri-w",
    placement: "Calf",
    description: "Small, quiet, and sized for the room around it.",
    imageId: "workMinimal01",
    featured: 4,
  },
  {
    id: "w-05",
    style: "Neo traditional",
    artistId: "kimathi-n",
    placement: "Upper arm",
    description: "Hand-drawn illustrative work with a firm outline.",
    imageId: "workNeo01",
  },
  {
    id: "w-06",
    style: "Fine line",
    artistId: "njeri-w",
    placement: "Sternum",
    description: "Symmetrical fine line piece, centred on the sternum.",
    imageId: "workFineLine02",
  },
  {
    id: "w-07",
    style: "Blackwork",
    artistId: "wanjiku-m",
    placement: "Shoulder",
    description: "Solid black cap wrapped to follow the deltoid.",
    imageId: "workBlackwork02",
  },
  {
    id: "w-08",
    style: "Realism",
    artistId: "amara-o",
    placement: "Inner arm",
    description: "A detail study — soft gradients held in a tight crop.",
    imageId: "workRealism02",
  },
  {
    id: "w-09",
    style: "Minimal",
    artistId: "njeri-w",
    placement: "Wrist",
    description: "Two lines and the skin between them.",
    imageId: "workMinimal02",
  },
  {
    id: "w-10",
    style: "Neo traditional",
    artistId: "kimathi-n",
    placement: "Thigh",
    description: "Illustrative composition drawn to the curve of the leg.",
    imageId: "workNeo02",
  },
  {
    id: "w-11",
    style: "Blackwork",
    artistId: "wanjiku-m",
    placement: "Full back",
    description: "A back piece planned across a year of sessions.",
    imageId: "workBlackwork03",
  },
  {
    id: "w-12",
    style: "Fine line",
    artistId: "njeri-w",
    placement: "Ankle",
    description: "Fine line detail set low, where it moves with the foot.",
    imageId: "workFineLine03",
  },
];

/** The home page deck, in deliberate order. */
export const FEATURED: Work[] = WORKS.filter((w) => w.featured).sort(
  (a, b) => (a.featured ?? 0) - (b.featured ?? 0),
);

export const FILTERS = ["All", ...STYLES] as const;
export type Filter = (typeof FILTERS)[number];
