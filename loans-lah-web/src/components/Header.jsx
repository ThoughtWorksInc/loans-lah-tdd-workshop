import React from 'react';
import {Navbar, Button, Nav} from "react-bootstrap";

function Header() {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Navbar.Brand>Loans Lah!!!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#loans/new">Apply Now!</Nav.Link>
                    <Nav.Link href="#loans">My Loans</Nav.Link>
                    <Nav.Link href="#applications">My Applications</Nav.Link>
                </Nav>
                <Navbar.Text>
                    <a className="btn btn-outline-warning" href="#logout">Log Out</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;