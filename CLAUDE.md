# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install            # install dependencies (READ "Node version matters" FIRST)
npm run develop        # dev server at localhost:8000 (give it heap: NODE_OPTIONS=--max-old-space-size=6144)
npm run build          # production build into public/
npm run serve          # serve the production build at localhost:9000
npm run clean          # clear .cache/ and public/ — REQUIRED between build↔develop switches
npm run format         # Prettier over **/*.{js,jsx,ts,tsx,json,md}
npm run deploy         # gatsby build && push public/ to the `main` branch via gh-pages
node scripts/preflight.js  # verifies the Node runtime (optional check)
```

There is **no test framework** — `npm test` is the Gatsby placeholder and exits 1.

**Node version matters:** use Node 16 (see `.nvmrc`) — Gatsby 2's webpack 4 breaks on Node 17+ (OpenSSL md4). On this machine `node_modules` contains **darwin-x64** native binaries (sharp), so run the x64 Node at `~/.nvm/versions/node/v16.20.2/bin` (via Rosetta on Apple Silicon). Do NOT `npm install` under arm64 Node — sharp 0.26 has no arm64 prebuilds and the install breaks. If a sharp arch error appears, the fix is `nvm use`, never reinstalling.

Prettier config: `arrowParens: avoid`, `semi: false`. Match this in new code.

## Environment

`gatsby-config.js` loads `.env.${NODE_ENV}`: `develop` reads `.env.development`, `build` reads `.env.production` (**gitignored — copy `.env.development` to `.env.production` locally or builds lack the GitHub token**). `GATSBY_GITHUB_API_TOKEN` feeds `gatsby-source-github-api` (data currently unused by any page).

## Dev-workflow landmines (each one cost real debugging time)

- **`build` and `develop` share `.cache/`** — running one after the other without `npm run clean` causes an *infinite browser reload loop* (webpack hash mismatch). Always clean when switching modes. If a browser still loops after a clean, it cached the broken bundles: DevTools → Application → Clear site data.
- **Long HMR sessions lie.** After a large batch of edits, gatsby develop serves stale/mixed bundles (symptoms: missing sections, doubled text). Restart the server before believing a bug. It also leaks memory across many rebuilds and OOMs (~4GB) — hence the `NODE_OPTIONS` heap bump.
- **Port conflict crash:** if 8000 is taken, gatsby dies with a misleading `ERR_REQUIRE_ESM remark-mdx` error from its port prompt. Free the port; the ESM error is a red herring.
- **The user runs the dev server himself.** Fine to start one temporarily for verification, but kill it before finishing a task.

## Code landmines

- **NO data-URIs (or exotic tokens) inside styled-components CSS.** The production minifier mangles them into one invalid rule, and styled-components' runtime `insertRule` then silently drops *every rule after it* — dev looks fine, prod loses `.sr-only`, resets, etc. Noise/grain textures are inline `style={{backgroundImage}}` on elements (see `fx/analogTv.jsx`).
- **`position: sticky` dies under any `overflow-x: hidden` ancestor.** `html`/`body` use `overflow-x: clip` (with `hidden` as legacy fallback) — never change it back. Sticky is the only pin mechanism on mobile.
- **`position: sticky` and `position: fixed` also die inside the GSAP ScrollSmoother wrapper** (it transforms all content). Desktop pins use `[data-pin-smooth]` (counter-translated in `fx/smoothScroll.jsx`); fixed elements (voyager, cursor lens, modal) mount on `document.body`, outside `.smooth-wrap`.
- **Fragment anchors (`href="#id"`) don't scroll inside the smoother** — write `window.scrollTo` manually (see `scrollToWorks` in `home/hero/index.jsx`).
- **Never nest `Reveal` (IntersectionObserver) components** — inner observers silently never fire. Drive descendant animation from the parent's `.is-in` via the `.clip-on-reveal` class instead.
- **Avoid CSS `aspect-ratio`** here — ratio boxes use `height: 0; padding-bottom: N%` + absolutely-positioned `.gatsby-image-wrapper`.
- Works queries sort by `[date, title]` — the secondary key keeps FILE numbering stable across builds (several works share dates). Keep it in all four query sites (2× `pages/index.js`, `pages/works.js`, `gatsby-node.js`).

## Verification workflow

Screenshot with headless Chrome (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=... --window-size=...`); for scroll positions / interaction / measurements use `npm i --no-save puppeteer-core` + connect to a debug Chrome (`--remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug`), and **`rm -rf /tmp/chrome-debug` first** — a stale profile serves cached old bundles. Uninstall puppeteer-core when done.

- Audit **computed styles**, not HTML grep (a class attribute in HTML says nothing about whether its rule survived).
- `--force-prefers-reduced-motion` force-opens all reveals — good for layout checks, but it **masks reveal/animation regressions**; verify motion without it.
- `--virtual-time-budget` hangs on gatsby's HMR websocket; use real-time waits.
- Headless has no fine pointer — `(pointer: fine)`-gated features (cursor lens) need `window.matchMedia` patched via `evaluateOnNewDocument` to test.

