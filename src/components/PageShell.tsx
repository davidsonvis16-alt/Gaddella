import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DisplayLines from "./DisplayLines";
import { pageFade } from "../lib/motion";
import styles from "./PageShell.module.css";

type Props = {
  eyebrow: string;
  lines: string[];
  intro?: string;
  children: ReactNode;
};

/** Every inner page opens the same way: a dark masthead, then the content. */
export default function PageShell({ eyebrow, lines, intro, children }: Props) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div variants={pageFade(reduced)} initial="hidden" animate="visible" exit="exit">
      <header className={["theme-dark", styles.masthead].join(" ")}>
        <div className={["shell", styles.inner].join(" ")}>
          <p className={["label", styles.eyebrow].join(" ")}>{eyebrow}</p>
          <DisplayLines lines={lines} as="h1" className={styles.heading} immediate delay={0.08} />
          {intro && <p className={["body-text", styles.intro].join(" ")}>{intro}</p>}
        </div>
      </header>
      {children}
    </motion.div>
  );
}
