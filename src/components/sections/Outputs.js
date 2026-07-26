import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { siteContent } from '../../data/siteContent';

/**
 * The first evidence on the page, and the highest-contrast thing on it — so it
 * leads into the site rather than out of it. The title anchor is stretched over
 * the whole card; the GitHub anchor sits above it. Both stay real, focusable
 * links, which the usual click-handler-on-a-span trick gives up.
 */
const Outputs = ({ className = '' }) => (
    <section className={className}>
        <h2 className="section-header">Outputs</h2>

        <Reveal as="ul" stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
            {siteContent.outputs.map((output) => (
                <li
                    key={output.slug || output.name}
                    className="relative flex flex-col justify-between bg-neutral-900 text-white p-5 font-mono text-sm group card-hover"
                >
                    <div className="mb-4">
                        <div className="flex justify-between items-start mb-3 gap-4">
                            <h3 className="font-bold tracking-tight text-base m-0">
                                <Link
                                    to={`/projects/${output.slug}`}
                                    className="no-underline text-white transition-colors group-hover:text-neutral-200 after:absolute after:inset-0 after:content-['']"
                                >
                                    {output.name}
                                </Link>
                            </h3>
                            <span className="text-[10px] uppercase border border-neutral-700 px-2 py-0.5 text-neutral-400 flex-shrink-0 tracking-wider">
                                {output.type}
                            </span>
                        </div>
                        <p className="text-neutral-400 leading-relaxed text-sm m-0">
                            {output.description}
                        </p>
                    </div>

                    <div className="flex items-end justify-between gap-4 pt-4 border-t border-neutral-800">
                        <span className="text-xs text-neutral-500">{output.stack}</span>

                        {output.link && (
                            <a
                                href={output.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 no-underline flex-shrink-0 text-[10px] uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
                            >
                                GitHub ↗
                            </a>
                        )}
                    </div>

                    {/* Always present, not hover-only: the point is to tell
                        every visitor the card leads inward, not to decorate the
                        fact that someone hovered. Hovering just brightens it. */}
                    <span
                        aria-hidden="true"
                        className="mt-3 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-hover:text-neutral-300 transition-colors"
                    >
                        Read the build →
                    </span>
                </li>
            ))}
        </Reveal>
    </section>
);

export default Outputs;
