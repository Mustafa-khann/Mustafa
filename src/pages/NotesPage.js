import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { postSummaries } from '../data/contentSummaries';
import { getPostDateMeta, getPostPath, sortPostsByDateDesc } from '../utils/posts';

const Notes = () => {
    const sortedPosts = useMemo(() => sortPostsByDateDesc(postSummaries), []);

    return (
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="mb-20 opacity-0 animate-fade-in">
                <Link to="/" className="back-link mb-8 inline-flex">← Back</Link>
                <h1 className="page-title">Articles</h1>
                <p className="page-subtitle">Technical notes, essays, and observations.</p>
            </header>

            <section className="mb-16 opacity-0 animate-fade-in animation-delay-100">
                <ul className="list-none p-0 stagger-children">
                    {sortedPosts.map((post) => {
                        const dateMeta = getPostDateMeta(post.date);

                        return (
                            <li
                                key={post.id}
                                className="mb-0 border-b border-neutral-100 last:border-b-0 opacity-0 animate-slide-in"
                            >
                                <Link
                                    to={getPostPath(post)}
                                    className="flex justify-between items-baseline gap-8 no-underline group py-4 transition-colors hover:bg-neutral-50 -mx-4 px-4"
                                >
                                    <span className="text-neutral-800 font-bold tracking-tight group-hover:text-neutral-900 transition-colors">
                                        {post.title}
                                    </span>
                                    <time
                                        className="text-xs text-neutral-400 font-mono whitespace-nowrap"
                                        dateTime={dateMeta.isoDate}
                                    >
                                        {post.date}
                                    </time>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </main>
    );
};

export default Notes;
