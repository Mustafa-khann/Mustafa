import React from 'react';
import { siteContent } from '../../data/siteContent';

const Collaboration = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">Collaboration</h2>
            <p className="italic">{siteContent.collaboration}</p>
        </section>
    );
};

export default Collaboration;
