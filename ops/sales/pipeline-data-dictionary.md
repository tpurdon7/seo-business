# Sales pipeline data dictionary

The first-batch CSV is the source of truth until a CRM is selected. Dates should use `YYYY-MM-DD` and timestamps should use ISO 8601.

## Core fields

| Field | Type | Allowed values / format | Purpose |
| --- | --- | --- | --- |
| `source_pack` | text | Folder name, e.g. `2026-06-16-surrey-clinics` | Preserves research provenance |
| `batch_id` | text | Stable campaign batch ID | Groups a controlled send cohort |
| `priority` | integer | 1–15 | Recommended work order within the batch |
| `clinic_name` | text | Exact public business name | Primary account identifier |
| `niche` | text | Source-pack classification | Segmentation and message relevance |
| `town_or_area` | text | Public service/location area | Local personalisation |
| `website` | URL | Canonical reviewed page or site | Audit target |
| `contact_name` | text | Publicly supported name or team label | Greeting and routing |
| `contact_role` | text | Public role or generic enquiry role | Qualification context |
| `contact_email` | email | Publicly sourced address | Outreach destination |
| `contact_source_url` | URL | Page where email was found | Evidence and QA |
| `opportunity_score` | integer | 0–100 | Research prioritisation score, not an audit score |
| `pipeline_stage` | enum | See stages below | Current commercial status |
| `last_action` | text | Date plus completed action | Shows what actually happened |
| `next_action` | text | Specific future action, preferably with date | Prevents leads going stale |
| `audit_status` | enum | See statuses below | Audit production and QA status |
| `audit_link` | URL/status | Public URL or `PENDING_GENERATION` | Prospect-facing report |
| `utm_campaign` | text | Stable lowercase campaign name | Attribution across report and booking links |
| `owner` | text | Responsible person | Accountability |
| `notes` | text | Concise exceptions and safety flags | Operational context |

## Evidence fields

| Field | Purpose |
| --- | --- |
| `rating_summary` | Records exactly what review/trust evidence was or was not captured |
| `visibility_issue` | Cautious search-visibility observation from the source research |
| `website_issue` | Specific observed website or extraction issue |
| `trust_issue` | Trust, proof, or enquiry-path concern |
| `recommended_angle` | Evidence-backed outreach and service angle |
| `draft_subject` | Source-pack subject line, to be QA checked before use |
| `draft_email` | Source-pack first-touch draft; not approved for automatic sending |
| `source_urls` | Pipe-separated evidence URLs retained from research |

## Pipeline stages

| Stage | Entry rule | Typical next action |
| --- | --- | --- |
| `Researched` | Evidence and contact source captured | Generate and QA audit |
| `Audit Ready` | Public audit link manually verified and message passes QA | Send first touch |
| `Contacted` | First outbound email sent | Follow-up or process reply |
| `Replied` | Any human response received | Classify response and reply |
| `Call Booked` | Meeting accepted and on calendar | Prepare discovery call |
| `Proposal Sent` | Written scope/price sent | Follow up on decision |
| `Won` | Agreement/payment condition met | Start onboarding |
| `Lost` | Prospect declined or opportunity closed | Record reason; stop active follow-up |
| `Follow-up` | Prospect explicitly asked for later contact | Set exact future date |
| `Do Not Contact` | Unsubscribe, complaint, or permanent suppression | Never send |

`Do Not Contact` overrides every other stage.

## Audit statuses

| Status | Meaning |
| --- | --- |
| `pending_generation` | No valid prospect-facing report exists |
| `generation_failed` | Audit attempted but failed; error should be recorded in notes |
| `generated_pending_qa` | Report exists but has not passed manual review |
| `complete_qa_passed` | Public report is correct, safe, and ready to share |
| `stale_recheck_required` | Report or source observation is old enough to need a fresh check |

## UTM convention

When a public audit link exists, append:

`utm_source=cold_email&utm_medium=email&utm_campaign={{utm_campaign}}&utm_content={{touch_id}}`

Use `touch_01`, `touch_02`, `touch_03`, or `touch_04` for `utm_content`. If the share-link implementation cannot safely accept query parameters, preserve the base report link in `audit_link` and create a separate tracked-link field when the CRM is implemented.

## Update rules

- Never overwrite source evidence merely because the website changes; record the new check in `last_action` or notes.
- Record completed actions in `last_action`, not intentions.
- Every active record must have one owner and one concrete next action.
- Stop the scheduled sequence as soon as a reply arrives.
- Never move a lead to `Audit Ready` while `audit_link` is missing, localhost-only, mismatched, or unreviewed.
- Never fabricate an audit link, contact name, proof point, ranking, or outcome.
