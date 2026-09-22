import React, { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { researchPapers } from '../data/researchPapers';
import { paperEditorial } from '../data/editorial';
import { matchesSlug, slugify } from '../utils/slugs';
import { decodeRouteSlug, preparePostHtml } from '../utils/posts';
import ArticleLayout from '../components/common/ArticleLayout';

const PaperDetail = () => {
  const { slug } = useParams();
  const history = useHistory();
  const paper = researchPapers.find((entry) => matchesSlug(entry.title, slug) || entry.title === decodeRouteSlug(slug));
  const copy = paperEditorial[paper?.id];
  useEffect(() => {
    if (!paper) return;
    const path = `/ideas/${slugify(paper.title)}`;
    if (window.location.pathname !== path) history.replace(path);
  }, [history, paper]);
  if (!paper) return <main className="site-main empty-page"><span className="eyebrow">404 / Research</span><h1>Paper not found.</h1><Link className="text-link" to="/ideas">← All research</Link></main>;
  return (
    <ArticleLayout recordKey={paper.id} title={copy?.title || paper.title} summary={copy?.summary || paper.abstract} category="Research" backTo="/ideas" date={paper.date} meta={paper.author} html={preparePostHtml(paper.content)} contents>
      <p className="research-context">{copy?.kind}{copy?.kind === 'Experimental research' && ' · Experiments performed by Mustafa Khan'}</p>
    </ArticleLayout>
  );
};
export default PaperDetail;
