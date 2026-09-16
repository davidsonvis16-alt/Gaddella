import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Frame from "./../components/Frame";
import { getImage } from "../data/images";
import PageShell from "../components/PageShell";
import { FILTERS, WORKS, type Filter } from "../data/works";
import { EASE } from "../lib/motion";
import { useSeo } from "../lib/seo";
import styles from "./Work.module.css";

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion() ?? false;

  useSeo({
    title: "Work",
    path: "/work",
    description:
      "Selected tattoo work from GADELLAA ARTS TATTOO STUDIO in Nyeri, Kenya — illustrative, fine line, floral, lettering and minimal pieces.",
  });

  const shown = useMemo(
    () => (filter === "All" ? WORKS : WORKS.filter((w) => w.style === filter)),
    [filter],
  );

  return (
    <PageShell
      eyebrow="Selected work"
      lines={["The archive."]}
      intro="Every piece here was drawn for one person. Filter by style, or read it straight through."
    >
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="Gallery">
        <div className="shell">
          <div className={styles.filters} role="group" aria-label="Filter by style">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={[styles.filter, filter === f ? styles.filterActive : ""].filter(Boolean).join(" ")}
                aria-pressed={filter === f}
              >
                {f}
                <span className={styles.count}>
                  {f === "All" ? WORKS.length : WORKS.filter((w) => w.style === f).length}
                </span>
              </button>
            ))}
          </div>

          <p className="visually-hidden" aria-live="polite">
            {`${shown.length} ${shown.length === 1 ? "piece" : "pieces"} shown.`}
          </p>

          <motion.ul className={styles.grid} layout={!reduced}>
            <AnimatePresence mode="popLayout">
              {shown.map((work, i) => {
                // Landscape photos take two columns; nothing is cropped to fit the grid.
                const wide = getImage(work.imageId).aspect > 1;
                return (
                  <motion.li
                    key={work.id}
                    className={[styles.card, wide ? styles.cardWide : ""].filter(Boolean).join(" ")}
                    layout={!reduced}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: reduced ? 0.2 : 0.55, ease: EASE, delay: reduced ? 0 : (i % 4) * 0.04 }}
                  >
                    <div className={styles.media}>
                      <Frame
                        image={work.imageId}
                        hoverZoom
                        still
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      />
                    </div>
                    <div className={styles.meta}>
                      <h2 className={["label", styles.style].join(" ")}>{work.title}</h2>
                      <p className={styles.artist}>{work.style}</p>
                      <p className={styles.desc}>{work.description}</p>
                      <p className={styles.placement}>{work.placement}</p>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>
    </PageShell>
  );
}
