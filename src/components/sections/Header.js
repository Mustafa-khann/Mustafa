import React from 'react';
import { siteContent } from '../../data/siteContent';

const Header = () => {
    const { name, definition } = siteContent.header;

    return (
        <header className="mb-24">
            <h1 className="text-2xl font-bold mb-2">{name}</h1>
            <p className="text-lab-muted italic">{definition}</p>
        </header>
    );
};

export default Header;
