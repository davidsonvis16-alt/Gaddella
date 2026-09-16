import ArrowLink from "../components/ArrowLink";
import PageShell from "../components/PageShell";
import { useSeo } from "../lib/seo";
import styles from "./NotFound.module.css";

export default function NotFound() {
  useSeo({ title: "Page not found", path: "/404" });

  return (
    <PageShell eyebrow="404" lines={["Nothing", "here."]} intro="That page has either moved or never existed.">
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="Page not found">
        <div className={["shell", styles.actions].join(" ")}>
          <ArrowLink to="/" variant="button">
            Back to the studio
          </ArrowLink>
          <ArrowLink to="/work">See the work</ArrowLink>
        </div>
      </section>
    </PageShell>
  );
}
