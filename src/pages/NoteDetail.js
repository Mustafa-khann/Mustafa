import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/data';
import GearModal from '../components/common/GearModal';
import '../styles/Lab.css';

const NoteDetail = () => {
    const { title } = useParams();
    const decoded = decodeURIComponent(title);
    const post = posts.find(p => p.title === decoded);

    const [isGearOpen, setIsGearOpen] = useState(false);
    const contentRef = useRef(null);

    // Handle inline gear button clicks
    useEffect(() => {
        if (!post) return;

        const container = contentRef.current;
        const handleClick = (e) => {
            const target = e.target.closest('#gearModalBtn, [data-gear-modal="true"]');
            if (target && container && container.contains(target)) {
                e.preventDefault();
                setIsGearOpen(true);
            }
        };

        container?.addEventListener('click', handleClick);
        return () => container?.removeEventListener('click', handleClick);
    }, [post?.title]);

    if (!post) {
        return (
            <main className="lab-page">
                <header className="lab-header">
                    <Link to="/posts" className="lab-back-link">← Back to Posts</Link>
                    <h1 className="lab-header-name">Not Found</h1>
                </header>
                <p>Note not found.</p>
            </main>
        );
    }

    // Clean content - remove colored spans for minimal style
    const cleanContent = (html) => {
        return html
            .replace(/style="color:[^"]*"/g, '')
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '')
            .replace(/<br\s*\/?>/g, '<br>')
            .replace(/<br>\s*<br>/g, '</p><p>');
    };

    const hasGear = post.gear && post.gear.collections && post.gear.collections.length > 0;

    return (
        <main className="lab-page lab-note-detail">
            <header className="lab-header">
                <Link to="/posts" className="lab-back-link">← Back to Articles</Link>
                <h1 className="lab-header-name">{post.title}</h1>
                <p className="lab-header-definition">{post.date}</p>
            </header>

            {hasGear && (
                <div className="lab-note-actions">
                    <button
                        className="lab-gear-btn"
                        onClick={() => setIsGearOpen(true)}
                    >
                        📦 Recommended Gear
                    </button>
                </div>
            )}

            <article
                className="lab-note-content"
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: cleanContent(post.content) }}
            />

            {hasGear && (
                <GearModal
                    isOpen={isGearOpen}
                    onClose={() => setIsGearOpen(false)}
                    title={post.gear?.title || 'Recommended Gear'}
                    collections={post.gear.collections}
                />
            )}
        </main>
    );
};

export default NoteDetail;
