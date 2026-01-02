import React from 'react';
import { siteContent } from '../../data/siteContent';

const CurrentSetup = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">Current Setup</h2>
            <ul className="list-none p-0">
                {siteContent.currentSetup.map((item, index) => (
                    <li key={index} className="mb-2 font-bold tracking-tight">{item}</li>
                ))}
            </ul>
        </section>
    );
};

export default CurrentSetup;
