# Better Search Audit Worker

Vercel should display reports and manage the web app. The worker should create reports.

## Local launch workflow

1. Create or import audit jobs through the app or Mac app.
2. Run the worker from this project:

```bash
npm run audit:worker
```

Useful limits:

```bash
AUDIT_WORKER_MAX_ITEMS=10 npm run audit:worker
AUDIT_JOB_ID=job-id AUDIT_WORKER_MAX_ITEMS=60 npm run audit:worker
```

The worker reads queued audits from Supabase, crawls pages with Playwright, scores them, writes reports back to Supabase, and updates job progress.

## Hosted worker later

Use Render, Railway, Fly.io, or another long-running Node host.

Command:

```bash
node scripts/process-audit-worker.mjs
```

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`

Optional:

- `AUDIT_WORKER_MAX_ITEMS`
- `AUDIT_WORKER_POLL_MS`
- `AUDIT_JOB_ID`
- `PAGESPEED_API_KEY`
- `GOOGLE_PLACES_API_KEY`

Use `AUDIT_WORKER_POLL_MS=5000` for a continuously polling worker.
