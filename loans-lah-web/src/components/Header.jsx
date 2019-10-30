import React, {useContext} from 'react';
import {Navbar, Nav} from "react-bootstrap";
import UserContext from "../UserContext";

function Header() {
    const user = useContext(UserContext);

    let navItems = [];
    if (user.loggedIn) {
        navItems = [
            <Navbar.Toggle aria-controls="basic-navbar-nav" key="1" />,
            <Navbar.Collapse id="basic-navbar-nav" key="2">
                <Nav className="mr-auto">
                    <Nav.Link href="/loans/new">Apply Now!</Nav.Link>
                    <Nav.Link href="/loans">My Loans</Nav.Link>
                    <Nav.Link href="/applications">My Applications</Nav.Link>
                </Nav>
                <Navbar.Text>
                    <a className="btn btn-outline-warning" href="/logout">Log Out</a>
                </Navbar.Text>
            </Navbar.Collapse>
        ];
    }

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Navbar.Brand>Loans Lah!!!</Navbar.Brand>
            {navItems}
        </Navbar>
    )
}

export default Header;