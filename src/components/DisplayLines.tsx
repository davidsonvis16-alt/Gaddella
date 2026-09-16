import { motion, useReducedMotion } from "framer-motion";
import { IN_VIEW, maskLine, stagger } from "../lib/motion";
import styles from "./DisplayLines.module.css";

type Props = {
  /** Each string is one typeset line. Line breaks are an art direction decision. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Delay before the first line lifts. */
  delay?: number;
  /** Render immediately instead of waiting for the viewport (hero). */
  immediate?: boolean;
};

/**
 * Display type that lifts out of its own mask, line by line.
 * The mask is the whole effect — no fade, no blur, just the edge of the line.
 */
export default function DisplayLines({ lines, as = "h2", className, delay = 0, immediate = false }: Props) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];

  const animation = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: IN_VIEW };

  return (
    <Tag
      className={["display", styles.lines, className ?? ""].filter(Boolean).join(" ")}
      variants={stagger(reduced, 0.08, delay)}
      {...animation}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className={styles.mask}>
          <motion.span className={styles.line} variants={maskLine(reduced)}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
