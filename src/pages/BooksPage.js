import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './books.css';

import { books } from '../data/books';

const BooksPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const shelfRef = useRef(null);
  const bookRefs = useRef([]);
  const history = useHistory();

  const handleScroll = useCallback(() => {
    if (!shelfRef.current) return;
    const container = shelfRef.current;
    const containerHeight = container.clientHeight;

    let closest = 0;
    let closestDist = Infinity;
    bookRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const bookCenter = rect.top - containerRect.top + rect.height / 2;
      const viewCenter = containerHeight / 2;
      const dist = Math.abs(bookCenter - viewCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToBook = (index) => {
    const book = bookRefs.current[index];
    if (book && shelfRef.current) {
      const containerRect = shelfRef.current.getBoundingClientRect();
      const bookRect = book.getBoundingClientRect();
      const offset = bookRect.top - containerRect.top + shelfRef.current.scrollTop
        - (shelfRef.current.clientHeight / 2) + (bookRect.height / 2);
      shelfRef.current.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  // Compute line width based on distance from hovered index
  const getLineWidth = (i) => {
    if (hoveredIndex < 0) return undefined;
    const dist = Math.abs(i - hoveredIndex);
    if (dist === 0) return '32px';
    if (dist === 1) return '24px';
    if (dist === 2) return '18px';
    if (dist === 3) return '14px';
    return undefined;
  };

  // Track hover by mousemove on the container - much more reliable than per-button mouseenter
  const lineContainerRef = useRef(null);
  const lineButtonRefs = useRef([]);

  const handleIndicatorMouseMove = useCallback((e) => {
    const buttons = lineButtonRefs.current;
    if (!buttons.length) return;
    const mouseY = e.clientY;
    let closest = -1;
    let closestDist = Infinity;
    buttons.forEach((btn, i) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(mouseY - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    if (closestDist < 20) {
      setHoveredIndex(closest);
    } else {
      setHoveredIndex(-1);
    }
  }, []);

  return (
    <div className="bookshelf-page">
      {/* Left scroll indicator */}
      <nav className="bookshelf-scroll-indicator" aria-label="Book navigation">
        <div
          className="scroll-indicator-lines"
          ref={lineContainerRef}
          onMouseMove={handleIndicatorMouseMove}
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          {books.map((book, i) => (
            <button
              key={book.slug}
              ref={(el) => (lineButtonRefs.current[i] = el)}
              className={`scroll-indicator-line ${i === activeIndex ? 'active' : ''} ${i === hoveredIndex ? 'hovered' : ''}`}
              onClick={() => scrollToBook(i)}
              aria-label={book.title}
              data-title={book.title}
              style={getLineWidth(i) ? { width: getLineWidth(i) } : undefined}
            />
          ))}
        </div>
      </nav>
      {/* Main content */}
      <div className="bookshelf-main" ref={shelfRef}>
        {/* Header matching site aesthetic */}
        <header className="bookshelf-header">
          <Link to="/" className="back-link">← Back</Link>
          <h1 className="page-title">Books</h1>
          <p className="page-subtitle">Books that i've read or suggest.</p>
        </header>
        <section className="bookshelf-shelf">
          {books.map((book, idx) => (
            <div
              key={book.slug}
              ref={(el) => (bookRefs.current[idx] = el)}
              className="book-3d-wrapper"
              onClick={() => history.push(`/books/${book.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && history.push(`/books/${book.slug}`)}
              aria-label={`${book.title} by ${book.author}`}
            >
              <div
                className="book-3d"
                style={{
                  '--spine-color': book.spineColor,
                  '--top-color': book.topColor,
                  '--text-color': book.textColor,
                  '--accent-color': book.accentColor,
                  '--book-thickness': `${book.thickness}px`,
                }}
              >
                <div className="book-3d-front">
                  <span className="book-3d-author">{book.author}</span>
                  <span className="book-3d-title">{book.title}</span>
                </div>
                <div className="book-3d-top"></div>
                <div className="book-3d-right"></div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BooksPage;
