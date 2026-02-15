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
              <Nav.Link href="#about">À Propos</Nav.Link>
              <Nav.Link href="#forfaits">Nos Forfaits</Nav.Link>
              <Nav.Link href="#vehicules">Nos véhicules</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section id="about-section">
        <Container>
          <Row>
            <Col>
              <div id="about">
                <Image src={process.env.PUBLIC_URL + '/images/card_SAMADO.jpeg'} alt='Présentation Samado Services' thumbnail /><br /><br />
                {/* <h2><strong>
                  <span className="icon-wrapper" id='S_blue'>.</span>AMADO
                  <span className="no-break">
                    <span className="icon-wrapper" id='S_white'>.</span>ervices
                  </span>
                </strong></h2> */}
                <p>

                  Fondée avec la volonté d’offrir un service de déménagement fiable et professionnel dans le Grand Montréal, <span className="icon-wrapper" id='S_blue'>.</span>AMADO <span className="icon-wrapper" id='S_white'>.</span>ervices accompagne les particuliers et les entreprises dans toutes les étapes de leur relocalisation.<br /><br />

                  Notre mission est simple : rendre votre déménagement rapide, sécuritaire et sans stress.<br />
                  Grâce à une équipe expérimentée, des méthodes de travail efficaces et un équipement adapté, nous assurons la protection de vos meubles, électroménagers et équipements du départ jusqu’à l’arrivée.<br /><br />

                  Nous comprenons que chaque déménagement est unique. C’est pourquoi nous offrons un service personnalisé, adapté à vos besoins, à votre échéancier et à votre budget.
                </p>


                <h4><strong> Pourquoi choisir <span className="icon-wrapper" id='S_blue'>.</span>AMADO <span className="no-break"><span className="icon-wrapper" id='S_white'>.</span>ervices</span> ? </strong></h4>
                <ul>
                  <li>✔ Équipe professionnelle et ponctuelle</li>
                  <li>✔ Service résidentiel et commercial</li>
                  <li>✔ Transport sécurisé de vos biens</li>
                  <li>✔ Tarifs compétitifs et transparents</li>
                  <li>✔ Devis rapide et gratuite</li>
                  <li>✔ Service dans tout le Grand Montréal</li>
                </ul>
                <p>
                  Notre priorité est la satisfaction de nos clients.<br />
                  Nous travaillons avec rigueur, respect et efficacité pour vous offrir une expérience simple et sans tracas.<br /><br />

                  <strong><span className="icon-wrapper" id='S_blue'>.</span>AMADO <span className="icon-wrapper" id='S_white'>.</span>ervices – Votre partenaire de confiance dans le Grand Montréal.</strong></p>
              </div>
            </Col>
          </Row>
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
              <p><span className="icon-wrapper" id='facebookLogo'>.</span> <a href="https://www.facebook.com/profile.php?id=61550963159771" target="_blank" rel="noopener noreferrer">facebook.com/SamadoServices</a></p>
              <p><span className="icon-wrapper" id='emailLogo'>.</span> <a href="mailto:samado.services@gmail.com">samado.services@gmail.com</a></p>
            </p>
            <p id='contact-right'>  </p>
          </span>
        </Container>
      </section>
      <section id="home">
        <Container>
          <Image src={process.env.PUBLIC_URL + '/images/card_SAMADO.jpeg'} alt='Présentation Samado Services' thumbnail />
        </Container>
      </section>

      <footer>
        <p id='p-footer'>&copy; 2025 Samado Services & Co. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;