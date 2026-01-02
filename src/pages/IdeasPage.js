import React from 'react';
import { Link } from 'react-router-dom';
import { researchPapers } from '../data/data';
import '../styles/Lab.css';

const IdeasPage = () => {
  return (
    <main className="lab-page">
      <header className="lab-header">
        <Link to="/" className="lab-back-link">← Back</Link>
        <h1 className="lab-header-name">Ideas</h1>
        <p className="lab-header-definition">Research papers and conceptual explorations.</p>
      </header>

      <section className="lab-section">
        <ul className="lab-ideas-list">
          {researchPapers.map((paper) => (
            <li key={paper.id} className="lab-idea-item">
              <Link to={`/ideas/${encodeURIComponent(paper.title)}`} className="lab-note-link">
                <div className="lab-idea-header">
                  <span className="lab-idea-title">{paper.title}</span>
                  <span className="lab-idea-status">{paper.date}</span>
                </div>
                <p className="lab-idea-description">{paper.abstract}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default IdeasPage;
