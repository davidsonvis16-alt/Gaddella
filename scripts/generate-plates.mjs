/**
 * GADELLA — placeholder plate generator.
 *
 * Renders the marked "image slot" plates used until the studio supplies its own
 * photography. Each plate is a small, self-contained SVG: a cinematic charcoal
 * field with a key light, soft bokeh, film grain and a discreet slot label.
 *
 * Run:  node scripts/generate-plates.mjs
 * Swap: see src/data/images.ts — set `src` on a slot and the plate is no longer used.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/images/plates");
mkdirSync(OUT, { recursive: true });

/** Deterministic pseudo-random so rebuilds are byte-stable. */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const TONES = {
  deep:     { base: "#08080a", lift: "#1c1d20", key: "#8e9095", rim: "#e8e6e3" },
  charcoal: { base: "#0e0f10", lift: "#26272a", key: "#9a9ca1", rim: "#f0eeec" },
  warm:     { base: "#0f0c0b", lift: "#2a2422", key: "#a1948b", rim: "#f4ece4" },
  ash:      { base: "#101214", lift: "#2c3034", key: "#93989e", rim: "#eceef0" },
  paper:    { base: "#d9d4cc", lift: "#f4f1ec", key: "#ffffff", rim: "#6f6a63" },
};

function plate({ id, w, h, tone = "charcoal", brief, code, light = 0.5, grain = 0.2 }) {
  const t = TONES[tone] ?? TONES.charcoal;
  const r = rng([...id].reduce((a, c) => a + c.charCodeAt(0), 7));
  const dark = tone !== "paper";
  const ink = dark ? "#ffffff" : "#0b0b0c";
  const m = Math.min(w, h);

  // Key light origin — drifts per plate so the set has rhythm.
  const kx = 0.2 + r() * 0.5;
  const ky = 0.1 + r() * 0.35;

  // Two overlapping soft masses read as a lit form against a dark room:
  // the chiaroscuro is what makes the plate scan as photography, not as an empty box.
  const masses = Array.from({ length: 2 }, (_, i) => {
    const cx = (w * (0.28 + r() * 0.44)).toFixed(0);
    const cy = (h * (0.34 + r() * 0.42)).toFixed(0);
    const rx = (m * (i === 0 ? 0.42 + r() * 0.2 : 0.24 + r() * 0.16)).toFixed(0);
    const ry = (rx * (0.72 + r() * 0.7)).toFixed(0);
    const rot = (-45 + r() * 90).toFixed(1);
    const op = (i === 0 ? 0.85 : 0.5).toFixed(2);
    return `<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#mass)" opacity="${op}" filter="url(#soft)"/></g>`;
  }).join("");

  // Rim light — a blurred bright arc along the lit edge of the primary mass.
  const rimX = (w * (0.2 + r() * 0.5)).toFixed(0);
  const rimY = (h * (0.2 + r() * 0.45)).toFixed(0);
  const rimR = (m * (0.3 + r() * 0.18)).toFixed(0);
  const rim = `<circle cx="${rimX}" cy="${rimY}" r="${rimR}" fill="none" stroke="${t.rim}"
      stroke-opacity="${(0.3 * light + 0.1).toFixed(3)}" stroke-width="${(m * 0.012).toFixed(1)}"
      stroke-dasharray="${(rimR * 1.5).toFixed(0)} ${(rimR * 4).toFixed(0)}" filter="url(#soft)"/>`;

  // Out-of-focus highlights give the field photographic depth.
  const bokeh = Array.from({ length: 6 }, () => {
    const cx = (r() * w).toFixed(0);
    const cy = (r() * h).toFixed(0);
    const rad = (m * (0.04 + r() * 0.1)).toFixed(0);
    const op = (0.05 + r() * 0.1).toFixed(3);
    return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#bok)" opacity="${op}"/>`;
  }).join("");

  // Diagonal light shaft — reads as a window or lamp spill across the room.
  const shaft = `<path d="M${(w * -0.1).toFixed(0)} ${(h * 0.02).toFixed(0)} L${(w * 0.42).toFixed(0)} ${(h * -0.05).toFixed(0)} L${(w * 0.86).toFixed(0)} ${(h * 1.05).toFixed(0)} L${(w * 0.3).toFixed(0)} ${(h * 1.08).toFixed(0)} Z"
      fill="url(#shaft)" opacity="${(light * 0.55).toFixed(3)}" filter="url(#soft)"/>`;

  const label = Math.round(m * 0.024);
  const pad = Math.round(m * 0.045);
  const mono = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(brief)}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${t.lift}"/><stop offset="0.5" stop-color="${t.base}"/><stop offset="1" stop-color="${t.base}"/>
    </linearGradient>
    <linearGradient id="mass" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${t.key}" stop-opacity="${(0.55 * light + 0.16).toFixed(3)}"/>
      <stop offset="0.45" stop-color="${t.key}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${t.base}" stop-opacity="${dark ? 0.75 : 0.3}"/>
    </linearGradient>
    <radialGradient id="key" cx="${kx.toFixed(3)}" cy="${ky.toFixed(3)}" r="0.62">
      <stop offset="0" stop-color="${t.key}" stop-opacity="${(0.4 * light + 0.12).toFixed(3)}"/>
      <stop offset="0.5" stop-color="${t.key}" stop-opacity="0.07"/>
      <stop offset="1" stop-color="${t.key}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shaft" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.rim}" stop-opacity="0.22"/><stop offset="1" stop-color="${t.rim}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="bok"><stop offset="0" stop-color="${t.rim}" stop-opacity="0.8"/><stop offset="1" stop-color="${t.rim}" stop-opacity="0"/></radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.45" r="0.72">
      <stop offset="0.35" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${dark ? 0.68 : 0.22}"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${Math.round(m * 0.038)}"/></filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="${Math.round(r() * 99)}" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#base)"/>
  ${bokeh}
  ${shaft}
  ${masses}
  ${rim}
  <rect width="${w}" height="${h}" fill="url(#key)"/>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="${grain}" style="mix-blend-mode:overlay"/>
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="${ink}" stroke-opacity="${dark ? 0.1 : 0.14}"/>

  <g fill="${ink}" fill-opacity="0.42" font-family="${mono}" font-size="${label}" letter-spacing="${(label * 0.18).toFixed(2)}">
    <text x="${pad}" y="${pad + label}">${esc(brief.toUpperCase())}</text>
    <text x="${pad}" y="${h - pad}">GADELLA · IMAGE SLOT</text>
    <text x="${w - pad}" y="${h - pad}" text-anchor="end">${esc(code)}</text>
  </g>
  <g stroke="${ink}" stroke-opacity="0.2" stroke-width="${Math.max(1, label * 0.06)}">
    <line x1="${w / 2 - label}" y1="${h / 2}" x2="${w / 2 + label}" y2="${h / 2}"/>
    <line x1="${w / 2}" y1="${h / 2 - label}" x2="${w / 2}" y2="${h / 2 + label}"/>
  </g>
