import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { posts } from '../data/posts';
import GearModal from '../components/common/GearModal';
import ReadingProgress from '../components/common/ReadingProgress';
import ContinueReading from '../components/common/ContinueReading';
import { getNeighbours, getReadingTime } from '../utils/content';
import {
    findPostByRouteSlug,
    getPostDateMeta,
    getPostPath,
    hasRecommendedGear,
    preparePostHtml,
    sortPostsByDateDesc,
    POST_GEAR_TRIGGER_SELECTOR,
} from '../utils/posts';

const toCell = (item) => (item ? { to: getPostPath(item), title: item.title, meta: item.date } : null);

const NoteDetail = () => {
    const { slug } = useParams();
    const history = useHistory();
    const post = useMemo(() => findPostByRouteSlug(posts, slug), [slug]);

    const [isGearOpen, setIsGearOpen] = useState(false);
    const hasGear = hasRecommendedGear(post);
    const contentHtml = useMemo(() => (post ? preparePostHtml(post.content) : ''), [post]);
    const dateMeta = useMemo(() => getPostDateMeta(post?.date), [post?.date]);
    const readingTime = useMemo(() => (post ? getReadingTime(post.content) : ''), [post]);

    // Newest first, so the neighbour on the left is the newer piece.
    const ordered = useMemo(() => sortPostsByDateDesc(posts), []);
    const { previous, next } = useMemo(
        () => getNeighbours(ordered, (item) => item.id === post?.id),
        [ordered, post]
    );

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
                <header className="mb-10">
                    <Link to="/posts" className="back-link mb-8 inline-flex">← Back to Articles</Link>
                    <h1 className="page-title">Not Found</h1>
                </header>
                <p className="text-neutral-600 mb-10">
                    That article does not exist — it may have been renamed.
                </p>
                <Link to="/posts" className="back-link">← See all articles</Link>
            </main>
        );
    }

    return (
        <>
            <ReadingProgress />

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
                <header className="mb-16">
                    <Link to="/posts" className="back-link mb-8 inline-flex">← Back to Articles</Link>
                    <h1 className="page-title">{post.title}</h1>
                    <p className="flex items-baseline gap-2 font-mono text-sm text-neutral-400">
                        <time dateTime={dateMeta.isoDate}>{post.date}</time>
                        {readingTime && (
                            <>
                                <span className="text-neutral-200">·</span>
                                <span>{readingTime}</span>
                            </>
                        )}
                    </p>
                </header>

                {hasGear && (
                    <div className="mb-10">
                        <button
                            className="post-gear-trigger"
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
                    onClick={handleArticleClick}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <ContinueReading
                    previous={toCell(previous)}
                    next={toCell(next)}
                    previousLabel="Newer"
                    nextLabel="Older"
                    allTo="/posts"
                    allLabel="All articles"
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
        </>
    );
};

export default NoteDetail;
