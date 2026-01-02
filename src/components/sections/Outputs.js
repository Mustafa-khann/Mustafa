import React from 'react';
import { siteContent } from '../../data/siteContent';

const Outputs = () => {
    return (
        <section className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 border-b border-border-subtle pb-2">Outputs</h2>
            <ul className="list-none p-0">
                {siteContent.outputs.map((output, index) => (
                    <li key={index} className="mb-6 bg-background-surface border border-border-standard p-4 hover:border-border-active transition-colors duration-200">
                        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                            <span className="font-bold tracking-tight text-text-heading">
                                {output.link ? (
                                    <a href={output.link} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline decoration-border-active">
                                        {output.name}
                                    </a>
                                ) : (
                                    output.name
                                )}
                            </span>
                            <span className="text-xs text-text-muted italic uppercase tracking-wide border border-border-subtle px-2 py-0.5 rounded-sm">{output.type}</span>
                        </div>
                        <p className="text-text-muted mb-3 text-sm">{output.description}</p>
                        <span className="text-xs text-text-muted italic opacity-80 font-mono block">{output.stack}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Outputs;
