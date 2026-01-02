import React from 'react';
import { siteContent } from '../../data/siteContent';

const Outputs = () => {
    return (
        <section className="lab-section lab-outputs">
            <h2 className="lab-section-title">Outputs</h2>
            <ul className="lab-outputs-list">
                {siteContent.outputs.map((output, index) => (
                    <li key={index} className="lab-output-item">
                        <div className="lab-output-header">
                            <span className="lab-output-name">
                                {output.link ? (
                                    <a href={output.link} target="_blank" rel="noopener noreferrer">
                                        {output.name}
                                    </a>
                                ) : (
                                    output.name
                                )}
                            </span>
                            <span className="lab-output-type">{output.type}</span>
                        </div>
                        <p className="lab-output-description">{output.description}</p>
                        <span className="lab-output-stack">{output.stack}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Outputs;
