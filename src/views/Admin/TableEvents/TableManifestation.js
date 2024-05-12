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
import { getManifestations } from "actions/manifestations.action";
import AdminManifestationForm from "../AdminFormEvents/AdminManifestationForm";

function TableManifestation() {
  const dispatch = useDispatch();
//   const userArticles = useSelector((state) => state.articlesReducer);
  const adminManifestations = useSelector((state) => state.manifestationsReducer);
  const adminData = useSelector((state) => state.adminReducer);
  const error = useSelector((state) => state.errorReducer.articleError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [manifestationId, setManifestationId] = useState(null);

  useEffect(() => {
    if (adminManifestations.length !== 0)
      dispatch(getManifestations(adminData.email));
  }, [dispatch, adminManifestations.length, adminData.email]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/admin/delete/event/${id}`
      );
      console.log("manifestation supprimé avec succès !");
      dispatch(getManifestations(adminData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du manifestation :", error);
    }
  };
  const handleModify = (id) => {
    const selectedManifestation = adminManifestations.find((manifestation) => manifestation._id === id);
    if (selectedManifestation) {  
      setFormData({
        // title: selectedManifestation.title,
        year: selectedManifestation.year,
        title: selectedManifestation.title,
        // file: selectedProjet.file,
        organizer: selectedManifestation.organizer,
        dateOfOrganization: selectedManifestation.dateOfOrganization,
        location: selectedManifestation.location,
        type: selectedManifestation.type,
        website: selectedManifestation.website

      });
      setManifestationId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setManifestationId(null); // Réinitialiser l'ID pour l'ajout
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
        <AdminManifestationForm manifestationId={manifestationId} setShowForm={setShowForm}/>
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
            <h3 className="text-dark mb-0">Manifestation</h3>
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
                <th scope="col">Titre</th>
                {/* <th scope="col">Fichier PDF</th> */}
                <th scope="col">Organisateurs</th>
                <th scope="col">Date organisation</th>
                <th scope="col">Lieu</th>
                <th scope="col">Type</th>
                <th scope="col">Site Web</th>
                <th scope="col" />

              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminManifestations) &&
                adminManifestations.map((manifestation, index) => (
                  <tr key={index}>
                    <td>{manifestation.year}</td>
                    <td>{manifestation.title}</td>
                    <td>{manifestation.organizer}</td>
                    <td>{manifestation.dateOfOrganization}</td>
                    <td>{manifestation.location}</td>
                    <td>{manifestation.type}</td>
                    <td>{manifestation.website}</td>
                    
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
                            onClick={() => handleModify(manifestation._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(manifestation._id)}
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
          <div className="brevet_error"> <h2>{error.manifestationIsEmpty}</h2></div>
        </>
      )}
    </>
  );
}
export default TableManifestation;
