import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from './common/LoadingSpinner';
import { formatDate, cleanHtmlContent, calculateReadingTime, getWordCount } from '../utils/contentUtils';
import '../styles/Posts.css';
import '../styles/PostDetail.css';
import { GearModal, SEO } from './common';

const PostDetail = () => {
  const { title } = useParams();
  const { getPostBySlug, loading, error } = useData();

  const decoded = decodeURIComponent(title);
  const post = getPostBySlug(decoded);

  // Debug logging
  console.log('🔍 PostDetail Debug:', {
    title,
    decoded,
    post,
    url: `/posts/${encodeURIComponent(decoded)}`,
    fullUrl: `https://www.mustafakhan.xyz/posts/${encodeURIComponent(decoded)}`
  });

  const [isGearOpen, setIsGearOpen] = React.useState(false);
  const contentRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  // Attach click handler for inline button rendered inside post content (e.g., id="gearModalBtn")
  React.useEffect(() => {
    // Direct binding if element id exists (backward compatibility with inline HTML)
    const btn = document.getElementById('gearModalBtn');
    const open = () => setIsGearOpen(true);
    if (btn) btn.addEventListener('click', open);

    // Delegated binding on the container to be resilient to re-renders
    const container = contentRef.current;
    const delegate = (e) => {
      const target = e.target.closest('#gearModalBtn, [data-gear-modal="true"]');
      if (target && container && container.contains(target)) {
        e.preventDefault();
        setIsGearOpen(true);
      }
    };
    container?.addEventListener('click', delegate);

    return () => {
      if (btn) btn.removeEventListener('click', open);
      container?.removeEventListener('click', delegate);
    };
  }, [post?.title]);

  // Reading progress bar
  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(p);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  if (loading) {
    return (
      <div className='post-detail-container'>
        <LoadingSpinner size='large' message='Loading post...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='post-detail-container'>
        <div className='error-message'>
          <p>Error loading post: {error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='post-detail-container'>
        <div className='error-message'>
          <p>Post not found.</p>
          <Link to='/posts' className='back-button'>
            ← Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const wordCount = getWordCount(post.content);
  const formattedDate = formatDate(post.date);
  const cleanedContent = cleanHtmlContent(post.content);
  const excerpt = cleanedContent.replace(/<[^>]*>/g, '').slice(0, 200);

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      const text = window.location.href;
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  const onShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener');
  };


  // Example dataset; can be replaced per-post by adding a `gear` field to post data
  const fallbackGear = [];

  const gearCollections = post.gear?.collections || fallbackGear;

  return (
    <div className='post-detail-container'>
      <SEO
        title={post.title}
        description={excerpt}
        url={`/posts/${encodeURIComponent(decoded)}`}
        type='article'
        publishedTime={post.date}
        post={post}
        contentType='post'
      />
      
      {/* New Structured Post Header */}
      <div className='post-header-section'>
        <div className='post-category'>
          {post.category || 'Article'}
        </div>
        
        <div className='post-header-content'>
          <div className='post-header-left'>
            <h1 className='post-main-title'>{post.title}</h1>
            <div className='post-visual-element'>
              {/* Default visual element for all posts */}
              <div className='post-visual-placeholder'>
                <div className='visual-dots'></div>
              </div>
            </div>
          </div>
          
          <div className='post-header-right'>
            <div className='post-intro'>
              {post.abstract || excerpt}
            </div>
            
            <div className='post-metadata'>
              <div className='metadata-line'>
                <span className='metadata-label'>By</span>
                <span className='metadata-value author'>{post.author || 'Mustafa Khan'}</span>
              </div>
              <div className='metadata-line'>
                <span className='metadata-label'>Published on</span>
                <span className='metadata-value'>{formattedDate}</span>
              </div>
              <div className='metadata-line'>
                <span className='metadata-label'>Last Updated on</span>
                <span className='metadata-value'>{formattedDate}</span>
              </div>
              <div className='metadata-line'>
                <span className='metadata-label'>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation and Actions */}
      <div className='post-navigation'>
        <Link to='/posts' className='back-button'>
          <span className='back-arrow'>←</span>
        </Link>
        <div className='post-actions'>
          <button className='action-btn gear-btn' onClick={() => setIsGearOpen(true)}>📦 Recommended Gear</button>
        </div>
      </div>
      
      <div className='reading-progress'>
        <div className='reading-progress-bar' style={{ width: `${progress}%` }}></div>
      </div>
      <div
        className='post-content post-article'
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
      />
      <GearModal
        isOpen={isGearOpen}
        onClose={() => setIsGearOpen(false)}
        title={post.gear?.title || 'Recommended Gear'}
        collections={gearCollections}
      />
    </div>
  );
};

export default PostDetail;
