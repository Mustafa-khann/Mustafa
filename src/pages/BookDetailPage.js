import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { books } from '../data/books';
import { usePageMetadata } from '../utils/metadata';
import './books.css';

const BookDetailPage = () => {
  const { slug } = useParams();
  const history = useHistory();
  const index = books.findIndex((entry) => entry.slug === slug);
  const book = books[index];
  usePageMetadata({ title: book ? `${book.title} — Mustafa Khan` : 'Book not found — Mustafa Khan', description: book?.description || 'Book not found.' });
  if (!book) return <main className="site-main empty-page"><span className="eyebrow">404 / Books</span><h1>Book not found.</h1><Link className="text-link" to="/books">← All books</Link></main>;
  return <main className="site-main book-detail">
    <div className="book-detail-navigation"><Link className="back-link" to="/books">← Books</Link><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {books.length}</span></div>
    <header className="book-detail-header"><span className="eyebrow">{book.category}</span><h1>{book.title}</h1><p>{book.author}</p></header>
    <section className="indexed-section book-description"><div className="section-label"><span className="eyebrow">About the book</span></div><p>{book.description}</p></section>
    <div className="book-pagination">
      {index > 0 ? <Link to={`/books/${books[index - 1].slug}`}><span>← Previous</span><strong>{books[index - 1].title}</strong></Link> : <div />}
      {index < books.length - 1 && <Link to={`/books/${books[index + 1].slug}`}><span>Next →</span><strong>{books[index + 1].title}</strong></Link>}
    </div>
    <div className="book-jump"><label htmlFor="book-jump">Jump to a book</label><select id="book-jump" value={slug} onChange={(event) => history.push(`/books/${event.target.value}`)}>{books.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.title}</option>)}</select></div>
  </main>;
};
export default BookDetailPage;
