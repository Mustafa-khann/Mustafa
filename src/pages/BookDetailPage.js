import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { books } from './BooksPage';

const BookDetailPage = () => {
    const { slug } = useParams();
    const history = useHistory();
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const isInitialScroll = useRef(true);

    // Find the starting book index
    const startIndex = books.findIndex(b => b.slug === slug);

    // Scroll to the correct book on mount
    useEffect(() => {
        if (startIndex < 0) return;
        const el = sectionRefs.current[startIndex];
        if (el) {
            el.scrollIntoView({ behavior: 'auto' });
            setActiveIndex(startIndex);
            // Allow URL updates after initial scroll settles
            setTimeout(() => { isInitialScroll.current = false; }, 300);
        }
    }, [startIndex]);

    // Track scroll position and update active book + URL
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const containerH = container.clientHeight;

        let closest = 0;
        let closestDist = Infinity;
        sectionRefs.current.forEach((ref, i) => {
            if (!ref) return;
            const rect = ref.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const sectionCenter = rect.top - containerRect.top + rect.height / 2;
            const viewCenter = containerH / 2;
            const dist = Math.abs(sectionCenter - viewCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closest = i;
            }
        });

        setActiveIndex(closest);

        // Update URL silently (without triggering navigation)
        if (!isInitialScroll.current && books[closest]) {
            const newSlug = books[closest].slug;
            window.history.replaceState(null, '', `/books/${newSlug}`);
        }
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('scroll', handleScroll, { passive: true });
        return () => el.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (startIndex < 0) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <button onClick={() => history.push('/books')} className="back-link mb-8 inline-flex">← Back to Books</button>
                <h1 className="page-title">Book not found</h1>
            </main>
        );
    }

    return (
        <div className="book-detail-scroller" ref={containerRef}>
            {/* Fixed back button */}
            <nav className="book-detail-fixed-nav">
                <button onClick={() => history.push('/books')} className="book-detail-back">
                    ← Back to shelf
                </button>
                <span className="book-detail-counter">
                    {activeIndex + 1} / {books.length}
                </span>
            </nav>

            {/* Scroll indicator dots */}
            <div className="book-detail-dots">
                {books.map((book, i) => (
                    <button
                        key={book.slug}
                        className={`book-detail-dot ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => {
                            const el = sectionRefs.current[i];
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        aria-label={book.title}
                        data-title={book.title}
                    />
                ))}
            </div>

            {/* All books as full-viewport sections */}
            {books.map((book, idx) => (
                <section
                    key={book.slug}
                    ref={(el) => (sectionRefs.current[idx] = el)}
                    className="book-detail-section"
                    style={{
                        '--book-bg': book.spineColor,
                        '--book-text': book.textColor,
                        '--book-accent': book.accentColor,
                    }}
                >
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
                                <div className="book-cover-spine" style={{ backgroundColor: book.accentColor }} />
                                <div className="book-cover-pages" />
                            </div>
                        </div>

                        {/* Book Info */}
                        <div className="book-detail-info">
                            <h1 className="book-detail-title">{book.title}</h1>
                            <p className="book-detail-author-name">{book.author}</p>
                            <span className="book-detail-category-tag">{book.category}</span>
                            <p className="book-detail-description">{book.description}</p>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default BookDetailPage;
