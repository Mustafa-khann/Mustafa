import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { researchPapers } from '../data/data';
import '../styles/Lab.css';

const PaperDetail = () => {
    const { title } = useParams();
    const decoded = decodeURIComponent(title);
    const paper = researchPapers.find(p => p.title === decoded);

    if (!paper) {
        return (
            <main className="lab-page">
                <header className="lab-header">
                    <Link to="/ideas" className="lab-back-link">← Back to Ideas</Link>
                    <h1 className="lab-header-name">Not Found</h1>
                </header>
                <p>Paper not found.</p>
            </main>
        );
    }

    // Clean content - remove high-intensity styles for minimal lab theme
    const cleanContent = (html) => {
        return html
            .replace(/style="color:[^"]*"/g, '')
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '')
            .replace(/<br\s*\/?>/g, '<br>')
            .replace(/<br>\s*<br>/g, '</p><p>');
    };

    return (
        <main className="lab-page lab-note-detail">
            <header className="lab-header">
                <Link to="/ideas" className="lab-back-link">← Back to Ideas</Link>
                <h1 className="lab-header-name">{paper.title}</h1>
                <p className="lab-header-definition">{paper.author} — {paper.date}</p>
            </header>

            <article
                className="lab-note-content"
                dangerouslySetInnerHTML={{ __html: cleanContent(paper.content) }}
            />
        </main>
    );
};

export default PaperDetail;
