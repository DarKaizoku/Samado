import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { flotteVehicule } from "../constants/listVehicules"


export default function CarouselVehiculesV2() {
    return (
        <Carousel data-bs-theme="dark" indicators={false} interval={null}>
            {flotteVehicule.map(vehicule => (
                <Carousel.Item key={vehicule.id}>
                    <h5 className="text-center mb-3">{vehicule.name}</h5>
                    <img
                        className="d-block w-100 h-200"
                        src={vehicule.images}
                        alt={vehicule.name}
                    />
                    <p className="text-center mt-3 text-muted">{vehicule.description}</p>
                </Carousel.Item>
            ))
            }</Carousel>
    )
}