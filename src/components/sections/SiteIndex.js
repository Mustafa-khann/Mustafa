import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { libraryIndex } from '../../data/libraryIndex';

/**
 * The last thing on the homepage, and a door rather than a paragraph. People
 * judge an experience by its peak and its ending, so the ending should be the
 * most useful moment on the page: what exists here, how much of it there is,
 * and what the newest piece is.
 */
const SiteIndex = ({ className = '', title = 'Index' }) => (
    <section className={className}>
        <h2 className="section-header">{title}</h2>

        <Reveal as="ul" stagger className="list-none p-0 m-0 border-t border-neutral-100">
            {libraryIndex.map(({ key, label, to, count, unit, lead, meta }) => (
                <li key={key} className="border-b border-neutral-100">
                    {/* Stacks on small screens. Sharing one row there leaves the
                        lead line about eighty pixels wide, which truncates the
                        scent away and defeats the point of showing it. */}
                    <Link
                        to={to}
                        className="group no-underline block sm:flex sm:items-baseline sm:gap-6 py-5 -mx-4 px-4 hover:bg-neutral-50 transition-colors"
                    >
                        <span className="flex items-baseline justify-between gap-3 sm:block sm:w-24 sm:flex-shrink-0">
                            <span className="font-bold text-sm text-neutral-900">{label}</span>
                            <span className="sm:hidden font-mono text-xs text-neutral-400 whitespace-nowrap">
                                {count} {unit}
                            </span>
                        </span>

                        <span className="block mt-1.5 sm:mt-0 sm:flex-1 sm:min-w-0">
                            <span className="block text-sm text-neutral-500 line-clamp-2 sm:truncate">
                                {lead}
                            </span>
                            {meta && (
                                <span className="block mt-1 font-mono text-[10px] text-neutral-300">
                                    {meta}
                                </span>
                            )}
                        </span>

                        <span className="hidden sm:block flex-shrink-0 font-mono text-xs text-neutral-400 whitespace-nowrap">
                            {count} {unit}
                        </span>

                        <span
                            aria-hidden="true"
                            className="hidden sm:block flex-shrink-0 text-neutral-300 transition-all group-hover:text-neutral-900 group-hover:translate-x-0.5"
                        >
                            →
                        </span>
                    </Link>
                </li>
            ))}
        </Reveal>
    </section>
);

export default SiteIndex;
