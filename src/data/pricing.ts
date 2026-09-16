/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — price lists
   --------------------------------------------------------------------------
   Copied from the studio's printed tattoo and body piercing price lists.
   Prices are in Kenyan shillings.
   `from: true` means the figure is a starting price.
   ========================================================================== */

export type PriceItem = {
  service: string;
  /** KSh. Omit when the price is quoted per piece (see `note`). */
  price?: number;
  from?: boolean;
  note?: string;
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
      { service: "Mini tattoo", price: 700 },
      { service: "2 mini tattoos", price: 1200 },
    ],
  },
  {
    id: "small",
    title: "Small tattoos",
    items: [
      { service: "Small tattoo", price: 1500, from: true },
      { service: "Custom small tattoo", price: 1800, from: true },
    ],
  },
  {
    id: "medium",
    title: "Medium tattoos",
    items: [
      { service: "Medium tattoo", price: 2500, from: true },
      { service: "A4 tattoo", price: 4000, from: true },
    ],
  },
  {
    id: "large",
    title: "Large tattoos",
    items: [
      { service: "Large tattoo", price: 5000, from: true },
      { service: "Half sleeve", price: 10000, from: true },
      { service: "Full sleeve", price: 20000, from: true },
      { service: "Chest piece", price: 4500, from: true },
      { service: "Back piece", price: 6500, from: true },
      { service: "Leg piece", price: 6500, from: true },
    ],
  },
  {
    id: "specialized",
    title: "Specialized tattoos",
    items: [
      { service: "Couple tattoos", price: 2000, from: true },
      { service: "Cover-up tattoos", price: 2000, from: true },
      { service: "Portrait tattoos", price: 8000, from: true },
      { service: "Custom designs", note: "Priced on size and detail" },
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
