import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Nav, Container, Row, Col, Image } from 'react-bootstrap';
//import CarouselVehicules from './Components/carouselVehicule';
import CarouselVehiculesV2 from './Components/carouselVehiculeV2';
import CarouselForfaits from './Components/carouselForfaits';
import { PageContext } from './contexts/page.context';


function App() {

  const { page } = useContext(PageContext);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg" sticky='top'>
        <Container>
          <Navbar.Brand href="#home"><span className="icon-wrapper" id='S_blue'>.</span>AMADO <span className="icon-wrapper" id='S_white'>.</span>ervices</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Accueil</Nav.Link>
              <Nav.Link href="#forfaits">Nos Forfaits</Nav.Link>
              <Nav.Link href="#vehicules">Nos véhicules</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
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
        <Container id='container-contact'>
          <h1>Contact</h1>
          <span>
            <p id='contact-left'>
              <p id='contact-samado-title'><span className="icon-wrapper" id='S_blue'>.</span>AMADO <span className="icon-wrapper" id='S_white'>.</span>ervices</p>
              <p><span className="icon-wrapper" id='whatsappLogo'>.</span> 438 833-9086</p>
              <p><span className="icon-wrapper" id='emailLogo'>.</span> <a href="mailto:samado.services@gmail.com">samado.services@gmail.com</a></p>
            </p>
            <p id='contact-right'>  </p>
          </span>
        </Container>
      </section>

      <footer>
        <p id='p-footer'>&copy; 2025 Samado Services & Co. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;