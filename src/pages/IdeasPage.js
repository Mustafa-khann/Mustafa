import React from 'react';
import { Link } from 'react-router-dom';
import { researchPapers } from '../data/data';

const IdeasPage = () => {
  return (
    <main className="max-w-lab mx-auto px-8 py-16">
      <header className="mb-24">
        <Link to="/" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-lab-muted no-underline hover:text-lab-text">← Back</Link>
        <h1 className="text-2xl font-bold mb-2 tracking-tight">Ideas</h1>
        <p className="text-lab-muted italic">Research papers and conceptual explorations.</p>
      </header>

      <section className="mb-16">
        <ul className="list-none p-0">
          {researchPapers.map((paper) => (
            <li key={paper.id} className="mb-8 pb-8 border-b border-lab-border last:border-b-0">
              <Link to={`/ideas/${encodeURIComponent(paper.title)}`} className="block no-underline group">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-lab-text tracking-tight group-hover:underline">{paper.title}</span>
                  <span className="text-sm text-lab-muted italic">{paper.date}</span>
                </div>
                <p className="text-lab-muted italic opacity-80">{paper.abstract}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default IdeasPage;
