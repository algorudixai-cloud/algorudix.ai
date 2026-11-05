# Algorudix.ai redesign: live task list

**Last updated:** 2026-11-05, 11:19 IST
**Now working on:** the premium redesign is built and tested; next up is the admin editor
**Branch:** `claude/serene-brahmagupta-dx8kqa` (nothing goes live until you approve a PR to `main`)

Legend: ✅ done · 🔄 in progress · ⏳ to do

## ✅ The premium redesign (your reference: saturam.com)
You said the orange version looked too old, then pointed at saturam.com. This version takes that *style*
(light and airy, bold type, vivid gradients, product screens in device mockups, lots of motion), never
their logo, words or pictures. Every word on the page still comes from your content database.

- ✅ **Look:** white and soft-grey pages, Satoshi type, a violet → blue gradient for buttons and bands, pink → coral as a small warm accent
- ✅ **New logo mark:** an "A" drawn as three connected nodes, on the gradient (also the site icon)
- ✅ **Dark mode** redone for the new look (the moon button in the menu bar)
- ✅ **Sections, in order:**
  - Hero: "AI automation for…" with rotating words, live laptop and phone screens, floating result cards, your figures counting up
  - What we build: six service cards
  - We start with how you work: an animated map, your systems → Algorudix AI → dashboards, reports, alerts
  - Works with the tools you already use: a gradient band with moving columns of tool tiles
  - Pick a task your team repeats: the interactive "today vs once automated" screen
  - How a project runs: a 5-stage timeline that fills as you scroll
  - Selected work: four project cards with their screens
  - Industries (tabs), Who we are, Questions (accordion)
  - Contact: a gradient band with the enquiry form (still emails you and fills the Google Sheet)
- ✅ Pop-ups (booking, service details, case study, privacy and terms) restyled and centred
- ✅ Dev Hub page restyled; the 404 page too
- ✅ The old 1930s archive photos and video removed
- ✅ **Motion:** rotating headline words, floating dots that follow the mouse, drifting colour blobs, live app screens, counters, flowing data lines, moving tool columns, timeline fill, lifting cards, shining buttons. All of it switches off for visitors who ask their device for reduced motion.

### Checks
- ✅ Smoke test: **26/26 passed**
  - Covers: no errors, every menu link, the phone menu, dark mode remembered, the task tabs by keyboard, the FAQ, the pop-ups, the Dev Hub filters
  - No sideways scrolling at 390 to 1920px, nothing hidden with reduced motion, and `/CNAME` still deployed
- ✅ Form test: empty forms show errors and **nothing is sent** (tests never email you)
- ✅ Content check: seed → SQLite → JSON identical (14 tables, 87 rows)

## ⏳ Next
- ⏳ **Admin editor at `/#admin`:** log in with a GitHub token, edit every table, upload pictures, publish (the site updates in about 2 minutes)
- ⏳ Final report and a pull request for you to review

## History
- ✅ Phase 1: all content moved into SQLite (`content/site.db`), commit `1e384d7`
- ✅ First redesign (orange "printed annual"), kept as checkpoint `8d151c6`
- ✅ 3 previews (clean / bold colour / dark) → you chose the saturam.com style instead

## Needs your input (no rush, all editable in the admin later)
- **The figures under the hero** (99.4% model accuracy, 150+ solutions deployed, 3.8x average ROI) are now big and animated. They came from your old site; please confirm they're real, or hide them in the admin.
- **The case-study numbers** (78% resolved automatically, $380k a year, and so on): same question.
- **Social media links:** add your real profiles and they appear in the footer.
- **Dev Hub links:** `docs.`, `console.`, `benchmarks.` and `developers.algorudixai.com` don't exist yet.
- **Testimonials** (Sarah Jenkins and others) stay hidden unless they're real clients.
