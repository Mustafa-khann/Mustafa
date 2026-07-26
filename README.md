# Mustafa Khan

Personal portfolio and writing site for Mustafa Khan. The app is a Create React App project with React Router routes for the home page, articles, books, ideas, and projects.

Live site: [mustafakhan.xyz](https://mustafakhan.xyz)

## Tech Stack

- React 17
- React Router DOM 5
- Create React App / react-scripts
- Tailwind CSS 3
- Vercel deployment config

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Build for production:

```bash
npm run build
```

Run the CRA test runner:

```bash
npm test -- --watchAll=false
```

Regenerate derived data after editing posts, projects or books:

```bash
npm run data
```

## Project Structure

```text
scripts/
`-- generate-data.mjs
src/
|-- components/
|   |-- common/
|   `-- sections/
|-- config/
|-- data/
|-- pages/
`-- utils/
```

Important files:

- `src/config/routes.js` defines the route table.
- `src/data/siteContent.js` holds all homepage copy, including the lab log.
- `src/data/posts.js` and `src/data/researchPapers.js` contain full article/idea content.
- `src/data/projects.js` contains project entries and detail content.
- `src/data/projectSummaries.js` contains lightweight project-list metadata.
- `src/data/books.js` contains book shelf data.
- `src/pages/BooksPage.js` contains the book shelf UI.
- `public/assets/` contains static images referenced by app content.
- `public/index.html` contains crawler-visible default metadata.

### Generated data

Two files are produced by `npm run data` and should not be hand-edited:

- `src/data/contentSummaries.js` — the `postSummaries` export, with an excerpt
  and reading time derived from each post's body. (`researchPaperSummaries` in
  the same file is hand-maintained and is left untouched by the generator.)
- `src/data/libraryIndex.js` — counts and lead lines for the homepage index.

Both exist for bundle weight: list pages and the homepage read from these small
modules so the full `posts.js` (~94KB) and `books.js` (~18KB) stay inside the
lazy route chunks that actually need them.

### Adding a lab log entry

`siteContent.labLog` drives the dated log on the homepage — the site's main
signal that work is ongoing. Add newest first, one concrete line each:

```js
{ date: 'Jul 26, 2026', entry: 'Burned three ESCs; redesigned the motor mount.' },
```

### Motion

`src/index.css` defines one easing curve and three durations
(`--duration-state`, `--duration-transition`, `--duration-entrance`); Tailwind's
transition defaults in `tailwind.config.js` point at the same curve, so
`transition-*` utilities inherit it without extra classes.

Content in the first viewport renders unanimated. Anything below it is wrapped
in `components/common/Reveal.js`, which reveals on scroll via
`IntersectionObserver` and falls back to fully visible when the observer is
missing or the visitor prefers reduced motion.

## Deployment

Vercel uses `vercel.json`:

- build command: `npm run build`
- output directory: `build`
- SPA rewrites route unmatched paths to `index.html`

The app relies on static Open Graph metadata in `public/index.html`; there is no runtime SEO package or Open Graph image generation step in the active build. Production builds disable source maps to keep deployment output lean.
