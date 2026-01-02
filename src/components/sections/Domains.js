import React from 'react';
import { siteContent } from '../../data/siteContent';

const Domains = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">Domains I Work In</h2>
            <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteContent.domains.map((domain, index) => (
                    <li key={index} className="bg-background-surface border border-border-standard p-3 font-bold tracking-tight text-text-body hover:border-border-active transition-colors duration-200">{domain}</li>
                ))}
            </ul>
        </section>
    );
};

export default Domains;
