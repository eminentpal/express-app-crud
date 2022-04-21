import React from 'react'
import {Nav , Navbar, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


function Home() {
 
    return (
        <>
     <Navbar className="bg" variant="dark">
      <Container>
            <LinkContainer to="/">
  <Navbar.Brand><h5>Gym Managment System</h5></Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
        <LinkContainer to="/home">
      <Nav.Link>Home</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/trainer">
      <Nav.Link>Trainer</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/member">
      <Nav.Link>Members</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/">
      <Nav.Link>Log out</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}

export default Home
