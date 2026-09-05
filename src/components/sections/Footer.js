import React from 'react';
import { siteContent } from '../../data/siteContent';
const Footer = () => (
  <footer className="site-footer">
    <div><span className="footer-signature">mk.</span><span>© {new Date().getFullYear()} Mustafa Khan</span></div>
    <nav aria-label="Contact links">
      <a href={`mailto:${siteContent.footer.email}`}>Email <span aria-hidden="true">↗</span></a>
      <a href={siteContent.footer.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      <a href={siteContent.footer.twitter} target="_blank" rel="noopener noreferrer">X <span aria-hidden="true">↗</span></a>
    </nav>
  </footer>
);
export default Footer;
