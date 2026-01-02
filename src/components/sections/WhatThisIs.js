import React from 'react';
import { siteContent } from '../../data/siteContent';

const WhatThisIs = () => {
    return (
        <section className="lab-section lab-what-this-is">
            <h2 className="lab-section-title">What This Site Is</h2>
            <p>{siteContent.whatThisIs}</p>
        </section>
    );
};

export default WhatThisIs;
