import React from "react";
import { Link } from "react-router-dom";
import { projectDetails } from "../data/projects"; // Import projects from data.js
import "../styles/ProjectList.css";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

const truncateText = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const ProjectList = () => {
  return (
    <div className="projects-container">
      <div className="section-header">
        <span className="section-title">/ projects</span>
      </div>
      <p className="projects-intro">
        Here you can find detailed guides for all my projects. Click on any project to see a step-by-step guide on how to build it.
      </p>
      
      <div className="projects-grid">
        {projectDetails
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/projects/${toSlug(project.title)}`} className="project-link">
              {project.image && (
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} />
                </div>
              )}
              <div className="project-card-content">
                <h2 title={project.title}>
                  {project.title.length > 40 ? truncateText(project.title, 37) : project.title}
                </h2>
                <p className="project-card-tech">{project.techStack}</p>
                <p className="project-card-desc">{truncateText(project.abstract, 100)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList; 