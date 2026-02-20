import React from 'react';
import { siteContent } from '../../data/siteContent';

const Collaboration = () => {
    return (
        <section className="py-12 md:py-20 opacity-0 animate-fade-in animation-delay-500">
            <h2 className="section-header">Collaboration</h2>
            <p className="text-base text-neutral-600 max-w-2xl leading-relaxed">
                {siteContent.collaboration}
            </p>
        </section>
    );
};

export default Collaboration;
