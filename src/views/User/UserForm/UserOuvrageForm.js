import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getOuvrages } from "actions/ouvrages.action";
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

function UserOuvrageForm({ ouvrageId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userOuvrages = useSelector((state) => state.ouvragesReducer);
  const [formData, setFormData] = useState({
    year: "",
    authorType: "",
    cin: "",
    order: "",
    title: "",
    publisher: "",
    linkPublisher: "",
    edition: "",
    isbnIssn: "",
    date: "",
  });

  const handleCancel = () => {
    setFormData({
      year: "",
      authorType: "",
      cin: "",
      order: "",
      title: "",
      publisher: "",
      linkPublisher: "",
      edition: "",
      isbnIssn: "",
      date: "",
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Charger les données du brevet à modifier dans le formulaire
    if (ouvrageId) {
      const ouvrageToEdit = userOuvrages.find(
        (ouvrage) => ouvrage._id === ouvrageId
      );
      if (ouvrageToEdit) {
        setFormData({ ...ouvrageToEdit });
      }
    }
  }, [ouvrageId, userOuvrages]);

  useEffect(() => {
    if (userOuvrages.length === 0) {
      dispatch(getOuvrages(userData.email));
    }
  }, [userOuvrages, dispatch, userData.email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (ouvrageId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${ouvrageId}`,
          {
            year: formData.year,
            authorType: formData.authorType,
            cin: formData.cin,
            order: formData.order,
            title: formData.title,
            publisher: formData.publisher,
            linkPublisher: formData.linkPublisher,
            edition: formData.edition,
            isbnIssn: formData.isbnIssn,
            date: formData.date,
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/scientificPublication`,
          {
            type: "ouvrage",
            // user: userData._id,
            user_email: userData.email,
            user_id: userData._id,
            year: formData.year,
            authorType: formData.authorType,
            cin: formData.cin,
            order: formData.order,
            title: formData.title,

            publisher: formData.publisher,
            linkPublisher: formData.linkPublisher,
            edition: formData.edition,
            isbnIssn: formData.isbnIssn,
            date: formData.date,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getOuvrages(userData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour de l'ouvrage :",
        error
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="article-form">
        <Row>
          <CardBody>
            <h1 className="heading-small text-muted mb-4">
              Ouvrage Scientifique
            </h1>
            <div className="pl-lg-4">
              <FormGroup>
                <Label htmlFor="title">
                  Titre <span className="required">*</span> :
                </Label>
                <Input
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
                <Label htmlFor="authorType">
                  Auteur <span className="required">*</span> :
                </Label>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="authorType"
                      value="interne"
                      id="authorType"
                      checked={formData.authorType === "interne"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Interne
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      id="authorType"
                      name="authorType"
                      value="externe"
                      checked={formData.authorType === "externe"}
                      onChange={handleChange}
                      required
                    />{" "}
                    Externe
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="cin">
                  CIN <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="cin"
                  id="cin"
                  placeholder="Cin"
                  value={formData.cin}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="order">
                  Ordre <span className="required">*</span> :
                </Label>
                <Input
                  type="number"
                  name="order"
                  id="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </FormGroup>
              <div className="form-group">
                <Button type="button" className="delete-btn">
                  Supprimer
                </Button>
                <Button type="button" className="add-btn">
                  + Ajouter un auteur
                </Button>
              </div>

              <FormGroup>
                <Label htmlFor="publisher">
                  Editeur <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="publisher" //editeur
                  id="publisher"
                  placeholder="Editeur"
                  value={formData.publisher}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="linkPublisher">Lien éditeur :</Label>
                <Input
                  type="text"
                  name="linkPublisher" //Lien Editeur
                  id="linkPublisher"
                  placeholder="Lien éditeur"
                  value={formData.linkPublisher}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="edition">
                  Edition <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  name="edition"
                  id="edition"
                  placeholder="Edition"
                  value={formData.edition}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="isbnIssn">ISBN/Issn :</Label>
                <Input
                  type="text"
                  name="isbnIssn"
                  id="isbnIssn"
                  placeholder="Isbn/Issn"
                  value={formData.isbnIssn}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">
                  Date <span className="required">*</span> :
                </Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date ? formData.date.split("T")[0] : ""}
                  onChange={handleChange}
                  required
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
      </Form>
    </>
  );
}

export default UserOuvrageForm;
