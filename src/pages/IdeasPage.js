import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { researchPaperSummaries } from '../data/contentSummaries';
import { paperEditorial } from '../data/editorial';
import { slugify } from '../utils/slugs';
import { usePageMetadata } from '../utils/metadata';
const IdeasPage = () => {
  usePageMetadata({ title: 'Research — Mustafa Khan', description: 'Explorations of spatial mapping, language models, and robot task planning.' });
  return (
    <main className="site-main">
      <PageHeader number="03" title="Research" description="Explorations of spatial mapping, language models, and robot task planning." count={researchPaperSummaries.length} />
      <ol className="research-list">{researchPaperSummaries.map((paper, index) => {
        const copy = paperEditorial[paper.id];
        return <li key={paper.id}><Link className="research-row" to={`/ideas/${slugify(paper.title)}`}><span className="entry-number">{String(index + 1).padStart(2, '0')}</span><div><h2>{copy?.title || paper.title}</h2><p>{copy?.summary || paper.abstract}</p></div><time dateTime="2025-03">March 2025</time><span className="entry-arrow" aria-hidden="true">↗</span></Link></li>;
      })}</ol>
    </main>
  );
};
export default IdeasPage;
