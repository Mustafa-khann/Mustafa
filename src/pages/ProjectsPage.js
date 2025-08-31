import React from 'react';
import ProjectList from '../components/ProjectList';
import { SEO } from '../components/common';

const ProjectsPage = () => {
  return (
    <div className='projects-page'>
      <SEO 
        title='Projects' 
        description='Engineering projects, robotics builds, and technical guides by Mustafa Khan.' 
        url='/projects' 
        type='website'
        contentType='projects'
      />
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;
