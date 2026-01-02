import React from 'react';
import { siteContent } from '../../data/siteContent';

const WhatThisIs = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">What This Site Is</h2>
            <p>{siteContent.whatThisIs}</p>
        </section>
    );
};

export default WhatThisIs;
