import React from 'react';
import PageHeader from '../components/common/PageHeader';
import ProjectList from '../components/common/ProjectList';
import { projectSummaries } from '../data/projectSummaries';
import { usePageMetadata } from '../utils/metadata';

const ProjectsPage = () => {
  usePageMetadata({ title: 'Projects — Mustafa Khan', description: 'Hardware prototypes, systems software, and experiments in machine learning.' });
  let offset = 0;
  return (
    <main className="site-main">
      <PageHeader number="01" title="Projects" description="I built each of these projects independently. Hardware prototypes, systems software, and machine learning experiments, with implementation details and source where available." count={projectSummaries.length} />
      {['Hardware', 'System', 'Experiment', 'Tool'].map((type) => {
        const projects = projectSummaries.filter((project) => project.type === type);
        const start = offset;
        offset += projects.length;
        return <section className="project-group" key={type}><div className="project-group-header"><h2>{({ Hardware: 'Hardware', System: 'Systems', Experiment: 'Experiments', Tool: 'Tools' })[type]}</h2><span>{String(projects.length).padStart(2, '0')}</span></div><ProjectList projects={projects} offset={start} /></section>;
      })}
    </main>
  );
};
export default ProjectsPage;
