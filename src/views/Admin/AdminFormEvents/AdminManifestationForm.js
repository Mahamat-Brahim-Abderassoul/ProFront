import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getManifestations } from "actions/manifestations.action";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CardBody,
} from "reactstrap";

function AdminManifestationForm({ manifestationId, setShowForm }) {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminReducer);
  const adminManifestations = useSelector(
    (state) => state.manifestationsReducer
  );
  //   const adminProjets = useSelector((state) => state.articlesReducer);

  const [formData, setFormData] = useState({
    year: "",
    title: "",
    organizer: "",
    dateOfOrganization: "",
    location: "",
    type: "",
    website: "",
    type_:""


  });

  const handleCancel = () => {
    setFormData({
      year: "",
      title: "",
      organizer: "",
      dateOfOrganization: "",
      location: "",
      type: "",
      website: ""
    });
    setShowForm(false);
  };

  //   const handleChange = (e) => {
  //     const { name, value, files } = e.target;
  //     if (name === "fichierPDF") {
  //       const file = files[0];
  //       const maxSize = 1024 * 1024; // 1 Mo en octets
  //       if (file && file.size > maxSize) {
  //         alert("La taille du fichier ne doit pas dépasser 1 Mo.");
  //         e.target.value = null;
  //         return;
  //       }
  //       if (!file.type.includes("pdf")) {
  //         e.target.value = null;
  //         alert("Le fichier doit être au format PDF.");
  //         return;
  //       }
  //     }
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (manifestationId) {
      const manifestationToEdit = adminManifestations.find(
        (manifestation) => manifestation._id === manifestationId
      );
      if (manifestationToEdit) {
        setFormData({ ...manifestationToEdit });
      }
    }
  }, [manifestationId, adminManifestations]);

  useEffect(() => {
    if (adminManifestations.length === 0) {
      dispatch(getManifestations(adminData.email));
    }
  }, [adminManifestations, dispatch, adminData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (manifestationId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/admin/update/event/${manifestationId}`,
          {
            year: formData.year,
            title: formData.title,
            organizer: formData.organizer,
            dateOfOrganization: formData.dateOfOrganization,
            location: formData.location,
            type: formData.type,
            website: formData.website,

          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/admin/projet`,
          {
            type: "projet",
            // user: userData._id,
            user_email: adminData.email,
            // user_id: userData._id,
            year: formData.year,
            title: formData.title,
            organizer: formData.organizer,
            dateOfOrganization: formData.dateOfOrganization,
            location: formData.location,
            type_: formData.type,
            website: formData.website,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getManifestations(adminData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour du manifestation :",
        error
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="article-form">
        <div className="pl-lg-4">
          <Row>
            <CardBody>
              <h1 className="heading-small text-muted mb-4">Manifestation</h1>
              <div className="pl-lg-4">
                <div className="title_error"></div>
                <FormGroup>
                  <label className="form-control-label" htmlFor="year">
                    Année
                    <span className="required"> *</span>
                  </label>
                  <Input
                    type="select"
                    name="year"
                    id="year"
                    className="form-control-alternative"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selectionner une année</option>
                    {Array.from(
                      { length: 2026 - 2000 },
                      (_, index) => 2000 + index
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" htmlFor="title">
                    Titre
                    <span className="required"> *</span>
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titre"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="organizer">
                    Organisateurs <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="organizer"
                    className="form-control-alternative"
                    name="organizer"
                    placeholder="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label className="form-control-label" htmlFor="dateOfOrganization">
                    Date organisation <span className="required"> *</span> :
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="dateOfOrganization"
                    name="dateOfOrganization"
                    type="date"
                    value={
                      formData.dateOfOrganization
                        ? formData.dateOfOrganization.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </FormGroup>


                <FormGroup>
                  <Label className="form-control-label" htmlFor="location">
                    Lieu<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    className="form-control-alternative"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Lieu"
                    min="0"
                    required
                  />
                </FormGroup>

                <div className="pl-lg-4">
                    <Label className="form-control-label" htmlFor="type">
                      Type <span className="required"> *</span>:<br />
                    </Label>
                    <Row>
                      <Col lg="2">
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              id="type"
                              className="form-control-alternative"
                              name="type"
                              value="masculin"
                              checked={formData.type === "masculin"} // Vérifie si `sexe` est "male" et coche le bouton en conséquence
                              onChange={handleChange}
                              required
                            />{" "}
                            National <span className="required"> *</span> :
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col lg="2">
                        <FormGroup check>
                          <Label check className="form-control-label">
                            <Input
                              type="radio"
                              id="type"
                              className="form-control-alternative"
                              name="type"
                              value="feminin"
                              checked={formData.type === "feminin"} // Vérifie si `sexe` est "femelle" et coche le bouton en conséquence
                              onChange={handleChange}
                              required
                            />{" "}
                            International <span className="required"> *</span> :
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label className="form-control-label" htmlFor="website">
                    Site Web :
                  </Label>
                  <Input
                    type="text"
                    id="website"
                    className="form-control-alternative"
                    name="website"
                    placeholder="site Web"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="text-center">
                <Button type="submit" className="mt-4">
                  Valider
                </Button>
                <Button type="button" className="mt-4" onClick={handleCancel}>
                  Annuler
                </Button>
              </div>
            </CardBody>
          </Row>
        </div>
      </Form>
    </>
  );
}

export default AdminManifestationForm;
