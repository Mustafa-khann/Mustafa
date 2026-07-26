import React from 'react';
import { siteContent } from '../../data/siteContent';

/**
 * Identity and outbound links only. The internal index used to be duplicated
 * here, a hundred pixels below the Index section that now carries the same four
 * links with counts and lead lines — the same navigation twice in one screen
 * reads as unconsidered, and the richer one wins.
 */
const Footer = () => {
    const { name, email, github, twitter } = siteContent.footer;

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
