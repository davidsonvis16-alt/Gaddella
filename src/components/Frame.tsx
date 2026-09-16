import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getImage, type ImageId } from "../data/images";
import { IN_VIEW, imageReveal } from "../lib/motion";
import styles from "./Frame.module.css";

type Props = {
  /** Slot id from data/images.ts */
  image: ImageId;
  /** Override the reserved aspect ratio (w / h) for this placement. */
  ratio?: number;
  /** Responsive hint. Defaults to full width. */
  sizes?: string;
  /** First paint above the fold — skips lazy loading and reveal. */
  priority?: boolean;
  /** Slow scale on hover, for cards that are themselves links. */
  hoverZoom?: boolean;
  /** Skip the in-view reveal (e.g. inside the deck, which animates itself). */
  still?: boolean;
  className?: string;
};

/**
 * The only way an image reaches the page.
 *
 * Reserves its aspect ratio up front so nothing shifts, lazy-loads below the
 * fold, reveals once on entry, and leaves the dark frame showing if a
 * photograph ever fails to load rather than a broken-image icon.
 */
export default function Frame({
  image,
  ratio,
  sizes = "100vw",
  priority = false,
  hoverZoom = false,
  still = false,
  className,
}: Props) {
  const slot = getImage(image);
  const reduced = useReducedMotion() ?? false;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const aspect = ratio ?? slot.aspect;

  const Wrapper = still || priority ? "div" : motion.div;
  const revealProps =
    still || priority
      ? {}
      : {
          variants: imageReveal(reduced),
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: IN_VIEW,
        };

  return (
    <figure
      className={[styles.frame, hoverZoom ? styles.zoom : "", className ?? ""].filter(Boolean).join(" ")}
      style={{ ["--ratio" as string]: String(aspect) }}
    >
      <Wrapper className={styles.inner} {...revealProps}>
        <img
          src={slot.src}
          srcSet={slot.srcSet}
          sizes={slot.srcSet ? (slot.sizes ?? sizes) : undefined}
          alt={slot.alt}
          width={1600}
          height={Math.round(1600 / aspect)}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            setLoaded(true);
          }}
          style={{ objectPosition: slot.focal ?? "50% 50%" }}
          className={loaded && !failed ? styles.ready : styles.loading}
        />
      </Wrapper>
      <span aria-hidden="true" className={styles.tone} />
    </figure>
  );
}
