import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

    return (
        <footer className="lab-footer">
            <nav className="lab-nav" aria-label="Site navigation">
                <ul className="lab-nav-list">
                    <li><Link to="/posts" className="lab-nav-link">Posts</Link></li>
                    <li><Link to="/ideas" className="lab-nav-link">Ideas</Link></li>
                    <li><Link to="/books" className="lab-nav-link">Books</Link></li>
                    <li><Link to="/projects" className="lab-nav-link">Projects</Link></li>
                </ul>
            </nav>
            <p className="lab-footer-name">{name}</p>
            <nav className="lab-footer-links" aria-label="Contact and social links">
                <a href={`mailto:${email}`} className="lab-footer-link">Email</a>
                <a href={github} target="_blank" rel="noopener noreferrer" className="lab-footer-link">GitHub</a>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="lab-footer-link">X</a>
            </nav>
        </footer>
    );
};

export default Footer;
