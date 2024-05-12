import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getArticles } from "actions/articles.action";
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
import UserAuteurForm from "./UserAuteurForm";

function UserArticleForm({ articleId, setShowForm }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userArticles = useSelector((state) => state.articlesReducer);
  // const [showAddAuthorButton, setShowAddAuthorButton] = useState(true);
  // const [showForm1, setShowForm1] = useState(false);

  // const [showUserAuteurForm, setShowUserAuteurForm] = useState(false);

  const [showAddAuthorButton, setShowAddAuthorButton] = useState(true);
  const [showUserAuteurForm, setShowUserAuteurForm] = useState(false);


  const handleAddAuthorClick = () => {
    setShowUserAuteurForm(true);
    setShowAddAuthorButton(false);
  };

  const handleCancelAuteur = () => {
    setShowUserAuteurForm(false);
    setShowAddAuthorButton(true);
  };

  // const [showForm1, setShowForm1] = useState(false);

  // const handleAddAuthorClick = () => {
  //   setShowUserAuteurForm(true);
  //   setShowAddAuthorButton(false);
  // };

  // const handleCancelAuteur = () => {
  //   setShowUserAuteurForm(false);
  //   setShowAddAuthorButton(true);
  // };

  const handleDeleteClick = () => {
    // Logique pour supprimer l'auteur
  };

  const [formData, setFormData] = useState({
    year: "",
    title: "",
    linkDOI: "",
    file: "",
    publicationDate: "",
    authorType: "",
    cin: "",
    order: "",
    journalTitle: "",
    // listOfJounals: "",
    quartile: "",
    volume: "",
    factor: "",
    indexation: "",
    journalWebsite: "", // sitedelarevue: "",
  });

  const handleCancel = () => {
    setFormData({
      year: "",
      title: "",
      linkDOI: "",
      file: "",
      publicationDate: "",
      authorType: "",
      cin: "",
      order: "",
      journalTitle: "",
      // listOfJounals: "",
      quartile: "",
      volume: "",
      factor: "",
      indexation: "",
      journalWebsite: "", // sitedelarevue: "",
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
    if (articleId) {
      const articleToEdit = userArticles.find(
        (article) => article._id === articleId
      );
      if (articleToEdit) {
        setFormData({ ...articleToEdit });
      }
    }
  }, [articleId, userArticles]);

  useEffect(() => {
    if (userArticles.length === 0) {
      dispatch(getArticles(userData.email));
    }
  }, [userArticles, dispatch, userData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (articleId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/production/${articleId}`,
          {
            year: formData.year,
            title: formData.title,
            linkDOI: formData.linkDOI,
            file: formData.file,
            publicationDate: formData.publicationDate,
            authorType: formData.authorType,
            cin: formData.cin,
            order: formData.order,
            journalTitle: formData.journalTitle,
            // listOfJounals: formData.listOfJounals,
            quartile: formData.quartile,
            volume: formData.volume,
            factor: formData.factor,
            indexation: formData.indexation,
            journalWebsite: formData.journalWebsite,
          }
        );
      } else {
        // Sinon, c'est une création (POST)
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/article`,
          {
            type: "article",
            // user: userData._id,
            user_email: userData.email,
            user_id: userData._id,
            year: formData.year,
            title: formData.title,
            linkDOI: formData.linkDOI,
            file: formData.file,
            publicationDate: formData.publicationDate,
            authorType: formData.authorType,
            cin: formData.cin,
            order: formData.order,
            journalTitle: formData.journalTitle,
            // listOfJounals: formData.listOfJounals,
            quartile: formData.quartile,
            volume: formData.volume,
            factor: formData.factor,
            indexation: formData.indexation,
            journalWebsite: formData.journalWebsite,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getArticles(userData.email));
        // Masquer le formulaire après la soumission réussie
        setShowForm(false);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout ou de la mise à jour de l'article :",
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
              <h1 className="heading-small text-muted mb-4">
                Article scientifique
              </h1>
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
                  <Label className="form-control-label" htmlFor="linkDOI">
                    Lien DOI de l'article scientifique:
                  </Label>
                  <Input
                    type="text"
                    id="linkDOI"
                    placeholder="Lien DOI"
                    className="form-control-alternative"
                    name="linkDOI"
                    value={formData.linkDOI}
                    onChange={handleChange}
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

                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="publicationDate"
                  >
                    Date de publication
                    <span className="required"> *</span> :
                  </Label>
                  <Input
                    id="publicationDate"
                    type="date"
                    className="form-control-alternative"
                    name="publicationDate"
                    value={
                      formData.publicationDate
                        ? formData.publicationDate.split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <h3 className="partie">Auteur(s)</h3>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="authorType">
                    <h4>Auteur</h4>
                    Type d'auteur <span className="required"> *</span>:
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          id="authorType"
                          className="form-control-alternative"
                          name="authorType"
                          value="interne"
                          checked={formData.authorType === "interne"}
                          onChange={handleChange}
                          required
                        />{" "}
                        Interne <span className="required">*</span>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check className="form-control-label">
                        <Input
                          type="radio"
                          className="form-control-alternative"
                          name="authorType"
                          value="externe"
                          checked={formData.authorType === "externe"}
                          onChange={handleChange}
                          required
                        />{" "}
                        Externe<span className="required"> *</span>
                      </Label>
                    </FormGroup>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="cin">
                    CIN <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="cin"
                    className="form-control-alternative"
                    name="cin"
                    placeholder="Cin"
                    value={formData.cin}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="order">
                    Ordre<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="number"
                    id="order"
                    className="form-control-alternative"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    placeholder="Ordre"
                    min="0"
                    required
                  />
                </FormGroup>

                <div className="form-group">
                  {/* {showDeleteButton && (
                    <Button
                      type="button"
                      className="mt-4"
                      onClick={handleDeleteClick}
                    >
                      Supprimer
                    </Button>
                  )} */}
                  {/* {showAddAuthorButton && (
                    <Button
                      type="button"
                      className="mt-4"
                      onClick={handleAddAuthorClick}
                    >
                      + Ajouter un auteur
                    </Button>
                  )} */}

{showAddAuthorButton && (
          <Button
            type="button"
            className="mt-4"
            onClick={handleAddAuthorClick}
          >
            + Ajouter un auteur
          </Button>
        )}
        {showUserAuteurForm && (
          <UserAuteurForm
            setShowUserAuteurForm={setShowUserAuteurForm}
            setShowAddAuthorButton={setShowAddAuthorButton}
          />
        )}
                </div>
                {showUserAuteurForm && (
  <UserAuteurForm
    setShowUserAuteurForm={setShowUserAuteurForm}
    setShowAddAuthorButton={setShowAddAuthorButton} // Assurez-vous que setShowAddAuthorButton est bien passé ici
  />
)}

                <h3 className="partie">Informations journal </h3>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="journalTitle">
                    Titre du journal <span className="required">*</span> :
                  </Label>
                  <Input
                    type="text"
                    id="journalTitle"
                    className="form-control-alternative"
                    name="journalTitle"
                    placeholder="Titre du journal"
                    value={formData.journalTitle}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label htmlFor="quartile">Quartile du journal:</Label>
                  <Input
                    type="select"
                    id="quartile"
                    className="form-control-alternative"
                    name="quartile"
                    value={formData.quartile}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner le quartile</option>
                    <option value="Q1 = 25%">Q1 = 25%</option>
                    <option value="Q2 = 50%">Q2 = 50%</option>
                    <option value="Q3 = 75%">Q3 = 75%</option>
                    <option value="Q4 = 100%">Q4 = 100%</option>
                    <option value="autre">autre</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="volume">
                    Volume :
                  </Label>
                  <Input
                    type="text"
                    id="volume"
                    className="form-control-alternative"
                    name="volume"
                    placeholder="Volume"
                    value={formData.volume}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="factor">Facteur d'impact :</Label>
                  <Input
                    type="Number"
                    step={0.001}
                    id="factor"
                    className="form-control-alternative"
                    name="factor"
                    placeholder="Facteur d'impact"
                    value={formData.factor}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="indexation">
                    Indexation <span className="required">*</span> :
                  </Label>
                  <Input
                    type="select"
                    id="indexation"
                    className="form-control-alternative"
                    name="indexation"
                    value={formData.indexation}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner l'indexation</option>
                    <option value="ABC">WOS</option>
                    <option value="EFG">SCOPUS</option>
                    <option value="HIJ">HIJ</option>
                    <option value="KLM">KLM</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label
                    className="form-control-label"
                    htmlFor="journalWebsite"
                  >
                    Site de la revue:
                  </Label>
                  <Input
                    type="text"
                    id="journalWebsite"
                    className="form-control-alternative"
                    name="journalWebsite"
                    placeholder="Site de la revue"
                    value={formData.journalWebsite}
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

export default UserArticleForm;
