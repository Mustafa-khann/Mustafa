import React from 'react';
import { siteContent } from '../../data/siteContent';

const WhatThisIs = () => {
    return (
        <section className="py-12 md:py-20 opacity-0 animate-fade-in animation-delay-100">
            <h2 className="section-header">What This Site Is</h2>
            <p className="text-base md:text-lg leading-relaxed text-neutral-700 max-w-2xl">
                {siteContent.whatThisIs}
            </p>
        </section>
    );
};

export default WhatThisIs;
