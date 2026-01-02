import React from 'react';
import { siteContent } from '../../data/siteContent';

const CurrentSetup = () => {
    return (
        <section className="py-8 md:py-16">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-neutral-500 border-b border-neutral-100 pb-2">Lab State / Current Setup</h2>
            <ul className="space-y-3">
                {siteContent.currentSetup.map((item, index) => (
                    <li key={index} className="flex items-start text-neutral-800">
                        <span className="mr-3 text-green-600 font-bold">✓</span>
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CurrentSetup;
