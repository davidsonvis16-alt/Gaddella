import ArrowLink from "../components/ArrowLink";
import Frame from "../components/Frame";
import PageShell from "../components/PageShell";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { STUDIO_FRAMES, STUDIO_PRINCIPLES } from "../data/studio";
import { SITE } from "../data/site";
import { useSeo } from "../lib/seo";
import styles from "./Studio.module.css";

export default function Studio() {
  useSeo({
    title: "Studio",
    path: "/studio",
    description:
      "Inside GADELLA — a private, custom-only tattoo studio in Nyeri, Kenya. How we work, and what to expect from a session.",
  });

  return (
    <PageShell
      eyebrow="The studio"
      lines={["A quiet room", "to work in."]}
      intro="One floor in Nyeri, kept plain on purpose. Space to talk the idea through, a chair to sit still in, and nothing on the walls competing with the work."
    >
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="Inside the studio">
        <RevealGroup as="ul" className={["shell", styles.frames].join(" ")} each={0.08}>
          {STUDIO_FRAMES.map((frame) => (
            <RevealItem as="li" key={frame.id} className={[styles.frame, styles[frame.span]].join(" ")}>
              <Frame image={frame.imageId} hoverZoom sizes="(max-width: 767px) 100vw, 50vw" />
              <div className={styles.caption}>
                <h2 className={["label", styles.frameTitle].join(" ")}>{frame.title}</h2>
                <p className={styles.frameText}>{frame.caption}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className={["section", "theme-dark", styles.how].join(" ")} aria-labelledby="how-heading">
        <div className="shell">
          <Reveal as="h2" id="how-heading" className={["display", styles.howHeading].join(" ")}>
            How a session works
          </Reveal>

          <RevealGroup as="ol" className={styles.steps} each={0.08}>
            {STUDIO_PRINCIPLES.map((p) => (
              <RevealItem as="li" key={p.n} className={styles.step}>
                <span className={["label", styles.stepNum].join(" ")}>{p.n}</span>
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepBody}>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className={styles.visit}>
            <dl className={styles.details}>
              <div>
                <dt className="label">Where</dt>
                <dd>{SITE.contact.address}</dd>
              </div>
              <div>
                <dt className="label">Hours</dt>
                <dd>{SITE.contact.hours}</dd>
              </div>
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.contact.email}`} className={styles.detailLink}>
                    {SITE.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
            <ArrowLink to="/booking" variant="button">
              Book a session
            </ArrowLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
