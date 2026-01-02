import React from 'react';
import { Link } from 'react-router-dom';
import { researchPapers } from '../data/data';

const IdeasPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <header className="mb-24">
        <Link to="/" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-text-muted no-underline hover:text-text-heading transition-colors">← Back</Link>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2 text-text-heading">Ideas</h1>
        <p className="text-text-muted italic">Research papers and conceptual explorations.</p>
      </header>

      <section className="mb-16">
        <ul className="list-none p-0">
          {researchPapers.map((paper) => (
            <li key={paper.id} className="mb-8 pb-8 border-b border-border-subtle last:border-b-0">
              <Link to={`/ideas/${encodeURIComponent(paper.title)}`} className="block no-underline group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-text-body tracking-tight group-hover:text-text-heading transition-colors group-hover:underline decoration-border-active">{paper.title}</span>
                  <span className="text-sm text-text-muted italic opacity-80">{paper.date}</span>
                </div>
                <p className="text-text-muted italic opacity-80">{paper.abstract}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default IdeasPage;
