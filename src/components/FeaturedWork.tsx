import ArrowLink from "./ArrowLink";
import DisplayLines from "./DisplayLines";
import ShuffleDeck from "./ShuffleDeck";
import { Reveal } from "./Reveal";
import { FEATURED } from "../data/works";
import styles from "./FeaturedWork.module.css";

export default function FeaturedWork() {
  return (
    <section className={["section", "theme-light", styles.section].join(" ")} aria-labelledby="featured-heading">
      <div className={["shell", styles.grid].join(" ")}>
        <div className={styles.copy}>
          <Reveal as="p" className={["label", styles.eyebrow].join(" ")} distance={14}>
            Featured work
          </Reveal>

          <DisplayLines
            lines={["Timeless", "designs.", "Modern", "expression."]}
            as="h2"
            className={styles.heading}
          />

          <Reveal as="p" className={["body-text", styles.body].join(" ")} delay={0.1}>
            From fine line to bold blackwork, each piece is created with intention, precision and respect for your
            story.
          </Reveal>

          <Reveal className={styles.cta} delay={0.18}>
            <ArrowLink to="/work">View full gallery</ArrowLink>
          </Reveal>
        </div>

        <div className={styles.deck}>
          <ShuffleDeck works={FEATURED} />
        </div>
      </div>

      <h2 id="featured-heading" className="visually-hidden">
        Featured work
      </h2>
    </section>
  );
}
