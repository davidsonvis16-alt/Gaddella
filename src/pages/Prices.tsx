import ArrowLink from "../components/ArrowLink";
import Frame from "../components/Frame";
import PageShell from "../components/PageShell";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import {
  COLOUR_SURCHARGE,
  PIERCING_PRICES,
  TATTOO_PRICES,
  formatKsh,
  formatPrice,
  type PriceGroup,
} from "../data/pricing";
import { SITE } from "../data/site";
import { useSeo } from "../lib/seo";
import styles from "./Prices.module.css";

function PriceGroups({ groups }: { groups: PriceGroup[] }) {
  return (
    <RevealGroup as="div" className={styles.groups} each={0.08}>
      {groups.map((group) => (
        <RevealItem as="div" key={group.id} className={styles.group}>
          <h3 className={["label", styles.groupTitle].join(" ")}>{group.title}</h3>
          <dl className={styles.items}>
            {group.items.map((item) => (
              <div key={item.service} className={styles.item}>
                <div className={styles.thumb}>
                  {item.imageId ? (
                    <Frame image={item.imageId} ratio={1} still sizes="96px" />
                  ) : (
                    <span className={styles.placeholder}>
                      <span className={styles.placeholderText}>Photo coming soon</span>
                    </span>
                  )}
                </div>
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
  );
}

export default function Prices() {
  useSeo({
    title: "Prices",
    path: "/prices",
    description: `Tattoo and body piercing prices at ${SITE.name} in Nyeri, Kenya — mini tattoos from ${formatKsh(700)}, lobe piercings from ${formatKsh(300)}.`,
  });

  return (
    <PageShell
      eyebrow="Price lists"
      lines={["Tattoos &", "piercings."]}
      intro="Tattoo prices marked “from” are starting points — the final quote depends on size, detail and placement, and we'll confirm it before we start."
    >
      <section className={["section", "theme-light", styles.section].join(" ")} aria-labelledby="tattoo-prices">
        <div className="shell">
          <Reveal as="h2" id="tattoo-prices" className={["display", styles.heading].join(" ")}>
            Tattoos
          </Reveal>

          <PriceGroups groups={TATTOO_PRICES} />

          <Reveal className={styles.callout}>
            <p className={["label", styles.calloutLabel].join(" ")}>Coloured tattoos</p>
            <p className={["display", styles.calloutPrice].join(" ")}>+ {formatKsh(COLOUR_SURCHARGE)}</p>
            <p className={styles.calloutNote}>Added to the price of any piece done in colour.</p>
          </Reveal>
        </div>
      </section>

      <section className={["section", "theme-light", styles.section].join(" ")} aria-labelledby="piercing-prices">
        <div className="shell">
          <Reveal as="h2" id="piercing-prices" className={["display", styles.heading].join(" ")}>
            Body piercing
          </Reveal>

          <PriceGroups groups={PIERCING_PRICES} />

          <Reveal className={styles.callout}>
            <p className={["label", styles.calloutLabel].join(" ")}>Jewellery included</p>
            <p className={["display", styles.calloutPrice].join(" ")}>Basic jewellery included</p>
            <p className={styles.calloutNote}>
              All piercing prices include basic jewellery. Premium jewellery is charged separately.
            </p>
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
