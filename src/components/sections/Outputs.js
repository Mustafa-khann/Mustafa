import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { siteContent } from '../../data/siteContent';

/**
 * Rows, not filled cards. Seven solid black blocks were a quarter of the
 * homepage and shouted louder than anything written on it; as rows these read
 * as the same object the articles and index use, so the whole site runs on one
 * repeating pattern instead of four competing ones.
 *
 * The title anchor is stretched over the row so the whole row is clickable,
 * and the GitHub anchor sits above it. Both stay real, focusable links.
 */
const Outputs = ({ className = '' }) => (
    <section className={className}>
        <h2 className="section-header">Outputs</h2>

        <Reveal
            as="ul"
            stagger
            className="list-none p-0 m-0 grid sm:grid-cols-2 gap-x-12 border-t border-neutral-100"
        >
            {siteContent.outputs.map((output) => (
                <li key={output.slug || output.name} className="relative border-b border-neutral-100">
                    <div className="group h-full py-4 -mx-3 px-3 transition-colors hover:bg-neutral-50">
                        <div className="flex items-baseline justify-between gap-4 mb-1.5">
                            <h3 className="m-0 text-sm font-bold tracking-tight text-neutral-800 group-hover:text-neutral-900 transition-colors">
                                <Link
                                    to={`/projects/${output.slug}`}
                                    className="no-underline text-inherit after:absolute after:inset-0 after:content-['']"
                                >
                                    {output.name}
                                </Link>
                            </h3>
                            <span className="flex-shrink-0 font-mono text-[11px] text-neutral-400">
                                {output.type}
                            </span>
                        </div>

                        <p className="m-0 text-sm leading-snug text-neutral-500">
                            {output.description}
                        </p>

                        {/* Grouped left rather than pushed to opposite edges:
                            with a one-character stack like "C", justify-between
                            left the two halves marooned at either end of the
                            column looking unrelated. */}
                        <div className="flex flex-wrap items-baseline gap-x-2 mt-2 font-mono text-[11px] leading-snug text-neutral-400">
                            <span>{output.stack}</span>
                            {output.link && (
                                <>
                                    <span aria-hidden="true" className="text-neutral-200">·</span>
                                    <a
                                        href={output.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-10 no-underline text-neutral-400 hover:text-neutral-900 transition-colors"
                                    >
                                        GitHub ↗
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </Reveal>
    </section>
);

export default Outputs;
