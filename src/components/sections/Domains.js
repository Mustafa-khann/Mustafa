import React from 'react';
import { siteContent } from '../../data/siteContent';

const Domains = () => {
    return (
        <section className="lab-section lab-domains">
            <h2 className="lab-section-title">Domains I Work In</h2>
            <ul className="lab-domains-list">
                {siteContent.domains.map((domain, index) => (
                    <li key={index} className="lab-domains-item">{domain}</li>
                ))}
            </ul>
        </section>
    );
};

export default Domains;
