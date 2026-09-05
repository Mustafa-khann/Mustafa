import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectDetails } from '../data/projects';
import { projectSummaries } from '../data/projectSummaries';
import { preparePostHtml } from '../utils/posts';
import ArticleLayout from '../components/common/ArticleLayout';

const ProjectMedia = ({ project }) => {
  const [failed, setFailed] = useState(false);
  if (!project.image || failed) return null;
  return <figure className="project-figure"><img src={project.image} alt={project.title} onError={() => setFailed(true)} decoding="async" /><figcaption>{project.title} <span>{project.date}</span></figcaption></figure>;
};
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = projectDetails.find((entry) => entry.slug === slug);
  const summary = projectSummaries.find((entry) => entry.slug === slug);
  if (!project) return <main className="site-main empty-page"><span className="eyebrow">404 / Project</span><h1>Project not found.</h1><Link className="text-link" to="/projects">← All projects</Link></main>;
  const source = project.link && !project.link.includes('yourusername') ? project.link : null;
  return (
    <ArticleLayout recordKey={slug} title={summary?.name || project.title} summary={summary?.description || project.abstract} category="Projects" backTo="/projects" date={project.date} meta={project.techStack} html={preparePostHtml(project.content)} contents progress>
      {source && <div className="document-tools"><a className="text-link" href={source} target="_blank" rel="noopener noreferrer">Source on GitHub ↗</a></div>}
      <ProjectMedia key={slug} project={project} />
    </ArticleLayout>
  );
};
export default ProjectDetailPage;
