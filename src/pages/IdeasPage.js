import React from 'react';
import { Link } from 'react-router-dom';
import { researchPapers } from '../data/data';

const IdeasPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-20 opacity-0 animate-fade-in">
        <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
        <h1 className="page-title">Ideas</h1>
        <p className="page-subtitle">Research papers and conceptual explorations.</p>
      </header>

      <section className="mb-16 opacity-0 animate-fade-in animation-delay-100">
        <ul className="list-none p-0 stagger-children">
          {researchPapers.map((paper) => (
            <li
              key={paper.id}
              className="mb-0 border-b border-neutral-100 last:border-b-0 opacity-0 animate-slide-in"
            >
              <Link
                to={`/ideas/${encodeURIComponent(paper.title)}`}
                className="block no-underline group py-6 transition-colors hover:bg-neutral-50 -mx-4 px-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-3">
                  <span className="font-bold text-neutral-800 tracking-tight group-hover:text-neutral-900 transition-colors">
                    {paper.title}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono whitespace-nowrap">
                    {paper.date}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                  {paper.abstract}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default IdeasPage;
