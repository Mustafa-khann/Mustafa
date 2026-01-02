import React from 'react';
import { siteContent } from '../../data/siteContent';

const HowIWork = () => {
    const { process, constraints } = siteContent.howIWork;

    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">How I Work</h2>

            <ul className="list-none p-0 mb-8">
                {process.map((step, index) => (
                    <li key={index} className="mb-2 pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-lab-muted font-bold tracking-tight">{step}</li>
                ))}
            </ul>

            <h3 className="text-sm font-bold text-lab-muted mb-2 mt-8 italic">Constraints</h3>
            <ul className="list-none p-0">
                {constraints.map((constraint, index) => (
                    <li key={index} className="mb-2 text-lab-muted italic opacity-80">{constraint}</li>
                ))}
            </ul>
        </section>
    );
};

export default HowIWork;
