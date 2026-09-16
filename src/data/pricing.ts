/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — price lists
   --------------------------------------------------------------------------
   Copied from the studio's printed tattoo and body piercing price lists.
   Prices are in Kenyan shillings.
   `from: true` means the figure is a starting price.

   `imageId` shows an example photo beside a price, so people can see what
   "mini" or "half sleeve" means. Anything without a photo yet shows a
   "photo coming soon" placeholder — add the photo to data/images.ts and set
   `imageId` on the item when it arrives.
   ========================================================================== */

import type { ImageId } from "./images";

export type PriceItem = {
  service: string;
  /** KSh. Omit when the price is quoted per piece (see `note`). */
  price?: number;
  from?: boolean;
  note?: string;
  /** An example photo of this service. Omit to show the placeholder. */
  imageId?: ImageId;
};

export type PriceGroup = {
  id: string;
  title: string;
  items: PriceItem[];
};

export const TATTOO_PRICES: PriceGroup[] = [
  {
    id: "mini",
    title: "Mini tattoos",
    items: [
      { service: "Mini tattoo", price: 700, imageId: "dragonWrist" },
      { service: "2 mini tattoos", price: 1200 },
    ],
  },
  {
    id: "small",
    title: "Small tattoos",
    items: [
      { service: "Small tattoo", price: 1500, from: true, imageId: "butterflyThigh" },
      { service: "Custom small tattoo", price: 1800, from: true, imageId: "princeScriptChest" },
    ],
  },
  {
    id: "medium",
    title: "Medium tattoos",
    items: [
      { service: "Medium tattoo", price: 2500, from: true, imageId: "crownedDollarArm" },
      { service: "A4 tattoo", price: 4000, from: true, imageId: "compassForearm" },
    ],
  },
  {
    id: "large",
    title: "Large tattoos",
    items: [
      { service: "Large tattoo", price: 5000, from: true, imageId: "tigerShoulder" },
      { service: "Half sleeve", price: 10000, from: true },
      { service: "Full sleeve", price: 20000, from: true },
      { service: "Chest piece", price: 4500, from: true, imageId: "pocketWatchChest" },
      { service: "Back piece", price: 6500, from: true },
      { service: "Leg piece", price: 6500, from: true, imageId: "sunMoonThigh" },
    ],
  },
  {
    id: "specialized",
    title: "Specialized tattoos",
    items: [
      { service: "Couple tattoos", price: 2000, from: true },
      { service: "Cover-up tattoos", price: 2000, from: true },
      { service: "Portrait tattoos", price: 8000, from: true },
      { service: "Custom designs", note: "Priced on size and detail", imageId: "onePieceForearm" },
    ],
  },
];

export const PIERCING_PRICES: PriceGroup[] = [
  {
    id: "ear",
    title: "Ear piercings",
    items: [
      { service: "Lobe", price: 300 },
      { service: "Double lobe", price: 600 },
      { service: "Helix", price: 500 },
      { service: "Tragus", price: 800 },
      { service: "Conch", price: 800 },
      { service: "Daith", price: 800 },
      { service: "Rook", price: 800 },
      { service: "Industrial", price: 800 },
    ],
  },
  {
    id: "facial",
    title: "Facial piercings",
    items: [
      { service: "Eyebrow", price: 800 },
      { service: "Labret", price: 1000 },
      { service: "Medusa", price: 1000 },
      { service: "Monroe", price: 1000 },
      { service: "Smiley", price: 500 },
      { service: "Tongue", price: 1000 },
    ],
  },
  {
    id: "nose",
    title: "Nose piercings",
    items: [
      { service: "Nostril", price: 500 },
      { service: "Double nostril", price: 1000 },
      { service: "Septum", price: 800 },
    ],
  },
  {
    id: "body",
    title: "Body piercings",
    items: [
      { service: "Navel / belly", price: 1000 },
      { service: "Nipple", price: 1500 },
      { service: "Dermal", price: 4000, from: true },
    ],
  },
  {
    id: "jewellery",
    title: "Jewellery",
    items: [
      { service: "Jewellery change", price: 500 },
      { service: "Premium jewellery", note: "Price varies" },
    ],
  },
];

/** Added on top of any piece done in colour. */
export const COLOUR_SURCHARGE = 1000;

export const formatKsh = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;

export function formatPrice(item: PriceItem): string {
  if (item.price === undefined) return item.note ?? "On request";
  return `${item.from ? "From " : ""}${formatKsh(item.price)}`;
}
