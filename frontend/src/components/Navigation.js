import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <h1 className="navbar-brand text-light">Payment System</h1>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">   
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/home">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                            Sign Up
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/signin">
                            Login
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Navigation;