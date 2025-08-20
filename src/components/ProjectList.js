import React from 'react';
import { useData } from '../context/DataContext';
import SearchBar from './ui/SearchBar';
import ProjectCard from './cards/ProjectCard';
import Button from './common/Button';
import '../styles/ProjectList.css';
import { slugify } from '../utils/slug';

// Skeleton loading component
const ProjectCardSkeleton = () => (
  <div className='project-card skeleton'>
    <div className='project-card-image skeleton' style={{ height: '200px' }}></div>
    <div className='project-card-content'>
      <div
        className='skeleton'
        style={{ height: '24px', width: '80%', marginBottom: '12px' }}
      ></div>
      <div
        className='skeleton'
        style={{ height: '20px', width: '60%', marginBottom: '12px' }}
      ></div>
      <div
        className='skeleton'
        style={{ height: '16px', width: '100%', marginBottom: '8px' }}
      ></div>
      <div className='skeleton' style={{ height: '16px', width: '90%', marginBottom: '8px' }}></div>
      <div className='skeleton' style={{ height: '16px', width: '70%' }}></div>
    </div>
  </div>
);

const ProjectList = () => {
  const { filteredProjects, loading, error } = useData();

  if (loading) {
    return (
      <div className='projects-container'>
        <div className='section-header'>
          <span className='section-title'>/ projects</span>
        </div>
        <p className='projects-intro'>
          Here you can find detailed guides for all my projects. Click on any project to see a
          step-by-step guide on how to build it.
        </p>

        <SearchBar placeholder='Search projects...' />

        <div className='projects-grid'>
          {[...Array(6)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='projects-container'>
        <div className='error-message'>
          <p>Error loading projects: {error}</p>
          <Button variant='primary' onClick={() => window.location.reload()} className='mt-2'>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='projects-container'>
      <div className='section-header'>
        <span className='section-title'>/ projects</span>
      </div>
      <p className='projects-intro'>
        Here you can find detailed guides for all my projects. Click on any project to see a
        step-by-step guide on how to build it.
      </p>

      <SearchBar placeholder='Search projects...' />

      {filteredProjects.length === 0 ? (
        <div className='no-results'>
          <p>No projects found matching your search.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            Try adjusting your search terms or browse all projects.
          </p>
        </div>
      ) : (
        <div className='projects-grid'>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
