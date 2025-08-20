import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SearchBar from './ui/SearchBar';
import LoadingSpinner from './common/LoadingSpinner';
import { calculateReadingTime, extractExcerpt, formatDate } from '../utils/contentUtils';
import { slugify } from '../utils/slug';
import '../styles/Posts.css';

const Posts = () => {
  const { filteredPosts, loading, error } = useData();

  if (loading) {
    return (
      <div className='posts-container'>
        <LoadingSpinner size='large' message='Loading posts...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='posts-container'>
        <div className='error-message'>
          <p>Error loading posts: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='posts-container'>
      <div className='section-header'>
        <span className='section-title'>/ posts</span>
      </div>
      <p className='posts-intro'>
        Exploring ideas at the intersection of technology, philosophy, and human experience. 
        Here you'll find thoughts on learning, consciousness, and the future of AI.
      </p>

      <SearchBar placeholder='Search posts...' />

      {filteredPosts.length === 0 ? (
        <div className='no-results'>
          <p>No posts found matching your search.</p>
          <p>Try adjusting your search terms or browse all posts.</p>
        </div>
      ) : (
        <div className='posts-grid'>
          {filteredPosts.map(post => {
            const readingTime = calculateReadingTime(post.content);
            const excerpt = extractExcerpt(post.content);
            const formattedDate = formatDate(post.date);
            
            return (
              <Link
                key={post.id}
                to={`/posts/${slugify(post.title)}`}
                className='post-card'
              >
                <div className='date-badge'>{formattedDate}</div>
                <h2>{post.title}</h2>
                <p className='post-excerpt'>{excerpt}</p>
                <div className='post-meta'>
                  <span className='reading-time'>{readingTime} min read</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