</svg>`;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PLATES = [
  { id: "hero", w: 2400, h: 1350, tone: "deep", light: 0.75, brief: "Hero — artist at work", code: "PL-01" },
  { id: "hero-portrait", w: 1400, h: 1900, tone: "deep", light: 0.7, brief: "Hero mobile — artist at work", code: "PL-02" },

  { id: "work-fine-line-01", w: 1400, h: 1750, tone: "charcoal", light: 0.6, brief: "Fine line — forearm", code: "WK-01" },
  { id: "work-blackwork-01", w: 1400, h: 1750, tone: "deep", light: 0.45, brief: "Blackwork — spine", code: "WK-02" },
  { id: "work-realism-01", w: 1400, h: 1750, tone: "ash", light: 0.55, brief: "Realism — forearm", code: "WK-03" },
  { id: "work-minimal-01", w: 1400, h: 1750, tone: "warm", light: 0.65, brief: "Minimal — calf", code: "WK-04" },
  { id: "work-neo-01", w: 1400, h: 1750, tone: "charcoal", light: 0.5, brief: "Neo traditional — upper arm", code: "WK-05" },
  { id: "work-fine-line-02", w: 1400, h: 1750, tone: "warm", light: 0.7, brief: "Fine line — sternum", code: "WK-06" },
  { id: "work-blackwork-02", w: 1400, h: 1750, tone: "deep", light: 0.4, brief: "Blackwork — shoulder", code: "WK-07" },
  { id: "work-realism-02", w: 1400, h: 1750, tone: "ash", light: 0.6, brief: "Realism — portrait study", code: "WK-08" },
  { id: "work-minimal-02", w: 1400, h: 1750, tone: "paper", light: 0.5, grain: 0.14, brief: "Minimal — wrist", code: "WK-09" },
  { id: "work-neo-02", w: 1400, h: 1750, tone: "charcoal", light: 0.55, brief: "Neo traditional — thigh", code: "WK-10" },
  { id: "work-blackwork-03", w: 1400, h: 1750, tone: "deep", light: 0.5, brief: "Blackwork — full back", code: "WK-11" },
  { id: "work-fine-line-03", w: 1400, h: 1750, tone: "ash", light: 0.65, brief: "Fine line — ankle", code: "WK-12" },

  { id: "artist-01", w: 1200, h: 1500, tone: "deep", light: 0.6, brief: "Artist portrait 01", code: "AR-01" },
  { id: "artist-02", w: 1200, h: 1500, tone: "charcoal", light: 0.55, brief: "Artist portrait 02", code: "AR-02" },
  { id: "artist-03", w: 1200, h: 1500, tone: "warm", light: 0.6, brief: "Artist portrait 03", code: "AR-03" },
  { id: "artist-04", w: 1200, h: 1500, tone: "ash", light: 0.5, brief: "Artist portrait 04", code: "AR-04" },
  { id: "artist-wide", w: 1600, h: 1800, tone: "deep", light: 0.5, brief: "Artist at the station", code: "AR-05" },

  { id: "studio-interior", w: 2000, h: 1250, tone: "charcoal", light: 0.6, brief: "Studio interior", code: "ST-01" },
  { id: "studio-station", w: 1200, h: 1500, tone: "deep", light: 0.55, brief: "Tattoo workstation", code: "ST-02" },
  { id: "studio-detail", w: 1200, h: 1200, tone: "warm", light: 0.5, brief: "Equipment detail", code: "ST-03" },
  { id: "studio-waiting", w: 1600, h: 1000, tone: "paper", light: 0.55, grain: 0.14, brief: "Waiting area", code: "ST-04" },
  { id: "studio-light", w: 1200, h: 1500, tone: "ash", light: 0.7, brief: "Studio light study", code: "ST-05" },

  { id: "booking", w: 2400, h: 1200, tone: "deep", light: 0.6, brief: "Booking — studio at dusk", code: "BK-01" },
  { id: "og", w: 1200, h: 630, tone: "deep", light: 0.7, brief: "Open graph", code: "OG-01" },
];

let n = 0;
for (const p of PLATES) {
  writeFileSync(resolve(OUT, `${p.id}.svg`), plate(p).replace(/\n\s+/g, "\n"), "utf8");
  n++;
}
console.log(`generated ${n} plates -> public/images/plates`);
