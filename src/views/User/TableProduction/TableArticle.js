// import React from "react";
import React, { useState , useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getArticles } from "actions/articles.action";
import { useDispatch } from "react-redux";
// import HabilitationForm from "../UserProductionForm/HabilitationForm";

import UserArticleForm from "../UserForm/UserArticleForm";
import { Link } from "react-router-dom";

import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardHeader,
} from "reactstrap";

function TableArticle() {
  const dispatch = useDispatch();
  const userArticles = useSelector((state) => state.articlesReducer);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.articleError);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    if (userArticles.length !== 0)
      dispatch(getArticles(userData.email));
  }, [dispatch, userArticles.length, userData.email]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/production/${id}`
      );
      console.log("Article supprimé avec succès !");
      dispatch(getArticles(userData.email));
    } catch (error) {
      console.log("Erreur lors de la suppression de l'article :", error);
    }
  };
  const handleModify = (id) => {
    const selectedArticle = userArticles.find((article) => article._id === id);
    if (selectedArticle) {  
      setFormData({
        title: selectedArticle.title,
        year: selectedArticle.year,
        linkDOI: selectedArticle.linkDOI,
        // file: selectedArticle.file,
        publicationDate: selectedArticle.publicationDate,
        authorType: selectedArticle.authorType,
        cin: selectedArticle.cin,
        order: selectedArticle.order,
        journalTitle: selectedArticle.journalTitle,
        quartile: selectedArticle.quartile,
        volume: selectedArticle.volume,
        factor: selectedArticle.factor,
        indexation: selectedArticle.indexation,
        journalWebsite: selectedArticle.journalWebsite,
      });
      setArticleId(id);
      setShowForm(true);
    }
  };

  const handleAdd = () => {
    setArticleId(null); // Réinitialiser l'ID pour l'ajout
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
        <UserArticleForm articleId={articleId} setShowForm={setShowForm}/>
      ) : (
        <>
          <CardHeader className="bg-transparent border-0 ">
            <h3 className="text-dark mb-0">Article Scientifique</h3>
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
                <th scope="col">Lien DOI de l'article scientifique</th>
                {/* <th scope="col">Fichier PDF</th> */}
                <th scope="col">Date de publication</th>
                <th scope="col">Type auteur</th>
                <th scope="col">Cin</th>
                <th scope="col">Ordre</th>
                <th scope="col">Titre du journal</th>
                <th scope="col">Quartile du journal</th>
                <th scope="col">Volume</th>
                <th scope="col">Facteur d'impact</th>
                <th scope="col">Indexation</th>
                <th scope="col">Site de la revue</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userArticles) &&
                userArticles.map((article, index) => (
                  <tr key={index}>
                    <td>{article.title}</td>
                    <td>{article.year}</td>
                    <td>
                      <Link>{article.linkDOI}</Link>
                    </td>
                    {/* <td>{article.fichier}</td> */}
                    <td>{formatDate(article.publicationDate)}</td>
                    <td>{article.authorType}</td>
                    <td>{article.cin}</td>
                    <td>{article.order}</td>
                    <td>{article.journalTitle}</td>
                    <td>{article.quartile}</td>
                    <td>{article.volume}</td>
                    <td>{article.factor}</td>
                    <td>{article.indexation}</td>
                    <td>
                      <Link>{article.journalWebsite}</Link>
                    </td>
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
                            onClick={() => handleModify(article._id)}
                          >
                            Modifier
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => handleDelete(article._id)}
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
          <div className="brevet_error"> <h2>{error.articleIsEmpty}</h2></div>
        </>
      )}
    </>
  );
}
export default TableArticle;
