import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getHabilitations } from "actions/habilitations.action";
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

function UserHabilitationForm({ habilitationId, setShowForm}) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userHabilitations = useSelector((state) => state.habilitationsReducer);
  const [formData, setFormData] = useState({
    title: "",          
    titulaire: "",
    file: "",
    date: "",
  });
  
  const handleCancel = () => {
    setFormData({
      // type: "habilitation",
      title: "",
      titulaire: "",
      file: "",
      date:"",
    });
    setShowForm(false);
  };
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fichierPDF") {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024; // 2 Mo en octets
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
    if (habilitationId) {
      const habilitationToEdit = userHabilitations.find(
        (habilitation) => habilitation._id === habilitationId
      );
      if (habilitationToEdit) {
        setFormData({ ...habilitationToEdit });
      }
    }
  }, [habilitationId, userHabilitations]);

  useEffect(() => {
    if (userHabilitations.length === 0) {
      dispatch(getHabilitations(userData.email));
    }
  }, [userHabilitations, dispatch, userData.email]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (habilitationId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${habilitationId}`,
          {
            year: formData.year,
            title: formData.title,
            titulaire: formData.titulaire,
            file: formData.file, 
            date: formData.date,
          }
        );   
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/habilitation`,
          {
            type: "habilitation",
            // user: userData._id,
            user_email: userData.email,
            user_id: userData._id,
            title: formData.title,
            titulaire: formData.titulaire,
            year: formData.year,
            file: formData.file,
            date: formData.date,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getHabilitations(userData.email));
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
              <h1 className="heading-small text-muted mb-4">Habilitation</h1>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label htmlFor="year">
                    Année <span className="required">*</span>:
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
                <div className="title_error"></div>

                <FormGroup>
                  <label className="form-control-label" htmlFor="titulaire">
                    Nom et prénom titulaire habilitation
                    <span className="required"> *</span>
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    name="titulaire"
                    id="titulaire"
                    placeholder="Nom et prénom"
                    value={formData.titulaire}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="file">
                    Fichier PDF(version reduite: page de garde plus introduction
                    plus Tables des matières plus conclusion générale) (PDF,
                    taille maximale 2MO) <span className="required"> *</span> :{" "}
                    <br />
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
                <FormGroup>
                  <Label for="date">
                    Date <span className="required">*</span> :
                  </Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    value={
                      formData.date
                        ? formData.date.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <div className="text-center">
                  <Button type="submit" className="mt-4">
                    Valider
                  </Button>
                  <Button
                    type="button"
                    className="mt-4"
                    onClick={handleCancel}
                  >
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

export default UserHabilitationForm;
