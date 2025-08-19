import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slug';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/projects/${slugify(project.title)}`} className="project-link">
        {project.image && (
          <div className="project-card-image">
            <img src={project.image} alt={project.title} />
            <div className="project-card-overlay">
              <div className="project-card-overlay-content">
                <span className="view-project">View Project</span>
              </div>
            </div>
          </div>
        )}
        <div className="project-card-content">
          <div className="project-card-header">
            <h2 title={project.title}>
              {truncateText(project.title, 40)}
            </h2>
            {project.date && (
              <span className="project-date">{formatDate(project.date)}</span>
            )}
          </div>
          <p className="project-card-tech">{project.techStack}</p>
          <p className="project-card-desc">
            {truncateText(project.abstract, 120)}
          </p>
          <div className="project-card-footer">
            <div className="project-card-tags">
              {project.techStack.split(', ').slice(0, 3).map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech.trim()}
                </span>
              ))}
            </div>
            <div className="project-card-arrow">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard; 