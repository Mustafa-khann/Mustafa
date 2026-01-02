import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

    return (
        <footer className="mt-16 border-t border-neutral-200">
            <div className="py-12 flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
                <div className="mb-8 md:mb-0">
                    <p className="font-bold text-neutral-900 mb-1">{name}</p>
                    <p className="text-neutral-400 font-normal">© {new Date().getFullYear()} Synthesis Labs.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                    <nav aria-label="Internal Links">
                        <ul className="flex space-x-6 list-none p-0">
                            <li><Link to="/posts" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200 underline decoration-neutral-300 underline-offset-4">Posts</Link></li>
                            <li><Link to="/ideas" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200 underline decoration-neutral-300 underline-offset-4">Ideas</Link></li>
                            <li><Link to="/projects" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200 underline decoration-neutral-300 underline-offset-4">Projects</Link></li>
                        </ul>
                    </nav>

                    <nav aria-label="Social Links">
                        <ul className="flex space-x-6 list-none p-0">
                            <li><a href={`mailto:${email}`} className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200">Email</a></li>
                            <li><a href={github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200">GitHub</a></li>
                            <li><a href={twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200">X</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
