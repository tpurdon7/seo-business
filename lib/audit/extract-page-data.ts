import type { AuditExtractedData } from "@/lib/audit/types";
import {
  cleanText,
  findContactDetails,
  findTrustSignalLines,
  firstWords,
  isLikelyCta,
  wordCount,
} from "@/lib/audit/utils";

type PageEvaluation = Omit<
  AuditExtractedData,
  | "url"
  | "finalUrl"
  | "domain"
  | "statusCode"
  | "rendered"
  | "crawlError"
  | "robotsTxt"
  | "sitemapXml"
  | "canonicalConsistency"
  | "mobileViewport"
  | "speed"
>;

interface EvaluatablePage {
  evaluate<T>(pageFunction: () => T | Promise<T>): Promise<T>;
}

export async function extractPageData(page: EvaluatablePage): Promise<PageEvaluation> {
  const extracted = await page.evaluate(() => {
    const clean = (value: string | null | undefined) => (value ?? "").replace(/\s+/g, " ").trim();
    const attr = (selector: string, attribute: string) =>
      document.querySelector(selector)?.getAttribute(attribute)?.trim() || null;
    const text = (selector: string) => clean(document.querySelector(selector)?.textContent);
    const visibleText = clean(document.body?.innerText ?? "");

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))
      .map((link) => {
        let href = link.href;
        try {
          href = new URL(link.getAttribute("href") ?? "", window.location.href).toString();
        } catch {
          href = link.getAttribute("href") ?? "";
        }

        return {
          text: clean(link.innerText || link.getAttribute("aria-label") || link.title || href),
          href,
          isInternal: href.startsWith(window.location.origin),
        };
      })
      .filter((link) => link.href.startsWith("http"));

    const jsonLd = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'))
      .map((script) => {
        try {
          return JSON.parse(script.textContent ?? "");
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("button"))
      .map((button) => ({
        text: clean(button.innerText || button.getAttribute("aria-label")),
        source: "button" as const,
      }))
      .filter((button) => button.text);

    const linkCtas = links
      .map((link) => ({
        text: link.text,
        href: link.href,
        source: "link" as const,
      }))
      .filter((link) => link.text);

    const inputCtas = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="submit"], input[type="button"]'))
      .map((input) => ({
        text: clean(input.value || input.getAttribute("aria-label")),
        source: "input" as const,
      }))
      .filter((input) => input.text);

    const images = Array.from(document.querySelectorAll<HTMLImageElement>("img")).map((image) => ({
      src: image.currentSrc || image.src || image.getAttribute("src") || "",
      alt: image.getAttribute("alt"),
      missingAlt: !image.hasAttribute("alt") || !clean(image.getAttribute("alt")),
    }));

    return {
      title: clean(document.title) || null,
      metaDescription: attr('meta[name="description"]', "content"),
      canonicalUrl: attr('link[rel="canonical"]', "href"),
      robotsMeta: attr('meta[name="robots"]', "content"),
      viewport: attr('meta[name="viewport"]', "content"),
      htmlLang: document.documentElement.lang || null,
      h1: text("h1") || null,
      h1s: Array.from(document.querySelectorAll("h1")).map((heading) => clean(heading.textContent)).filter(Boolean),
      h2s: Array.from(document.querySelectorAll("h2")).map((heading) => clean(heading.textContent)).filter(Boolean),
      h3s: Array.from(document.querySelectorAll("h3")).map((heading) => clean(heading.textContent)).filter(Boolean),
      visibleBodyText: visibleText,
      ctas: [...buttons, ...linkCtas, ...inputCtas],
      internalLinks: links.filter((link) => link.isInternal).slice(0, 120),
      externalLinks: links.filter((link) => !link.isInternal).slice(0, 120),
      imageCount: images.length,
      imagesMissingAlt: images.filter((image) => image.missingAlt).slice(0, 80),
      jsonLd,
    };
  });

  const visibleBodyText = cleanText(extracted.visibleBodyText);

  return {
    ...extracted,
    visibleBodyText,
    approximateWordCount: wordCount(visibleBodyText),
    first100Words: firstWords(visibleBodyText, 100),
    ctas: extracted.ctas.filter((cta) => isLikelyCta(cta.text)).slice(0, 16),
    contactDetails: findContactDetails(visibleBodyText),
    trustSignals: findTrustSignalLines(visibleBodyText),
    noindex: cleanText(extracted.robotsMeta).toLowerCase().includes("noindex"),
  };
}
