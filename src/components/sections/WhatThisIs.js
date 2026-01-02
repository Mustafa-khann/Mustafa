import React from 'react';
import { siteContent } from '../../data/siteContent';

const WhatThisIs = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">What This Site Is</h2>
            <p>{siteContent.whatThisIs}</p>
        </section>
    );
};

export default WhatThisIs;
