import React from 'react';
import { siteContent } from '../../data/siteContent';

const HowIWork = () => {
    const { process, constraints } = siteContent.howIWork;

    return (
        <section className="lab-section lab-how-i-work">
            <h2 className="lab-section-title">How I Work</h2>

            <ul className="lab-process-list">
                {process.map((step, index) => (
                    <li key={index} className="lab-process-item">{step}</li>
                ))}
            </ul>

            <h3 className="lab-subsection-title">Constraints</h3>
            <ul className="lab-constraints-list">
                {constraints.map((constraint, index) => (
                    <li key={index} className="lab-constraint-item">{constraint}</li>
                ))}
            </ul>
        </section>
    );
};

export default HowIWork;
