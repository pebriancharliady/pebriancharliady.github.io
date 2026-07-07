# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install            # install dependencies
npm run develop        # dev server at localhost:8000; GraphiQL explorer at localhost:8000/___graphql
npm run build          # production build into public/
npm run serve          # serve the production build locally
npm run clean          # clear Gatsby's .cache/ and public/ (run this first when the build behaves oddly)
npm run format         # Prettier over **/*.{js,jsx,ts,tsx,json,md}
npm run deploy         # gatsby build && push public/ to the `main` branch via gh-pages
```

There is **no test framework** — `npm test` is the Gatsby placeholder and exits 1.

**Node version matters:** use Node 16 (see `.nvmrc`). Gatsby 2 uses webpack 4, which breaks on Node 17+ (OpenSSL md4 error). On this machine the installed `node_modules` contains **darwin-x64** native binaries (sharp, node-sass), so run under the x64 Node at `~/.nvm/versions/node/v16.20.2/bin` (executes via Rosetta on Apple Silicon). If you reinstall `node_modules` with an arm64 Node, sharp 0.26 has no arm64 prebuilds and will try to compile libvips from source.

Prettier config is minimal and intentional: `arrowParens: avoid`, `semi: false` (no semicolons). Match this in new code.

## Environment

`gatsby-config.js` loads `.env.${NODE_ENV}` via dotenv, so `develop` reads `.env.development` and `build` reads `.env.production`. Copy `.env.example` and set:

- `GATSBY_GITHUB_API_TOKEN` — GitHub PAT (repo + user read) consumed at build time by `gatsby-source-github-api`.
- `GATSBY_GOOGLE_ANALYTICS` — optional; the analytics plugin is currently commented out in `gatsby-config.js`.

## Architecture

Gatsby v2 static site. Content lives as markdown on disk and pages are generated at build time — there is no runtime backend.

**Content → pages pipeline:**
1. `gatsby-source-filesystem` sources three trees (see `gatsby-config.js`): `src/data/blog` (name `blog`), `src/data/works` (name `portfolio`), and `src/assets/img` (name `images`).
2. `gatsby-transformer-remark` turns each `index.md` into a `MarkdownRemark` node.
3. `gatsby-node.js` `onCreateNode` attaches a `slug` field (via `createFilePath`) to every `MarkdownRemark` node.
4. `gatsby-node.js` `createPages` runs GraphQL queries filtered by `fileAbsolutePath` regex (`/(blog)/` vs `/(works)/`) and calls `createPage` for each:
   - blog posts → `src/templates/blogs/post.js` (with `previous`/`next` context)
   - category pages → `src/templates/blogs/categories.js` at `/{kebabCase(category)}/`
   - works → `src/templates/works/work.js`

Note: category pages are created inside the per-post loop, so the same category pages are re-created once per post. Redundant but harmless — don't "fix" it expecting behavior to change.

**Routing:** filesystem-based pages in `src/pages/` — `index.js` (About / home), `works.js` (portfolio grid), `blog.js` (article list), `404.js`. Detail pages come from the templates above, not from `src/pages/`.

**Adding content** means creating a folder with an `index.md` under `src/data/blog/<slug>/` or `src/data/works/<slug>/`, plus any images in that same folder referenced by relative path in frontmatter. Frontmatter shape differs by type and is required — missing fields break the page queries:
- blog: `title`, `date`, `image`, `imageCredit`, `time`, `categories` (array), `description`
- works: `title`, `date`, `image`, `category` (string), `tags` (array), `description`, `projectLink`

**Site config** is centralized in `src/data/data.js` (`SiteTitle`, social links, address, the GitHub GraphQL query + variables). Edit text/metadata here rather than hardcoding in components. `gatsby-config.js` imports it for `siteMetadata`.

**Styling:** styled-components throughout. Reusable styled primitives live in `src/components/common/` and are re-exported from its `index.js` barrel — import them as `import { Title, ContainerLayout, ... } from "../components/common"`. Feature components follow a `style.js` (styled definitions) + `index.jsx` (component) folder convention. `GlobalStyle` and fonts are applied once in `src/components/layout/index.js`, which wraps every page with Navbar + Footer.

**GitHub integration is dormant.** `gatsby-source-github-api` still fetches repos at build time and `src/components/works/github/` renders them, but the `/repositories` route is commented out in `src/components/layout/navbar/index.jsx` and no page/template consumes the data. Icons come from `react-feather`.

## Deployment

`npm run deploy` publishes the built `public/` to the **`main`** branch (via `gh-pages`), which is what GitHub Pages serves. Day-to-day development happens on other branches (`master` is the PR base). Do not commit build output — `public/` and `.cache/` are gitignored.
