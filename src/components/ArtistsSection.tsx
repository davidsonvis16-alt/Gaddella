import ArrowLink from "./ArrowLink";
import DisplayLines from "./DisplayLines";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ARTIST } from "../data/artists";
import styles from "./ArtistsSection.module.css";

export default function ArtistsSection() {
  return (
    <section className={["theme-light", styles.section].join(" ")} aria-labelledby="artists-heading">
      <div className={["shell", styles.grid].join(" ")}>
        <div className={styles.content}>
          <div className={styles.copy}>
            <Reveal as="p" className={["label", styles.eyebrow].join(" ")} distance={14}>
              The artist
            </Reveal>

            <DisplayLines
              lines={["One artist.", "Every piece."]}
              as="h2"
              className={styles.heading}
            />

            <Reveal as="p" className={["body-text", styles.body].join(" ")} delay={0.1}>
              {ARTIST.name} handles every tattoo and piercing in the studio — from the first conversation to the
              aftercare.
            </Reveal>

            <Reveal className={styles.cta} delay={0.18}>
              <ArrowLink to="/artist">Meet {ARTIST.name}</ArrowLink>
            </Reveal>
          </div>

          <RevealGroup as="ul" className={styles.list} each={0.08}>
            {ARTIST.specialties.map((s) => (
              <RevealItem as="li" key={s} className={styles.listItem}>
                <span className={styles.listLink}>
                  <span className={styles.name}>{s}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <h2 id="artists-heading" className="visually-hidden">
        The artist
      </h2>
    </section>
  );
}
