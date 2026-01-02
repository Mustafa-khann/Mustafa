import React from 'react';
import { siteContent } from '../../data/siteContent';

const Header = () => {
    const { name, definition } = siteContent.header;

    return (
        <header className="lab-header">
            <h1 className="lab-header-name">{name}</h1>
            <p className="lab-header-definition">{definition}</p>
        </header>
    );
};

export default Header;
