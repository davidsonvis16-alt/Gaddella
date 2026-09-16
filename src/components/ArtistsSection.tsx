import { Link } from "react-router-dom";
import ArrowLink from "./ArrowLink";
import DisplayLines from "./DisplayLines";
import Frame from "./Frame";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ARTISTS } from "../data/artists";
import styles from "./ArtistsSection.module.css";

export default function ArtistsSection() {
  return (
    <section className={["theme-light", styles.section].join(" ")} aria-labelledby="artists-heading">
      <div className={styles.grid}>
        <div className={styles.media}>
          <Frame image="artistWide" sizes="(max-width: 1023px) 100vw, 38vw" />
        </div>

        <div className={styles.content}>
          <div className={styles.copy}>
            <Reveal as="p" className={["label", styles.eyebrow].join(" ")} distance={14}>
              Our artists
            </Reveal>

            <DisplayLines
              lines={["Skilled hands.", "Different visions."]}
              as="h2"
              className={styles.heading}
            />

            <Reveal as="p" className={["body-text", styles.body].join(" ")} delay={0.1}>
              Our artists bring unique styles and perspectives, but share the same commitment to quality, safety and
              authenticity.
            </Reveal>

            <Reveal className={styles.cta} delay={0.18}>
              <ArrowLink to="/artists">Meet the artists</ArrowLink>
            </Reveal>
          </div>

          <RevealGroup as="ul" className={styles.list} each={0.08}>
            {ARTISTS.map((artist) => (
              <RevealItem as="li" key={artist.id} className={styles.listItem}>
                <Link to={`/artists#${artist.id}`} className={styles.listLink}>
                  <span className={styles.name}>{artist.short}</span>
                  <span className={styles.specialty}>{artist.specialties.join(" / ")}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <h2 id="artists-heading" className="visually-hidden">
        Our artists
      </h2>
    </section>
  );
}
