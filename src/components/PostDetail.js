import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from './common/LoadingSpinner';
import { formatDate, cleanHtmlContent, calculateReadingTime, getWordCount } from '../utils/contentUtils';
import '../styles/Posts.css';
import '../styles/PostDetail.css';
import { GearModal } from './common';

const PostDetail = () => {
  const { title } = useParams();
  const { getPostBySlug, loading, error } = useData();

  const decoded = decodeURIComponent(title);
  const post = getPostBySlug(decoded);

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
  const fallbackGear = [
    {
      title: 'Core Boards',
      items: [
        { title: 'Arduino Uno R3', link: 'https://amzn.to/3JvcvmN', emoji: '🧠' },
        { title: 'ESP32 DevKit', link: 'https://amzn.to/4fTPhCE', emoji: '📶' },
        { title: 'Raspberry Pi 5', link: 'https://amzn.to/4fR7DUV', emoji: '🍓' },
      ],
    },
    {
      title: 'Electronics Essentials',
      items: [
        { title: 'Multimeter', link: 'https://amzn.to/4lLk4mD', emoji: '🔌' },
        { title: 'Soldering Station', link: 'https://amzn.to/3JyUjZl', emoji: '🔥' },
        { title: 'Adjustable Power Supply', link: 'https://amzn.to/4mZIABy', emoji: '⚡' },
      ],
    },
    {
      title: 'Robotics & Motion',
      items: [
        { title: 'Servo Pack', link: 'https://amzn.to/463BYMN', emoji: '🤖' },
        { title: 'Stepper + Driver', link: 'https://amzn.to/45xVwZA', emoji: '🦾' },
        { title: 'MPU9250 IMU', link: 'https://amzn.to/4fXasE4', emoji: '🧭' },
      ],
    },
  ];

  const gearCollections = post.gear?.collections || fallbackGear;

  return (
    <div className='post-detail-container'>
      <div className='reading-progress'>
        <div className='reading-progress-bar' style={{ width: `${progress}%` }}></div>
      </div>
      <div className='post-header'>
        <Link to='/posts' className='back-button'>
          <span className='back-arrow'>←</span>
        </Link>
        <h1>{post.title}</h1>
      </div>
      <div className='post-meta-detail'>
        <div className='post-chips'>
          <span className='chip'>{formattedDate}</span>
          <span className='chip'>⏱ {readingTime} min</span>
          <span className='chip'>📝 {wordCount.toLocaleString()} words</span>
        </div>
        <div className='post-actions'>
          <button className='action-btn' onClick={() => setIsGearOpen(true)}>📦 Recommended Gear</button>
          <button className='action-btn' onClick={onCopyLink}>🔗 Copy Link</button>
          <button className='action-btn' onClick={onShareTwitter}>🐦 Share</button>
        </div>
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
