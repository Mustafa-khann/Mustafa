import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { posts } from '../data/posts';
import { postEditorial } from '../data/editorial';
import GearModal from '../components/common/GearModal';
import ArticleLayout from '../components/common/ArticleLayout';
import { findPostByRouteSlug, getPostDateMeta, getPostPath, hasRecommendedGear, preparePostHtml, POST_GEAR_TRIGGER_SELECTOR } from '../utils/posts';

const NoteDetail = () => {
  const { slug } = useParams();
  const history = useHistory();
  const post = useMemo(() => findPostByRouteSlug(posts, slug), [slug]);
  const [isGearOpen, setIsGearOpen] = useState(false);
  const hasGear = hasRecommendedGear(post);
  const contentHtml = useMemo(() => post ? preparePostHtml(post.content) : '', [post]);
  const date = getPostDateMeta(post?.date);
  const copy = postEditorial[post?.id];
  useEffect(() => {
    if (post && window.location.pathname !== getPostPath(post)) history.replace(getPostPath(post));
  }, [history, post]);
  useEffect(() => { setIsGearOpen(false); }, [post?.id]);
  const closeGear = useCallback(() => setIsGearOpen(false), []);
  const handleContentClick = useCallback((event) => {
    if (!hasGear || !(event.target instanceof Element)) return;
    const trigger = event.target.closest(POST_GEAR_TRIGGER_SELECTOR);
    if (!trigger || !event.currentTarget.contains(trigger)) return;
    event.preventDefault();
    setIsGearOpen(true);
  }, [hasGear]);

  if (!post) return <main className="site-main empty-page"><span className="eyebrow">404 / Writing</span><h1>Article not found.</h1><Link className="text-link" to="/posts">← All writing</Link></main>;
  return <>
    <ArticleLayout recordKey={post.id} title={copy?.title || post.title} summary={copy?.summary} category="Writing" backTo="/posts" date={post.date} isoDate={date.isoDate} html={contentHtml} onContentClick={handleContentClick}>
      {hasGear && <div className="document-tools"><button className="post-gear-trigger" type="button" aria-haspopup="dialog" aria-expanded={isGearOpen} onClick={() => setIsGearOpen(true)}>Recommended gear <span aria-hidden="true">↗</span></button></div>}
    </ArticleLayout>
    {hasGear && <GearModal isOpen={isGearOpen} onClose={closeGear} title={post.gear?.title || 'Recommended gear'} collections={post.gear?.collections} />}
  </>;
};
export default NoteDetail;
