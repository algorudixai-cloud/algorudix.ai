# Project skills: sources

These Claude Code skills were picked from the skill-issue.in directory and vendored from their
upstream GitHub repositories. Every file was read before it was added, except the data library
of `design-taste-frontend` (see the notes). Copies are byte-identical to upstream at the commits
below, except where "Local changes" says otherwise.

| Skill | Upstream | Commit | License | Local changes |
|---|---|---|---|---|
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) `skills/frontend-design` | `ca45fc4` | Apache-2.0 (`LICENSE.txt`) | None |
| `webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills) `skills/webapp-testing` | `ca45fc4` | Apache-2.0 (`LICENSE.txt`) | None |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) `skills/web-design-guidelines` + rules from [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) `command.md` | `1a2c79d` / `434b7f9` | MIT (`LICENSE`) | Rules pinned to `guidelines.md` instead of being downloaded on every run |
| `accessibility-compliance` | [wshobson/agents](https://github.com/wshobson/agents) `plugins/ui-design/skills/accessibility-compliance` | `7e2fb55` | MIT (`LICENSE`, copied from repo root) | Added `LICENSE` |
| `tailwind-design-system` | [wshobson/agents](https://github.com/wshobson/agents) `plugins/frontend-mobile-development/skills/tailwind-design-system` | `7e2fb55` | MIT (`LICENSE`, copied from repo root) | Added `LICENSE` |
| `design-taste-frontend` (tasteskill v2) | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) `skills/taste-skill` | `12af471` | MIT (`LICENSE`, copied from repo root) | Added `LICENSE`; folder renamed to match the skill's name |

## Notes

- `webapp-testing` writes Python Playwright scripts. It needs `pip install playwright` and
  `playwright install chromium` on the machine that runs them. Two of its examples save output
  to `/mnt/user-data/outputs/`, a path that only exists in Claude's web sandbox.
- `design-taste-frontend` is large (2.5MB, mostly its `library/` design data). Its instructions and
  all of its code were reviewed; the data library was machine-scanned rather than read in full.
  Its scripts need Node 22+ and an installed Chrome, Edge or Chromium. They run Chrome headless
  with a throwaway profile, serve pages on `127.0.0.1` only, keep a draw history in
  `~/.taste-skill/history.json`, and write working files to `.taste-skill/` in the project.
  `scripts/assets.mjs` searches and downloads images (with credits) from Openverse, Wikimedia
  Commons, the Art Institute of Chicago, the Met, Internet Archive and NASA. Chrome is started
  without `--no-sandbox`, so where Chrome runs as root (some containers), point `CHROME_PATH` at
  a wrapper that adds that flag.
- To update a skill, copy the new upstream version over it, read the diff, and update the
  commit in this table.
