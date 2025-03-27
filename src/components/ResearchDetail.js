import React from "react";
import { useParams, Link } from "react-router-dom";
import { researchPapers } from "../data/data"; // Import the shared data
import "../styles/ResearchDetail.css";

const ResearchDetail = () => {
  const { id } = useParams();
  console.log("ID from URL:", id); // Add this line

  const paper = researchPapers.find((paper) => paper.id === parseInt(id));
  console.log("Fetched Paper:", paper); // Add this line

  console.log("Component is rendering"); // Add this line

  if (!paper) {
    return (
      <div className="research-detail-container">
        <p>Research paper not found.</p>
        <Link to="/research" className="back-button">
          Go back to Research
        </Link>
      </div>
    );
  }

  return (
    <div className="research-detail-container">
      <div className="research-header">
        <Link to="/research" className="back-button">
          <span className="back-arrow">←</span>
        </Link>
        <h1>{paper.title}</h1>
      </div>
      <p><em>{paper.date}</em></p>
      <p><strong>Author:</strong> {paper.author}</p>
      <div dangerouslySetInnerHTML={{ __html: paper.content }}></div>
    </div>
  );
};

export default ResearchDetail;