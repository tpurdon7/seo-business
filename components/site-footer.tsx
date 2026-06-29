import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 lg:flex-row lg:items-center">
        <p>SEO and AI search visibility for service businesses in Cornwall, Surrey, and across the UK.</p>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <Link className="hover:text-slate-950" href="/#services">
            Services
          </Link>
          <Link className="hover:text-slate-950" href="/about">
            About
          </Link>
          <Link className="hover:text-slate-950" href="/methodology">
            Methodology
          </Link>
          <Link className="hover:text-slate-950" href="/seo-cornwall">
            SEO Cornwall
          </Link>
          <Link className="hover:text-slate-950" href="/seo-surrey">
            SEO Surrey
          </Link>
          <Link className="hover:text-slate-950" href="/audit">
            Free audit
          </Link>
          <Link className="hover:text-slate-950" href="/account">
            Log in
          </Link>
          <Link className="hover:text-slate-950" href="/download">
            Mac app
          </Link>
          <Link className="hover:text-slate-950" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-slate-950" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-slate-950" href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
