import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';
import { libraryIndex } from '../../data/libraryIndex';

/**
 * Deliberately unanimated. Text that is simply present on first paint reads as
 * faster and more credible than text that arrives, and the first screen is
 * where that matters most.
 */
const Header = () => {
    const { name, definition } = siteContent.header;

    return (
        <header className="pb-10 pt-8 md:pt-20">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-neutral-900">
                {name}
            </h1>
            <p className="text-neutral-400 font-medium mb-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                <span className="font-mono text-xs tracking-wider">0x0.5x</span>
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neutral-700 border-l-2 border-neutral-200 pl-5 py-2 max-w-2xl">
                {definition}
            </p>

            {/* The way in, above the fold. The counts are the point: they show
                the site has depth before anyone has clicked anything. */}
            <nav className="mt-10 flex flex-wrap items-baseline gap-x-7 gap-y-3">
                {libraryIndex.map(({ key, label, to, count }) => (
                    <Link
                        key={key}
                        to={to}
                        className="group no-underline inline-flex items-baseline gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                        <span className="pb-0.5 border-b border-transparent group-hover:border-neutral-900 transition-colors">
                            {label}
                        </span>
                        <span className="font-mono text-[10px] text-neutral-300 group-hover:text-neutral-500 transition-colors">
                            {count}
                        </span>
                    </Link>
                ))}
            </nav>
        </header>
    );
};

export default Header;
