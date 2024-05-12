// import React from "react";
import React, { useState, useEffect } from "react";
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
import { getConvensions } from "actions/convensions.action";
import AdminConvensionForm from "../AdminFormEvents/AdminConvensionForm";

function TableConvension() {
  const dispatch = useDispatch();
  //   const userArticles = useSelector((state) => state.articlesReducer);
  const adminConvensions = useSelector((state) => state.convensionsReducer);
  const adminData = useSelector((state) => state.adminReducer);
  const error = useSelector((state) => state.errorReducer.articleError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [convensionId, setConvensionId] = useState(null);

  useEffect(() => {
    if (adminConvensions.length !== 0)
      dispatch(getConvensions(adminData.email));
  }, [dispatch, adminConvensions.length, adminData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/admin/delete/event/${id}`
      );
      console.log("Convension supprimé avec succès !");
      dispatch(getConvensions(adminData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du Convension :", error);
    }
  };
  const handleModify = (id) => {
    const selectedConvension = adminConvensions.find(
      (convension) => convension._id === id
    );
    if (selectedConvension) {
      setFormData({
        // title: selectedConvension.title,
        year: selectedConvension.year,
        code: selectedConvension.code,
        // file: selectedConvension.file,
        category: selectedConvension.category,
        type: selectedConvension.type,
        caption: selectedConvension.caption,
        coordinator: selectedConvension.coordinator,
        budgetShare: selectedConvension.budgetShare,
      });
      setConvensionId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setConvensionId(null); // Réinitialiser l'ID pour l'ajout
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
        <AdminConvensionForm
          convensionId={convensionId}
          setShowForm={setShowForm}
        />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
            <h3 className="text-dark mb-0">Convension</h3>
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
                <th scope="col">Année</th>
                <th scope="col">Origine</th>
                <th scope="col">Partenaire</th>
                <th scope="col">Type</th>
                <th scope="col">Résumé</th>
                <th scope="col">Impact financier</th>
                <th scope="col">Impact en nature</th>
                <th scope="col">Date de création</th>
                <th scope="col">Fichier PDF</th>

                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(adminConvensions) &&
                adminConvensions.map((convension, index) => (
                  <tr key={index}>
                    <td>{convension.year}</td>
                    <td>{convension.origin}</td>
                    <td>{convension.partner}</td>
                    <td>{convension.type}</td>
                    <td>{convension.summary}</td>
                    <td>{convension.financialImpact}</td>
                    <td>{convension.environmentalImpact}</td>
                    <td>{convension.creationDate}</td>
                    <td>{convension.file}</td>

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
                            onClick={() => handleModify(convension._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(convension._id)}
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
          <div className="brevet_error">
            {" "}
            <h2>{error.convensionIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}
export default TableConvension;
