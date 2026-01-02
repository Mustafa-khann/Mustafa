import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { researchPapers } from '../data/data';

const PaperDetail = () => {
    const { title } = useParams();
    const decoded = decodeURIComponent(title);
    const paper = researchPapers.find(p => p.title === decoded);

    if (!paper) {
        return (
            <main className="max-w-lab mx-auto px-8 py-16">
                <header className="mb-24">
                    <Link to="/ideas" className="inline-block mb-8 text-sm text-lab-muted no-underline hover:text-lab-text">← Back to Ideas</Link>
                    <h1 className="text-2xl font-medium mb-2">Not Found</h1>
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
        <main className="max-w-lab mx-auto px-8 py-16">
            <header className="mb-24">
                <Link to="/ideas" className="inline-block mb-8 text-xs font-bold uppercase tracking-widest text-lab-muted no-underline hover:text-lab-text">← Back to Ideas</Link>
                <h1 className="text-2xl font-bold mb-2 tracking-tight">{paper.title}</h1>
                <p className="text-lab-muted italic opacity-80">{paper.author} — {paper.date}</p>
            </header>

            <article
                className="leading-relaxed prose prose-neutral max-w-none [&_h2]:mt-16 [&_h2]:mb-4 [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-sm [&_h2]:tracking-widest [&_h2]:border-b [&_h2]:border-lab-border [&_h2]:pb-1 [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:font-bold [&_h3]:italic [&_p]:mb-8 [&_ul]:mb-8 [&_ol]:mb-8 [&_a]:text-lab-text [&_a]:font-bold [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-sm [&_th]:border [&_th]:border-lab-border [&_th]:p-2 [&_th]:text-left [&_th]:bg-lab-bg-alt [&_th]:font-bold [&_td]:border [&_td]:border-lab-border [&_td]:p-2 [&_blockquote]:border-l-2 [&_blockquote]:border-lab-border [&_blockquote]:pl-4 [&_blockquote]:text-lab-muted [&_blockquote]:italic [&_blockquote]:mb-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-lab-border"
                dangerouslySetInnerHTML={{ __html: cleanContent(paper.content) }}
            />
        </main>
    );
};

export default PaperDetail;
