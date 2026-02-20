import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { books } from './BooksPage';

const BookDetailPage = () => {
    const { slug } = useParams();
    const history = useHistory();
    const book = books.find(b => b.slug === slug);

    if (!book) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <Link to="/books" className="back-link mb-8 inline-flex">← Back to Books</Link>
                <h1 className="page-title">Book not found</h1>
            </main>
        );
    }

    return (
        <div
            className="book-detail-page"
            style={{
                '--book-bg': book.spineColor,
                '--book-text': book.textColor,
                '--book-accent': book.accentColor,
            }}
        >
            {/* Back link */}
            <nav className="book-detail-nav">
                <button
                    onClick={() => history.push('/books')}
                    className="book-detail-back"
                >
                    ← Back to shelf
                </button>
            </nav>

            <div className="book-detail-content">
                {/* 3D Book Cover */}
                <div className="book-cover-container">
                    <div className="book-cover-3d">
                        <div className="book-cover-front" style={{ backgroundColor: book.spineColor }}>
                            <div className="book-cover-inner">
                                <span className="book-cover-category">{book.category}</span>
                                <h2 className="book-cover-title" style={{ color: book.textColor }}>
                                    {book.title}
                                </h2>
                                <span className="book-cover-author" style={{ color: book.accentColor }}>
                                    {book.author}
                                </span>
                            </div>
                        </div>
                        <div className="book-cover-spine" style={{ backgroundColor: book.accentColor }}></div>
                        <div className="book-cover-pages"></div>
                    </div>
                </div>

                {/* Book Info */}
                <div className="book-detail-info">
                    <h1 className="book-detail-title">{book.title}</h1>
                    <p className="book-detail-author">{book.author}</p>

                    <span className="book-detail-category-tag">
                        {book.category}
                    </span>

                    <p className="book-detail-description">
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
