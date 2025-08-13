import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { researchPapers } from "../data/data"; // Import the shared data
import "../styles/Ideas.css";
import { slugify } from "../utils/slug";

const Research = () => {
  const items = useMemo(() => researchPapers, []);
  return (
    <div className="research-container">
      <div className="section-header">
        <span className="section-title">/ ideas</span>
      </div>
      <p className="research-intro">
        Here you can find a list of my ideas.
      </p>

      <div className="research-grid">
        {items.map((paper) => (
          <div key={paper.id} className="research-card">
            <Link
              to={`/ideas/${slugify(paper.title)}`}
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
