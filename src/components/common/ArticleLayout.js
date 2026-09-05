import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from '../../utils/metadata';

const ArticleLayout = ({ title, summary, category, backTo, date, isoDate, meta, html, children, onContentClick, contents = false, progress = false, recordKey }) => {
  const contentRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [active, setActive] = useState('');
  const [readProgress, setReadProgress] = useState(0);
  usePageMetadata({ title: `${title} — Mustafa Khan`, description: summary || title, type: 'article' });

  useEffect(() => {
    if (!contents || !contentRef.current) { setSections([]); return; }
    const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'));
    // Prefer major headings; project guides use one h2 followed by their actual h3 sections.
    const major = headings.filter((heading) => heading.tagName === 'H2');
    const selected = major.length > 1 ? major : headings.filter((heading) => heading.tagName === 'H3');
    const items = selected.map((heading, index) => {
      heading.id = `section-${index}`;
      return { id: heading.id, text: heading.textContent };
    });
    setSections(items);
    const onScroll = () => {
      let current = items[0]?.id || '';
      selected.forEach((heading) => { if (heading.getBoundingClientRect().top <= 140) current = heading.id; });
      setActive(current);
      const article = contentRef.current;
      if (!article) return;
      const start = article.getBoundingClientRect().top + window.scrollY;
      const length = Math.max(1, article.offsetHeight - window.innerHeight);
      setReadProgress(Math.max(0, Math.min(100, (window.scrollY - start) / length * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [contents, html, recordKey]);

  const toc = <nav aria-label="On this page"><ol>{sections.map((section) => <li key={section.id}><a className={active === section.id ? 'is-active' : ''} aria-current={active === section.id ? 'location' : undefined} href={`#${section.id}`}>{section.text}</a></li>)}</ol></nav>;
  const readableHtml = html?.replace(/<table\b([^>]*)>/gi, '<div class="table-scroll" role="region" aria-label="Table" tabindex="0"><table$1>').replace(/<\/table>/gi, '</table></div>');

  return (
    <main className="site-main document-page">
      {progress && <div className="reading-progress" aria-hidden="true"><div style={{ width: `${readProgress}%` }} /></div>}
      <header className="document-header">
        <Link className="back-link" to={backTo}>← {category}</Link>
        <div className="document-meta"><span>{category}</span>{date && <time dateTime={isoDate}>{date}</time>}{meta && <span>{meta}</span>}</div>
        <h1>{title}</h1>
        {summary && <p className="document-summary">{summary}</p>}
      </header>
      {children}
      {contents && sections.length > 0 && <details className="mobile-contents"><summary>On this page</summary>{toc}</details>}
      <div className={contents && sections.length ? 'document-grid' : 'document-grid document-grid-simple'}>
        {contents && sections.length > 0 && <aside className="document-contents"><span className="eyebrow">On this page</span>{toc}</aside>}
        <article className="document-prose" ref={contentRef} onClick={onContentClick} dangerouslySetInnerHTML={{ __html: readableHtml }} />
      </div>
      <div className="document-end"><Link className="text-link" to={backTo}>← All {category.toLowerCase()}</Link><a className="text-link" href="#main-content">Back to top ↑</a></div>
    </main>
  );
};
export default ArticleLayout;
