import React from 'react';
import { siteContent } from '../../data/siteContent';

const Outputs = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-wide text-lab-muted mb-4 border-b border-lab-border pb-1">Outputs</h2>
            <ul className="list-none p-0">
                {siteContent.outputs.map((output, index) => (
                    <li key={index} className="mb-8 pb-8 border-b border-lab-border last:border-b-0">
                        <div className="flex items-baseline gap-4 mb-2">
                            <span className="font-bold tracking-tight">
                                {output.link ? (
                                    <a href={output.link} target="_blank" rel="noopener noreferrer">
                                        {output.name}
                                    </a>
                                ) : (
                                    output.name
                                )}
                            </span>
                            <span className="text-sm text-lab-muted italic">{output.type}</span>
                        </div>
                        <p className="text-lab-muted mb-2">{output.description}</p>
                        <span className="text-sm text-lab-muted italic opacity-70">{output.stack}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Outputs;
