import React from 'react';
import Reveal from '../common/Reveal';
import { siteContent } from '../../data/siteContent';

/**
 * Standing state plus a dated log. The log is the part that matters: three
 * static bullets describe a situation, but dated entries are evidence that the
 * place is still running — which is what makes a first-time visitor read on and
 * a returning one come back. Add entries in data/siteContent.js.
 */
const LabLog = ({ className = '' }) => {
    const { currentSetup, labLog = [] } = siteContent;

    return (
        <section className={className}>
            <h2 className="section-header">Lab State</h2>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                <div>
                    <h3 className="font-bold mb-6 text-neutral-900 text-sm uppercase tracking-wider">
                        Standing
                    </h3>
                    <Reveal as="ul" stagger className="space-y-4 list-none p-0 m-0">
                        {currentSetup.map((item) => (
                            <li key={item} className="flex items-start text-neutral-700">
                                <span className="mr-4 font-mono text-sm text-neutral-300 flex-shrink-0">::</span>
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </Reveal>
                </div>

                {labLog.length > 0 && (
                    <div>
                        <h3 className="font-bold mb-6 text-neutral-900 text-sm uppercase tracking-wider">
                            Log
                        </h3>
                        <Reveal as="ol" stagger className="space-y-4 list-none p-0 m-0">
                            {labLog.map(({ date, entry }) => (
                                <li key={`${date}-${entry}`} className="flex items-start gap-4">
                                    <span className="font-mono text-[11px] text-neutral-300 w-24 flex-shrink-0 pt-1">
                                        {date}
                                    </span>
                                    <span className="text-sm leading-relaxed text-neutral-700">
                                        {entry}
                                    </span>
                                </li>
                            ))}
                        </Reveal>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LabLog;
