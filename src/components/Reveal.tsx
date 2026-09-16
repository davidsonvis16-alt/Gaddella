import type { ReactNode, ElementType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IN_VIEW, fadeUp, stagger } from "../lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** Travel distance in px. 0 gives a pure fade. */
  distance?: number;
  delay?: number;
  className?: string;
  /** Passed through so revealed headings can be referenced by aria-labelledby. */
  id?: string;
};

/** A single element that rises into view once. */
export function Reveal({ children, as = "div", distance = 26, delay = 0, className, id }: Props) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion(as as ElementType);

  return (
    <Tag
      id={id}
      className={className}
      variants={fadeUp(reduced, distance, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
    >
      {children}
    </Tag>
  );
}

type GroupProps = {
  children: ReactNode;
  as?: ElementType;
  each?: number;
  delay?: number;
  className?: string;
};

/** Parent for staggered children — pair with <RevealItem>. */
export function RevealGroup({ children, as = "div", each = 0.07, delay = 0, className }: GroupProps) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion(as as ElementType);

  return (
    <Tag
      className={className}
      variants={stagger(reduced, each, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={IN_VIEW}
    >
      {children}
    </Tag>
  );
}

/** Child of <RevealGroup>. Inherits the parent's timing. */
export function RevealItem({ children, as = "div", distance = 22, className, id }: Props) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion(as as ElementType);

  return (
    <Tag id={id} className={className} variants={fadeUp(reduced, distance)}>
      {children}
    </Tag>
  );
}
