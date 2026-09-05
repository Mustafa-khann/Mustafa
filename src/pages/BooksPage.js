import React from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';
import PageHeader from '../components/common/PageHeader';
import { slugify } from '../utils/slugs';
import { usePageMetadata } from '../utils/metadata';
import './books.css';
const categories = [...new Set(books.map((book) => book.category))];

const BooksPage = () => {
  usePageMetadata({ title: 'Books — Mustafa Khan', description: 'A reading list spanning engineering, computing, science, design, and fiction.' });
  return <main className="site-main">
    <PageHeader number="04" title="Books" description="Books I’ve read or recommend. A shelf across disciplines." count={books.length} />
    <nav className="book-categories" aria-label="Book categories">{categories.map((category) => <a key={category} href={`#${slugify(category)}`}>{category}</a>)}</nav>
    {categories.map((category) => <section className="indexed-section book-category" id={slugify(category)} key={category}>
      <div className="section-label"><span className="eyebrow">{String(categories.indexOf(category) + 1).padStart(2, '0')} / Reading</span><h2>{category}</h2></div>
      <ol className="book-list">{books.filter((book) => book.category === category).map((book) => <li key={book.slug}><Link className="book-row" to={`/books/${book.slug}`}><span className="entry-number">{String(books.indexOf(book) + 1).padStart(2, '0')}</span><div><h3>{book.title}</h3><p>{book.author}</p></div><span className="entry-arrow" aria-hidden="true">↗</span></Link></li>)}</ol>
    </section>)}
  </main>;
};
export default BooksPage;
