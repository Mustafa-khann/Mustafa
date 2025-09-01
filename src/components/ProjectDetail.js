import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import LoadingSpinner from './common/LoadingSpinner';
import '../styles/ProjectDetail.css';
import { SEO } from './common';

const ProjectDetail = () => {
  const { title } = useParams();
  const { getProjectBySlug, loading, error } = useData();

  const decoded = decodeURIComponent(title);
  const project = getProjectBySlug(decoded);

  if (loading) {
    return (
      <div className='project-detail-container'>
        <LoadingSpinner size='large' message='Loading project...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='project-detail-container'>
        <div className='error-message'>
          <p>Error loading project: {error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className='project-detail-container'>
        <div className='error-message'>
          <p>Project not found.</p>
          <Link to='/projects' className='back-button'>
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='project-detail-container'>
      <SEO
        title={String(project.title || 'Project')}
        description={String(project.abstract || project.title || 'Project details')}
        url={`/projects/${encodeURIComponent(decoded)}`}
        type='article'
        image={project.image || undefined}
      />
      <div className='project-header'>
        <Link to='/projects' className='back-button'>
          <span className='back-arrow'>←</span>
        </Link>
        <h1>{project.title || 'Project'}</h1>
      </div>
      {project.image && project.image !== null && (
        <div className='project-image-container'>
          <img src={project.image} alt={project.title} className='project-detail-image' />
        </div>
      )}
      <p className='project-tech'>
        <strong>Tech Stack:</strong> {project.techStack || 'Not specified'}
      </p>
      {project.link && project.link !== null && project.link !== '' && (
        <a
          href={project.link}
          target='_blank'
          rel='noopener noreferrer'
          className='project-link-button'
        >
          View Source Code
        </a>
      )}
      <div className='project-content' dangerouslySetInnerHTML={{ __html: project.content || '' }}></div>
    </div>
  );
};

export default ProjectDetail;
