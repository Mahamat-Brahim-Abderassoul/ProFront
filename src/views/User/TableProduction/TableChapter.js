// import React from "react";
import { React, useState, useEffect } from "react";
import { getChapters } from "actions/chapters.action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import UserChapterForm from "../UserForm/UserChapterForm";
import axios from "axios";
import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableChapter() {
  const error = useSelector((state) => state.errorReducer.chapterError);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({}); // Définir formData comme un état
  const userChapters = useSelector((state) => state.chaptersReducer);
  const [chapterId, setChapterId] = useState(null);

  useEffect(() => {
    if (userChapters.length !== 0) dispatch(getChapters(userData.email));
  }, [dispatch, userChapters.length, userData.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Chapitre d'ouvrage supprimée avec succès !");
      dispatch(getChapters(userData.email));
    } catch (error) {
      console.log(
        "Erreur lors de la suppression du chapitre d'ouvrage :",
        error
      );
    }
  };

  const handleModify = (id) => {
    const selectedChapter = userChapters.find((chapter) => chapter._id === id);
    if (selectedChapter) {
      setFormData({
        title: selectedChapter.title,
        year: selectedChapter.year,
        authorType: selectedChapter.authorType,
        cin: selectedChapter.cin,
        order: selectedChapter.order,
        publisher: selectedChapter.publisher,
        linkPublisher: selectedChapter.linkPublisher,
        edition: selectedChapter.edition,
        isbnIssn: selectedChapter.isbnIssn,
        date: selectedChapter.date,
      });
      setChapterId(id);
      setShowForm(true);
    }
    
  };

  const handleAdd = () => {
    setChapterId(null); // Réinitialiser l'ID pour l'ajout
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
        <UserChapterForm chapterId={chapterId} setShowForm={setShowForm} />
      ) : (
        <>
          <CardHeader className="bg-transparent border-0">
            <h3 className="text-dark mb-0">Chapitres d'ouvrages</h3>
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
                <th scope="col">Auteur</th>
                <th scope="col">Cin</th>
                <th scope="col">Ordre</th>
                <th scope="col">éditeur</th>
                <th scope="col">Lien éditeur</th>
                <th scope="col">édition</th>
                <th scope="col">ISBN/Issn</th>
                <th scope="col">Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userChapters) &&
                userChapters.map((chapter, index) => (
                  <tr key={index}>
                    <td>{chapter.title}</td>
                    <td>{chapter.year}</td>
                    <td>{chapter.authorType}</td>
                    <td>{chapter.cin}</td>
                    <td>{chapter.order}</td>
                    <td>{chapter.publisher}</td>
                    <td>
                      <Link>{chapter.linkPublisher}</Link>
                    </td>
                    <td>{chapter.edition}</td>
                    <td>{chapter.isbnIssn}</td>
                    <td>{formatDate(chapter.date)}</td>

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
                            onClick={() => handleModify(chapter._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(chapter._id)}
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
            <h2>{error.chapterIsEmpty}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default TableChapter;
