import React, { memo, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "actions/user.actions";

// Styles pour le document PDF
const styles = {
  page: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    padding: 40,
  },
  // Style pour les bordures
  bordered: {
    border: 1,
    borderColor: "black",
    borderStyle: "solid",
    padding: 5, // Optionnel, pour ajouter de l'espace entre le texte et la bordure
    marginBottom: 5, // Optionnel, pour ajouter de l'espace en bas de l'élément
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  tableRow: {
    flexDirection: "row",
    // flexGrow: 1, // Utiliser flex-grow pour étirer les lignes
  },
  column: {
    width: "50%",
    borderRightWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 4, // Réduire l'espace intérieur des cellules
  },
  section: {
    marginBottom: 10,
  },
  centeredText: {
    textAlign: "center",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 5,
  },
  signature: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
// Composant du document PDF
const MyDocument = ({ userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.bordered}>
          <View style={styles.section}>
            <Text style={styles.centeredText}>FICHE INDIVIDUELLE</Text>
          </View>

          <Text>
            (Obligatoire pour tout enseignant-chercheur, doctorant et cadre
            technique ayant un grade équivalent ou homologue au grade
            d’assistant d’enseignement supérieur. Elle doit être dûment remplie
            sous peine de ne pas être prise en considération)
          </Text>
        </View>

        <View style={styles.bordered}>
          <Text>
            -Tout enseignant-chercheur faisant partie d'un LR ou UR, ne peut
            faire partie d’une autre structure de recherche.{" "}
          </Text>
          <Text>
            -Tout doctorant doitfournir obligatoirement une attestation
            d’inscription au titre de l’année universitaire en cours. Ils seront
            comptabilisés, entant que membre du laboratoire, uniquement les
            doctorants ayant cumulés un maximum de 5 inscriptions à la date de
            soumission de la demande du laboratoire.
          </Text>
        </View>
      </View>
  

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.headerRow]}>
          <Text style={styles.headerCell}>
            <Text style={styles.centeredText}>
              1- IDENTIFICATION DU CHERCHEUR
            </Text>
          </Text>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>
              Nom et Prénom: {userData.firstName} {userData.lastName}
            </Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Cellule 2,2</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>
              Date et lieu de naissance: {formatDate(userData.dateOfBirth)} , {" "}
              {userData.placeOfBirth}{" "}
            </Text>
          </View>
          <View style={styles.tableCell}>
            <Text>
              <Text>Sexe: {userData.sexe}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>N° CIN (tunisien): {userData.cin}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>N° Passeport (étranger): {userData.passport}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>Matricule CNRPS: {userData.CNRPSregistration}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text></Text>
          </View>
        </View>
      </View>

      <View style={styles.bordered}>
        <View style={styles.section}>
          <Text>
            -Grade: {userData.grade} {"\u00A0".repeat(70)} depuis le: {formatDate(userData.dateGrade)}{"\u00A0".repeat(30)}
          </Text>
          <Text>
            -Téléphone: {userData.phone}{"\u00A0".repeat(30)} E-mail: {userData.email}{"\u00A0".repeat(50)}
          </Text>
          <Text>
            -Dernier diplôme obtenu: {userData.LastDegreeObtained}{"\u00A0".repeat(20)} Date: {formatDate(userData.LastDegreeObtainedDate)}{" "}
            {"\u00A0".repeat(20)}
          </Text>
          <Text>
            -Etablissement: {userData.etablissement}{"\u00A0".repeat(100)}
          </Text>
        </View>
      </View>

      <View style={styles.bordered}>
        <View style={styles.section}>
          <Text style={styles.centeredText}>
            IDENTIFICATION DE L’UNITE DE RECHERCHE (de rattachement)
          </Text>
        </View>
        <Text>- Code de structure: LR20ES11</Text>
        <Text>
          - Dénomination du L.R : Hatem Bettahar : Informatique, Réseaux,
          Systèmes de Communication et Mathématiques-IReSCoMath
        </Text>
        <Text>
          - Etablissement : Faculté des Sciences de Gabès Université :
          Université de Gabès
        </Text>
        <Text>- Responsable du L.R.: Haifa Touati</Text>
      </View>
      <View style={styles.bordered}>
        <View style={styles.section}>
          <Text style={styles.centeredText}>CASE RESERVEE AU DOCTORANT</Text>
        </View>
        <Text>- Intitulé du sujet de recherche : {userData.title}</Text>
        <Text>- Taux d’avancement : {userData.taux}%</Text>
        <Text>
          - Année universitaire de la première inscription :{" "}
          {formatDate(userData.yearOfFirstRegistration)}
        </Text>
        <Text>
          - Établissement universitaire (où est effectuée l’inscription) :{" "}
          {userData.UniversityEstablishment}
        </Text>
        <Text>
          - Nom et prénom du directeur de thèse :{" "}
          {userData.firstNameLastNameDirector}
        </Text>
      </View>
      {/* Signatures */}
      <View style={styles.signatureContainer}>
        <View style={styles.signature}>
          <Text>Signature du chercheur</Text>
          <Text style={styles.signatureDate}>Date : .... /.... /....</Text>
        </View>
        <View style={styles.signature}>
          <Text>Signature du chef du L.R.</Text>
          <Text style={styles.signatureDate}>Date : .... /.... /....</Text>
        </View>
        <View style={styles.signature}>
          <Text>Signature du chef de l’établissement</Text>
          <Text style={styles.signatureDate}>Date : .... /.... /....</Text>
        </View>
        <View style={styles.signature}>
          <Text>Signature du Président de l’Université</Text>
          <Text style={styles.signatureDate}>Date : .... /... ./....</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text>
          NB : Les quatre signatures originales (non scannées) sont obligatoires
          sous peine de ne pas être prises en considération.
        </Text>
      </View>
    </Page>
  </Document>
);

// Composant du bouton PDF
const PDFButton = ({ userData }) => (
  <PDFDownloadLink
    document={<MyDocument userData={userData} />}
    fileName="fiche_individuelle.pdf"
  >
    {({ loading }) =>
      loading
        ? "Téléchargement en cours..."
        : "Télécharger la fiche individuelle"
    }
  </PDFDownloadLink>
);

// Composant UserHeader
const UserHeader = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
 
  // useEffect(() => {
  //   // Charger les données de l'utilisateur
  //   dispatch(getUser(userData._id));
  // }, [dispatch, userData._id]);
  useEffect(() => {
    if (userData && userData._id) {
      dispatch(getUser(userData._id));
    }
  }, [dispatch, userData._id]);
  

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../.././assets/img/theme/profile-cover.jpg") +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                {" "}
                Bienvenue {props.lastName} {props.firstName}
              </h1>
              <p className="text-white mt-0 mb-5">{props.aboutMe}</p>
              <PDFButton userData={userData} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default memo(UserHeader);
