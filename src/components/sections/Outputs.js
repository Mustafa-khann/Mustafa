import React from 'react';
import { siteContent } from '../../data/siteContent';

const Outputs = () => {
    return (
        <section className="py-12 md:py-20 opacity-0 animate-fade-in animation-delay-400">
            <h2 className="section-header">Outputs</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
                {siteContent.outputs.map((output, index) => (
                    <li
                        key={index}
                        className="bg-neutral-900 text-white p-5 font-mono text-sm group card-hover opacity-0 animate-fade-in-up"
                    >
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-3 gap-4">
                                    <span className="font-bold tracking-tight text-base">
                                        <span className="text-neutral-600 mr-2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {index.toString().padStart(2, '0')} //
                                        </span>
                                        {output.link ? (
                                            <a
                                                href={output.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="no-underline text-white hover:text-neutral-300 transition-colors"
                                            >
                                                {output.name}
                                            </a>
                                        ) : (
                                            <span className="text-white">{output.name}</span>
                                        )}
                                    </span>
                                    <span className="text-[10px] uppercase border border-neutral-700 px-2 py-0.5 text-neutral-400 flex-shrink-0 tracking-wider">
                                        {output.type}
                                    </span>
                                </div>
                                <p className="text-neutral-400 leading-relaxed text-sm">
                                    {output.description}
                                </p>
                            </div>
                            <span className="text-xs text-neutral-500 font-mono block pt-4 border-t border-neutral-800">
                                {output.stack}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Outputs;
