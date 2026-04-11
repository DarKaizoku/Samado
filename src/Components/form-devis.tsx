
import { useState, useEffect } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";

import { listForfaits } from "../constants/listForfaits";
import { listObjets } from "../constants/listObjets";
import { listPrestations } from "../constants/listPrestations";

const SESSION_KEY = "samado_devis_session";
const LOCAL_KEY = "samado_devis_saved";

// Tous les types d'habitation uniques, agrégés depuis listForfaits
const allTypesHabitation = [...new Set(listForfaits.flatMap(f => f.typeHabitation))];

const schema = Yup.object({
    prenom: Yup.string().required("Prénom requis"),
    nom: Yup.string().required("Nom requis"),
    email: Yup.string().email("Email invalide").required("Email requis"),
    telephone: Yup.string().required("Téléphone requis"),
    dateSouhaitee: Yup.string().required("Date souhaitée requise"),
    typeHabitation: Yup.string().required("Type d'habitation requis"),
    adresseDepart: Yup.string().required("Adresse de départ requise"),
    adresseArrivee: Yup.string().required("Adresse d'arrivée requise"),
});

type FormValues = {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    forfaitId: number | "";
    dateSouhaitee: string;
    typeHabitation: string;
    adresseDepart: string;
    etagesDepart: number;
    ascenseurDepart: boolean;
    adresseArrivee: string;
    etagesArrivee: number;
    ascenseurArrivee: boolean;
    objets: string[];
    prestations: string[];
    message: string;
};

const initialValues: FormValues = {
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    forfaitId: "",
    dateSouhaitee: "",
    typeHabitation: "",
    adresseDepart: "",
    etagesDepart: 0,
    ascenseurDepart: false,
    adresseArrivee: "",
    etagesArrivee: 0,
    ascenseurArrivee: false,
    objets: [],
    prestations: ["Chargement", "Transport", "Déchargement"], // prestations par défaut pour les devis personnalisés
    message: "",
};

export default function FormDevis({ forfaitInitialId }: { forfaitInitialId?: number }) {

    const [values, setValues] = useState<FormValues>(() => {
        // Auto-restore depuis sessionStorage (safe : session uniquement)
        const session = sessionStorage.getItem(SESSION_KEY);
        if (session) {
            try { return { ...initialValues, ...JSON.parse(session), forfaitId: forfaitInitialId ?? JSON.parse(session).forfaitId ?? "" }; }
            catch { /* ignore parse error */ }
        }
        return { ...initialValues, forfaitId: forfaitInitialId ?? "" };
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [localSaveMsg, setLocalSaveMsg] = useState<string | null>(null);
    const [showRestoreBanner, setShowRestoreBanner] = useState(() => !!localStorage.getItem(LOCAL_KEY));

    // Auto-save sessionStorage à chaque changement
    useEffect(() => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(values));
    }, [values]);

    function handleSaveLocal() {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(values));
        setLocalSaveMsg("✅ Formulaire sauvegardé sur cet appareil.");
        setTimeout(() => setLocalSaveMsg(null), 3000);
    }

    function handleRestoreLocal() {
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) {
            try { setValues({ ...initialValues, ...JSON.parse(saved) }); }
            catch { /* ignore */ }
        }
        setShowRestoreBanner(false);
    }

    function handleClearLocal() {
        localStorage.removeItem(LOCAL_KEY);
        setShowRestoreBanner(false);
        setLocalSaveMsg("🗑 Sauvegarde effacée.");
        setTimeout(() => setLocalSaveMsg(null), 3000);
    }

    const forfaitSelectionne = listForfaits.find(f => f.id === Number(values.forfaitId)) ?? null;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const { name, value, type } = e.target;
        const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        const newValues = { ...values, [name]: newValue };
        setValues(newValues as FormValues);

        // Effacer l'erreur du champ dès qu'il devient valide
        if (errors[name]) {
            schema.validateAt(name, newValues)
                .then(() => setErrors(prev => { const next = { ...prev }; delete next[name]; return next; }))
                .catch(() => { /* champ encore invalide, on garde l'erreur */ });
        }
    }

    function handleCancel() {
        setValues({ ...initialValues, forfaitId: forfaitInitialId ?? "", objets: [], ascenseurDepart: false, ascenseurArrivee: false });
        setErrors({});
        sessionStorage.removeItem(SESSION_KEY);
    }
    function handleMultiCheck(field: "objets" | "prestations", value: string, checked: boolean) {
        setValues(prev => ({
            ...prev,
            [field]: checked
                ? [...prev[field], value]
                : prev[field].filter(v => v !== value),
        }));
    }

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        try {
            await schema.validate(values, { abortEarly: false });
            setErrors({});
            submitForm();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errs: Record<string, string> = {};
                err.inner.forEach(e => { if (e.path) errs[e.path] = e.message; });
                setErrors(errs);
            }
        }
    }

    function submitForm() {
        const lignesForfait = forfaitSelectionne
            ? `Forfait: ${forfaitSelectionne.name} — ${forfaitSelectionne.prix} $`
            : "Forfait: Forfait Personnalisé";

        const details = [
            lignesForfait,
            `Type d'habitation: ${values.typeHabitation}`,
            `Date souhaitée: ${values.dateSouhaitee}`,
            `Adresse départ: ${values.adresseDepart} — ${values.etagesDepart} étage(s) — Ascenseur: ${values.ascenseurDepart ? "Oui" : "Non"}`,
            `Adresse arrivée: ${values.adresseArrivee} — ${values.etagesArrivee} étage(s) — Ascenseur: ${values.ascenseurArrivee ? "Oui" : "Non"}`,
            `Objets déclarés: ${values.objets.length > 0 ? values.objets.join(", ") : "Aucun"}`,
            `Prestations souhaitées: ${values.prestations.length > 0 ? values.prestations.join(", ") : "Aucune"}`,
        ].join("\n");

        const params = {
            name: `${values.prenom} ${values.nom}`,
            email: values.email,
            message: [
                `Email: ${values.email}`,
                `Téléphone: ${values.telephone}`,
                "",
                details,
                values.message ? `\nInformations complémentaires:\n${values.message}` : "",
                "\n⚠️ Rappel: tout objet non déclaré peut entraîner un supplément tarifaire et une augmentation de la durée du service.",
            ].join("\n"),
        };

        window.open(
            `https://samado-services.getform.com/rmx77?${new URLSearchParams(params).toString()}`,
            "_blank",
            "popup,left=100,top=100,width=640,height=960"
        );
        setSubmitted(true);
    }



    return (
        <div id="form-devis" className="mt-4 p-3 p-md-4 border rounded" style={{ backgroundColor: "#f8f9fa" }}>
            <Form onSubmit={handleSubmit} noValidate>

                {submitted && (
                    <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
                        Votre demande de devis a bien été envoyée ! Nous vous recontactons rapidement.
                    </Alert>
                )}

                {showRestoreBanner && (
                    <Alert variant="info" className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                        <span className="flex-grow-1">💾 Une sauvegarde locale est disponible. Voulez-vous restaurer votre progression ?</span>
                        <div className="d-flex gap-2">
                            <Button size="sm" variant="primary" onClick={handleRestoreLocal}>Restaurer</Button>
                            <Button size="sm" variant="outline-secondary" onClick={handleClearLocal}>Ignorer</Button>
                        </div>
                    </Alert>
                )}

                {localSaveMsg && <Alert variant="secondary" className="py-2">{localSaveMsg}</Alert>}

                {/* ── Section 1 : Coordonnées ── */}
                <h5 className="mb-3">👤 Vos coordonnées</h5>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} xs={12} md={6} controlId="prenom">
                        <Form.Label>Prénom *</Form.Label>
                        <Form.Control type="text" name="prenom" value={values.prenom} onChange={handleChange} isInvalid={!!errors.prenom} />
                        <Form.Control.Feedback type="invalid">{errors.prenom}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} controlId="nom">
                        <Form.Label>Nom *</Form.Label>
                        <Form.Control type="text" name="nom" value={values.nom} onChange={handleChange} isInvalid={!!errors.nom} />
                        <Form.Control.Feedback type="invalid">{errors.nom}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} xs={12} md={6} controlId="email">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="email" name="email" value={values.email} onChange={handleChange} isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} controlId="telephone">
                        <Form.Label>Téléphone *</Form.Label>
                        <Form.Control type="tel" name="telephone" value={values.telephone} onChange={handleChange} isInvalid={!!errors.telephone} />
                        <Form.Control.Feedback type="invalid">{errors.telephone}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <hr />

                {/* ── Section 2 : Déménagement ── */}
                <h5 className="mb-3">🚛 Votre déménagement</h5>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} xs={12} md={6} controlId="forfaitId">
                        <Form.Label>Forfait</Form.Label>
                        <Form.Select name="forfaitId" value={values.forfaitId} onChange={handleChange}>
                            <option value="">— Forfait Personnalisé —</option>
                            {listForfaits.map(f => (
                                <option key={f.id} value={f.id}>{f.icone} {f.name} — {f.prix} $</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} controlId="dateSouhaitee">
                        <Form.Label>Date souhaitée *</Form.Label>
                        <Form.Control type="date" name="dateSouhaitee" value={values.dateSouhaitee} onChange={handleChange} isInvalid={!!errors.dateSouhaitee} />
                        <Form.Control.Feedback type="invalid">{errors.dateSouhaitee}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="typeHabitation">
                    <Form.Label>Type d'habitation *</Form.Label>
                    <Form.Select name="typeHabitation" value={values.typeHabitation} onChange={handleChange} isInvalid={!!errors.typeHabitation}>
                        <option value="">— Sélectionner —</option>
                        {allTypesHabitation.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.typeHabitation}</Form.Control.Feedback>
                </Form.Group>

                <hr />

                {/* ── Section 3 : Adresse départ ── */}
                <h5 className="mb-3">🏠 Adresse de départ</h5>
                <Form.Group className="mb-3" controlId="adresseDepart">
                    <Form.Label>Adresse *</Form.Label>
                    <Form.Control type="text" name="adresseDepart" value={values.adresseDepart} onChange={handleChange} isInvalid={!!errors.adresseDepart} placeholder="Numéro, rue, ville..." />
                    <Form.Control.Feedback type="invalid">{errors.adresseDepart}</Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} xs={12} sm={6} controlId="etagesDepart">
                        <Form.Label>Nombre d'étages</Form.Label>
                        <Form.Control type="number" name="etagesDepart" value={values.etagesDepart} onChange={handleChange} min={0} />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={6} className="d-flex align-items-end pb-2" controlId="ascenseurDepart">
                        <Form.Check type="checkbox" name="ascenseurDepart" label="Ascenseur disponible" checked={values.ascenseurDepart} onChange={handleChange} />
                    </Form.Group>
                </Row>

                <hr />

                {/* ── Section 4 : Adresse arrivée ── */}
                <h5 className="mb-3">🏁 Adresse d'arrivée</h5>
                <Form.Group className="mb-3" controlId="adresseArrivee">
                    <Form.Label>Adresse *</Form.Label>
                    <Form.Control type="text" name="adresseArrivee" value={values.adresseArrivee} onChange={handleChange} isInvalid={!!errors.adresseArrivee} placeholder="Numéro, rue, ville..." />
                    <Form.Control.Feedback type="invalid">{errors.adresseArrivee}</Form.Control.Feedback>
                </Form.Group>
                <Row className="mb-3 g-3">
                    <Form.Group as={Col} xs={12} sm={6} controlId="etagesArrivee">
                        <Form.Label>Nombre d'étages</Form.Label>
                        <Form.Control type="number" name="etagesArrivee" value={values.etagesArrivee} onChange={handleChange} min={0} />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} sm={6} className="d-flex align-items-end pb-2" controlId="ascenseurArrivee">
                        <Form.Check type="checkbox" name="ascenseurArrivee" label="Ascenseur disponible" checked={values.ascenseurArrivee} onChange={handleChange} />
                    </Form.Group>
                </Row>

                <hr />

                {/* ── Section 5 : Objets ── */}
                <h5 className="mb-2">📦 Objets à transporter</h5>
                <Alert variant="warning" className="py-2 mb-3" style={{ fontSize: "0.85rem" }}>
                    ⚠️ Tout objet non déclaré peut entraîner un <strong>supplément tarifaire</strong> et une <strong>augmentation de la durée du service</strong>.
                </Alert>
                <Row className="mb-3">
                    {listObjets.map(objet => (
                        <Col xs={12} sm={6} key={objet.id}>
                            <Form.Check
                                type="checkbox"
                                id={`objet-${objet.id}`}
                                label={objet.name}
                                checked={values.objets.includes(objet.name)}
                                onChange={e => handleMultiCheck("objets", objet.name, e.target.checked)}
                            />
                        </Col>
                    ))}
                </Row>

                <hr />

                {/* ── Section 6 : Prestations ── */}
                <h5 className="mb-3">📝 Prestations souhaitées</h5>
                <Row className="mb-3">
                    {listPrestations.map(prestation => (
                        <Col xs={12} sm={6} key={prestation.id}>
                            <Form.Check
                                type="checkbox"
                                id={`prestation-${prestation.id}`}
                                label={prestation.name}
                                checked={values.prestations.includes(prestation.name)}
                                onChange={e => handleMultiCheck("prestations", prestation.name, e.target.checked)}
                            />
                        </Col>
                    ))}
                </Row>

                <hr />

                {/* ── Section 7 : Message ── */}
                <Form.Group className="mb-4" controlId="message">
                    <Form.Label>💬 Informations complémentaires</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="message"
                        rows={3}
                        value={values.message}
                        onChange={handleChange}
                        placeholder="Précisions, contraintes particulières, objets hors normes..."
                    />
                </Form.Group>

                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 mt-2 mb-3">
                    <Button variant="outline-secondary" type="button" onClick={handleSaveLocal}>
                        💾 Sauvegarder ma progression
                    </Button>
                    {localStorage.getItem(LOCAL_KEY) && (
                        <Button variant="outline-danger" size="sm" type="button" onClick={handleClearLocal}>
                            🗑 Effacer la sauvegarde
                        </Button>
                    )}
                    <small className="text-muted">Les données sont sauvegardées uniquement sur cet appareil.</small>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
                    <Button variant="primary" type="submit" className="w-100 w-sm-auto">
                        Envoyer ma demande de devis
                    </Button>
                    <Button variant="outline-secondary" type="button" className="w-100 w-sm-auto" onClick={handleCancel}>
                        Annuler
                    </Button>
                </div>

            </Form >
        </div >
    );
}
