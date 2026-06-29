# Better Search Customer-Ready Plan

## Goal

Make Better Search ready to consistently turn researched prospects and website visitors into booked calls, paid projects, and well-run client engagements.

The first milestone is not “everything is perfect.” It is:

- a prospect can understand the offer;
- receive a useful, accurate audit;
- book a call or reply to outreach;
- receive a clear proposal and payment route;
- become a client without operational confusion;
- and have their work delivered and reported consistently.

## Current position

Already built:

- Better Search website and niche/location landing pages;
- three visible service packages;
- public SEO/GEO audit generator;
- private audit dashboard and shareable reports;
- Supabase lead storage, authentication, and analytics;
- Mac audit application;
- recurring Surrey clinic lead research;
- lead notes and personalised outreach drafts;
- a live production domain at `bettersearch.dev`.

Known launch gaps:

- `AUDIT_API_TOKEN` is not configured, so the latest lead pack cannot receive audit/report links;
- lint currently fails on one unescaped apostrophe in the public audit form;
- the production build needs a clean verification run without a competing `.next` process;
- the public navigation exposes internal Leads and Analytics pages;
- the booking URL still uses a “partnerships-discussion-clone” Calendly route;
- there is no visible privacy policy, terms page, cookie explanation, or public contact email;
- there is little concrete proof yet: no case studies, named testimonials, sample deliverable, or founder credibility block;
- proposal, agreement, payment, onboarding, delivery, and reporting workflows are not documented;
- outreach drafts exist, but the send/follow-up/reply process is not yet operating as one measured pipeline.

## Phase 1 — Remove launch blockers

**Outcome:** the site and audit funnel work reliably enough to put in front of prospects.

My tasks:

- fix the current lint error and clean up low-risk warnings where sensible;
- remove the duplicate `app/audit/page 2.tsx` file after confirming it is unused;
- run a clean production build and resolve all code/build failures;
- verify every environment variable and Supabase migration required in production;
- create and configure the missing audit API token;
- run a real audit from the website, Mac app, batch workflow, and permanent share-link workflow;
- test bad URLs, slow websites, duplicate submissions, rate limits, and failed crawls;
- make sure audit leads and marketing consent are saved correctly;
- protect or remove internal Leads and Analytics links from public navigation;
- confirm auth-protected pages cannot leak customer or prospect data;
- verify analytics records audit starts, audit completions, report views, Calendly clicks, and errors;
- complete a mobile, desktop, accessibility, metadata, robots, sitemap, and broken-link pass;
- deploy the verified version and run a production smoke test.

Launch gate:

- lint passes;
- production build passes;
- production audit completes successfully;
- lead appears in the database;
- share link works in a private browser;
- booking CTA works;
- no internal data is publicly accessible;
- no serious mobile or console errors remain.

## Phase 2 — Make the offer easy to buy

**Outcome:** a qualified prospect quickly understands what they get, what it costs, and why Better Search is credible.

My tasks:

- sharpen the primary market around one initial wedge: Surrey private clinics and specialist health businesses;
- turn the three packages into precise scopes with deliverables, turnaround, exclusions, client responsibilities, and next steps;
- clarify the difference between the £1,000 Visibility Sprint and the £1,100/month Growth Visibility package;
- define a low-risk first engagement and the path from sprint to monthly retainer;
- replace generic service descriptions with tangible outputs and examples;
- add a founder section explaining relevant experience, working style, and why Better Search exists;
- create a polished sample audit/deliverable using a non-client or permissioned example;
- add honest proof as it becomes available: testimonials, before/after page examples, implementation samples, or anonymised outcomes;
- improve CTAs so each page has one obvious next action;
- replace the cloned Calendly route with a purpose-built Better Search discovery-call event;
- add a domain contact email and clear contact route;
- add privacy, terms, cookie, and data-handling pages suitable for the audit lead form;
- review all claims so nothing implies guaranteed rankings, traffic, AI citations, or revenue.

Inputs needed from you:

- final approval of the initial niche and geography;
- the founder story and any experience that can be stated publicly;
- any past work, testimonials, or examples we have permission to use;
- the preferred public email address;
- confirmation of package prices and how much work each package should include.

## Phase 3 — Build the sales system

**Outcome:** leads move through a repeatable pipeline instead of living in separate CSVs and drafts.

My tasks:

