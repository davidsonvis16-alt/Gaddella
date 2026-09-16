import ArrowLink from "./ArrowLink";
import DisplayLines from "./DisplayLines";
import Frame from "./Frame";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { STUDIO_PRINCIPLES } from "../data/studio";
import styles from "./StudioSection.module.css";

export default function StudioSection() {
  return (
    <section className={["section", "theme-dark", styles.section].join(" ")} aria-labelledby="studio-heading">
      <div className={["shell", styles.head].join(" ")}>
        <Reveal as="p" className="label" distance={14}>
          The studio
        </Reveal>

        <DisplayLines lines={["A quiet room", "to work in."]} as="h2" className={styles.heading} />

        <Reveal as="p" className={["body-text", styles.body].join(" ")} delay={0.1}>
          One floor in Nyeri, kept plain on purpose. Space to talk the idea through, a chair to sit still in, and
          nothing on the walls competing with the work.
        </Reveal>
      </div>

      <div className={["shell", styles.frames].join(" ")}>
        <div className={styles.wide}>
          <Frame image="studioInterior" sizes="(max-width: 767px) 100vw, 62vw" />
          <p className={["label", styles.caption].join(" ")}>The room</p>
        </div>

        <div className={styles.tall}>
          <Frame image="studioStation" sizes="(max-width: 767px) 100vw, 32vw" />
          <p className={["label", styles.caption].join(" ")}>The station</p>
        </div>
      </div>

      <RevealGroup as="ol" className={["shell", styles.principles].join(" ")} each={0.08}>
        {STUDIO_PRINCIPLES.map((p) => (
          <RevealItem as="li" key={p.n} className={styles.principle}>
            <span className={["label", styles.principleNum].join(" ")}>{p.n}</span>
            <h3 className={styles.principleTitle}>{p.title}</h3>
            <p className={styles.principleBody}>{p.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className={["shell", styles.foot].join(" ")}>
        <Reveal>
          <ArrowLink to="/studio">Inside the studio</ArrowLink>
        </Reveal>
      </div>

      <h2 id="studio-heading" className="visually-hidden">
        The studio
      </h2>
    </section>
  );
}
