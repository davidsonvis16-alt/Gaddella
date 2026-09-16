import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./ArrowLink.module.css";

type Common = {
  children: ReactNode;
  /** `button` draws the bordered box; `text` is the underlined editorial link. */
  variant?: "button" | "text";
  className?: string;
};

type AsLink = Common & { to: string; href?: never; onClick?: never; type?: never };
type AsAnchor = Common & { href: string; to?: never; onClick?: never; type?: never };
type AsButton = Common & {
  onClick?: () => void;
  type?: "button" | "submit";
  to?: never;
  href?: never;
};

type Props = AsLink | AsAnchor | AsButton;

/** The long arrow. A line and a head — nothing that reads as an icon set. */
function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 34 10" width="34" height="10" aria-hidden="true" focusable="false">
      <path d="M0 5h31M27 1l4.5 4L27 9" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/**
 * Every call to action on the site. One component so the arrow, the tracking
 * and the hover behaviour stay identical everywhere.
 */
export default function ArrowLink(props: Props) {
  const { children, variant = "text", className } = props;
  const cls = [styles.base, variant === "button" ? styles.button : styles.text, className ?? ""]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <Arrow />
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const external = /^https?:/.test(props.href);
    return (
      <a
        href={props.href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={cls}>
      {inner}
    </button>
  );
}
