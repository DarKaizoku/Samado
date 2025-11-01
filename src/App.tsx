import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Mon Site</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Accueil</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#about">À Propos</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="home">
        <Container>
          <Row>
            <Col>
              <h1>Bienvenue sur mon site</h1>
              <p>Ceci est la section d'accueil.</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section id="services">
        <Container>
          <Row>
            <Col>
              <h1>Services</h1>
              <p>Ceci est la section Services.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="contact">
        <Container>
          <Row>
            <Col>
              <h1>Contact</h1>
              <p>Ceci est la section Contact.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="about">
        <Container>
          <Row>
            <Col>
              <h1>À Propos</h1>
              <p>Ceci est la section À Propos.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <footer>
        <Container>
          <Row>
            <Col>
              <p>&copy; 2025 Samado & Co. Tous droits réservés.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;