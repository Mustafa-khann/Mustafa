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

There are currently no test files checked in, so this command exits with CRA's "No tests found" status until tests are added.

## Project Structure

```text
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
- `src/data/posts.js` and `src/data/researchPapers.js` contain full article/idea content.
- `src/data/contentSummaries.js` contains lightweight list-page metadata.
- `src/data/projects.js` contains project entries and detail content.
- `src/data/projectSummaries.js` contains lightweight project-list metadata.
- `src/data/books.js` contains book shelf data.
- `src/pages/BooksPage.js` contains the book shelf data and UI.
- `public/assets/` contains static images referenced by app content.
- `public/index.html` contains crawler-visible default metadata.

## Deployment

Vercel uses `vercel.json`:

- build command: `npm run build`
- output directory: `build`
- SPA rewrites route unmatched paths to `index.html`

The app relies on static Open Graph metadata in `public/index.html`; there is no runtime SEO package or Open Graph image generation step in the active build. Production builds disable source maps to keep deployment output lean.
