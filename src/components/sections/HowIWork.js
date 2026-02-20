import React from 'react';
import { siteContent } from '../../data/siteContent';

const HowIWork = () => {
    const { process, constraints } = siteContent.howIWork;

    return (
        <section className="py-12 md:py-20 opacity-0 animate-fade-in animation-delay-200">
            <h2 className="section-header">How I Work</h2>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                <div>
                    <h3 className="font-bold mb-6 text-neutral-900 text-sm uppercase tracking-wider">
                        Process
                    </h3>
                    <ul className="space-y-4 stagger-children">
                        {process.map((step, index) => (
                            <li
                                key={index}
                                className="flex items-start text-neutral-700 opacity-0 animate-slide-in"
                            >
                                <span className="mr-4 text-neutral-300 font-mono text-sm w-6 flex-shrink-0">
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-neutral-900 text-sm uppercase tracking-wider">
                        Constraints
                    </h3>
                    <ul className="space-y-4 stagger-children">
                        {constraints.map((constraint, index) => (
                            <li
                                key={index}
                                className="flex items-start text-neutral-700 opacity-0 animate-slide-in"
                            >
                                <span className="mr-4 text-neutral-300 font-mono text-sm flex-shrink-0">
                                    ::
                                </span>
                                <span className="leading-relaxed">{constraint}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HowIWork;
