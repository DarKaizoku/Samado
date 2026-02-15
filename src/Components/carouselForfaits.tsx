import { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.min.css";

import { listForfaits } from "../constants/listForfaits";

const defaultEmailContent = `Bonjour, \nNous avons besoin de vos services, quelles sont les informations nécessaires pour un devis complet ? \n\nMerci`;

export default function CarouselForfaits() {

    const [forfait, setForfait] = useState('');

    function sendDemande(forfait: any) {

        const forfaitSelected = {
            forfait: forfait.name,
            prix: forfait.prix,
            typeHabitation: forfait.typeHabitation.join(', '),
            vehicule: forfait.vehicule ? forfait.vehicule.name : 'N/A',
            nbDemenageurs: forfait.nbDemenageurs || 'N/A',
            dureeInitiale: forfait.dureeInitiale ? `${forfait.dureeInitiale} heures` : 'N/A',
            distanceIncluse: forfait.distanceIncluse ? `${forfait.distanceIncluse} km` : 'N/A',
            objetAcceptes: forfait.objetAcceptes ? forfait.objetAcceptes.join(', ') : 'N/A',
            objetRefuses: forfait.objetRefuses ? forfait.objetRefuses.join(', ') : 'N/A',
            prestationsIncluses: forfait.prestationsIncluses ? forfait.prestationsIncluses.map((prestation: any) => prestation.name).join(', ') : 'N/A',
        }
        // Convertit l'objet forfaitSelected en une chaîne de caractères formatée pour l'URL
        /* const forfaitString = JSON.stringify(forfaitSelected).replaceAll('"', '').replaceAll(',', '\n').replaceAll('{', '').replaceAll('}', '') */

        // Formatage lisible du forfait sélectionné
        const forfaitString = Object.entries(forfaitSelected)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        setForfait(forfaitString);


        const params = {
            name: "",
            email: "",
            message: defaultEmailContent + "\n\n" + `Détails du forfait sélectionné:\n${forfaitString ?? 'Aucun forfait sélectionné'}`,
        };

        window.open(`https://samado-services.getform.com/rmx77?${new URLSearchParams(params).toString()}`, "_blank", "popup,left=100,top=100,width=640,height=960");
    }


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
                        <Card.Footer>
                            <Button variant="primary" onClick={() => sendDemande(forfait)}>Déménager</Button>
                        </Card.Footer>
                    </Card>
                </Carousel.Item>
            ))
            }</Carousel>
    )
}