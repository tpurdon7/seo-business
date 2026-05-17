<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Better Search project instructions

Better Search helps businesses become easier to find on Google and AI search.

When working on audit features, use `/skills/seo-audit.md` as the source of truth.

Audit work must be evidence-based. Do not invent issues. If something cannot be checked, mark it as "not checked".

Scoring categories:

- SEO: 30
- GEO: 25
- AEO: 20
- CRO: 15
- Authority/trust: 10

Writing style:

- Concise
- Commercial
- Plain English
- No em dashes
- No emojis
- No generic AI marketing language
- Avoid "it's not just X, it's Y"
- Avoid overblown words like unlock, elevate, seamless, game-changing, pivotal, crucial

Design style:

- Premium SEO dashboard
- Clean cards
- Clear score breakdowns
- Minimal clutter
- Good enough to send to a prospect

Technical rules:

- Use existing project conventions.
- Do not break current Better Search pages.
- Use TypeScript.
- Keep audit logic modular.
- Render pages before checking schema because static HTML/curl may miss JavaScript-injected JSON-LD.
- Failed checks should return "not checked", not guessed results.
