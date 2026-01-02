import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

    return (
        <footer className="mt-24 pt-8 border-t border-lab-border">
            <nav className="mt-16 pt-8 border-t border-lab-border" aria-label="Site navigation">
                <ul className="list-none p-0 flex gap-8">
                    <li><Link to="/posts" className="text-xs font-bold uppercase tracking-widest text-lab-muted hover:text-lab-text">Posts</Link></li>
                    <li><Link to="/ideas" className="text-xs font-bold uppercase tracking-widest text-lab-muted hover:text-lab-text">Ideas</Link></li>
                    <li><Link to="/books" className="text-xs font-bold uppercase tracking-widest text-lab-muted hover:text-lab-text">Books</Link></li>
                    <li><Link to="/projects" className="text-xs font-bold uppercase tracking-widest text-lab-muted hover:text-lab-text">Projects</Link></li>
                </ul>
            </nav>
            <p className="font-bold mb-2 mt-8 uppercase tracking-widest text-sm">{name}</p>
            <nav className="flex gap-8" aria-label="Contact and social links">
                <a href={`mailto:${email}`} className="text-sm text-lab-muted italic hover:text-lab-text">Email</a>
                <a href={github} target="_blank" rel="noopener noreferrer" className="text-sm text-lab-muted italic hover:text-lab-text">GitHub</a>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-lab-muted italic hover:text-lab-text">X</a>
            </nav>
        </footer>
    );
};

export default Footer;
