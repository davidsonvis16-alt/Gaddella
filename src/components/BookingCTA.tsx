import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ArrowLink from "./ArrowLink";
import DisplayLines from "./DisplayLines";
import Frame from "./Frame";
import { Reveal } from "./Reveal";
import styles from "./BookingCTA.module.css";

export default function BookingCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} className={["theme-dark", styles.section].join(" ")} aria-labelledby="booking-heading">
      <motion.div className={styles.media} style={{ y }}>
        <Frame image="booking" sizes="100vw" />
      </motion.div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={["shell", styles.content].join(" ")}>
        <Reveal as="p" className={["label", styles.eyebrow].join(" ")} distance={14}>
          Booking
        </Reveal>

        <DisplayLines lines={["Ready for", "your next piece?"]} as="h2" className={styles.heading} />

        <Reveal as="p" className={["body-text", styles.body].join(" ")} delay={0.1}>
          Tell us what you're imagining. We'll help shape the idea, choose the right artist and plan your session.
        </Reveal>

        <Reveal className={styles.cta} delay={0.18}>
          <ArrowLink to="/booking" variant="button">
            Book a session
          </ArrowLink>
        </Reveal>
      </div>

      <h2 id="booking-heading" className="visually-hidden">
        Booking
      </h2>
    </section>
  );
}
