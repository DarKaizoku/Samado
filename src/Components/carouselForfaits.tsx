import { Button, Carousel } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";

import { listForfaits } from "../constants/listForfaits";



export default function CarouselForfaits() {
    return (
        <Carousel id="forfait" data-bs-theme="dark" indicators={false} interval={null} touch={true} className="carousel-forfaits">
            {listForfaits.map(forfait => (
                <Carousel.Item key={forfait.id}>
                    <Card style={{ width: '33rem', margin: '0 auto' }}>
                        <Card.Header>{forfait.icone}   {forfait.name} <span className="span-price">{forfait.prix} $</span></Card.Header>
                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                <span className="fw-bold span-parameter">🏠/🏢 Type d'habitation:</span> {forfait.typeHabitation.join(', ')}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">🚛 Véhicule:</span> {forfait.vehicule ? forfait.vehicule.name : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">👷 Nombre de déménageurs:</span> {forfait.nbDemenageurs || 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">⏱ Durée initiale:</span> {forfait.dureeInitiale ? `${forfait.dureeInitiale} heures` : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">🛣 Distance incluse:</span> {forfait.distanceIncluse ? `${forfait.distanceIncluse} km` : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">📦 Objets acceptés:</span> {forfait.objetAcceptes ? forfait.objetAcceptes.join(', ') : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">📦❌ Objets refusés:</span> {forfait.objetRefuses ? forfait.objetRefuses.join(', ') : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">✅ Prestations incluses:</span> {forfait.prestationsIncluses ? forfait.prestationsIncluses.map(prestation => prestation.name).join(', ') : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">+⏱💵 Prix par heure supplémentaire:</span> {forfait.prixTempsSupplementaire ? `${forfait.prixTempsSupplementaire} $/heure` : 'N/A'}
                            </Card.Text>
                            <Card.Text>
                                <span className="fw-bold span-parameter">+🛣💵 Prix par kilomètre supplémentaire:</span> {forfait.prixDistanceSupplementaire ? `${forfait.prixDistanceSupplementaire} $/km` : 'N/A'}
                            </Card.Text>

                        </Card.Body>
                        {/* <Card.Footer>
                            <Button variant="primary" >Déménager</Button>
                        </Card.Footer> */}
                    </Card>
                </Carousel.Item>
            ))
            }</Carousel>
    )
}