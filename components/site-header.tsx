import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { bookingLink } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center" href="/" aria-label="Better Search home">
          <Image
            src="/better-search-logo.png"
            alt="Better Search"
            width={1774}
            height={887}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          <Link className="hover:text-slate-950" href="/#services">
            Services
          </Link>
          <Link className="hover:text-slate-950" href="/#industries">
            Who it helps
          </Link>
          <Link className="hover:text-slate-950" href="/#dashboard">
            Dashboard
          </Link>
          <Link className="hover:text-slate-950" href="/#process">
            Process
          </Link>
          <Link className="hover:text-slate-950" href="/#pricing">
            Pricing
          </Link>
          <Link className="hover:text-slate-950" href="/#faq">
            FAQ
          </Link>
        </nav>
        <a className={buttonVariants({ size: "sm" })} href={bookingLink}>
          Free audit
        </a>
      </div>
    </header>
  );
}
