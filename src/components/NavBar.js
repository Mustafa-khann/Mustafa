import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import { Link, useLocation } from "react-router-dom";
import { navigationLinks, socialLinks, isActivePath } from "../config/routes";
import "../styles/NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const getIconComponent = (iconName) => {
    const icons = {
      HomeIcon,
      GitHubIcon,
      TwitterIcon,
      LinkedInIcon,
      InstagramIcon
    };
    return icons[iconName] || null;
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          Mustafa Khan
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navigationLinks.map((link, index) => {
              const IconComponent = getIconComponent(link.icon);
              const isActive = isActivePath(location.pathname, link.path);
              
              return (
                <Nav.Link 
                  key={index}
                  as={Link} 
                  to={link.path}
                  className={isActive ? 'active' : ''}
                  onClick={handleNavLinkClick}
                  aria-label={link.label}
                >
                  {IconComponent && <IconComponent style={{ fontSize: 20 }} />}
                  {!IconComponent && link.label}
                </Nav.Link>
              );
            })}
          </Nav>
          <Nav className="ml-auto">
            {socialLinks.map((social, index) => {
              const IconComponent = getIconComponent(social.icon);
              
              return (
                <Nav.Link 
                  key={index}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label || social.icon}
                  title={social.label || social.icon}
                >
                  <IconComponent style={{ fontSize: 20 }} />
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
