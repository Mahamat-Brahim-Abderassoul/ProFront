import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getProjets } from "actions/projets.action";
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

function AdminProjetForm({ projetId, setShowForm }) {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminReducer);
  const adminProjets = useSelector((state) => state.projetsReducer);
//   const adminProjets = useSelector((state) => state.articlesReducer);

  const [formData, setFormData] = useState({
    year: "",
    code: "",
    category: "",
    type: "",
    caption: "",
    coordinator: "",
    budgetShare: "",
    type_:""
  });

  const handleCancel = () => {
    setFormData({
      year: "",
      code: "",
      category: "",
      type: "",
      caption: "",
      coordinator: "",
      budgetShare: "",
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
    if (projetId) {
      const projetToEdit = adminProjets.find(
        (projet) => projet._id === projetId
      );
      if (projetToEdit) {
        setFormData({ ...projetToEdit });
      }
    }
  }, [projetId, adminProjets]);

  useEffect(() => {
    if (adminProjets.length === 0) {
      dispatch(getProjets(adminData.email));
      console.log(adminData.email)
    }
  }, [adminProjets, dispatch, adminData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleError = document.querySelector(".title_error");
    titleError.innerHTML = "";

    try {
      let response;
      if (projetId) {
        // Si formData._id existe, c'est une mise à jour (PUT)
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}api/user/update/event/${projetId}`,
          {
            year: formData.year,
            code: formData.code,
            category: formData.category,
            type: formData.type,
            caption: formData.caption,
            coordinator: formData.coordinator,
            budgetShare: formData.budgetShare,
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
            code: formData.code,
            category: formData.category,
            type_: formData.type,
            caption: formData.caption,
            coordinator: formData.coordinator,
            budgetShare: formData.budgetShare,
          }
        );
      }

      if (response.data.errors) {
        titleError.innerHTML = response.data.errors.uniqueTitle;
      } else {
        dispatch(getProjets(adminData.email));
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
              <h1 className="heading-small text-muted mb-4">Projet</h1>
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
                  <Label className="form-control-label" htmlFor="code">
                    Code <span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="code"
                    className="form-control-alternative"
                    name="code"
                    placeholder="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="category">
                    Catégorie <span className="required">*</span> :
                  </Label>
                  <Input
                    type="select"
                    id="category"
                    className="form-control-alternative"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner la Catégorie</option>
                    <option value="ABC">Projets nationaux</option>
                    <option value="EFG">Projets bilatéraux</option>
                    <option value="HIJ">Projets multilatésraux</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="type">
                    Type <span className="required">*</span> :
                  </Label>
                  <Input
                    type="select"
                    id="type"
                    className="form-control-alternative"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionner la Catégorie</option>
                    <option value="ABC"> type 1</option>
                    <option value="EFG">type 2</option>
                    <option value="HIJ">type 3</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label className="form-control-label" htmlFor="caption">
                    Intitulé<span className="required"> *</span> :
                  </Label>
                  <Input
                    type="text"
                    id="caption"
                    className="form-control-alternative"
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    placeholder="Intitulé"
                    min="0"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label className="form-control-label" htmlFor="coordinator">
                    Coordinateur du projet <span className="required">*</span> :
                  </Label>
                  <Input
                    type="text"
                    id="coordinator"
                    className="form-control-alternative"
                    name="coordinator"
                    placeholder="coordinateur"
                    value={formData.coordinator}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="pl-lg-4">
                <FormGroup>
                  <Label className="form-control-label" htmlFor="budgetShare">
                    Part du budget:
                  </Label>
                  <Input
                    type="text"
                    id="budgetShare"
                    className="form-control-alternative"
                    name="budgetShare"
                    placeholder="Budget"
                    value={formData.budgetShare}
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

export default AdminProjetForm;
