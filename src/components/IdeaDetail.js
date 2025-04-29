import React from "react";
import { useParams, Link } from "react-router-dom";
import { researchPapers } from "../data/data"; // Import the shared data
import "../styles/IdeasDetail.css";

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

const IdeasDetail = () => {
  const { title } = useParams();
  console.log("Title from URL:", title); // Add this line

  const paper = researchPapers.find(
    (paper) => toSlug(paper.title) === decodeURIComponent(title),
  );
  console.log("Fetched Paper:", paper); // Add this line

  console.log("Component is rendering"); // Add this line

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
