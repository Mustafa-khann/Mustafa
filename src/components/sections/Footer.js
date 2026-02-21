import React from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../../data/siteContent';

const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

    const internalLinks = [
        { to: '/posts', label: 'Posts' },
        { to: '/ideas', label: 'Ideas' },
        { to: '/projects', label: 'Projects' },
        { to: '/books', label: 'Books' },
    ];

    const externalLinks = [
        { href: `mailto:${email}`, label: 'Email', arrow: false },
        { href: github, label: 'GitHub', arrow: true },
        { href: twitter, label: 'X / Twitter', arrow: true },
    ];

    return (
        <footer className="footer-root">
            {/* Divider */}
            <div className="footer-divider" />

            <div className="footer-grid">
                {/* Left — Identity */}
                <div className="footer-identity">
                    <span className="footer-name">{name}</span>
                    <span className="footer-lab">Synthesis Labs</span>
                    <p className="footer-tagline">
                        Independent R&D — software, hardware, autonomous systems.
                    </p>
                    <div className="footer-status">
                        <span className="footer-status-dot" />
                        <span>System Online</span>
                    </div>
                </div>

                {/* Center — Index */}
                <div className="footer-col">
                    <span className="footer-col-heading">Index</span>
                    <nav className="footer-col-nav">
                        {internalLinks.map(({ to, label }) => (
                            <Link key={to} to={to} className="footer-link">
                                <span className="footer-link-dash">—</span>
                                <span>{label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right — Network */}
                <div className="footer-col">
                    <span className="footer-col-heading">Network</span>
                    <nav className="footer-col-nav">
                        {externalLinks.map(({ href, label, arrow }) => (
                            <a
                                key={href}
                                href={href}
                                target={arrow ? '_blank' : undefined}
                                rel={arrow ? 'noopener noreferrer' : undefined}
                                className="footer-link"
                            >
                                <span className="footer-link-dash">—</span>
                                <span>{label}</span>
                                {arrow && <span className="footer-link-arrow">↗</span>}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <span className="footer-copyright">
                    © {new Date().getFullYear()} Synthesis Labs
                </span>
                <span className="footer-build">
                    Built from scratch — no templates.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
