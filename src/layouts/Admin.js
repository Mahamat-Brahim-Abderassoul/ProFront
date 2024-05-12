import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { UidContext } from "components/AppContext/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "actions/user.actions";
import { getArticles } from "actions/articles.action";
import { getBrevets } from "actions/brevets.action";
import { getOuvrages } from "actions/ouvrages.action";
import { getTheses } from "actions/theses.action";
import { getMasters } from "actions/masters.action";
import { getChapters } from "actions/chapters.action";
import { getHabilitations } from "actions/habilitations.action";

// Routes à filtrer dans la barre latérale
const namesToFilter = ["User Profile", "Production scientifique"];
const filteredRoutes = routes.filter((route) =>
  namesToFilter.includes(route.name)
);

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  // État local pour stocker l'email de l'utilisateur
  const [uid, setUid] = useState(null);

  // Dispatcher Redux pour déclencher des actions
  const dispatch = useDispatch();

  // Effet pour remonter en haut de la page à chaque changement de route
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // Effet pour récupérer l'email de l'utilisateur et déclencher les actions Redux
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          // console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    // fetchToken();
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  // Fonction pour générer les routes à partir de la configuration
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  // Fonction pour obtenir le texte de la marque en fonction de l'URL actuelle
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <UidContext.Provider value={uid}>
        <Sidebar
          {...props}
          // routes={routes}
          routes={filteredRoutes}
          logo={{
            innerLink: "/admin/user-profile",
            // innerLink: "/home",
            imgSrc: require("../assets/img/brand/argon-react.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props?.location?.pathname)}
          />
          <Routes>
            {getRoutes(routes)}
            <Route
              path="*"
              element={<Navigate to="/admin/user-profile" replace />}
            />
          </Routes>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </UidContext.Provider>
    </>
  );
};

export default Admin;
