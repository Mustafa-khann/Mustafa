import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

    return (
        <footer className="mt-24 pt-12 pb-16 border-t border-neutral-100 text-sm">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
                {/* Identity Block */}
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-neutral-900">{name}</span>
                    <span className="text-neutral-400">
                        Synthesis Labs © {new Date().getFullYear()}
                    </span>
                    <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                        <span className="status-dot"></span>
                        <span>System Online</span>
                    </div>
                </div>

                {/* Navigation Groups */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                    {/* Internal Links */}
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                            Index
                        </span>
                        <nav className="flex flex-col gap-3">
                            <Link
                                to="/posts"
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                Posts
                            </Link>
                            <Link
                                to="/ideas"
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                Ideas
                            </Link>
                            <Link
                                to="/projects"
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                Projects
                            </Link>
                            <Link
                                to="/books"
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                Books
                            </Link>
                        </nav>
                    </div>

                    {/* External Links */}
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                            Network
                        </span>
                        <nav className="flex flex-col gap-3">
                            <a
                                href={`mailto:${email}`}
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                Email
                            </a>
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                GitHub
                            </a>
                            <a
                                href={twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
                            >
                                X / Twitter
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
