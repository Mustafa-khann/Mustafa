import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/Ideas.css";
import { slugify } from "../utils/slug";

const Ideas = () => {
  const { filteredResearchPapers, loading, error } = useData();

  if (loading) {
    return (
      <div className="research-container">
        <LoadingSpinner size="large" message="Loading ideas..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="research-container">
        <div className="error-message">
          <p>Error loading ideas: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="research-container">
      <div className="section-header">
        <span className="section-title">/ ideas</span>
      </div>
      <p className="research-intro">
        Here you can find a list of my ideas.
      </p>

      <SearchBar placeholder="Search ideas..." />

      {filteredResearchPapers.length === 0 ? (
        <div className="no-results">
          <p>No ideas found matching your search.</p>
        </div>
      ) : (
        <div className="research-grid">
          {filteredResearchPapers.map((paper) => (
            <div key={paper.id} className="research-card">
              <Link
                to={`/ideas/${slugify(paper.title)}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="meta-badges">
                  <div className="date-badge">{paper.date}</div>
                  <div className="author-badge">{paper.author}</div>
                </div>
                <h2>{paper.title}</h2>
                <p className="abstract">{paper.abstract}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ideas;
