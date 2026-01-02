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
        <main className="max-w-lab mx-auto px-8 py-16">
            <header className="mb-24">
                <Link to="/" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-lab-muted no-underline hover:text-lab-text">← Back</Link>
                <h1 className="text-2xl font-bold mb-2 tracking-tight">Articles</h1>
                <p className="text-lab-muted italic">Technical notes, essays, and observations.</p>
            </header>

            <section className="mb-16">
                <ul className="list-none p-0">
                    {sortedPosts.map((post) => (
                        <li key={post.id} className="mb-4 pb-4 border-b border-lab-border last:border-b-0">
                            <Link to={`/posts/${encodeURIComponent(post.title)}`} className="flex justify-between items-baseline gap-8 no-underline group">
                                <span className="text-lab-text font-bold tracking-tight group-hover:underline">{post.title}</span>
                                <span className="text-sm text-lab-muted italic whitespace-nowrap">{post.date}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Notes;
