import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/data';

const Notes = () => {
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    return (
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="mb-24">
                <Link to="/" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-text-muted no-underline hover:text-text-heading transition-colors">← Back</Link>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2 text-text-heading">Articles</h1>
                <p className="text-text-muted italic">Technical notes, essays, and observations.</p>
            </header>

            <section className="mb-16">
                <ul className="list-none p-0">
                    {sortedPosts.map((post) => (
                        <li key={post.id} className="mb-4 pb-4 border-b border-border-subtle last:border-b-0">
                            <Link to={`/posts/${encodeURIComponent(post.title)}`} className="flex justify-between items-baseline gap-8 no-underline group">
                                <span className="text-text-body font-bold tracking-tight group-hover:text-text-heading transition-colors group-hover:underline decoration-border-active">{post.title}</span>
                                <span className="text-sm text-text-muted italic whitespace-nowrap opacity-80">{post.date}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Notes;
