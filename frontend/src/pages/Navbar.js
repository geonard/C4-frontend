import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Navbar.css';


const NavBar = () => {

    return (
        <header>
            <Navbar className="navbar-custom" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Nav.Link> Accueil</Nav.Link>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            {/* All Products */}
                            <LinkContainer to="/boutique">
                                <Nav.Link >Boutique</Nav.Link>
                            </LinkContainer>
                        </Nav>


                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar
