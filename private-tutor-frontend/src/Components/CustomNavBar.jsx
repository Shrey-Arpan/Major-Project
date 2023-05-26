import React, { Component } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import "./CustomNavBar.css";
// import { withRouter } from 'react-router-dom';

class CustomNavBar extends Component {
  render() {
    // const currentPath = this.props.location.pathname;
    // if (currentPath === '/tutorhome/:value' || currentPath === '/adminhome/:value' || currentPath == '/studentsection/:value') {
    //   return null;
    // }
    return (
      <Navbar className="navbar fixed-top bg-primary" expand="lg">
        <Navbar.Brand href="/">Private Tutor System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey={1} href="/">
              Home
            </Nav.Link>
            <Nav.Link eventKey={2} href="/about">
              About
            </Nav.Link>
            <Nav.Link eventKey={1} href="/search">
              Search
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default CustomNavBar;