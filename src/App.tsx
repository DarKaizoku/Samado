import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap';
//import CarouselVehicules from './Components/carouselVehicule';
import CarouselVehiculesV2 from './Components/carouselVehiculeV2';
import CarouselForfaits from './Components/carouselForfaits';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" sticky='top'>
        <Container>
          <Navbar.Brand href="#home"><span className="icon-wrapper" id='S_blue'>.</span>AMADO <span className="icon-wrapper" id='S_white'>.</span>ervices</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Accueil</Nav.Link>
              <Nav.Link href="#forfaits">Nos Forfaits<br /> bob</Nav.Link>
              <Nav.Link href="#vehicules">Nos véhicules</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link href="#about">À Propos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section id="home">
        <Container>
          <Image src={process.env.PUBLIC_URL + '/images/card_SAMADO.jpeg'} alt='Présentation Samado Services' thumbnail />
        </Container>
      </section>
      <section id="forfaits">
        <Container>
          <Row>
            <Col>
              <h1>Nos Forfaits</h1>
              <CarouselForfaits />
            </Col>
          </Row>
        </Container>
      </section>
      <section id="vehicules">
        <Container>
          <Row>
            <Col>
              <h1>Nos véhicules</h1>
              <CarouselVehiculesV2 />
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