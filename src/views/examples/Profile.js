import { React, useState, useEffect, memo, useContext } from "react";
import { useSelector } from "react-redux";
import { getUser } from "actions/user.actions";
import { useDispatch } from "react-redux";
// import { UidContext } from "components/AppContext/AppContext";
// import { useNavigate } from "react-router-dom";
// import { UidContext } from "components/AppContext/AppContext";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Label,
  Col,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import UploadImg from "views/User/Profile/UploadImg";
const Profile = (props) => {
  const dispatch = useDispatch();
  // const uid = useContext(UidContext)
 
  // Récupération des données utilisateur depuis Redux
  const userData = useSelector((state) => state.userReducer);
  const profileImage = useSelector((state) => state.userReducer.profileImage);
  // États pour le formulaire et l'édition du profil
  const [isModified, setIsModified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  // Met à jour le formulaire lorsque les données utilisateur changent
  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  // Gère le changement de valeur des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsModified(true);
    // dispatch(getUser(userData.email));
  };

  // Annule les changements et rétablit les données utilisateur
  const handleCancelChanges = () => {
    setFormData({ ...userData });
    setIsModified(false);
    setIsEditing(false);
  };


  // Soumet les changements du formulaire pour mise à jour du profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}api/user/update/${userData.email}`,
        formData
      );
      setIsModified(false);
      setIsEditing(false);
      dispatch(getUser(userData._id));
      alert("Mise à jour effectuée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  // Vérifie si le formulaire a été modifié
  useEffect(() => {
    setIsModified(JSON.stringify(formData) !== JSON.stringify(userData));
  }, [formData, userData]);


  // Rendu du composant
  return (
     
    <>
      <UserHeader
        // firstName={uid}
        firstName={userData?.firstName}
        lastName={userData?.lastName}
        aboutMe={userData?.aboutMe}
      />

      <Container className="mt--7" fluid>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="15">
          <Card className="card-profile shadow">
            <Row className="justify-content-right">
              <Col className="offset-lg-9" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={
                        profileImage
                          ? `http://localhost:5000/${profileImage}`
                          : require("../../assets/img/theme/team-4-800x800.jpg").default
                      }
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                {userData && !isEditing && (
                  <Button
                    className="mr-4"
                    color="info"
                    onClick={() => setIsEditing(true)}
                    size="sm"
                  >
                    modifier Profile
                  </Button>
                )}
              </div>
              <div className="text-right border-0 pt-8 pt-md-6 pb-0 pb-md-5">
                <UploadImg />
              </div>
            </CardHeader>
            <CardBody>
              {/* Formulaire d'édition du profil */}
              {isEditing ? (
                <Form role="form" onSubmit={handleSubmit}>
                  <h1 className="heading-big text-muted mb-4">
                    Infomation Personnelle de {userData.firstName}
                  </h1>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="firstName"
                          >
                            prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="prénom"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="lastName"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Nom"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="city">
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="city"
                            name="city"
                            placeholder="City"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="country"
                            id="country"
                            placeholder="Country"
                            type="text"
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="postalCode"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="postalCode"
                            name="postalCode"
                            placeholder="Postal code"
                            type="text"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="address"
                            name="address"
                            placeholder="Address"
                            type="text"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="pl-lg-4">
                    <FormGroup>
                      <label htmlFor="aboutMe">A propos</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        id="aboutMe"
                        name="aboutMe"
                        type="textarea"
                        value={formData.aboutMe}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </div>
                  <hr className="my-4" />
                  <h1 className="heading-big text-muted mb-4">
                    Information pour la fiche chercheur
                  </h1>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="firstNameLastNameStudent"
                          >
                            Nom et prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="firstNameLastNameStudent"
                            id="firstNameLastNameStudent"
                            defaultValue={`${formData.lastName} ${formData.firstName}`}
                            placeholder="Nom et prénom"
                            type="text"
                            // value={formData.firstNameLastNameStudent}
                            readOnly
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="cin">
                            N° CIN (tunisian)
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="cin"
                            id="cin"
                            placeholder="Cin"
                            type="text"
                            value={formData.cin}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="CNRPSregistration"
                          >
                            Matricule CNRPS
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="CNRPSregistration"
                            placeholder="CNRPS"
                            name="CNRPSregistration"
                            type="text"
                            value={formData.CNRPSregistration}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="passport"
                          >
                            N° Passport (étranger) :
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="passport"
                            name="passport"
                            placeholder="Passport"
                            type="text"
                            value={formData.passport}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="phone">
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="phone"
                            name="phone"
                            placeholder="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="email">
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Label className="form-control-label" htmlFor="sexe">
                      Sexe <span className="required"> *</span>:<br />
                    </Label>
                    <Row>
                      <Col lg="2">
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              id="sexe"
                              className="form-control-alternative"
                              name="sexe"
                              value="masculin"
                              checked={formData.sexe === "masculin"} // Vérifie si `sexe` est "male" et coche le bouton en conséquence
                              onChange={handleInputChange}
                              required
                            />{" "}
                            Masculin
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup check>
                          <Label check className="form-control-label">
                            <Input
                              type="radio"
                              id="sexe"
                              className="form-control-alternative"
                              name="sexe"
                              value="feminin"
                              checked={formData.sexe === "feminin"} // Vérifie si `sexe` est "femelle" et coche le bouton en conséquence
                              onChange={handleInputChange}
                              required
                            />{" "}
                            Féminin
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="dateOfBirth"
                          >
                            Date de naissance
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={
                              formData.dateOfBirth
                                ? formData.dateOfBirth.split("T")[0]
                                : ""
                            }
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="placeOfBirth"
                          >
                            Lieux de naissance
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="placeOfBirth"
                            name="placeOfBirth"
                            placeholder="Lieux de naissance"
                            type="text"
                            value={formData.placeOfBirth}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="etablissement"
                          >
                            Etablissement
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="etablissement"
                            id="etablissement"
                            placeholder="Etablissement"
                            type="text"
                            value={formData.etablissement}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="grade">
                            Grade
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="grade"
                            id="grade"
                            placeholder="Grade"
                            type="text"
                            value={formData.grade}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="dateGrade"
                          >
                            {/*Date de debut */}
                            Depuis le:
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="dateGrade"
                            id="dateGrade"
                            placeholder="Date de début"
                            type="date"
                            value={
                              formData.dateGrade
                                ? formData.dateGrade.split("T")[0]
                                : ""
                            }
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="LastDegreeObtained"
                          >
                            Dernier diplôme obtenu:
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="LastDegreeObtained"
                            id="LastDegreeObtained"
                            type="text"
                            value={formData.LastDegreeObtained}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="LastDegreeObtainedDate"
                          >
                            Date:
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="LastDegreeObtainedDate"
                            id="LastDegreeObtainedDate"
                            type="date"
                            value={
                              formData.LastDegreeObtainedDate
                                ? formData.LastDegreeObtainedDate.split("T")[0]
                                : ""
                            }
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h1 className="heading-big text-muted mb-4">
                    CASE RESEVEE AU DOCTORANT
                  </h1>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label htmlFor="title">
                        Intitulé du sujet de recherche
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="sujet de recherche"
                        rows="4"
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="taux">Taux d'avancement</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="taux"
                        rows="4"
                        id="taux"
                        name="taux"
                        type="Number"
                        value={formData.taux}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="yearOfFirstRegistration">
                        Année universitaire de la première inscription :
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="année"
                        id="yearOfFirstRegistration"
                        name="yearOfFirstRegistration"
                        type="Number"
                        value={formData.yearOfFirstRegistration}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="UniversityEstablishment">
                        Etablissement universitaire (où est effectuée
                        l'inscription) :
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Etablissement universitaire "
                        rows="4"
                        id="UniversityEstablishment"
                        name="UniversityEstablishment"
                        type="text"
                        value={formData.UniversityEstablishment}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="firstNameLastNameDirector">
                        Nom et prénom du directeur de thèse
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Nom et Prénom"
                        rows="4"
                        id="firstNameLastNameDirector"
                        name="firstNameLastNameDirector"
                        type="text"
                        value={formData.firstNameLastNameDirector}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </div>

                  <hr className="my-4" />

                  {/* Boutons de sauvegarde et d'annulation */}
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col className="text-right" xs="4">
                        {/* Bouton d'annulation des changements */}
                        {isEditing && (
                          <>
                            <Button
                              color="danger"
                              onClick={handleCancelChanges}
                              size="sm"
                            >
                              Cancel
                            </Button>{" "}
                          </>
                        )}
                        {/* Bouton de sauvegarde des changements */}
                        {isEditing && isModified && (
                          <Button color="success" type="submit" size="sm">
                            Save Changes
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </CardHeader>
                </Form>
              ) : (
                <>
                  {/* Affichage des informations utilisateur  */}
                  <CardBody>
                    <h3 className="card-title">Information Personnelle</h3>
                    <ListGroup flush>
                      <ListGroupItem>
                        <span className="font-weight-bold">prénom:</span>{" "}
                        {userData.firstName}
                      </ListGroupItem>
                      <ListGroupItem>
                        <span className="font-weight-bold">Nom:</span>{" "}
                        {userData.lastName}
                      </ListGroupItem>
                      <ListGroupItem>
                        <span className="font-weight-bold">Email:</span>{" "}
                        {userData.email}
                      </ListGroupItem>
                      <ListGroupItem>
                        <span className="font-weight-bold">Téléphone:</span>{" "}
                        {userData.phone}
                      </ListGroupItem>
                      <ListGroupItem>
                        <span className="font-weight-bold">Adresse:</span>{" "}
                        {userData.address}
                      </ListGroupItem>
                      <ListGroupItem>
                        <span className="font-weight-bold">
                          Date de naissance:
                        </span>{" "}
                        {formatDate(userData.dateOfBirth)}
                      </ListGroupItem>
                      <ListGroupItem>
                        <span className="font-weight-bold">A propos:</span>{" "}
                        {userData.aboutMe}
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default memo(Profile);
