/* ==========================================================================
   GADELLAA ARTS TATTOO STUDIO — motion system
   One place for every easing curve and variant, so the whole site moves with
   the same hand. Restraint is the brief: things arrive, they do not perform.
   ========================================================================== */

import type { Variants } from "framer-motion";

/** The house curve — a long, decelerating ease. Nothing overshoots. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;
/** Used by the card deck — firmer, and deliberately short of bouncy.
    Declared `as const` so it satisfies both the `transition` prop and the
    imperative `animate()` value overload. */
export const DECK_SPRING = { type: "spring", stiffness: 300, damping: 34, mass: 0.8 } as const;

/** Reduced motion: no travel, no spring — a short fade and nothing else. */
const flat: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24, ease: "linear" } },
};

export function fadeUp(reduced: boolean, distance = 26, delay = 0): Variants {
  if (reduced) return flat;
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: EASE, delay },
    },
  };
}

/** Parent that releases its children one after another. */
export function stagger(reduced: boolean, each = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: each, delayChildren: delay },
    },
  };
}

/** A line of display type rising out of its own overflow mask. */
export function maskLine(reduced: boolean): Variants {
  if (reduced) return flat;
  return {
    hidden: { y: "108%" },
    visible: { y: "0%", transition: { duration: 1, ease: EASE } },
  };
}

/** Image reveal — the frame opens, the photograph settles back to rest. */
export function imageReveal(reduced: boolean): Variants {
  if (reduced) return flat;
  return {
    hidden: { scale: 1.16, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: EASE } },
  };
}

export function curtain(reduced: boolean): Variants {
  if (reduced) return flat;
  return {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: EASE } },
  };
}

/** Route change — barely there, just enough to stop the hard cut. */
export function pageFade(reduced: boolean): Variants {
  if (reduced) return flat;
  return {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: "linear" } },
  };
}

/** Standard viewport trigger — fires once, a little before the element lands. */
export const IN_VIEW = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;
