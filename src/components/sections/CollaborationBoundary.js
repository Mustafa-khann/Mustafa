import React from 'react';
import { siteContent } from '../../data/siteContent';

const Collaboration = () => {
    return (
        <section className="lab-section lab-collaboration">
            <h2 className="lab-section-title">Collaboration</h2>
            <p>{siteContent.collaboration}</p>
        </section>
    );
};

export default Collaboration;
