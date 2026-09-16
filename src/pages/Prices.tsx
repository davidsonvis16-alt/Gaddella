import ArrowLink from "../components/ArrowLink";
import PageShell from "../components/PageShell";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { COLOUR_SURCHARGE, PRICE_GROUPS, formatKsh, formatPrice } from "../data/pricing";
import { SITE } from "../data/site";
import { useSeo } from "../lib/seo";
import styles from "./Prices.module.css";

export default function Prices() {
  useSeo({
    title: "Prices",
    path: "/prices",
    description: `Tattoo prices at ${SITE.name} in Nyeri, Kenya — mini tattoos from ${formatKsh(700)}, sleeves, chest and back pieces, cover-ups and portraits.`,
  });

  return (
    <PageShell
      eyebrow="Tattoo price list"
      lines={["Prices."]}
      intro="Most prices are starting points. The final quote depends on size, detail and placement — we'll confirm it before the first line goes down."
    >
      <section className={["section", "theme-light", styles.section].join(" ")} aria-label="Price list">
        <div className="shell">
          <RevealGroup as="div" className={styles.groups} each={0.08}>
            {PRICE_GROUPS.map((group) => (
              <RevealItem as="div" key={group.id} className={styles.group}>
                <h2 className={["label", styles.groupTitle].join(" ")}>
                  {group.title}
                </h2>
                <dl className={styles.items}>
                  {group.items.map((item) => (
                    <div key={item.service} className={styles.item}>
                      <dt className={styles.service}>{item.service}</dt>
                      <dd className={[styles.price, item.price === undefined ? styles.note : ""].join(" ")}>
                        {formatPrice(item)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className={styles.colour}>
            <p className={["label", styles.colourLabel].join(" ")}>Coloured tattoos</p>
            <p className={["display", styles.colourPrice].join(" ")}>+ {formatKsh(COLOUR_SURCHARGE)}</p>
            <p className={styles.colourNote}>Added to the price of any piece done in colour.</p>
          </Reveal>

          <Reveal className={styles.contact}>
            <div>
              <p className="label">Bookings &amp; enquiries</p>
              <p className={styles.contactLine}>
                Call or WhatsApp{" "}
                <a href={SITE.contact.phoneHref} className={styles.contactLink}>
                  {SITE.contact.phone}
                </a>
              </p>
            </div>
            <div className={styles.contactActions}>
              <ArrowLink to="/booking" variant="button">
                Book a session
              </ArrowLink>
              <ArrowLink href={SITE.contact.whatsapp}>WhatsApp us</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
