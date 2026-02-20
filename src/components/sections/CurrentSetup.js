import React from 'react';
import { siteContent } from '../../data/siteContent';

const CurrentSetup = () => {
    return (
        <section className="py-12 md:py-20 opacity-0 animate-fade-in animation-delay-500">
            <h2 className="section-header">Lab State / Current Setup</h2>
            <ul className="space-y-4 stagger-children">
                {siteContent.currentSetup.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start text-neutral-700 opacity-0 animate-slide-in"
                    >
                        <span className="mr-4 text-accent-500 font-bold flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CurrentSetup;
