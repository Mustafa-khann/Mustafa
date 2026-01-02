import React from 'react';
import { siteContent } from '../../data/siteContent';

const HowIWork = () => {
    const { process, constraints } = siteContent.howIWork;

    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">How I Work</h2>

            <ul className="list-none p-0 mb-8">
                {process.map((step, index) => (
                    <li key={index} className="mb-2 pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-text-muted font-bold tracking-tight text-text-body">{step}</li>
                ))}
            </ul>

            <h3 className="text-sm font-bold text-text-muted mb-4 mt-8 italic uppercase tracking-widest">Constraints</h3>
            <ul className="list-none p-0">
                {constraints.map((constraint, index) => (
                    <li key={index} className="mb-2 text-text-muted italic opacity-90">{constraint}</li>
                ))}
            </ul>
        </section>
    );
};

export default HowIWork;
