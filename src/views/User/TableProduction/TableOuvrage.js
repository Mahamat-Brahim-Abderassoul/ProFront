// import React from "react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
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
import UserOuvrageForm from "../UserForm/UserOuvrageForm";
import { getOuvrages } from "actions/ouvrages.action";

function TableOuvrage() {
  const dispatch = useDispatch();
  const userOuvrages = useSelector((state) => state.ouvragesReducer);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.ouvrageError);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [ouvrageId, setOuvrageId] = useState(null);

  useEffect(() => {
    if (userOuvrages.length !== 0) dispatch(getOuvrages(userData.email));
  }, [dispatch, userOuvrages.length, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Ouvrage supprimée avec succès !");
      dispatch(getOuvrages(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression de l'ouvrage :", error);
    }
  };

  const handleModify = (id) => {
    const selectedOuvrage = userOuvrages.find((ouvrage) => ouvrage._id === id);
    if (selectedOuvrage) {
      setFormData({
        title: selectedOuvrage.title,
        year: selectedOuvrage.year,
        // file: selectedOuvrage.file,
        authorType: selectedOuvrage.authorType,
        cin: selectedOuvrage.cin,
        order: selectedOuvrage.order,
        publisher: selectedOuvrage.publisher,
        linkPublisher: selectedOuvrage.linkPublisher,
        edition: selectedOuvrage.edition,
        isbnIssn: selectedOuvrage.isbnIssn,
        date: selectedOuvrage.date,
      });
      setOuvrageId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setOuvrageId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  // const handleCancelEdit = () => {
  //   setHabilitationId(null);
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
        <UserOuvrageForm ouvrageId={ouvrageId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
            <h3 className="text-dark mb-0">Ouvrages Scientifiques</h3>
            <div className="text-center">
              <Button onClick={handleAdd} color="info">
                Ajouter
              </Button>
            </div>
          </CardHeader>
          {/* Table Ouvrages Scientifiques */}
          <Table
            className="align-items-center table-dark table-flush"
            responsive
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Année</th>
                <th scope="col">Auteur</th>
                <th scope="col">Cin</th>
                <th scope="col">Ordre</th>
                <th scope="col">éditeur</th>
                <th scope="col">Lien éditeur</th>
                <th scope="col">édition</th>
                <th scope="col">Isbn/Issn</th>
                <th scope="col">Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userOuvrages) &&
                userOuvrages.map((ouvrage, index) => (
                  <tr key={index}>
                    <td>{ouvrage.title}</td>
                    <td>{ouvrage.year}</td>
                    <td>{ouvrage.authorType}</td>
                    <td>{ouvrage.cin}</td>
                    <td>{ouvrage.order}</td>
                    <td>{ouvrage.publisher}</td>
                    <td>
                      <Link>{ouvrage.linkPublisher}</Link>
                    </td>
                    <td>{ouvrage.edition}</td>
                    <td>{ouvrage.isbnIssn}</td>
                    <td>{formatDate(ouvrage.date)}</td>

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
                            onClick={() => handleModify(ouvrage._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(ouvrage._id)}
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
            <h2>{error.ouvrageIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableOuvrage;
