import { Carousel, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const flotteVehicule = [
    {
        id: 1,
        name: "Le Camion",
        description: "Lui, comme nous, donnera toujours le meilleur.",
        images: [process.env.PUBLIC_URL + "/images/PolkaPolka_SAMADO.jpeg", process.env.PUBLIC_URL + "/images/backTruck_SAMADO.jpeg"],
    },
    {
        id: 2,
        name: "Le Van",
        description: "Plus petit, mais tout aussi pratique.",
        images: [process.env.PUBLIC_URL + "/images/van_SAMADO.jpeg"],
    }
]

export default function CarouselVehiculesV2() {
    return (
        <Carousel data-bs-theme="dark" indicators={false} interval={null} controls={false}>
            {flotteVehicule.map(vehicule => (
                <Carousel.Item key={vehicule.id}>
                    <Row className="justify-content-center align-items-center">
                        <Col md={8}>
                            <h5 className="text-center mb-3">{vehicule.name}</h5>
                            <Carousel data-bs-theme="dark" indicators={false} interval={null} controls={true}>
                                {vehicule.images.map((src, i) => (
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100 h-200"
                                            src={src}
                                            alt={vehicule.name + (i + 1)}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <p className="text-center mt-3 text-muted">{vehicule.description}</p>
                        </Col>
                    </Row>
                </Carousel.Item>
            ))
            }</Carousel>
    )
}