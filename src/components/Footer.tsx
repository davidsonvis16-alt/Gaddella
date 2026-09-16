import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import { collectCredits } from "../data/images";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const credits = collectCredits();

  return (
    <footer className={["theme-dark", styles.footer].join(" ")}>
      <div className={["shell", styles.inner].join(" ")}>
        <div className={styles.identity}>
          <Link to="/" className={styles.wordmark}>
            {SITE.shortName}
          </Link>
          <p className="label">
            {SITE.city}, {SITE.country}
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <ul className={styles.list}>
            <li>
              <Link to="/" className={styles.link}>
                Home
              </Link>
            </li>
            {SITE.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className={styles.link}>
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.contact.email}`} className={styles.link}>
                Contact
              </a>
            </li>
            <li>
              <Link to="/booking" className={styles.link}>
                Book
              </Link>
            </li>
          </ul>
          <p className={["label", styles.handle].join(" ")}>
            IG / {SITE.social[0]?.handle}
          </p>
        </nav>
      </div>

      <div className={["shell", styles.legal].join(" ")}>
        <p className={["label", styles.copy].join(" ")}>
          © {year} {SITE.name}. All rights reserved.
        </p>
        {credits.length > 0 && (
          <p className={["label", styles.copy].join(" ")}>
            Photography:{" "}
            {credits.map((c, i) => (
              <span key={`${c.source}-${i}`}>
                {i > 0 && " · "}
                {c.sourceUrl ? (
                  <a href={c.sourceUrl} target="_blank" rel="noreferrer noopener" className={styles.creditLink}>
                    {c.author ?? c.source}
                  </a>
                ) : (
                  (c.author ?? c.source)
                )}
                {c.license ? ` (${c.license})` : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    </footer>
  );
}