## Architecture

Gatsby v2, styled-components v5, GSAP 3 (ScrollSmoother/ScrollTrigger — dynamic-import `gsap/dist/*` only, client-side), three@0.132 (UMD, webpack-4-safe, dynamic import, always try/catch + reduced-motion fallbacks).

**Content pipeline** (unchanged from the starter): markdown under `src/data/blog/<slug>/index.md` and `src/data/works/<slug>/index.md` → `gatsby-node.js` creates pages (blog posts get prev/next; works get `fileNo` context). Frontmatter is required — blog: `title,date,image,imageCredit,time,categories[],description`; works: `title,date,image,category,tags[],description,projectLink`. Site text/metadata lives in `src/data/data.js` (incl. `SiteDossier` — role/coords/status used by the HUD). Design tokens in `src/data/variables.js`.

**Design system — "Section 9 dossier"** (Ghost in the Shell × Evangelion × SIGNALIS; see `memory/user-design-aesthetic.md`): three worlds on one palette —
- *dark HUD* (ground `#050507`, ink `#333447` family) — hero, notes, blog index
- *paper* (`#e9eaf0` + ink text, punch holes, hanko 認 stamp, crimson-multiply photo prints) — works reel, featured grid, works archive, detail-page panels
- *crimson field* (`#7F1324`) — footer; plus *noir black stage* for the services reel
Recurring motifs: bilingual mono eyebrows (作品/記事/接続/業務), `[ bracket ]` buttons, corner brackets, hazard stripes, EVA episode title cards (第壱話/第弐話), MRZ data band, scroll-scrubbed tickers, kanji watermarks. **Palette discipline:** every color is a tint of crimson/ink/paper — no new hues.

**Key components:**
- `components/fx/` — `Decode` (text scramble; renders visible + `.sr-only` copy), `Reveal` (IO; variants up/clip/stamp), `scrollfx` (`getScrollY()` = smoothed-or-native scroll — use it, never raw `pageYOffset`; `ScrollVars` sets `--scroll-y/--scroll-skew/--hero-exit` on `<html>`; `Ticker`, `Parallax`, `ScrollScale`), `smoothScroll` (ScrollSmoother + `[data-pin-smooth]`), `useReel` (the reel engine: pin/scrub/snap, `body.reel-active` fades `.hud-frame`; desktop pins by transform, mobile adds `.is-touch` and pins by sticky, no snap), `cursorLens`, `analogTv` (warp filter + glitch director + grain), `sigil`.
- `components/three/` — `shellScene` (static orbit, mobile hero), `cubeScene` (hero bg, scroll-coupled), `shellVoyager` (fixed sphere travelling between `[data-shell-anchor]` waypoints, z:-1, body-mounted).
- `components/home/` — `hero` (layered name/portrait, MRZ, redaction gag), `worksReel` (paper) + `servicesReel` (noir, `$dark` shell variants), shared reel shell styles live in `worksReel/style.js`.
- `components/common/` — barrel: global styles, primitives (Eyebrow/SectionHead/PageHead/buttons/chips/KanjiMark — many take `$paper`), paper (PaperSlab/PaperPanel/Hanko/FormTag/HazardBar), Spread/Spine/Field (detail-page dossier layout), modal.

**Tuning knobs:** `MAX_WORK_PANELS`, `MAX_FEATURED`, `SERVICES` copy/stacks (`pages/index.js` — featured grid auto-hides until works count exceeds the reel); reel feel (`PANEL_SCROLL`, `SNAP_*` in `fx/useReel.js`); warp/glitch (`WARP_*`, `BURST_*` in `fx/analogTv.jsx`); voyager waypoints (`TARGETS` in `three/shellVoyager.jsx`); grain (`.crt-grain` block in `common/global/index.js`). Service bg images: swap files at `src/assets/img/services/{web,odoo,mobile}.jpg` (currently placeholders).

**Mobile strategy (≤850px):** native scroll (no smoother — deliberate), sticky-based pins, reels leaf via `.is-touch`, glitch bursts yes / warp filter no, voyager replaced by hero orbit, no cursor lens. `prefers-reduced-motion` disables all motion everywhere (CSS + JS gates) — keep both sides of every gate when adding effects.

## Deployment

`npm run deploy` publishes `public/` to the **`main`** branch (GitHub Pages serves it at pebriancharliady.github.io). Source lives on `dev-main` (push it too; `master` is the legacy PR base). Safer ship ritual used here: stop dev server → `npm run build` → audit computed styles against `gatsby serve` → `npx gh-pages -d public -b main` (publishes the audited build) → `npm run clean` → poll the live site for a marker string. Pages propagation takes 1–3 min. Commits end with `Co-Authored-By:` per the session convention; never commit `public/`/`.cache/`.
