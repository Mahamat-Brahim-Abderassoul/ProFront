// TableBrevet.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Table,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { getBrevets } from "actions/brevets.action";
import UserBrevetForm from "../UserForm/UserBrevetForm";

function TableBrevet() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userBrevets = useSelector((state) => state.brevetsReducer);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const [brevetId, setBrevetId] = useState(null);
  const error = useSelector((state) => state.errorReducer.brevetError);

  useEffect(() => {
    if (userBrevets.length !== 0) dispatch(getBrevets(userData.email));
  }, [dispatch, userBrevets.length,userData.email]);
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Brevet supprimé avec succès !");
      dispatch(getBrevets(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du brevet :", error);
    }
  };

  const handleModify = (id) => {
    const selectedBrevet = userBrevets.find((brevet) => brevet._id === id);
    if (selectedBrevet) {
      setFormData({
        title: selectedBrevet.title,
        // file: selectedHabilitation.file,
        year: selectedBrevet.year,
        reference: selectedBrevet.reference,
        // file: selectedBrevet.file,
        creationDate: selectedBrevet.creationDate,
        type_: selectedBrevet.type_,
      });
      setBrevetId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setBrevetId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  // const handleCancelEdit = () => {
  //   setHabilitationId(null);
  //   setShowForm(false);
  // };
  // dispatch(getBrevets(userData.email))

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
        <UserBrevetForm brevetId={brevetId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
            <h3 className="text-dark mb-0">Brevet</h3>
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
                <th scope="col">Titre</th>
                <th scope="col">Année</th>
                <th scope="col">Référence</th>
                <th scope="col">Fichier</th>
                <th scope="col">Date création</th>
                <th scope="col">Type</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userBrevets) &&
                userBrevets.map((brevet, index) => (
                  <tr key={index}>
                    <td>{brevet.title}</td>
                    <td>{brevet.year}</td>
                    <td>{brevet.reference}</td>
                    <td>{brevet.file}</td>
                    <td>{formatDate(brevet.creationDate)}</td>
                    <td>{brevet.type_}</td>
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
                            onClick={() => handleModify(brevet._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(brevet._id)}
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
            <h2>{error.empty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableBrevet;
