"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "next/link";
import ClientCSSLoader from "./ClientCSSLoader";

const NavBar = () => {
  return (
    <>
      <ClientCSSLoader />
      <Navbar fixed="top" className="custom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/">
                <HomeIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link as={Link} href="/books">
                Books
              </Nav.Link>
              <Nav.Link as={Link} href="/posts">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} href="/ideas">
                Ideas
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="https://github.com/mustafa-khann" target="_blank">
                <GitHubIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link href="https://x.com/mustafa_kh4n" target="_blank">
                <TwitterIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link
                href="https://www.linkedin.com/in/mustafa-kh4n/"
                target="_blank"
              >
                <LinkedInIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link
                href="https://www.instagram.com/mstfa.khan/"
                target="_blank"
              >
                <InstagramIcon style={{ fontSize: 20 }} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar; 