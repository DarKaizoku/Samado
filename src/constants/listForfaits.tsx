import { listObjets } from "./listObjets";
import { listPrestations } from "./listPrestations";
import { flotteVehicule } from "./listVehicules";

export const listForfaits = [
    {
        id: 1,
        name: "STANDARD",
        icone: "⭐",
        prix: 480.00,
        typeHabitation: ["3½", "4½"],
        vehicule: flotteVehicule[0], // Associe le camion au forfait STANDARD
        nbDemenageurs: 2,
        dureeInitiale: 4, // Durée initiale en heures
        distanceIncluse: 25, // Distance incluse en kilomètres
        objetAcceptes: listObjets.slice(0, 4).map(objet => objet.name), // Inclut les 4 premiers types d'objets acceptés
        objetRefuses: listObjets.slice(4).map(objet => objet.name), // Inclut les types d'objets refusés à partir du 5ème
        prestationsIncluses: listPrestations.slice(0, 3), // Inclut les prestations de chargement, transport et déchargement
        prixTempsSupplementaire: 120.00, // Prix par heure supplémentaire
        prixDistanceSupplementaire: 3.00 // Prix par kilomètre supplémentaire
    },
    {
        id: 2,
        name: "PREMIUM",
        icone: "🌟",
        prix: 850.00,
        typeHabitation: ["5½", "Maison", "Commercial"],
        vehicule: flotteVehicule[0], // Associe le camion au forfait PREMIUM
        nbDemenageurs: 3,
        dureeInitiale: 6, // Durée initiale en heures
        distanceIncluse: 40, // Distance incluse en kilomètres
        objetAcceptes: [...listObjets.slice(0, 4), listObjets[8]].map(objet => objet.name), // Inclut les 4 premiers types d'objets acceptés + les objets volumineux/lourds
        objetRefuses: listObjets.slice(4, 8).map(objet => objet.name), // Inclut les types d'objets refusés à partir du 5ème jusqu'au 8ème
        prestationsIncluses: listPrestations.slice(0, 4), // Inclut les prestations de chargement, transport, déchargement et emballage
        prixTempsSupplementaire: 150.00, // Prix par heure supplémentaire
        prixDistanceSupplementaire: 4.00 // Prix par kilomètre supplémentaire
    },
    {
        id: 3,
        name: "TRANQUILLE",
        icone: "🕶",
        prix: 680.00,
        typeHabitation: ["4½", "5½"],
        vehicule: flotteVehicule[0], // Associe le camion au forfait TRANQUILLE
        nbDemenageurs: 2 + "/" + 3, // 2 déménageurs pour les 4½ et 3 déménageurs pour les 5½
        dureeInitiale: 5, // Durée initiale en heures
        distanceIncluse: 30, // Distance incluse en kilomètres
        objetAcceptes: listObjets.slice(0, 4).map(objet => objet.name), // Inclut les 4 premiers types d'objets acceptés
        objetRefuses: listObjets.slice(4).map(objet => objet.name), // Inclut les types d'objets refusés à partir du 5ème
        prestationsIncluses: listPrestations.slice(0, 3), // Inclut les prestations de chargement, transport et déchargement
        prixTempsSupplementaire: 150.00, // Prix par heure supplémentaire
        prixDistanceSupplementaire: 3.00 // Prix par kilomètre supplémentaire
    },
    {
        id: 4,
        name: "ECO",
        icone: "💰",
        prix: 390.00,
        typeHabitation: ["Studio", "1½", "2½"],
        vehicule: flotteVehicule[1], // Associe le van au forfait ECO
        nbDemenageurs: 2,
        dureeInitiale: 3, // Durée initiale en heures
        distanceIncluse: 20, // Distance incluse en kilomètres
        objetAcceptes: listObjets.slice(0, 4).map(objet => objet.name), // Inclut les 3 premiers types d'objets acceptés
        objetRefuses: listObjets.slice(4).map(objet => objet.name), // Inclut les types d'objets refusés à partir du 4ème
        prestationsIncluses: listPrestations.slice(0, 3), // Inclut les prestations de chargement et transport
        prixTempsSupplementaire: 100.00, // Prix par heure supplémentaire
        prixDistanceSupplementaire: 2.00 // Prix par kilomètre supplémentaire
    }
];