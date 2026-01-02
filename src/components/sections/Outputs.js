import React from 'react';
import { siteContent } from '../../data/siteContent';

const Outputs = () => {
    return (
        <section className="py-8 md:py-16">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-neutral-500 border-b border-neutral-100 pb-2">Outputs</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteContent.outputs.map((output, index) => (
                    <li key={index} className="bg-neutral-900 text-white p-4 font-mono text-sm group hover:scale-[1.01] transition-transform duration-200">
                        <div className="flex flex-col h-full justify-between">
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold tracking-tight">
                                        <span className="text-neutral-500 mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">PROJ {index.toString().padStart(2, '0')} //</span>
                                        {output.link ? (
                                            <a href={output.link} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-neutral-300">
                                                {output.name}
                                            </a>
                                        ) : (
                                            output.name
                                        )}
                                    </span>
                                    <span className="text-[10px] uppercase border border-neutral-700 px-1.5 py-0.5 rounded text-neutral-400">{output.type}</span>
                                </div>
                                <p className="text-neutral-400 leading-relaxed mb-4">{output.description}</p>
                            </div>
                            <span className="text-xs text-neutral-500 font-mono block pt-4 border-t border-neutral-800">{output.stack}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Outputs;
