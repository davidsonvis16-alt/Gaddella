import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "../data/site";
import { useScrollLock } from "../lib/hooks";
import { EASE } from "../lib/motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const { pathname } = useLocation();

  useScrollLock(open);

  // The bar only takes a background once it has left the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation, and on Escape.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={[styles.bar, scrolled ? styles.solid : ""].filter(Boolean).join(" ")}>
        <div className={styles.inner}>
          <Link to="/" className={styles.wordmark} aria-label={`${SITE.name} — home`}>
            {SITE.name}
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.list}>
              {SITE.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => [styles.link, isActive ? styles.active : ""].filter(Boolean).join(" ")}
                  >
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <p className={[styles.locale, "label"].join(" ")}>
            {SITE.city}, {SITE.country}
          </p>

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className={[styles.bun, open ? styles.bunOpen : ""].join(" ")}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.menu}
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
          >
            <nav className={styles.menuInner} aria-label="Mobile">
              <ul className={styles.menuList}>
                {SITE.nav.map((item, i) => (
                  <li key={item.to} className={styles.menuMask}>
                    <motion.span
                      className={styles.menuLine}
                      initial={reduced ? { opacity: 0 } : { y: "110%" }}
                      animate={reduced ? { opacity: 1 } : { y: "0%" }}
                      exit={reduced ? { opacity: 0 } : { y: "110%" }}
                      transition={{
                        duration: reduced ? 0.2 : 0.7,
                        ease: EASE,
                        delay: reduced ? 0 : 0.12 + i * 0.06,
                      }}
                    >
                      <Link to={item.to} className={[styles.menuLink, "display"].join(" ")}>
                        {item.label}
                      </Link>
                    </motion.span>
                  </li>
                ))}
              </ul>

              <motion.div
                className={styles.menuFoot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : 0.35 }}
              >
                <p className="label">
                  {SITE.city}, {SITE.country}
                </p>
                <ul className={styles.menuSocial}>
                  {SITE.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer noopener" className="label">
                        {s.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${SITE.contact.email}`} className="label">
                      Email
                    </a>
                  </li>
                </ul>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
