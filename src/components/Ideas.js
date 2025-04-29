import React from "react";
import { Link } from "react-router-dom";
import { researchPapers } from "../data/data"; // Import the shared data
import "../styles/Ideas.css";

// Add the toSlug function
function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

const Research = () => {
  return (
    <div className="research-container">
      <div className="section-header">
        <span className="section-title">/ ideas</span>
      </div>
      <p className="research-intro">
        Here you can find a list of my ideas.
      </p>

      <div className="research-grid">
        {researchPapers.map((paper) => (
          <div key={paper.id} className="research-card">
            <Link
              to={`/ideas/${toSlug(paper.title)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>{paper.title}</h2>
              <p>
                <em>{paper.date}</em>
              </p>
              <p>
                <strong>Author:</strong> {paper.author}
              </p>
              <p className="abstract">{paper.abstract}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Research;
