import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectImage = ({ project }) => {
  const [failed, setFailed] = useState(false);
  if (!project.thumbnail || failed) return null;
  return <img className="project-thumbnail" src={project.thumbnail} alt="" width="160" height="112" loading="lazy" decoding="async" onError={() => setFailed(true)} />;
};

const ProjectList = ({ projects, offset = 0 }) => (
  <ol className="project-list" start={offset + 1}>
    {projects.map((project, index) => (
      <li key={project.slug}>
        <Link className="project-row" to={`/projects/${project.slug}`}>
          <span className="entry-number">{String(offset + index + 1).padStart(2, '0')}</span>
          <div className="project-row-copy">
            <div className="entry-meta">{project.type} <span aria-hidden="true">/</span> {project.date}</div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span className="project-stack">{project.stack}</span>
          </div>
          <ProjectImage project={project} />
          <span className="entry-arrow" aria-hidden="true">↗</span>
        </Link>
      </li>
    ))}
  </ol>
);
export default ProjectList;
