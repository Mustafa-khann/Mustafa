import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/data';
import GearModal from '../components/common/GearModal';

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
            <main className="max-w-lab mx-auto px-8 py-16">
                <header className="mb-24">
                    <Link to="/posts" className="inline-block mb-8 text-sm text-lab-muted no-underline hover:text-lab-text">← Back to Articles</Link>
                    <h1 className="text-2xl font-medium mb-2">Not Found</h1>
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
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="mb-24">
                <Link to="/posts" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-text-muted no-underline hover:text-text-heading transition-colors">← Back to Articles</Link>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2 text-text-heading">{post.title}</h1>
                <p className="text-text-muted italic opacity-80">{post.date}</p>
            </header>

            {hasGear && (
                <div className="mb-8">
                    <button
                        className="font-mono text-xs font-bold uppercase tracking-widest px-4 py-2 border border-border-standard bg-background-primary text-text-body cursor-pointer transition-colors duration-200 hover:bg-background-surface hover:border-border-active"
                        onClick={() => setIsGearOpen(true)}
                    >
                        📦 Recommended Gear
                    </button>
                </div>
            )}

            <article
                className="leading-relaxed prose prose-neutral max-w-none text-text-body [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-sm [&_h2]:tracking-widest [&_h2]:text-text-muted [&_h2]:border-b [&_h2]:border-border-subtle [&_h2]:pb-2 [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:font-bold [&_h3]:italic [&_p]:mb-6 [&_ul]:mb-6 [&_ol]:mb-6 [&_li]:mb-2 [&_a]:text-text-heading [&_a]:underline [&_a]:decoration-border-active [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-sm [&_th]:border [&_th]:border-border-standard [&_th]:p-3 [&_th]:text-left [&_th]:bg-background-surface [&_th]:font-bold [&_th]:tracking-wide [&_td]:border [&_td]:border-border-standard [&_td]:p-3 [&_blockquote]:border-l-2 [&_blockquote]:border-border-active [&_blockquote]:pl-4 [&_blockquote]:text-text-muted [&_blockquote]:italic [&_blockquote]:mb-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-border-subtle [&_img]:p-1 [&_img]:bg-background-surface"
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
