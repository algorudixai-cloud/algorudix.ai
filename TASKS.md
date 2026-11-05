# Algorudix.ai redesign: live task list

**Last updated:** 2026-11-04, 17:16 IST
**Now working on:** the final design checks (the taste inspector is down from 16 problems to 1), then the admin editor
**Branch:** `claude/serene-brahmagupta-dx8kqa` (nothing goes live until you approve a PR to `main`)

Legend: ✅ done · 🔄 in progress · ⏳ to do

## Phases

### ✅ Phase 1: Content in SQLite (commit `1e384d7`)
- ✅ All site content moved into `content/site.db` (14 tables, 94 rows)
- ✅ The site reads it at build time, and the page title now comes from the database
- ✅ `npm run content:check` confirms nothing is lost (seed → SQLite → JSON is identical)
- ✅ Removed code that was never shown (old blog and its admin, the Gemini writer, the ROI widget)
- ✅ Smoke test: 38/38 passed

### ✅ Phase 2: Design foundation
- ✅ Direction dealt by taste: **"The printed annual"** (seed `20261104`)
  - Type: **Switzer** (one typeface)
  - Colours: **orange and black**, with white sections where there is a lot to read
  - Layout: a 42% column line across the whole page
- ✅ Contact redrawn as a **"clip-out coupon" form**, because the business needs its enquiry form
- ✅ Colour and type tokens, light and dark mode (`src/index.css`)
- ✅ New navbar: wordmark, 5 links, "Book a free consultation" button, theme toggle, and a full-screen menu on phones
- ✅ New footer: the name at full width, contact details, links and picture credits

### ✅ Phase 3: Home page sections
- ✅ Hero: picture band and the headline "AI for the work you repeat"
- ✅ "We start with how you work" (intro, with the 1937 photo)
- ✅ **"Pick a task your team repeats"**, the interactive part
- ✅ What we build (services, with small pictures set into the sentence)
- ✅ How a project runs (5 stages and the "many into one" diagram)
- ✅ Selected work (4 case studies: the text scrolls past while the project's screen stays in view)
- ✅ Industries (tabs and bands)
- ✅ Who we are (facts and tools)
- ✅ Questions (FAQ as reading text)
- ✅ Contact (coupon form, still sending to your inbox and the Google Sheet)
- ✅ Pop-ups restyled: consultation booking, service details, case study, privacy/terms

### ✅ Phase 4: Pictures and interface figures
- ✅ 8 archive photos, all **public domain or CC0**, cropped and credited (in `public/media/`)
  - Office work before automation: switchboard operators, ENIAC, punch cards, a 1937 tabulating room
  - Bengaluru: Vidhana Soudha
- ✅ A short public-domain newsreel clip (an automatic telephone exchange) as the moving picture
- ✅ Interface figures for the case studies (assistant, dashboard, pipeline, app)

### ✅ Phase 5: Dev Hub page
- ✅ New Dev Hub layout: categories and a plain list of items
- ✅ Removed the **Personal Vault** (API keys in the browser) and the fake OTP login

### 🔄 Phase 6: Motion
- ✅ The hero headline rises line by line and the pictures open on load
- ✅ The newsreel loops, and the intro photo drifts slowly as you scroll
- 🔄 Fewer fade-ins (only 3 sections keep them); every other heading rises into place instead
- ✅ Everything respects "reduce motion"

### ⏳ Phase 7: Admin editor at `/#admin`
- ⏳ Log in with a GitHub token (real security, checked by GitHub)
- ⏳ Edit every table: add, edit, delete, reorder, show/hide
- ⏳ Upload pictures
- ⏳ **Publish** commits the database, and the site updates in about 2 minutes

### 🔄 Phase 8: Checks and report
- 🔄 taste inspector: 0 FAIL at desktop, tablet and phone
  - Before: 16 FAIL, 8 WARN
  - Round 1: 1 FAIL, 5 WARN
  - Round 2: 3 FAIL, 1 WARN
  - Round 3: 1 FAIL, 0 WARN (a blank stretch on phones, being fixed now)
- ⏳ Smoke tests and an admin test (with GitHub mocked)
- ⏳ Before and after screenshots, and the final report

## Needs your input (no rush, all editable in the admin later)
- Are these numbers real: 99.4% model accuracy, 150+ solutions, 3.8x ROI, and the case-study results? Taste won't invent proof, so they're kept but flagged.
- Real social media links. The old ones pointed at linkedin.com etc. with no profile, so they're hidden until you add yours.
- Dev Hub links: `docs.`, `console.`, `benchmarks.` and `developers.algorudixai.com` don't exist.
- Testimonials (Sarah Jenkins and others) are hidden. Switch them on only if they're real clients.
