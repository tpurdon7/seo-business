# SEO Audit Skill

Source of truth for this repo's audit MVP. The original framework lives at `../seo-audit/SKILL.md` in the broader Better Search workspace.

Core audit order:

1. Crawlability and indexation.
2. Technical foundations.
3. On-page optimization.
4. Content quality.
5. Authority and links.

Important rule:

Static HTML fetches and curl cannot reliably detect structured data because JSON-LD can be injected by JavaScript. Render the page before reporting schema as found or not found.

For this MVP, check and score:

- URL, domain, status code, title, meta description, canonical URL, robots meta, viewport, HTML language.
- H1, H2s, H3s, visible body text, word count, first 100 words.
- CTA text, contact details, trust signals.
- Internal links, external links, image count, images missing alt text.
- JSON-LD schema from rendered DOM.
- Robots.txt availability, sitemap.xml availability, noindex, canonical consistency, mobile viewport.

If speed, directory presence, backlinks, competitor data, or Google Business Profile data are unavailable, mark them as not checked.
