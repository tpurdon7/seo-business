# Better Search Audit Launch Setup

## Required Services

- Supabase project with Auth enabled.
- Vercel production project with environment variable access.
- Apple Developer account for signing and notarizing the Mac app.
- Public support/contact email for audit upgrade requests.

## Supabase

1. Create a Supabase project.
2. Apply every file in `supabase/migrations/` in filename order through the Supabase CLI or migration tooling. The app depends on the base schema, public lead fields, share links, API-token jobs, analytics, and launch-security migrations.
3. Add the production site URL to Supabase Auth redirect URLs:
   - `https://YOUR_DOMAIN/auth/callback`
   - local development URL if needed.
4. Copy project keys into Vercel.
5. Add the owner email to `public.site_admin_emails` and set the same address in `BETTER_SEARCH_ADMIN_EMAILS`.

## Vercel Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
AUDIT_ALLOWED_ORIGINS=https://YOUR_DOMAIN,tauri://localhost
AUDIT_SHARE_SECRET=
AUDIT_RATE_LIMIT_SECRET=
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN
NEXT_PUBLIC_MAC_DOWNLOAD_URL=
PAGESPEED_API_KEY=
BETTER_SEARCH_ADMIN_EMAILS=owner@example.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@YOUR_DOMAIN
```

`PAGESPEED_API_KEY` is optional. Google Places, backlink, directory, and competitor providers remain deferred for v1.

`BETTER_SEARCH_ADMIN_EMAILS` is required for the private Leads and Analytics pages. These pages fail closed when the variable is missing.

## Mac App Release

1. Build with `npm run tauri:build` inside `audit-mac-app`.
2. Sign and notarize the generated macOS bundle or DMG with Apple Developer credentials.
3. Upload the signed release to durable hosting.
4. Set `NEXT_PUBLIC_MAC_DOWNLOAD_URL` to the hosted release URL.
