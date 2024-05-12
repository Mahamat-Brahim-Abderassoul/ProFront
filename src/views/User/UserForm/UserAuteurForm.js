import React, { useState } from "react";

import { Button, FormGroup, Label, Input, Form, CardBody } from "reactstrap";

function UserAuteurForm({ setShowUserAuteurForm, setShowAddAuthorButton }) {
  const [formData, setFormData] = useState({
    auteurs: [{ order: "", firstNameLastName: "" }], // Initialiser avec un auteur vide
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAddAuthorButton(true);
    // Logique de soumission du formulaire
    };

    
  const handleCancel = () => {
    setFormData({
      auteurs: [{ order: "", firstNameLastName: "" }],
    });
    setShowUserAuteurForm(false);
    setShowAddAuthorButton(true);
  };

  const addNewAuthor = () => {
    setFormData({
      auteurs: [...formData.auteurs, { order: "", firstNameLastName: "" }],
    });
 };

 const removeAuthor = (index) => {
  const newAuteurs = [...formData.auteurs];
  newAuteurs.splice(index, 1); // Utiliser 1 comme deuxième argument pour supprimer un élément à l'index spécifié
  setFormData({
    auteurs: newAuteurs,
  });
  setShowUserAuteurForm(false);
  setShowAddAuthorButton(true);
};

      
// const handleDeleteClick = () => {
//   // Logique pour supprimer l'auteur

//   // Réinitialiser les états après la suppression
//   setShowUserAuteurForm(false);
//   setShowAddAuthorButton(true);
// };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <CardBody>
        <Form className="article-form" onSubmit={handleSubmit}>
          {formData.auteurs.map((auteur, index) => (
            <div key={index}>
              <FormGroup>
                <Label className="form-control-label" htmlFor={`order${index}`}>
                  Ordre<span className="required"> *</span> :
                </Label>
                <Input
                  type="number"
                  id={`order${index}`}
                  className="form-control-alternative"
                  name={`order${index}`}
                  value={auteur.order}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Ordre"
                  min="0"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-control-label" htmlFor={`firstNameLastName${index}`}>
                  Nom et prénom : <span className="required">*</span> :
                </Label>
                <Input
                  type="text"
                  id={`firstNameLastName${index}`}
                  className="form-control-alternative"
                  name={`firstNameLastName${index}`}
                  value={auteur.firstNameLastName}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Nom et prénom"
                  required
                />
              </FormGroup>
              
              <Button type="button" onClick={() => removeAuthor(index)}>Supprimer</Button>
              <Button type="button" onClick={addNewAuthor}>Ajouter un auteur</Button>
            </div>
          ))}
          
          {/* <div className="text-center">
            <Button type="submit" className="mt-4">
              Valider
            </Button>
            <Button type="button" className="mt-4" onClick={handleCancel}>
              Annuler
            </Button>
          </div> */}
        </Form>
      </CardBody>
    </>
  );
}

export default UserAuteurForm;
