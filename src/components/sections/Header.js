import React from 'react';
import { siteContent } from '../../data/siteContent';

const Header = () => {
    const { name, definition } = siteContent.header;

    return (
        <header className="mb-24">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2 text-text-heading">{name}</h1>
            <p className="text-text-muted italic">{definition}</p>
        </header>
    );
};

export default Header;
