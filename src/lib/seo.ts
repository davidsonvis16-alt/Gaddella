import { useEffect } from "react";
import { SITE } from "../data/site";

type Seo = {
  title: string;
  description?: string;
  /** Path only — combined with SITE.url for the canonical tag. */
  path?: string;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Per-route title, description, canonical and Open Graph tags. */
export function useSeo({ title, description = SITE.description, path = "/" }: Seo): void {
  useEffect(() => {
    const full = title === SITE.name ? `${SITE.name} — ${SITE.positioning} in ${SITE.locality}` : `${title} — ${SITE.name}`;
    document.title = full;

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", full);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", `${SITE.url}${path}`);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", full);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${SITE.url}${path}`;
  }, [title, description, path]);
}
