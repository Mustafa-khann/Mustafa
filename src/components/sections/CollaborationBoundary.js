import React from 'react';
import Reveal from '../common/Reveal';
import { siteContent } from '../../data/siteContent';

const Collaboration = ({ className = '' }) => (
    <section className={className}>
        <h2 className="section-header">Collaboration</h2>
        <Reveal>
            <p className="text-base text-neutral-600 max-w-2xl leading-relaxed">
                {siteContent.collaboration}
            </p>
        </Reveal>
    </section>
);

export default Collaboration;
