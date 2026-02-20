import React from 'react';
import { siteContent } from '../../data/siteContent';

const Header = () => {
    const { name, definition } = siteContent.header;

    return (
        <header className="pb-12 pt-8 md:pt-20 mb-8 opacity-0 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-neutral-900">
                {name}
            </h1>
            <p className="text-neutral-400 font-medium mb-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse-subtle"></span>
                <span className="font-mono text-xs tracking-wider">0x0.5x</span>
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-neutral-700 border-l-2 border-neutral-200 pl-5 py-2 max-w-2xl">
                {definition}
            </p>
        </header>
    );
};

export default Header;
