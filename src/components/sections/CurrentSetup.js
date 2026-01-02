import React from 'react';
import { siteContent } from '../../data/siteContent';

const CurrentSetup = () => {
    return (
        <section className="lab-section lab-current-setup">
            <h2 className="lab-section-title">Current Setup</h2>
            <ul className="lab-setup-list">
                {siteContent.currentSetup.map((item, index) => (
                    <li key={index} className="lab-setup-item">{item}</li>
                ))}
            </ul>
        </section>
    );
};

export default CurrentSetup;
