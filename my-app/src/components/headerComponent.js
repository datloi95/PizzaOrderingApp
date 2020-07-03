import React from 'react';
// import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'

const NavBar = () => {
    return (
        <Navbar bg="black" variant="dark" sticky="top">
            <NavDropdown bg="black" title="Menu" id="collasible-nav-dropdown" style={{color: "#5299d3", textAlign: "center"}}>
                <NavDropdown.Item style={{ color: "#5299d3" }} href="/">Home</NavDropdown.Item>
                <NavDropdown.Item style={{ color: "#5299d3" }} href="/welcome">Admin</NavDropdown.Item>
                <NavDropdown.Item style={{ color: "#5299d3" }} href="/users">Users</NavDropdown.Item>
                <NavDropdown.Item style={{ color: "#5299d3" }} href="/lessons">Lessons</NavDropdown.Item>
                <NavDropdown.Item style={{ color: "#5299d3" }} href="/challenges">Challenges</NavDropdown.Item>
            </NavDropdown>    
        </Navbar>
    );
};

export default NavBar;