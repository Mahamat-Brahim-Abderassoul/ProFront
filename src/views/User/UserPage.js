import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

const UserPage = (props) => {
  const getRoutes = (routes, includedRoutes) => {
    // Filtrer les routes pour inclure uniquement celles dont le nom est dans includedRoutes
    const filteredRoutes = routes.filter((route) =>
      includedRoutes.includes(route.name)
    );

    // Mapper les routes filtrées pour les convertir en composants Route
    return filteredRoutes.map((prop, key) => {
      // Vérifier si la route appartient au layout "/admin"
      if (prop.layout === "/admin") {
        // Retourner le composant Route correspondant à la route
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        // Retourner null si la route n'appartient pas au layout "/admin"
        return null;
      }
    });
  };

  // Utilisation
  const includedRoutes = ["userprofile", "productionscientifique"]; // Ajouter les noms des routes que vous voulez inclure
  const filteredRoutes = getRoutes(routes, includedRoutes);

  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route path={prop.path} element={prop.component} key={key} exact />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };

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
      {/* <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/UserPage",
          //imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      /> */}

      <Sidebar
        {...props}
        routes={routes.filter((route) => route.name === "User Profile")}
        logo={{
          innerLink: "/Profile",
          //imgSrc: require("../assets/img/brand/argon-react.png"),
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
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div> 
    </>
  );
};

export default UserPage;
