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
        <main className="max-w-lab mx-auto px-8 py-16">
            <header className="mb-24">
                <Link to="/posts" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-lab-muted no-underline hover:text-lab-text">← Back to Articles</Link>
                <h1 className="text-2xl font-bold mb-2 tracking-tight">{post.title}</h1>
                <p className="text-lab-muted italic opacity-80">{post.date}</p>
            </header>

            {hasGear && (
                <div className="mb-8">
                    <button
                        className="font-sans text-xs font-bold uppercase tracking-widest px-4 py-2 border border-lab-border bg-lab-bg text-lab-text cursor-pointer transition-colors duration-150 hover:bg-lab-bg-alt hover:border-lab-muted"
                        onClick={() => setIsGearOpen(true)}
                    >
                        📦 Recommended Gear
                    </button>
                </div>
            )}

            <article
                className="leading-relaxed prose prose-neutral max-w-none [&_h2]:mt-16 [&_h2]:mb-4 [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-sm [&_h2]:tracking-widest [&_h2]:border-b [&_h2]:border-lab-border [&_h2]:pb-1 [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:font-bold [&_h3]:italic [&_p]:mb-8 [&_ul]:mb-8 [&_ol]:mb-8 [&_a]:text-lab-text [&_a]:font-bold [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-sm [&_th]:border [&_th]:border-lab-border [&_th]:p-2 [&_th]:text-left [&_th]:bg-lab-bg-alt [&_th]:font-bold [&_td]:border [&_td]:border-lab-border [&_td]:p-2 [&_blockquote]:border-l-2 [&_blockquote]:border-lab-border [&_blockquote]:pl-4 [&_blockquote]:text-lab-muted [&_blockquote]:italic [&_blockquote]:mb-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-lab-border"
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
