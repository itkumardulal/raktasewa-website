import { useEffect } from "react";

/**
 * Lightweight SEO helper (no extra dependency).
 * Sets document title + common meta/OG tags.
 */
export default function Seo({
  title,
  description,
  path = "/",
  type = "website",
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | RaktaSewa (रक्तसेवा)`
      : "RaktaSewa (रक्तसेवा) — Connecting Donors. Saving Lives.";
    document.title = fullTitle;

    const ensureMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      return el;
    };

    const desc =
      description ||
      "RaktaSewa is Nepal's community-powered digital blood connection platform—not a blood bank—connecting donors, patients, and hospitals in emergencies.";

    const descMeta = ensureMeta('meta[name="description"]', { name: "description" });
    descMeta.setAttribute("content", desc);

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: "og:title" });
    ogTitle.setAttribute("content", fullTitle);

    const ogDesc = ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    });
    ogDesc.setAttribute("content", desc);

    const ogType = ensureMeta('meta[property="og:type"]', { property: "og:type" });
    ogType.setAttribute("content", type);

    const twCard = ensureMeta('meta[name="twitter:card"]', { name: "twitter:card" });
    twCard.setAttribute("content", "summary_large_image");

    const twTitle = ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" });
    twTitle.setAttribute("content", fullTitle);

    const twDesc = ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    });
    twDesc.setAttribute("content", desc);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    try {
      canonical.setAttribute("href", new URL(path, window.location.origin).toString());
    } catch {
      /* ignore */
    }
  }, [title, description, path, type]);

  return null;
}
