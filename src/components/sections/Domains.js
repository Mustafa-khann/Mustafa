import React from 'react';
import { siteContent } from '../../data/siteContent';

const Domains = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">Domains I Work In</h2>
            <ul className="list-none p-0">
                {siteContent.domains.map((domain, index) => (
                    <li key={index} className="mb-2 font-bold tracking-tight">{domain}</li>
                ))}
            </ul>
        </section>
    );
};

export default Domains;
