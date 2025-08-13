import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { researchPapers } from "../data/data"; // Import the shared data
import "../styles/IdeasDetail.css";
import { slugify } from "../utils/slug";

const IdeasDetail = () => {
  const { title } = useParams();
  const paper = useMemo(() => {
    const decoded = decodeURIComponent(title);
    return researchPapers.find((p) => slugify(p.title) === decoded);
  }, [title]);

  if (!paper) {
    return (
      <div className="research-detail-container">
        <p>Idea not found.</p>
        <Link to="/ideas" className="back-button">
          Go back to Ideas
        </Link>
      </div>
    );
  }

  return (
    <div className="research-detail-container">
      <div className="research-header">
        <Link to="/ideas" className="back-button">
          <span className="back-arrow">←</span>
        </Link>
        <h1>{paper.title}</h1>
      </div>
      <p>
        <em>{paper.date}</em>
      </p>
      <p>
        <strong>Author:</strong> {paper.author}
      </p>
      <div dangerouslySetInnerHTML={{ __html: paper.content }}></div>
    </div>
  );
};

export default IdeasDetail;
