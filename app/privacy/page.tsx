import type { Metadata } from "next";
import Link from "next/link";

import { PublicTrustLayout } from "@/components/public-trust-layout";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@bettersearch.dev";

export const metadata: Metadata = {
  title: "Privacy Policy | Better Search",
  description:
    "How Better Search collects, uses, stores and protects personal information when you use our website, audits and account features.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PublicTrustLayout
      eyebrow="Privacy policy"
      title="Your information, explained clearly."
      intro="This policy explains what Better Search collects when you use our website and services, why we use it, where it is stored, and the choices available to you."
      updated="19 June 2026"
      notice={
        <>
          Better Search is responsible for the personal information described here. Privacy questions
          and rights requests can be sent to{" "}
          <a className="font-semibold underline underline-offset-4" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </>
      }
      sections={[
        {
          id: "information-we-collect",
          title: "Information we collect",
          paragraphs: [
            "The information we collect depends on how you use Better Search. You can browse most public pages without creating an account.",
          ],
          bullets: [
            "When you request a public website audit, we collect the website URL, your email address, the niche or industry you enter, whether you opted into marketing, and details of the generated audit such as its identifier and score.",
            "When you create or use an account, our authentication provider may process your email address, account identifiers, login records and password-recovery activity. We do not receive your password in readable form.",
            "When you contact us or book a call, we receive the details you choose to provide and the contents of your enquiry.",
            "Our first-party analytics records page visits, clicks, referral and campaign information, approximate device type, browser language, timezone, screen size, engagement time, and technical errors. Random visitor and session identifiers are stored in your browser. We do not intentionally use this analytics system to collect the content of form fields.",
            "Our servers may also receive standard technical information, including an IP address and user-agent string, as part of normal website security and delivery.",
          ],
        },
        {
          id: "how-we-use-it",
          title: "How we use information",
          bullets: [
            "To generate and deliver the audit or service you request.",
            "To operate accounts, authentication, password recovery and secure access.",
            "To reply to enquiries, arrange calls and provide customer support.",
            "To understand how the website is used, diagnose errors and improve conversion, content and performance.",
            "To protect Better Search, its users and its systems from misuse, fraud or security threats.",
            "To send occasional marketing emails only where you have opted in or another lawful basis applies. You can unsubscribe at any time.",
            "To meet legal, tax, accounting or regulatory obligations where they apply.",
          ],
        },
        {
          id: "lawful-bases",
          title: "Our reasons for processing",
          paragraphs: [
            "Under UK data-protection law, we rely on the reason that fits the activity. This may be performance of a contract or steps you ask us to take before a contract, our legitimate interests in operating and improving the business, your consent for optional marketing, or compliance with a legal obligation.",
            "Where we rely on legitimate interests, we consider the impact on you and do not use that basis where your rights and interests should take priority.",
          ],
        },
        {
          id: "storage-and-sharing",
          title: "Storage and service providers",
          paragraphs: [
            "Website, audit, lead, analytics and account information may be stored using Supabase, which provides database, storage and authentication infrastructure. Hosting, scheduling, email and other operational providers may also process information where needed to deliver the service.",
            "Some providers may process information outside the UK. Where required, we expect appropriate safeguards to be used for international transfers. We do not sell your personal information.",
            "We may disclose information where required by law, to protect legal rights or security, or as part of a business transfer subject to suitable confidentiality and data-protection arrangements.",
          ],
        },
        {
          id: "analytics",
          title: "Analytics and browser storage",
          paragraphs: [
            "Better Search uses its own analytics to understand visits and interactions. It creates random visitor and session identifiers in local browser storage, respects the browser's Do Not Track setting where it is enabled, and sends usage events to our Supabase database.",
            "You can clear local browser storage through your browser settings. Blocking storage or scripts may reduce the analytics collected but should not prevent access to the main public content.",
          ],
        },
        {
          id: "retention",
          title: "How long we keep information",
          paragraphs: [
            "We keep personal information only for as long as it is reasonably needed for the purpose it was collected, including providing services, maintaining useful business records, resolving disputes, security and meeting legal obligations.",
            "Retention periods differ by record. Enquiries and audit leads may be kept while a commercial relationship remains possible and then reviewed or deleted; account data is generally kept while the account is active; marketing records are kept until you unsubscribe or we no longer need them. Some records may be retained longer where the law requires it or a legal claim may arise.",
          ],
        },
        {
          id: "your-rights",
          title: "Your rights",
          paragraphs: [
            <>
              Depending on the circumstances, UK data-protection law may give you rights to access,
              correct or erase your information; restrict or object to its use; receive certain data
              in a portable format; and withdraw consent. Email{" "}
              <a className="font-semibold text-orange-700 underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>{" "}
              to make a request. We may need to verify your identity.
            </>,
            <>
              You can unsubscribe from marketing using the link in an email or by contacting us.
              You may also raise a concern with the UK Information Commissioner&apos;s Office. See{" "}
              <a
                className="font-semibold text-orange-700 underline"
                href="https://ico.org.uk/make-a-complaint/"
                rel="noreferrer"
                target="_blank"
              >
                ico.org.uk
              </a>{" "}
              for current guidance.
            </>,
          ],
        },
        {
          id: "changes",
          title: "Changes to this policy",
          paragraphs: [
            <>
              We may update this policy as Better Search develops or legal requirements change. The
              latest version will appear on this page with its updated date. For related service
              conditions, read our <Link className="font-semibold text-orange-700 underline" href="/terms">terms</Link>.
            </>,
          ],
        },
      ]}
    />
  );
}
