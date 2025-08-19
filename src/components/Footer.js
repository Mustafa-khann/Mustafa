import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { socialLinks } from '../config/routes';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const getIconComponent = (iconName) => {
    const icons = {
      GitHubIcon,
      TwitterIcon,
      LinkedInIcon,
      InstagramIcon
    };
    return icons[iconName] || null;
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Mustafa Khan</h3>
          <p className="footer-description">
            Full-stack developer passionate about creating innovative solutions and sharing knowledge through detailed project guides.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => {
              const IconComponent = getIconComponent(social.icon);
              
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label || social.icon}
                  title={social.label || social.icon}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <div className="footer-links">
            <a href="/" className="footer-link">Home</a>
            <a href="/projects" className="footer-link">Projects</a>
            <a href="/about" className="footer-link">About</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Mustafa Khan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 