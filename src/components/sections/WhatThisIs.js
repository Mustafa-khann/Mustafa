import React from 'react';
import { siteContent } from '../../data/siteContent';

const WhatThisIs = () => {
    return (
        <section className="py-8 md:py-16">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-neutral-500 border-b border-neutral-100 pb-2">What This Site Is</h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-800">{siteContent.whatThisIs}</p>
        </section>
    );
};

export default WhatThisIs;
