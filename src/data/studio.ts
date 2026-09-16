/* ==========================================================================
   GADELLA — the studio
   Placeholder copy. Describe the real room before launch, and do not add
   health or safety claims the studio cannot stand behind.
   ========================================================================== */

import type { ImageId } from "./images";

export type StudioFrame = {
  id: string;
  title: string;
  caption: string;
  imageId: ImageId;
  /** Layout weight in the studio grid. */
  span: "wide" | "tall" | "square";
};

export const STUDIO_FRAMES: StudioFrame[] = [
  {
    id: "s-01",
    title: "The room",
    caption: "One floor in Nyeri, kept deliberately plain. Light, space, and somewhere to sit still for a few hours.",
    imageId: "studioInterior",
    span: "wide",
  },
  {
    id: "s-02",
    title: "The station",
    caption: "Each artist sets up their own station and breaks it down at the end of every session.",
    imageId: "studioStation",
    span: "tall",
  },
  {
    id: "s-03",
    title: "The tools",
    caption: "Single-use needles and cartridges. Machines maintained by the artist who works on them.",
    imageId: "studioDetail",
    span: "square",
  },
  {
    id: "s-04",
    title: "Waiting",
    caption: "A room to arrive early in. Consultations happen here, before anything is drawn.",
    imageId: "studioWaiting",
    span: "wide",
  },
  {
    id: "s-05",
    title: "Light",
    caption: "Most sessions run in daylight. The room faces the morning, which is when the work is easiest.",
    imageId: "studioLight",
    span: "tall",
  },
];

export const STUDIO_PRINCIPLES = [
  {
    n: "01",
    title: "Consultation first",
    body: "Every piece starts with a conversation — placement, size, and whether the idea suits the body it is going on. Consultations are free.",
  },
  {
    n: "02",
    title: "Custom only",
    body: "We design for the person in the chair. If an idea would sit better with another artist, we will say so.",
  },
  {
    n: "03",
    title: "One session at a time",
    body: "Large work is planned across sittings rather than forced into one. It heals better, and it holds.",
  },
  {
    n: "04",
    title: "Aftercare",
    body: "You leave with written aftercare and a way to reach the artist who did the work.",
  },
];
