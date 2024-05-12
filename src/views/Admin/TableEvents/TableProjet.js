// import React from "react";
import React, { useState , useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";
import { getProjets } from "actions/projets.action";
import AdminProjetForm from "../AdminFormEvents/AdminProjetForm";

function TableProjet() {
  const dispatch = useDispatch();
//   const userArticles = useSelector((state) => state.articlesReducer);
  const adminProjets = useSelector((state) => state.projetsReducer);
  const adminData = useSelector((state) => state.adminReducer);
  const error = useSelector((state) => state.errorReducer.articleError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [projetId, setProjetId] = useState(null);

  useEffect(() => {
    if (adminProjets.length !== 0)
      dispatch(getProjets(adminData.email));
  }, [dispatch, adminProjets.length, adminData.email]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/admin/delete/event/${id}`
      );
      console.log("Projet supprimé avec succès !");
      dispatch(getProjets(adminData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du projet :", error);
    }
  };
  const handleModify = (id) => {
    const selectedProjet = adminProjets.find((projet) => projet._id === id);
    if (selectedProjet) {  
      setFormData({
        // title: selectedProjet.title,
        year: selectedProjet.year,
        code: selectedProjet.code,
        // file: selectedProjet.file,
        category: selectedProjet.category,
        type: selectedProjet.type,
        caption: selectedProjet.caption,
        coordinator: selectedProjet.coordinator,
        budgetShare: selectedProjet.budgetShare
       
      });
      setProjetId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setProjetId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  // const handleCancelEdit = () => {
  //   setArticleId(null);
  //   setShowForm(false);
  // };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <>
      {showForm ? (
        <AdminProjetForm projetId={projetId} setShowForm={setShowForm}/>
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
            <h3 className="text-dark mb-0">Projet</h3>
            <div className="text-center">
              <Button onClick={handleAdd} color="info">
                Ajouter
              </Button>
            </div>
          </CardHeader>

          <Table
            className="align-items-center table-dark table-flush"
            responsive
          >
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">Titre</th> */}
                <th scope="col">Année</th>
                <th scope="col">Code</th>
                {/* <th scope="col">Fichier PDF</th> */}
                <th scope="col">categorie</th>
                <th scope="col">Type</th>
                <th scope="col">Intituler</th>
                <th scope="col">coordinateur</th>
                <th scope="col">Part Budget</th>
                <th scope="col" />

              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminProjets) &&
                adminProjets.map((projet, index) => (
                  <tr key={index}>
                    {/* <td>{projet.title}</td> */}
                    <td>{projet.year}</td>
                    <td>{projet.code}</td>
                    <td>{projet.category}</td>
                    <td>{projet.type}</td>
                    <td>{projet.caption}</td>
                    <td>{projet.coordinator}</td>
                    <td>{projet.budgetShare}</td>
                    
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleModify(projet._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(projet._id)}
                          >
                            Supprimer
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Annuler
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="brevet_error"> <h2>{error.projetIsEmpty}</h2></div>
        </>
      )}
    </>
  );
}
export default TableProjet;
