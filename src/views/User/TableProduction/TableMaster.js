// import React from "react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserMasterForm from "../UserForm/UserMasterForm";
import { getMasters } from "actions/masters.action";
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

function TableMaster() {
  const dispatch = useDispatch();
  const userMasters = useSelector((state) => state.mastersReducer);
  const error = useSelector((state) => state.errorReducer.masterError);
  const userData = useSelector((state) => state.userReducer);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const [showForm, setShowForm] = useState(false);
  const [masterId, setMasterId] = useState(null);

  useEffect(() => {
    if (userMasters.length !== 0) dispatch(getMasters(userData.email));
  }, [dispatch, userMasters.length, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Mastère supprimée avec succès !");
      dispatch(getMasters(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression du Mastère :", error);
    }
  };

  const handleModify = (id) => {
    const selectedMaster = userMasters.find(
      (master) => master._id === id
    );
    if (selectedMaster) {
      setFormData({
        title: selectedMaster.title,
        year: selectedMaster.year,
        // file: selectedMaster.file,
        firstNameLastName: selectedMaster.firstNameLastName,
        yearOfFirstRegistration: selectedMaster.yearOfFirstRegistration,
        subject: selectedMaster.subject,
        supervisor: selectedMaster.supervisor,
      });
      setMasterId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setMasterId(null); // Réinitialiser l'ID pour l'ajout
    setShowForm(true);
  };

  // const handleCancelEdit = () => {
  //   setHabilitationId(null);
  //   setShowForm(false);
  // };

  return (
    <>
      {showForm ? (
        <UserMasterForm masterId={masterId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
            <h3 className="text-dark mb-0">Mastère</h3>
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
                <th scope="col">Nom et prénom de l'étudiant </th>
                <th scope="col">Année de prémière inscription</th>
                {/* <th scope="col">Fichier PDF </th> */}

                <th scope="col">Sujet</th>
                <th scope="col">Encadrant</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userMasters) &&
                userMasters.map((master, index) => (
                  <tr key={index}>
                    <td>{master.title}</td>
                    <td>{master.year}</td>
                    <td>{master.firstNameLastName}</td>
                    <td>{master.yearOfFirstRegistration}</td>
                    {/* <td>{master.file}</td> */}

                    <td>{master.subject}</td>
                    <td>{master.supervisor}</td>

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
                            onClick={() => handleModify(master._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(master._id)}
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
            <h2>{error.masterIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableMaster;
