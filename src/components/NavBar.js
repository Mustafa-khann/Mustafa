import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import PinterestIcon from "@material-ui/icons/Pinterest";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import ResearchIcon from "@material-ui/icons/Description";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar fixed="top" className="custom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <HomeIcon style={{ fontSize: 20 }} />
              </Nav.Link>
              <Nav.Link as={Link} to="/books">
                Books
              </Nav.Link>
              <Nav.Link as={Link} to="/posts">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/ideas">
                Ideas
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              {/* <Nav.Link href="mailto:mustafakhann050@gmail.com">
                <EmailRoundedIcon style={{ fontSize: 20 }} />
              </Nav.Link> */}
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
              {/* <Nav.Link href="https://www.pinterest.com/mstfa_x/" target="_blank">
                <PinterestIcon style={{ fontSize: 20 }} />
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
