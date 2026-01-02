import React from 'react';
import { siteContent } from '../../data/siteContent';

const CurrentSetup = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">Current Setup</h2>
            <ul className="list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {siteContent.currentSetup.map((item, index) => (
                    <li key={index} className="mb-2 font-bold tracking-tight text-text-body pl-4 border-l-2 border-border-subtle">{item}</li>
                ))}
            </ul>
        </section>
    );
};

export default CurrentSetup;
