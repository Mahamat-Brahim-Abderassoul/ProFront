import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getBrevets } from "actions/brevets.action";
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

function UserBrevetForm({ brevetId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userBrevets = useSelector((state) => state.brevetsReducer);
  const [formData, setFormData] = useState({
    type: "brevet", // Correction ici, si c'est le type de document
    title: "",
    year: "",
    reference: "",
    file: "",
    creationDate: "",
    type_: "", // Assurez-vous que le nom du champ est cohérent
    user_email: userData.email,
    user_id: userData._id,
  });

  const handleCancel = () => {
    setFormData({
      type: "brevet",
      title: "",
      year: "",
      reference: "",
      file: "",
      creationDate: "",
      type_: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (!file.type.includes("pdf")) {
        e.target.value = null;
        alert("The file must be in PDF format.");
        return;
      }
      const maxSize = 1024 * 1024; // 1 Mo en octets
      if (file.size > maxSize) {
        e.target.value = null;
        alert("The file size must not exceed 1024 KB.");
        return;
      }
      // Mettre à jour l'état avec le fichier réel
      setFormData({
        ...formData,
        [name]: file, // Mettre à jour avec le fichier réel
      });
    } else {
      // Pour les autres champs, mettre à jour avec la valeur
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (brevetId) {
      const brevetToEdit = userBrevets.find(
        (brevet) => brevet._id === brevetId
      );
      if (brevetToEdit) {
        setFormData({ ...brevetToEdit });
      }
    }
  }, [brevetId, userBrevets]);

  useEffect(() => {
    if (userBrevets.length === 0) {
      dispatch(getBrevets(userData.email));
    }
  }, [userBrevets, dispatch, userData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    // Utilisez formData pour stocker les valeurs du formulaire
    const {
      type,
      title,
      year,
      reference,
      file,
      creationDate,
      type_,
      user_email,
      user_id,
    } = formData;

    // Créer un objet FormData
    const formDataToSubmit = new FormData();

    // Ajouter les données du formulaire
    formDataToSubmit.append("type", type); 
    formDataToSubmit.append("title", title);
    formDataToSubmit.append("year", year);
    formDataToSubmit.append("reference", reference);
    formDataToSubmit.append("creationDate", creationDate);
    formDataToSubmit.append("type_", type_); 
    formDataToSubmit.append("user_email", user_email);
    formDataToSubmit.append("user_id", user_id);

    // Ajouter le fichier
    if (file) {
      formDataToSubmit.append("file", file);
    }

    try {
      let response;
      if (brevetId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${brevetId}`,
          formDataToSubmit, // Utiliser formDataToSubmit pour l'upload de fichier
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/brevet`,
          formDataToSubmit, // Utiliser formDataToSubmit pour l'upload de fichier
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getBrevets(userData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour du brevet :",
        error
      );
    }
  };

  return (
    <>
    
      <Form onSubmit={handleSubmit} className="article-form" encType="multipart/form-data">
        <Row>
          <CardBody>
            <h1 className="heading-small text-muted mb-4">Brevet</h1>
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
                <Label htmlFor="year">
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
                <Label htmlFor="reference">
                  Référence <span className="required">*</span>:
                </Label>
                <Input
                  type="textarea"
                  name="reference"
                  id="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="file">
                  Fichier (PDF Taille maximale 1Mo){" "}
                  <span className="required">*</span>:
                </Label>
                {/* <a href={`${process.env.REACT_APP_API_URL}api/user/brevet/${brevetId}/file`} target="_blank">Voir le fichier PDF actuel</a> */}
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="creationDate">
                  Date de création <span className="required">*</span> :
                </Label>
                <Input
                  type="date"
                  name="creationDate"
                  id="creationDate"
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
                <Label htmlFor="type_">
                  Type <span className="required">*</span>:
                </Label>
                <Input
                  type="textarea"
                  name="type_"
                  id="type_"
                  value={formData.type_}
                  onChange={handleChange}
                  required
                ></Input>
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

export default UserBrevetForm;
