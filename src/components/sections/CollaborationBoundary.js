import React from 'react';
import { siteContent } from '../../data/siteContent';

const Collaboration = () => {
    return (
        <section className="py-8 md:py-16">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-neutral-500 border-b border-neutral-100 pb-2">Collaboration</h2>
            <p className="text-base text-neutral-600 max-w-2xl">{siteContent.collaboration}</p>
        </section>
    );
};

export default Collaboration;
