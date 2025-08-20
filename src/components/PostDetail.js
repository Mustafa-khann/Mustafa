import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from './common/LoadingSpinner';
import { formatDate, cleanHtmlContent, calculateReadingTime, getWordCount } from '../utils/contentUtils';
import '../styles/Posts.css';

const PostDetail = () => {
  const { title } = useParams();
  const { getPostBySlug, loading, error } = useData();

  const decoded = decodeURIComponent(title);
  const post = getPostBySlug(decoded);

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

  return (
    <div className='post-detail-container'>
      <div className='post-header'>
        <Link to='/posts' className='back-button'>
          <span className='back-arrow'>←</span>
        </Link>
        <h1>{post.title}</h1>
      </div>
      <div className='post-meta-detail'>
        <p className='post-date'>{formattedDate}</p>
        <div className='post-stats'>
          <span className='reading-time'>{readingTime} min read</span>
          <span className='word-count'>{wordCount.toLocaleString()} words</span>
        </div>
      </div>
      <div 
        className='post-content'
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
      />
    </div>
  );
};

export default PostDetail;
