# Pre-send QA checklist

Complete this for every prospect immediately before sending. Any failed required item blocks the send.

## Prospect and contact

- [ ] Clinic is in the approved batch and is not already a customer, active opportunity, duplicate, or `Do Not Contact`.
- [ ] Website loads and still belongs to the intended clinic.
- [ ] Contact email is visible on the recorded public source URL.
- [ ] Named greeting is supported by public evidence; otherwise the email uses `Hi,`.
- [ ] No previous thread, reply, unsubscribe, bounce, complaint, or legal restriction makes outreach inappropriate.

## Evidence and personalisation

- [ ] The personalised observation is still visible on the live site.
- [ ] The observation matches the cited source evidence and is not merely an extraction artefact.
- [ ] Awards, registrations, review counts, and years in business are described as on-site claims unless independently verified.
- [ ] Any ranking statement has a fresh, reproducible manual search check recorded. If not, no ranking claim is used.
- [ ] The email does not imply access to analytics, traffic, enquiries, patients, revenue, or competitor performance.
- [ ] The recommendation follows logically from the observation.
- [ ] Tone is respectful and does not shame the clinic, practitioner, existing agency, or website supplier.

## Audit and links

- [ ] `audit_status` is `complete_qa_passed`.
- [ ] `audit_link` is a working `https://bettersearch.dev/share/audit/...` public URL, not localhost or `PENDING_GENERATION`.
- [ ] Audit opens in a private browser without authentication.
- [ ] Audit clinic name, website, screenshots, findings, and score belong to this prospect.
- [ ] Automated findings have been manually checked for false positives and outdated content.
- [ ] No private lead, user, token, admin, or internal dashboard data is exposed.
- [ ] UTM parameters use `utm_source=cold_email`, `utm_medium=email`, and the record's `utm_campaign`.
- [ ] Every other link, including the booking link and signature link, works.

## Message quality

- [ ] Subject is plain, specific, and 2–5 words.
- [ ] Email is roughly 70–110 words unless the context requires less.
- [ ] First line explains why this clinic was selected.
- [ ] Email contains one primary observation and one CTA.
- [ ] No fake familiarity, generic praise, urgency, guarantee, or invented proof.
- [ ] No unsupported claims about rankings, outcomes, revenue, or patient acquisition.
- [ ] Spelling, clinic name, town, practitioner name, and service names are correct.
- [ ] Placeholder tokens and drafting notes are gone.
- [ ] Sender identity, business details, and opt-out handling meet the approved compliance process.

## Pipeline

- [ ] `pipeline_stage` is `Audit Ready` before send.
- [ ] `owner` is assigned.
- [ ] `last_action` records the QA completion.
- [ ] `next_action` is set to send or schedule the first touch.
- [ ] After sending, stage changes to `Contacted`, `last_action` records the actual send date, and `next_action` records follow-up 1.

## Final human check

- [ ] Read the message aloud once.
- [ ] Ask: “Would this feel useful and normal if I ran this clinic?”
- [ ] Send only after explicit campaign approval.
