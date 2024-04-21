import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function NavBarElem() {
  const nav = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-between" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand onClick={(e) => {e.preventDefault(); nav('/home');}} href="home">APOD React </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={(e) => {e.preventDefault(); nav('/home');}} href="home">Home</Nav.Link>
            <Nav.Link onClick={(e) => {e.preventDefault(); nav('/forms');}} href="forms">APODs</Nav.Link>
            <Nav.Link  href="https://github.com/Coolboy02/ReactSpecial-octo">Source Code</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarElem;