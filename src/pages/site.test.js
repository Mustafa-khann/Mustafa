import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { CartProvider } from '../commerce/CartContext';
import HomePage from './HomePage';
import ProjectsPage from './ProjectsPage';
import NotesPage from './NotesPage';
import IdeasPage from './IdeasPage';
import BooksPage from './BooksPage';
import ShopPage from './ShopPage';
import ProjectDetailPage from './ProjectDetailPage';
import NoteDetail from './NoteDetail';
import PaperDetail from './PaperDetail';
import BookDetailPage from './BookDetailPage';
import ProductPage from './ProductPage';
import { projectDetails } from '../data/projects';
import { projectSummaries } from '../data/projectSummaries';
import { posts } from '../data/posts';
import { postSummaries, researchPaperSummaries } from '../data/contentSummaries';
import { researchPapers } from '../data/researchPapers';
import { books } from '../data/books';
import { products } from '../data/products';
import { findPostByRouteSlug, getPostPath, preparePostHtml } from '../utils/posts';
import { slugify } from '../utils/slugs';

const pages = [
  ['/', '/', HomePage], ['/projects', '/projects', ProjectsPage],
  ['/posts', '/posts', NotesPage], ['/ideas', '/ideas', IdeasPage],
  ['/books', '/books', BooksPage], ['/shop', '/shop', ShopPage],
  ...projectDetails.map((project) => [`/projects/${project.slug}`, '/projects/:slug', ProjectDetailPage]),
  ...posts.map((post) => [getPostPath(post), '/posts/:slug', NoteDetail]),
  ...researchPapers.map((paper) => [`/ideas/${slugify(paper.title)}`, '/ideas/:slug', PaperDetail]),
  ...books.map((book) => [`/books/${book.slug}`, '/books/:slug', BookDetailPage]),
  ...products.map((product) => [`/shop/${product.slug}`, '/shop/:slug', ProductPage]),
];

test.each(pages)('%s renders its content with one page heading', (url, path, Component) => {
  const html = renderToStaticMarkup(<StaticRouter location={url}><CartProvider><Route path={path} exact component={Component} /></CartProvider></StaticRouter>);
  expect(html).not.toMatch(/not found/i);
  expect(html.match(/<main\b/g)).toHaveLength(1);
  expect(html.match(/<h1\b/g)).toHaveLength(1);
});

test('every catalog and editorial link resolves to an existing record', () => {
  projectSummaries.forEach((project) => expect(projectDetails.some((entry) => entry.slug === project.slug)).toBe(true));
  postSummaries.forEach((post) => expect(findPostByRouteSlug(posts, slugify(post.title))?.id).toBe(post.id));
  researchPaperSummaries.forEach((paper) => expect(researchPapers.some((entry) => slugify(entry.title) === slugify(paper.title))).toBe(true));
});

test('article presentation removes embedded color and layout overrides', () => {
  [...posts, ...projectDetails, ...researchPapers].forEach((entry) => {
    expect(preparePostHtml(entry.content)).not.toMatch(/\sstyle=/i);
  });
  const hardware = posts.find((post) => post.id === 14);
  expect(preparePostHtml(hardware.content)).toContain('data-gear-modal="true"');
  expect(hardware.gear.collections.flatMap((collection) => collection.items).length).toBeGreaterThan(0);
});

test.each([
  ['/projects/missing', '/projects/:slug', ProjectDetailPage],
  ['/posts/missing', '/posts/:slug', NoteDetail],
  ['/ideas/missing', '/ideas/:slug', PaperDetail],
  ['/books/missing', '/books/:slug', BookDetailPage],
  ['/shop/missing', '/shop/:slug', ProductPage],
])('%s has a useful missing-record state', (url, path, Component) => {
  const html = renderToStaticMarkup(<StaticRouter location={url}><CartProvider><Route path={path} component={Component} /></CartProvider></StaticRouter>);
  expect(html).toMatch(/not found/i);
  expect(html).toContain('href=');
});
