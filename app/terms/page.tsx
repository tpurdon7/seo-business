import type { Metadata } from "next";
import Link from "next/link";

import { PublicTrustLayout } from "@/components/public-trust-layout";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@bettersearch.dev";

export const metadata: Metadata = {
  title: "Terms of Use | Better Search",
  description:
    "Terms for using Better Search website audits, content and services, including responsibilities, availability and limitations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PublicTrustLayout
      eyebrow="Terms of use"
      title="A fair framework for using Better Search."
      intro="These terms apply to the Better Search website, free and automated audits, reports and other public tools. Any paid engagement may also have a separate proposal or agreement."
      updated="19 June 2026"
      notice={
        <>
          These terms are a practical operating draft, not a substitute for advice from a qualified
          solicitor. Final legal review is recommended before relying on them for paid client work.
        </>
      }
      sections={[
        {
          id: "using-the-service",
          title: "Using the service",
          paragraphs: [
            "By using the website or requesting an audit, you agree to these terms. If you do not agree, please do not use the relevant service.",
            "You must use Better Search lawfully and must not interfere with the service, attempt unauthorised access, introduce harmful code, submit content you have no right to use, or use automated access in a way that places unreasonable load on our systems.",
          ],
        },
        {
          id: "audits-and-information",
          title: "Audits are informational",
          paragraphs: [
            "Website audits and reports are based on information available at the time they are generated. Automated checks can miss context, change as websites and third-party services change, or produce incomplete results.",
            "Audits are general business and marketing information. They are not legal, financial, regulatory, medical or other professional advice. Important decisions should be checked against your own circumstances and, where appropriate, with a qualified adviser.",
          ],
        },
        {
          id: "results",
          title: "No ranking or commercial guarantee",
          paragraphs: [
            "Search engines, AI tools, competitors and customer behaviour are outside our control. Better Search does not guarantee rankings, traffic, mentions in AI-generated answers, leads, revenue or any particular timescale for results.",
            "Any examples, forecasts, scores or opportunities are estimates and should not be treated as promises. Search visibility work involves uncertainty and results can rise or fall.",
          ],
        },
        {
          id: "your-responsibilities",
          title: "Your responsibilities",
          bullets: [
            "Provide accurate, current information and make sure you have authority to submit any website or material for review.",
            "Review recommendations before publishing or implementing them, including factual claims, regulated wording and statements about your services.",
            "Keep your own backups and maintain suitable security, accessibility, legal notices and regulatory compliance for your website and business.",
            "Obtain any permissions, licences or approvals needed for content, data, images, trademarks and third-party systems you ask us to use.",
            "Make final commercial decisions yourself. You remain responsible for your website, business and how recommendations are applied.",
          ],
        },
        {
          id: "paid-work",
          title: "Paid work and client agreements",
          paragraphs: [
            "Paid services should be described in a proposal, statement of work or separate agreement covering scope, fees, timings, dependencies, cancellation and ownership. If that agreement conflicts with these website terms, the specific written client agreement will normally take priority for the paid work.",
            "Unless agreed otherwise, estimates and delivery dates depend on timely access, information and feedback from the client.",
          ],
        },
        {
          id: "intellectual-property",
          title: "Intellectual property",
          paragraphs: [
            "Better Search owns or licenses the website, branding, software, audit methods, templates and original content. You may use an audit generated for you for your own internal business purposes, but you may not resell, scrape, reproduce at scale or present our tools or materials as your own without written permission.",
            "You keep ownership of material you provide. You give us permission to process that material only as reasonably needed to provide, secure and improve the requested service. Ownership and licence terms for bespoke paid deliverables should be set out in the relevant client agreement.",
          ],
        },
        {
          id: "third-parties",
          title: "Third-party services and links",
          paragraphs: [
            "Better Search may rely on or link to third-party platforms, including hosting, search engines, analytics, authentication and scheduling providers. Their services and terms are outside our control, and a link does not amount to an endorsement of every statement or practice on that website.",
          ],
        },
        {
          id: "availability",
          title: "Availability and changes",
          paragraphs: [
            "We aim to keep the website and tools useful and available, but uninterrupted or error-free access is not guaranteed. We may suspend, withdraw, limit or change all or part of a service for maintenance, security, legal or business reasons.",
            "We may update these terms. The version published on this page applies from its stated date. Material changes affecting an active paid engagement should be handled through the relevant client agreement.",
          ],
        },
        {
          id: "liability",
          title: "Liability",
          paragraphs: [
            "Nothing in these terms excludes or limits liability where doing so would be unlawful, including liability for fraud, fraudulent misrepresentation, or death or personal injury caused by negligence.",
            "Subject to that, Better Search is not responsible for indirect or consequential loss, loss of profit, revenue, business, opportunity, goodwill or data arising from use of the public website, free tools or informational audits. For paid work, any appropriate liability cap and exclusions should be stated in the signed client agreement.",
            "Consumer rights that cannot lawfully be excluded remain unaffected. This limitation is intended to be read only as far as applicable law permits.",
          ],
        },
        {
          id: "uk-law",
          title: "UK orientation and contact",
          paragraphs: [
            <>
              These terms are written for a UK-based service. The laws and courts that apply may
              depend on your status and location, and should be confirmed in a final legal review or
              client agreement. If you have a concern, please contact{" "}
              <a className="font-semibold text-orange-700 underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>{" "}
              first so we can try to resolve it.
            </>,
            <>
              How we handle personal information is explained in our{" "}
              <Link className="font-semibold text-orange-700 underline" href="/privacy">
                privacy policy
              </Link>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
