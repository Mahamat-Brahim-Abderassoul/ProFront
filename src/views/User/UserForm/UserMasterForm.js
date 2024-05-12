import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getMasters } from "actions/masters.action";
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

function UserMasterForm({ masterId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userMasters = useSelector((state) => state.mastersReducer);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    firstNameLastName: "",
    yearOfFirstRegistration: "",
    file: null,
    subject: "",
    supervisor: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("Le fichier doit être au format PDF.");
        return;
      }
      const maxSize = 1024 * 1024; // 1 Mo en octets
      if (file.size > maxSize) {
        e.target.value = null;
        alert("La taille du fichier ne doit pas dépasser 1 Mo.");
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCancel = () => {
    setFormData({
      title: "",
      titulaire: "",
      file: "",
      date: "",
    });
    setShowForm(false);
  };

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (masterId) {
      const masterToEdit = userMasters.find((master) => master._id === masterId);
      if (masterToEdit) {
        setFormData({ ...masterToEdit });
      }
    }
  }, [masterId, userMasters]);

  useEffect(() => {
    if (userMasters.length === 0) {
      dispatch(getMasters(userData.email));
    }
  }, [userMasters, dispatch, userData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (masterId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${masterId}`,
          {
            title: formData.title,
            year: formData.year,
            firstNameLastName: formData.firstNameLastName,
            yearOfFirstRegistration: formData.yearOfFirstRegistration,
            file: formData.file,
            subject: formData.subject,
            supervisor: formData.supervisor,
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/master`,
          {
            type: "master",
            // user: userData._id,
            user_email: userData.email,
            title: formData.title,
            user_id: userData._id,
            year: formData.year,
            firstNameLastName: formData.firstNameLastName,
            yearOfFirstRegistration: formData.yearOfFirstRegistration,
            file: formData.file,
            subject: formData.subject,
            supervisor: formData.supervisor,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getMasters(userData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour de l'habilitation :",
        error
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="article-form">
        <Row>
          <CardBody>
            <h1 className="heading-small text-muted mb-4">Mastère</h1>
            <div className="pl-lg-4">
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
                <Label for="firstNameLastName">
                  Nome et prénom de l'étudiant :
                </Label>
                <Input
                  type="text"
                  name="firstNameLastName"
                  id="firstNameLastName"
                  placeholder="Nome et prénom"
                  value={formData.firstNameLastName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
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
                <Label for="file">
                  Memoire mastère (fichier PDF qui contient la page de garde et
                  la taille maximale 1 Mo ) <span className="required">*</span>:
                  <br />
                  <br />
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleChange}
                  required
                />
                {/* <span>No file chosen</span> */}
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

export default UserMasterForm;
