# Algorudix.ai website

The website of Algorudix.ai, a Bengaluru team of business analysts and engineers who build AI
automation, dashboards, data pipelines and custom software.

Live site: https://algorudixai.com/

## Editing the content

Every word, list and picture on the site lives in one SQLite file, `content/site.db`. You edit it in
the browser, no code needed:

1. Open **https://algorudixai.com/#admin** (the "Site admin" link in the footer).
2. Sign in with a GitHub fine-grained token. The sign-in page lists the steps to create one: repository
   **algorudix.ai** only, permission **Contents: Read and write**. The token stays in that browser
   tab and is forgotten when you close it.
3. Edit any table, then press **Publish**. That commits the new `content/site.db` to `main`, the deploy
   workflow rebuilds the site, and the change is live in about two minutes.

If someone else publishes while you are editing, the admin refuses to overwrite their work and asks you
to load the latest version first.

## Working on the code

Needs Node.js 20 or newer.

```bash
npm install
npm run dev        # local site at http://localhost:3000
npm run build      # production build in dist/
npm run lint       # type check
```

Content commands:

```bash
npm run content:check          # checks that site.db and seed.json hold the same content
npm run content:dump           # writes site.db out as content/seed.json
npm run content:seed -- --force   # rebuilds site.db from content/seed.json
```

## How it fits together

- `content/site.db`: the content (SQLite). `src/content/schema.ts` defines its tables, which drive the
  database, the typed reader and the admin forms.
- `scripts/vite-plugin-site-content.ts`: reads the database at build time, so visitors download plain
  content and never the database itself.
- `src/site/`: the page sections. `src/admin/`: the editor at `#admin`, loaded only there.
- `.github/workflows/deploy.yml`: every push to `main` builds the site and publishes it to GitHub Pages.
