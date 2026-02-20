import React from 'react';
import { siteContent } from '../../data/siteContent';

const Domains = () => {
    return (
        <section className="py-12 md:py-20 opacity-0 animate-fade-in animation-delay-300">
            <h2 className="section-header">Domains I Work In</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
                {siteContent.domains.map((domain, index) => (
                    <li
                        key={index}
                        className="border border-neutral-200 p-4 bg-white font-medium text-neutral-800 flex items-center justify-between group hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 cursor-default opacity-0 animate-scale-in"
                    >
                        <span className="text-sm">{domain}</span>
                        <span className="w-1.5 h-1.5 bg-neutral-200 group-hover:bg-accent-500 transition-colors duration-200 rounded-full"></span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Domains;
