import React from 'react';
import { siteContent } from '../../data/siteContent';

// Sits in the first viewport, so it arrives with the page rather than after it.
const WhatThisIs = ({ className = '' }) => (
    <section className={className}>
        <h2 className="section-header">What This Site Is</h2>
        <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-2xl">
            {siteContent.whatThisIs}
        </p>
    </section>
);

export default WhatThisIs;
