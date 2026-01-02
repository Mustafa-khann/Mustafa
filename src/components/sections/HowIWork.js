import React from 'react';
import { siteContent } from '../../data/siteContent';

const HowIWork = () => {
    const { process, constraints } = siteContent.howIWork;

    return (
        <section className="py-8 md:py-16">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-neutral-500 border-b border-neutral-100 pb-2">How I Work</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold mb-4 text-neutral-900 border-b border-dashed border-neutral-300 pb-1 inline-block">Process</h3>
                    <ul className="space-y-2">
                        {process.map((step, index) => (
                            <li key={index} className="flex items-start text-neutral-800">
                                <span className="mr-3 text-neutral-400 font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4 text-neutral-900 border-b border-dashed border-neutral-300 pb-1 inline-block">Constraints</h3>
                    <ul className="space-y-2">
                        {constraints.map((constraint, index) => (
                            <li key={index} className="flex items-start text-neutral-800">
                                <span className="mr-3 text-neutral-400 font-mono">::</span>
                                {constraint}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HowIWork;
