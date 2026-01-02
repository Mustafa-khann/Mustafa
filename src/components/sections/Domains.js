import React from 'react';
import { siteContent } from '../../data/siteContent';

const Domains = () => {
    return (
        <section className="py-8 md:py-16">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-neutral-500 border-b border-neutral-100 pb-2">Domains I Work In</h2>
            <ul className="grid gap-3">
                {siteContent.domains.map((domain, index) => (
                    <li key={index} className="border border-neutral-200 p-3 bg-neutral-50 font-medium text-neutral-900 flex items-center justify-between group hover:border-neutral-400 transition-colors duration-200">
                        {domain}
                        <span className="w-1.5 h-1.5 bg-neutral-300 group-hover:bg-neutral-900 transition-colors duration-200"></span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Domains;
