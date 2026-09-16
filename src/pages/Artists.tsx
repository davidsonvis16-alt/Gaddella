import ArrowLink from "../components/ArrowLink";
import PageShell from "../components/PageShell";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { ARTISTS } from "../data/artists";
import { WORKS } from "../data/works";
import { useSeo } from "../lib/seo";
import styles from "./Artists.module.css";

export default function Artists() {
  useSeo({
    title: "Artists",
    path: "/artists",
    description:
      "The tattoo artists at GADELLAA ARTS TATTOO STUDIO in Nyeri, Kenya.",
  });

  return (
    <PageShell
      eyebrow="Our artists"
      lines={["Skilled hands.", "Different visions."]}
      intro="Our artists bring unique styles and perspectives, but share the same commitment to quality, safety and authenticity."
    >
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="Artists">
        <RevealGroup as="ul" className={["shell", styles.list].join(" ")} each={0.1}>
          {ARTISTS.map((artist, i) => {
            const count = WORKS.filter((w) => w.artistId === artist.id).length;
            return (
              <RevealItem as="li" key={artist.id} className={styles.row}>
                <article id={artist.id} className={styles.card}>
                  <span className={["label", styles.num].join(" ")}>{String(i + 1).padStart(2, "0")}</span>

                  <div className={styles.body}>
                    <p className={["label", styles.role].join(" ")}>{artist.role}</p>
                    <h2 className={["display", styles.name].join(" ")}>{artist.name}</h2>

                    <ul className={styles.tags}>
                      {artist.specialties.map((s) => (
                        <li key={s} className={["label", styles.tag].join(" ")}>
                          {s}
                        </li>
                      ))}
                    </ul>

                    <p className={styles.bio}>{artist.bio}</p>
                    <p className={styles.note}>{artist.note}</p>

                    <dl className={styles.facts}>
                      <div>
                        <dt className="label">Pieces shown</dt>
                        <dd>{String(count).padStart(2, "0")}</dd>
                      </div>
                      <div>
                        <dt className="label">At the studio since</dt>
                        <dd>{artist.since}</dd>
                      </div>
                    </dl>

                    <div className={styles.actions}>
                      <ArrowLink to="/booking">Book with {artist.short.split(" ")[0]}</ArrowLink>
                      {artist.instagram && <ArrowLink href={artist.instagram}>Instagram</ArrowLink>}
                    </div>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className={["shell", styles.note2].join(" ")}>
          <p className={["label", styles.disclaimer].join(" ")}>
            Artist profiles on this page are placeholders. Replace them in src/data/artists.ts before launch.
          </p>
        </Reveal>
      </section>
    </PageShell>
  );
}
