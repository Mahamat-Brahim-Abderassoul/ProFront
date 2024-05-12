import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getTheses } from "actions/theses.action";
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

function UserTheseForm({ theseId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userTheses = useSelector((state) => state.thesesReducer);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    yearOfFirstRegistration: "",
    subject: "",
    cotutelle: "",
    supervisor: "",
    codeStructure: "",
    file: "",
  });

  const handleCancel = () => {
    setFormData({
      title: "",
      year: "",
      yearOfFirstRegistration: "",
      subject: "",
      cotutelle: "",
      supervisor: "",
      codeStructure: "",
      file: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("Le file doit être au format PDF.");
        return;
      }
      const maxSize = 1024 * 1024; // 1 Mo en octets
      if (file.size > maxSize) {
        e.target.value = null;
        alert("La taille du file ne doit pas dépasser 1 Mo.");
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
    if (theseId) {
      const theseToEdit = userTheses.find((these) => these._id === theseId);
      if (theseToEdit) {
        setFormData({ ...theseToEdit });
      }
    }
  }, [theseId, userTheses]);

  useEffect(() => {
    if (userTheses.length === 0) {
      dispatch(getTheses(userData.email));
    }
  }, [userTheses, dispatch, userData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (theseId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${theseId}`,
          {
            title: formData.title,
            year: formData.year,
            yearOfFirstRegistration: formData.yearOfFirstRegistration,
            subject: formData.subject,
            cotutelle: formData.cotutelle,
            supervisor: formData.supervisor,
            codeStructure: formData.codeStructure,
            file: formData.file,
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/thesis`,
          {
            type: "these",
            // user: userData._id,
            user_email: userData.email,
            user_id: userData._id,
            title: formData.title,
            year: formData.year,
            yearOfFirstRegistration: formData.yearOfFirstRegistration,
            subject: formData.subject,
            cotutelle: formData.cotutelle,
            supervisor: formData.supervisor,
            codeStructure: formData.codeStructure,
            file: formData.file,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getTheses(userData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour du thèse :",
        error
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="article-form">
        <Row>
          <CardBody>
            <h1 className="heading-small text-muted mb-4">Thèse</h1>
            <div className="pl-lg-4">
              <FormGroup>
                <Label for="title">
                  Titre <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <div className="title_error"></div>
              <FormGroup>
                <Label for="year">
                  Année <span className="required">*</span> :
                </Label>
                <Input
                  type="select"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner une année</option>
                  {Array.from(
                    { length: new Date().getFullYear() - 2000 + 1 },
                    (_, index) => 2000 + index
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                {/* /*anneePremiereInscription* */}
                <Label for="yearOfFirstRegistration">
                  Année de prémière inscription{" "}
                  <span className="required">*</span> :
                </Label>
                <Input
                  type="number"
                  name="yearOfFirstRegistration"
                  id="yearOfFirstRegistration"
                  value={formData.yearOfFirstRegistration}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="subject">
                  Sujet <span className="required">*</span> :
                </Label>
                <Input
                  type="textarea"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="supervisor">
                  Encadrant <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="supervisor"
                  id="supervisor"
                  placeholder="Encadrant"
                  value={formData.supervisor}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="codeStructure">
                  Structure code <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="codeStructure"
                  id="codeStructure"
                  placeholder="Structure code"
                  value={formData.codeStructure}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="file">
                  Memoirede Thèse soutenue (Fichier PDF qui contient la page de
                  garde ,taille maximale 1 Mo){" "}
                  <span className="required">*</span>:<br />
                  <br />
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleChange}
                  aria-label="Choose file"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-control-label" htmlFor="cotutelle">
                  Cotutelle <span className="required"> *</span>:
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        id="cotutelle"
                        className="form-control-alternative"
                        name="cotutelle"
                        value="cotutelle"
                        checked={formData.cotutelle === "cotutelle"}
                        onChange={handleChange}
                        required
                      />{" "}
                      Cotutelle <span className="required">*</span>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check className="form-control-label">
                      <Input
                        type="radio"
                        id="cotutelle"
                        className="form-control-alternative"
                        name="cotutelle"
                        value="no cotutelle"
                        checked={formData.cotutelle === "no cotutelle"}
                        onChange={handleChange}
                        required
                      />{" "}
                      Non cotutelle<span className="required"> *</span>
                    </Label>
                  </FormGroup>
                </Label>
              </FormGroup>
              <div className="text-center">
                <Button type="submit" className="mt-4">
                  Valider
                </Button>
                <Button type="button" className="mt-4" onClick={handleCancel}>
                  Annuler
                </Button>
              </div>
            </div>
          </CardBody>
        </Row>
      </Form>
    </>
  );
}

export default UserTheseForm;