- create one pipeline with stages: Researched → Audit Ready → Contacted → Replied → Call Booked → Proposal Sent → Won/Lost → Follow-up;
- import and deduplicate the existing Surrey clinic leads;
- attach source URLs, audit links, contact details, notes, score, and last/next action to each lead;
- define lead qualification rules so effort goes to businesses with a real fit and reachable decision-maker;
- finalise a short first-touch email and a 3–4 message follow-up sequence;
- prepare reply templates for interested, later, already-have-an-agency, price, and unsubscribe responses;
- build a pre-send QA checklist covering evidence, personalisation, contact source, site freshness, and claim safety;
- add UTM tracking and campaign labels to audit/report links;
- create a weekly sales dashboard for sends, delivery failures, replies, positive replies, calls, proposals, wins, and revenue;
- create a simple call agenda and discovery-question sheet;
- create proposal, scope, objection-handling, and follow-up templates;
- prepare the first controlled outreach batch rather than sending the whole list at once.

Initial operating target:

- start with 10–15 well-qualified prospects;
- inspect reply quality before increasing volume;
- follow up consistently;
- use objections and questions to improve the offer and website every week.

Inputs needed from you:

- the sending mailbox and its authentication/access;
- approval before the first external outreach send;
- times you want available for sales calls;
- whether the pipeline should live in the existing app, Airtable, HubSpot, or another CRM.

## Phase 4 — Make closing and onboarding frictionless

**Outcome:** an interested prospect can become a paid client without us inventing the process on the call.

My tasks:

- define the discovery-call flow and qualification criteria;
- create proposal templates for sprint and retainer work;
- create a statement of work with scope, timeline, revision limits, dependencies, ownership, and cancellation terms;
- set up invoice/payment instructions or a payment link;
- create a welcome email and onboarding checklist;
- create an intake form for business goals, services, locations, analytics, Search Console, CMS, competitors, and approvals;
- create secure access instructions that avoid sharing passwords in email;
- define the project workspace, communication cadence, and approval process;
- create a kickoff agenda and first-30-days plan;
- define the client handoff from sale to delivery.

Inputs needed from you:

- legal business name, address, and invoicing details;
- payment method and billing terms;
- preferred agreement/e-signature system;
- refund, cancellation, and notice policy;
- final approval of contract language, ideally with legal review.

## Phase 5 — Productise delivery

**Outcome:** the first customer receives professional work without the service becoming chaotic or unprofitable.

My tasks:

- create standard delivery playbooks for the Visibility Sprint and both retainers;
- define exactly what is completed in weeks 1, 2, 3, and 4;
- create reusable audit, keyword map, content brief, page recommendation, implementation, and monthly report templates;
- define what is automated, what requires expert review, and what must never be published without client approval;
- create a task board and client status dashboard;
- establish quality checks for factual accuracy, SEO recommendations, AI-search claims, brand voice, links, schema, and publishing;
- define communication response times and monthly meeting/report cadence;
- track time and delivery cost against package price;
- create a renewal, upsell, testimonial, and referral process;
- collect the first case study from baseline through implementation and outcome.

## Phase 6 — Launch and learn

**Outcome:** Better Search begins acquiring customers through a measured weekly operating rhythm.

My tasks:

- launch the first outreach batch with approved messages and working report links;
- monitor delivery, replies, report views, audit completion, bookings, and site errors;
- prepare suggested replies and next actions quickly;
- update positioning and objection handling from real conversations;
- publish one strong niche-specific proof or educational asset each week;
- continue lead research only where it supports the chosen niche;
- run a weekly review of pipeline, conversion rates, delivery capacity, and next experiments.

## Recommended order of execution

1. Fix and verify the technical funnel.
2. Lock the niche, package scope, proof, contact route, and legal basics.
3. Configure the CRM and outreach sequence.
4. Prepare proposal, payment, agreement, and onboarding assets.
5. Complete delivery templates and quality controls.
6. Send the first 10–15 prospect batch.
7. Improve the system from replies and calls before scaling.

## Definition of “ready to start getting customers”

We are ready when all of the following are true:

- the live site clearly explains the target customer and offer;
- a prospect can generate or open an accurate audit;
- every CTA reaches a working booking or contact route;
- privacy, consent, and internal-data access have been checked;
- the first qualified outreach list has personalised messages and report links;
- replies and follow-ups have an owner and next-action date;
- discovery calls, proposals, agreements, and payments have templates;
- onboarding and the first 30 days of delivery are documented;
- analytics show where prospects enter, engage, book, and drop off;
- we can confidently serve at least one new client immediately.

## Immediate next sprint

The first sprint from my side should be:

1. resolve lint/build issues;
2. verify migrations, production environment variables, and audit token flow;
3. secure public/private navigation and routes;
4. test the complete production audit-to-booking journey;
5. replace the Calendly event and add the public contact/legal routes;
6. tighten the initial clinic offer and package scopes;
7. connect the latest 15 Surrey leads to permanent audit links;
8. prepare the CRM pipeline and first approved outreach batch;
9. create proposal, agreement, payment, and onboarding templates;
10. run a final customer-readiness check and begin outreach.
