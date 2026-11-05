# Algorudix.ai redesign: live task list

**Last updated:** 2026-11-05, 12:27 IST
**Now working on:** 🎉 it's live on https://algorudixai.com. Your turn: create the token and try the admin
**Live:** merged in PR #1 on 2026-11-05 (https://github.com/algorudixai-cloud/algorudix.ai/pull/1)

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

## ✅ The admin editor at `/#admin`
- ✅ **Sign in with a GitHub token**: GitHub checks it, so this is real security (the old fake OTP is gone)
  - The token is kept only in that browser tab (never saved on the computer) and forgotten when you close it
  - Step-by-step instructions to create the token are on the sign-in page
- ✅ **Every table is editable**: company details, page sections, tasks, services, stages, case studies,
  industries, tools, key figures, questions, testimonials, Dev Hub, policies, picture credits
  - Add, edit, delete (with a "Delete for good?" check), move up and down, show or hide
  - Fields made for each kind of content: text, paragraphs, lists, steps (AI or your team), pictures
  - Each page section explains what its fields do (for example, the hero's rotating words)
- ✅ **Pictures**: upload PNG, JPEG, WebP or GIF up to 3 MB; they go into `public/uploads/`
- ✅ **Publish** checks for empty required fields, then commits the database to `main`. The site updates in about 2 minutes
- ✅ **Safe with two editors**: if someone else published first, nothing is overwritten and you're asked to load the latest version
- ✅ Unpublished edits survive a page refresh, and you're warned before closing with unpublished edits
- ✅ Works on phones too
- ✅ Admin test with GitHub mocked: **23/23 passed**
  - Covers sign-in, wrong tokens, editing, and checking that the published file really holds the edit
  - Also: reorder, add and delete, empty fields blocked, the two-editor clash, picture upload, SVG refused, sign-out
- ✅ Site smoke test still **26/26**

## ✅ Live on algorudixai.com
- ✅ Merged in PR #1 at your go-ahead; the deploy build passed in 22 seconds and the site was live about 30 seconds later
- ✅ **Smoke test on the live domain: 26/26 passed** (same checks as before, against the real site)
- ✅ **Admin on the live domain:** the sign-in page loads, and the real GitHub rejects a fake token with the friendly message (no real token was used)
- ⏳ **Your first real publish:** create the token (steps on the sign-in page), open https://algorudixai.com/#admin, change something small, press Publish, and the site updates in about 2 minutes
- ↩️ **To undo:** reverting the merge commit on `main` brings the old site back in about 2 minutes

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
