import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { posts } from '../data/posts';
import GearModal from '../components/common/GearModal';
import {
    findPostByRouteSlug,
    getPostDateMeta,
    getPostPath,
    hasRecommendedGear,
    preparePostHtml,
    POST_GEAR_TRIGGER_SELECTOR,
} from '../utils/posts';

const NoteDetail = () => {
    const { slug } = useParams();
    const history = useHistory();
    const post = useMemo(() => findPostByRouteSlug(posts, slug), [slug]);

    const [isGearOpen, setIsGearOpen] = useState(false);
    const hasGear = hasRecommendedGear(post);
    const contentHtml = useMemo(() => (post ? preparePostHtml(post.content) : ''), [post]);
    const dateMeta = useMemo(() => getPostDateMeta(post?.date), [post?.date]);

    useEffect(() => {
        if (!post) return;
        const cleanPath = getPostPath(post);
        if (window.location.pathname !== cleanPath) {
            history.replace(cleanPath);
        }
    }, [history, post]);

    useEffect(() => {
        setIsGearOpen(false);
    }, [post?.id]);

    const openGear = useCallback(() => setIsGearOpen(true), []);
    const closeGear = useCallback(() => setIsGearOpen(false), []);

    const handleArticleClick = useCallback((event) => {
        if (!hasGear || !(event.target instanceof Element)) return;

        const trigger = event.target.closest(POST_GEAR_TRIGGER_SELECTOR);
        if (!trigger || !event.currentTarget.contains(trigger)) return;

        event.preventDefault();
        openGear();
    }, [hasGear, openGear]);

    if (!post) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <header className="mb-20">
                    <Link to="/posts" className="back-link mb-8 inline-flex">← Back to Articles</Link>
                    <h1 className="page-title">Not Found</h1>
                </header>
                <p className="text-neutral-600">Note not found.</p>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="mb-16 opacity-0 animate-fade-in">
                <Link to="/posts" className="back-link mb-8 inline-flex">← Back to Articles</Link>
                <h1 className="page-title">{post.title}</h1>
                <time className="text-neutral-400 font-mono text-sm" dateTime={dateMeta.isoDate}>
                    {post.date}
                </time>
            </header>

            {hasGear && (
                <div className="mb-10 opacity-0 animate-fade-in animation-delay-100">
                    <button
                        className="font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 border border-neutral-200 bg-white text-neutral-700 cursor-pointer transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 flex items-center gap-2"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded={isGearOpen}
                        onClick={openGear}
                    >
                        <span>📦</span>
                        <span>Recommended Gear</span>
                    </button>
                </div>
            )}

            <article
                className="leading-relaxed prose prose-neutral max-w-none text-neutral-700 opacity-0 animate-fade-in animation-delay-200
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
                onClick={handleArticleClick}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {hasGear && (
                <GearModal
                    isOpen={isGearOpen}
                    onClose={closeGear}
                    title={post.gear?.title || 'Recommended Gear'}
                    collections={post.gear?.collections}
                />
            )}
        </main>
    );
};

export default NoteDetail;
