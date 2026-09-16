import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Frame from "./Frame";
import ArrowLink from "./ArrowLink";
import DisplayLines from "./DisplayLines";
import { SITE } from "../data/site";
import { useMediaQuery } from "../lib/hooks";
import { EASE } from "../lib/motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isPhone = useMediaQuery("(max-width: 767px)");

  // A very short parallax — enough to feel like depth, not enough to notice.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "9%"]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 0.45]);

  return (
    <section ref={ref} className={[styles.hero, "theme-dark"].join(" ")} aria-label="Introduction">
      <motion.div className={styles.media} style={{ y }}>
        <Frame image={isPhone ? "heroPortrait" : "hero"} ratio={isPhone ? 0.62 : 1.5} priority still sizes="100vw" />
      </motion.div>

      <div className={styles.veil} aria-hidden="true" />
      <motion.div className={styles.dim} style={{ opacity: dim }} aria-hidden="true" />

      <div className={[styles.content, "shell"].join(" ")}>
        <motion.p
          className={["label", styles.eyebrow].join(" ")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          {SITE.positioning}
          <span className={styles.eyebrowBreak}>{SITE.city}</span>
        </motion.p>

        <DisplayLines lines={[SITE.name]} as="h1" className={styles.wordmark} immediate delay={0.2} />

        <motion.p
          className={[styles.tagline, "label"].join(" ")}
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        >
          <ArrowLink to="/booking" variant="button">
            Book a session
          </ArrowLink>
        </motion.div>
      </div>

      <motion.p
        className={[styles.corner, "label"].join(" ")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
      >
        <span className={styles.dash} aria-hidden="true" />
        Tattoos / Art / Culture
      </motion.p>
    </section>
  );
}
