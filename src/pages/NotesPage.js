import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/data';
import '../styles/Lab.css';

const Notes = () => {
    // Sort posts by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    return (
        <main className="lab-page">
            <header className="lab-header">
                <Link to="/" className="lab-back-link">← Back</Link>
                <h1 className="lab-header-name">Articles</h1>
                <p className="lab-header-definition">Technical notes, essays, and observations.</p>
            </header>

            <section className="lab-section">
                <ul className="lab-notes-list">
                    {sortedPosts.map((post) => (
                        <li key={post.id} className="lab-note-item">
                            <Link to={`/posts/${encodeURIComponent(post.title)}`} className="lab-note-link">
                                <span className="lab-note-title">{post.title}</span>
                                <span className="lab-note-date">{post.date}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Notes;
