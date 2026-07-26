import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import { researchPaperSummaries } from '../data/contentSummaries';
import { slugify } from '../utils/slugs';

const IdeasPage = () => (
  <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
    <header className="mb-16">
      <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
      <h1 className="page-title">Ideas</h1>
      <p className="page-subtitle">Research papers and conceptual explorations.</p>
    </header>

    <Reveal as="ul" stagger className="list-none p-0 m-0 mb-16 max-w-3xl">
      {researchPaperSummaries.map((paper) => (
        <li key={paper.id} className="border-b border-neutral-100 last:border-b-0">
          <Link
            to={`/ideas/${slugify(paper.title)}`}
            className="group block no-underline py-6 -mx-4 px-4 transition-colors hover:bg-neutral-50"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-3">
              <span className="font-bold text-neutral-800 tracking-tight group-hover:text-neutral-900 transition-colors">
                {paper.title}
              </span>
              <span className="flex-shrink-0 text-xs text-neutral-400 font-mono whitespace-nowrap">
                {paper.date}
              </span>
            </div>

            <p className="m-0 text-neutral-500 text-sm leading-relaxed line-clamp-2">
              {paper.abstract}
            </p>

            <span className="row-reveal block">
              <span className="block pt-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Read the paper →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </Reveal>
  </main>
);

export default IdeasPage;
