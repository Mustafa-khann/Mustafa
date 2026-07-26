import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { researchPapers } from '../data/researchPapers';
import ReadingProgress from '../components/common/ReadingProgress';
import ContinueReading from '../components/common/ContinueReading';
import { getNeighbours, getReadingTime } from '../utils/content';
import { matchesSlug, slugify } from '../utils/slugs';

const toCell = (item) =>
    item ? { to: `/ideas/${slugify(item.title)}`, title: item.title, meta: item.date } : null;

// Remove high-intensity styles for the minimal lab theme.
const cleanContent = (html) =>
    String(html || '')
        .replace(/style="color:[^"]*"/g, '')
        .replace(/<span[^>]*>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/<br\s*\/?>/g, '<br>')
        .replace(/<br>\s*<br>/g, '</p><p>');

const PaperDetail = () => {
    const { slug } = useParams();
    const history = useHistory();
    const decoded = decodeURIComponent(slug);
    const paper = researchPapers.find((p) => matchesSlug(p.title, slug) || p.title === decoded);

    const readingTime = useMemo(() => (paper ? getReadingTime(paper.content) : ''), [paper]);
    const { previous, next } = useMemo(
        () => getNeighbours(researchPapers, (item) => item.title === paper?.title),
        [paper]
    );

    useEffect(() => {
        if (!paper) return;
        const cleanPath = `/ideas/${slugify(paper.title)}`;
        if (window.location.pathname !== cleanPath) {
            history.replace(cleanPath);
        }
    }, [history, paper]);

    if (!paper) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <header className="mb-10">
                    <Link to="/ideas" className="back-link mb-8 inline-flex">← Back to Ideas</Link>
                    <h1 className="page-title">Not Found</h1>
                </header>
                <p className="text-neutral-600 mb-10">
                    That paper does not exist — it may have been renamed.
                </p>
                <Link to="/ideas" className="back-link">← See all ideas</Link>
            </main>
        );
    }

    return (
        <>
            <ReadingProgress />

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <header className="mb-16">
                    <Link to="/ideas" className="back-link mb-8 inline-flex">← Back to Ideas</Link>
                    <h1 className="page-title">{paper.title}</h1>
                    <p className="flex flex-wrap items-baseline gap-2 text-neutral-400 font-mono text-sm">
                        <span>{paper.author}</span>
                        <span className="text-neutral-200">·</span>
                        <span>{paper.date}</span>
                        {readingTime && (
                            <>
                                <span className="text-neutral-200">·</span>
                                <span>{readingTime}</span>
                            </>
                        )}
                    </p>
                </header>

                <article
                    className="leading-relaxed prose prose-neutral max-w-none text-neutral-700
                        [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-xs [&_h2]:tracking-widest [&_h2]:text-neutral-400 [&_h2]:border-b [&_h2]:border-neutral-100 [&_h2]:pb-3
                        [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:font-bold [&_h3]:text-neutral-900
                        [&_p]:mb-6 [&_p]:leading-relaxed
                        [&_ul]:mb-6 [&_ol]:mb-6 [&_li]:mb-2
                        [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-300 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:decoration-neutral-500
                        [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-sm
                        [&_th]:border [&_th]:border-neutral-200 [&_th]:p-3 [&_th]:text-left [&_th]:bg-neutral-50 [&_th]:font-bold [&_th]:tracking-wide
                        [&_td]:border [&_td]:border-neutral-200 [&_td]:p-3
                        [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-300 [&_blockquote]:pl-5 [&_blockquote]:text-neutral-500 [&_blockquote]:italic [&_blockquote]:mb-8
                        [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-neutral-100 [&_img]:p-1 [&_img]:bg-neutral-50
                        [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono [&_code]:text-neutral-800
                        [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6 [&_pre_code]:bg-transparent [&_pre_code]:p-0"
                    dangerouslySetInnerHTML={{ __html: cleanContent(paper.content) }}
                />

                <ContinueReading
                    previous={toCell(previous)}
                    next={toCell(next)}
                    allTo="/ideas"
                    allLabel="All ideas"
                />
            </main>
        </>
    );
};

export default PaperDetail;
