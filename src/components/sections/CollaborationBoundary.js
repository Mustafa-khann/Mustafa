import React from 'react';
import { siteContent } from '../../data/siteContent';

const Collaboration = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">Collaboration</h2>
            <p className="italic text-text-body leading-relaxed max-w-2xl bg-background-surface p-6 border border-border-subtle">{siteContent.collaboration}</p>
        </section>
    );
};

export default Collaboration;
