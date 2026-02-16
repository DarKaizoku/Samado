import Carousel from 'react-bootstrap/Carousel';
import leCamion from "@/assets/images/PolkaPolka_SAMADO.jpeg"
import leVan from "@/assets/images/van_SAMADO.jpeg"
import backTruck from "@/assets/images/backTruck_SAMADO.jpeg"
export default function CarouselVehicules() {
    return (
        <Carousel >
            <Carousel.Item>
                <img
                    className="img-fluid"
                    src={leCamion}
                    alt="Camion"
                />
                <Carousel.Caption>
                    <h5>Notre camion</h5>
                    <p>Lui, comme nous, donnera toujours le meilleur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="img-fluid"
                    src={leVan}
                    alt="Van"
                />
                <Carousel.Caption>
                    <h5>Notre van</h5>
                    <p>Plus petit, mais tout aussi pratique.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="img-fluid"
                    src={backTruck}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h5>Tout cette place pour vous !</h5>
                    <p>
                        Zone arrière du fourgon.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
