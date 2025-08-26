import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from './common/LoadingSpinner';
import '../styles/IdeasDetail.css';
import { SEO } from './common';

const IdeaDetail = () => {
  const { title } = useParams();
  const { getResearchPaperBySlug, loading, error } = useData();

  const decoded = decodeURIComponent(title);
  const paper = getResearchPaperBySlug(decoded);

  if (loading) {
    return (
      <div className='research-detail-container'>
        <LoadingSpinner size='large' message='Loading idea...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='research-detail-container'>
        <div className='error-message'>
          <p>Error loading idea: {error}</p>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className='research-detail-container'>
        <div className='error-message'>
          <p>Idea not found.</p>
          <Link to='/ideas' className='back-button'>
            ← Back to Ideas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='research-detail-container'>
      <SEO
        title={paper.title}
        description={paper.abstract || paper.title}
        url={`/ideas/${encodeURIComponent(decoded)}`}
        type='article'
      />
      <div className='research-header'>
        <Link to='/ideas' className='back-button'>
          <span className='back-arrow'>←</span>
        </Link>
        <h1>{paper.title}</h1>
      </div>
      <p>
        <em>{paper.date}</em>
      </p>
      <p>
        <strong>Author:</strong> {paper.author}
      </p>
      <div dangerouslySetInnerHTML={{ __html: paper.content }}></div>
    </div>
  );
};

export default IdeaDetail;
