import React from 'react';
import ProjectList from '../components/ProjectList';
import { SEO } from '../components/common';

const ProjectsPage = () => {
  return (
    <div className='projects-page'>
      <SEO title='Projects' description='Selected projects and guides.' url='/projects' type='website' />
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;
