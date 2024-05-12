import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getConvensions } from "actions/convensions.action";
import { useDispatch } from "react-redux";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  CardBody,
} from "reactstrap";

function AdminConvensionForm({ convensionId, setShowForm }) {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminReducer);
  const adminConvensions = useSelector((state) => state.convensionsReducer);
  //   const adminProjets = useSelector((state) => state.articlesReducer);

  const [formData, setFormData] = useState({
    year: "",
    origin: "",
    partner: "",
    category: "",
    type: "",
    summary: "",
    financialImpact: "",
    environmentalImpact: "",
    creationDate: "",
    file: "",
    type_:""
  });

  const handleCancel = () => {
    setFormData({
      year: "",
      origin: "",
      partner: "",
      category: "",
      type: "",
      summary: "",
      financialImpact: "",
      environmentalImpact: "",
      creationDate: "",
      file: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fichierPDF") {
      const file = files[0];
      const maxSize = 1024 * 1024; // 1 Mo en octets
      if (file && file.size > maxSize) {
        alert("La taille du fichier ne doit pas dépasser 1 Mo.");
        e.target.value = null;
        return;
      }
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("Le fichier doit être au format PDF.");
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (convensionId) {
      const convensionToEdit = adminConvensions.find(
        (convension) => convension._id === convensionId
      );
      if (convensionToEdit) {
        setFormData({ ...convensionToEdit });
      }
    }
  }, [convensionId, adminConvensions]);

  useEffect(() => {
    if (adminConvensions.length === 0) {
      dispatch(getConvensions(adminData.email));
    }
  }, [adminConvensions, dispatch, adminData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (convensionId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/admin/update/event/${convensionId}`,
          {
          
            year: formData.year,
            origin: formData.origin,
            partner: formData.partner,
            category: formData.category,
            type_: formData.type,
            summary: formData.summary,
            financialImpact: formData.financialImpact,
            environmentalImpact: formData.environmentalImpact,
            creationDate: formData.creationDate,
            file: formData.file,
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/admin/convension`,
          {
            type: "convension",
            // user: userData._id,
            user_email: adminData.email,
            // user_id: userData._id,
            year: formData.year,
            origin: formData.origin,
            partner: formData.partner,
            category: formData.category,
            type_: formData.type,
            summary: formData.summary,
            financialImpact: formData.financialImpact,
            environmentalImpact: formData.environmentalImpact,
            creationDate: formData.creationDate,
            file: formData.file,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getConvensions(adminData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour du projet :",
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
              <h1 className="heading-small text-muted mb-4">Convension</h1>
              <div className="pl-lg-4">
                {/* <FormGroup>
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
                </FormGroup> */}
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
                  <Label className="form-control-label" htmlFor="origin">
                    Origine <span className="required"> *</span>:
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          id="origin"
                          className="form-control-alternative"
                          name="origin"
                          value="national"
                          checked={formData.origin === "national"}
                          onChange={handleChange}
                          required
                        />{" "}
                        National <span className="required">*</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check className="form-control-label">
                        <Input
                          type="radio"
                          id="origin"
                          className="form-control-alternative"
                          name="origin"
                          value="international"
                          checked={formData.authorType === "international"}
                          onChange={handleChange}
                          required
                        />{" "}
                        International<span className="required"> *</span>
                      </Label>
                    </FormGroup>
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="partner">
                    Partenaire <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="textarea"
                    id="partner"
                    className="form-control-alternative"
                    name="partner"
                    placeholder="partenaire"
                    value={formData.partner}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="type">
                    Type <span className="required">*</span> :
                  </Label>
                  <Input
                    type="text"
                    id="type"
                    className="form-control-alternative"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Type"
                    min="0"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="summary">
                    Résumé<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="textarea"
                    id="summary"
                    className="form-control-alternative"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Résumé"
                    min="0"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="financialImpact"
                  >
                    Impact financier :
                  </Label>
                  <Input
                    type="text"
                    id="financialImpact"
                    className="form-control-alternative"
                    name="financialImpact"
                    placeholder="Impact financier"
                    value={formData.financialImpact}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="environmentalImpact"
                  >
                    Impact en nature :
                  </Label>
                  <Input
                    type="text"
                    id="environmentalImpact"
                    className="form-control-alternative"
                    name="environmentalImpact"
                    placeholder="Impact en nature"
                    value={formData.environmentalImpact}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="form-control-label" htmlFor="creationDate">
                    Date de création <span className="required"> *</span> :
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="creationDate"
                    name="creationDate"
                    type="date"
                    value={
                      formData.creationDate
                        ? formData.creationDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="file">
                    Fichier (PDF, taille maximale 1 Mo){" "}
                    <span className="required"> *</span> :<br />
                    <br />
                    <Input
                      type="file"
                      id="file"
                      className="form-control-alternative"
                      name="file"
                      accept="application/pdf"
                      onChange={handleChange}
                      required
                    />
                  </Label>
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

export default AdminConvensionForm;
