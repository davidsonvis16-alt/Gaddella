import ArrowLink from "../components/ArrowLink";
import PageShell from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { ARTIST } from "../data/artists";
import { SITE } from "../data/site";
import { WORKS } from "../data/works";
import { useSeo } from "../lib/seo";
import styles from "./Artists.module.css";

export default function Artists() {
  useSeo({
    title: "The artist",
    path: "/artist",
    description: `${ARTIST.name}, the tattoo and piercing artist at ${SITE.name} in Nyeri, Kenya.`,
  });

  return (
    <PageShell eyebrow="The artist" lines={["One artist.", "Every piece."]} intro={ARTIST.bio}>
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="The artist">
        <Reveal className="shell">
          <article id={ARTIST.id} className={styles.body}>
            <p className={["label", styles.role].join(" ")}>{ARTIST.role}</p>
            <h2 className={["display", styles.name].join(" ")}>{ARTIST.name}</h2>

            <ul className={styles.tags}>
              {ARTIST.specialties.map((s) => (
                <li key={s} className={["label", styles.tag].join(" ")}>
                  {s}
                </li>
              ))}
            </ul>

            <p className={styles.note}>{ARTIST.note}</p>

            <dl className={styles.facts}>
              <div>
                <dt className="label">Pieces shown</dt>
                <dd>{String(WORKS.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt className="label">At the studio since</dt>
                <dd>{ARTIST.since}</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <ArrowLink to="/booking">Book with {ARTIST.name}</ArrowLink>
              <ArrowLink to="/work">See the work</ArrowLink>
              {ARTIST.instagram && <ArrowLink href={ARTIST.instagram}>Instagram</ArrowLink>}
            </div>
          </article>
        </Reveal>
      </section>
    </PageShell>
  );
}
