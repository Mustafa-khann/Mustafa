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
        <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <header className="mb-24">
                <Link to="/ideas" className="inline-block mb-8 text-xs font-bold uppercase tracking-wider text-neutral-500 no-underline hover:text-neutral-900 transition-colors">← Back to Ideas</Link>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-neutral-900">{paper.title}</h1>
                <p className="text-neutral-500 italic opacity-80">{paper.author} — {paper.date}</p>
            </header>

            <article
                className="leading-relaxed prose prose-neutral max-w-none text-neutral-800 [&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-sm [&_h2]:tracking-wider [&_h2]:text-neutral-500 [&_h2]:border-b [&_h2]:border-neutral-100 [&_h2]:pb-2 [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:font-bold [&_h3]:italic [&_p]:mb-6 [&_ul]:mb-6 [&_ol]:mb-6 [&_li]:mb-2 [&_a]:text-neutral-900 [&_a]:underline [&_a]:decoration-neutral-300 [&_table]:w-full [&_table]:border-collapse [&_table]:mb-8 [&_table]:text-sm [&_th]:border [&_th]:border-neutral-200 [&_th]:p-3 [&_th]:text-left [&_th]:bg-neutral-50 [&_th]:font-bold [&_th]:tracking-wide [&_td]:border [&_td]:border-neutral-200 [&_td]:p-3 [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-400 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-500 [&_blockquote]:italic [&_blockquote]:mb-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-neutral-100 [&_img]:p-1 [&_img]:bg-neutral-50"
                dangerouslySetInnerHTML={{ __html: cleanContent(paper.content) }}
            />
        </main>
    );
};

export default PaperDetail;
