import React from 'react';
import Reveal from '../common/Reveal';
import { siteContent } from '../../data/siteContent';

/**
 * Domains are a statement of scope, not a navigation surface — two of them have
 * no shipped project behind them, so linking would promise a page and deliver
 * an empty one. These used to be cards that lit up on hover and went nowhere;
 * an affordance that never pays teaches visitors to stop probing the whole
 * site, so the response is withdrawn rather than faked.
 */
const Domains = ({ className = '' }) => (
    <section className={className}>
        <h2 className="section-header">Domains I Work In</h2>

        <Reveal as="ul" stagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 list-none p-0 m-0">
            {siteContent.domains.map((domain, index) => (
                <li
                    key={domain}
                    className="flex items-baseline gap-4 py-3 border-b border-neutral-100 text-neutral-700"
                >
                    <span className="font-mono text-xs text-neutral-300 w-6 flex-shrink-0">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed">{domain}</span>
                </li>
            ))}
        </Reveal>
    </section>
);

export default Domains;
