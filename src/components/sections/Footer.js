import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

    return (
        <footer className="mt-24 pt-8 border-t border-border-standard">
            <nav className="mt-12 pt-8" aria-label="Site navigation">
                <ul className="list-none p-0 flex gap-8 flex-wrap">
                    <li><Link to="/posts" className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-heading no-underline transition-colors">Posts</Link></li>
                    <li><Link to="/ideas" className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-heading no-underline transition-colors">Ideas</Link></li>
                    <li><Link to="/books" className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-heading no-underline transition-colors">Books</Link></li>
                    <li><Link to="/projects" className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-heading no-underline transition-colors">Projects</Link></li>
                </ul>
            </nav>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mt-12 gap-8">
                <p className="font-bold uppercase tracking-widest text-sm text-text-heading">{name}</p>
                <nav className="flex gap-8" aria-label="Contact and social links">
                    <a href={`mailto:${email}`} className="text-sm text-text-muted italic hover:text-text-heading no-underline">Email</a>
                    <a href={github} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted italic hover:text-text-heading no-underline">GitHub</a>
                    <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-text-muted italic hover:text-text-heading no-underline">X</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
