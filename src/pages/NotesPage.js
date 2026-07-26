import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import { postSummaries } from '../data/contentSummaries';
import { getPostDateMeta, getPostPath, sortPostsByDateDesc } from '../utils/posts';

/**
 * Fifteen bare titles gave a reader nothing to forage on, so every row now
 * carries an opening line and an honest cost. The reading time matters more
 * than it looks: most of these are three minutes, and saying so removes the
 * suspicion that a click is a twenty-minute commitment.
 *
 * Rows are held near the prose measure — at the full container width the eye
 * has to cross a thousand pixels of nothing to pair a title with its date.
 */
const Notes = () => {
    const sortedPosts = useMemo(() => sortPostsByDateDesc(postSummaries), []);

    return (
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="mb-16">
                <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
                <h1 className="page-title">Articles</h1>
                <p className="page-subtitle">Technical notes, essays, and observations.</p>
            </header>

            <Reveal as="ul" stagger className="list-none p-0 m-0 mb-16 max-w-3xl">
                {sortedPosts.map((post) => {
                    const dateMeta = getPostDateMeta(post.date);

                    return (
                        <li key={post.id} className="border-b border-neutral-100 last:border-b-0">
                            <Link
                                to={getPostPath(post)}
                                className="group block no-underline py-5 -mx-4 px-4 transition-colors hover:bg-neutral-50"
                            >
                                {/* Stacked on small screens: sharing a row there
                                    squeezes long titles into a six-line column
                                    beside a one-line date. */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-6 mb-2">
                                    <span className="font-bold tracking-tight text-neutral-800 group-hover:text-neutral-900 transition-colors">
                                        {post.title}
                                    </span>
                                    <span className="flex items-baseline gap-2 flex-shrink-0 font-mono text-xs text-neutral-400 whitespace-nowrap">
                                        <time dateTime={dateMeta.isoDate}>{post.date}</time>
                                        {post.readingMinutes > 0 && (
                                            <>
                                                <span className="text-neutral-200">·</span>
                                                <span>{post.readingMinutes} min</span>
                                            </>
                                        )}
                                    </span>
                                </div>

                                {post.excerpt && (
                                    <p className="m-0 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                )}

                                <span className="row-reveal block">
                                    <span className="block pt-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                        Read →
                                    </span>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </Reveal>
        </main>
    );
};

export default Notes;
