import React from 'react';
import { siteContent } from '../../data/siteContent';

const Header = () => {
    const { name, definition } = siteContent.header;

    return (
        <header className="pb-8 pt-8 md:pt-16 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-neutral-900">{name}</h1>
            <p className="text-neutral-500 font-medium mb-8">0x0.5x</p>
            {/* Using a visually distinct definition style as requested by the Brutalist Minimal profile */}
            <p className="text-lg md:text-xl leading-relaxed text-neutral-800 border-l-2 border-neutral-200 pl-4 py-1">
                {definition}
            </p>
        </header>
    );
};

export default Header;
