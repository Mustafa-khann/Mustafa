import React from "react";
import { useParams, Link } from "react-router-dom";
import { projectDetails } from "../data/projects"; 
import "../styles/ProjectDetail.css";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

const ProjectDetail = () => {
  const { title } = useParams();
  const project = projectDetails.find((project) => toSlug(project.title) === decodeURIComponent(title));

  if (!project) {
    return (
      <div className="project-detail-container">
        <p>Project not found.</p>
        <Link to="/projects" className="back-button">
          Go back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="project-header">
        <Link to="/projects" className="back-button">
          <span className="back-arrow">←</span>
        </Link>
        <h1>{project.title}</h1>
      </div>
      {project.image && (
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-detail-image" />
        </div>
      )}
      <p className="project-tech"><strong>Tech Stack:</strong> {project.techStack}</p>
      {project.link && (
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="project-link-button"
        >
          View Source Code
        </a>
      )}
      <div className="project-content" dangerouslySetInnerHTML={{ __html: project.content }}></div>
    </div>
  );
};

export default ProjectDetail; 