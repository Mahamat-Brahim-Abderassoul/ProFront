import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import UserPage from "views/User/UserPage";
import Home from "views/HomePage/Home";
import About from "views/HomePage/About";
import Actuality from "views/HomePage/Actuality";
import Contact from "views/HomePage/Contact";
import ProductionScientifique from "views/User/ProductionScientifique/ProductionScientifique";
import UserMain from "views/User/UserMain";
import Article from "views/User/ProductionScientifique/Article";
import Chapter from "views/User/ProductionScientifique/Chapter";
import Brevet from "views/User/ProductionScientifique/Brevet";
import Master from "views/User/ProductionScientifique/Master";
import Ouvrage from "views/User/ProductionScientifique/Ouvrage";
import These from "views/User/ProductionScientifique/These";
import Habilitation from "views/User/ProductionScientifique/Habilitation";
import Convension from "views/Admin/Events/Convension";
import Projet from "views/Admin/Events/Projet";
import Manifestation from "views/Admin/Events/Manifestation";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: <Index />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },A
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },

  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  // {
  //   path: "/userpage",
  //   name: "Userpage",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  {
    path: "/home",
    name: "Home",
    icon: "fas fa-home text-primary",
    component: <Home />,
    layout: "/accueil",
  },
  {
    path: "/about",
    name: "About",
    icon: "fas fa-info-circle text-info",
    component: <About />,
    layout: "/accueil",
  },
  {
    path: "/actuality",
    name: "Actuality",
    icon: "fas fa-newspaper text-success",
    component: <Actuality />,
    layout: "/accueil",
  },

  {
    path: "/contact",
    name: "Contact",
    icon: "fas fa-envelope text-light",
    component: <Contact />,
    layout: "/accueil",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },

  //production scientifique
  {
    path: "/articles",
    name: "Articles Scientifique",
    icon: "fas fa-user",
    component: <Article />,
    layout: "/admin",
  },
  {
    path: "/ouvrages",
    name: "Ouvrages Scientifique",
    icon: "fas fa-user",
    component: <Ouvrage />,
    layout: "/admin",
  },
  {
    path: "/chapter",
    name: "Chapitres d'ouvrages",
    icon: "fas fa-user",
    component: <Chapter />,
    layout: "/admin",
  },
  {
    path: "/these",
    name: "These",
    icon: "fas fa-user",
    component: <These />,
    layout: "/admin",
  },
  {
    path: "/brevet",
    name: "Brevet",
    icon: "fas fa-user",
    component: <Brevet />,
    layout: "/admin",
  },
  {
    path: "/master",
    name: "Master",
    icon: "fas fa-user",
    component: <Master />,
    layout: "/admin",
  },
  {
    path: "/habilitation",
    name: "Habilitation",
    icon: "fas fa-user",
    component: <Habilitation />,
    layout: "/admin",
  },
  {
    path: "/convension",
    name: "Convension",
    icon: "fas fa-user",
    component: <Convension />,
    layout: "/admin",
  },
  {
    path: "/manifestation",
    name: "Manifestation",
    icon: "fas fa-user",
    component: <Manifestation />,
    layout: "/admin",
  },
  {
    path: "/projet",
    name: "Projet",
    icon: "fas fa-user",
    component: <Projet />,
    layout: "/admin",
  },

  // {
  //   path: "/productionscientifique",
  //   name: "Production scientifique",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <ProductionScientifique />,
  //   layout: "/admin",
  // },

  {
    layout: "/admin",
    path: "/production-scientifique",
    name: "Production scientifique",
    icon: "fa fa-book",
    //Les dropdown pour production scientifique
    subItems: [
      {
        layout: "/admin",
        path: "/articles",
        name: "Articles Scientifique",
        icon: "fa fa-file-text text-primary",
        component: <Article />,
      },
      {
        layout: "/admin",
        path: "/ouvrages",
        name: "Ouvrages Scientifique",
        icon: "fa fa-bookmark text-info",
      },
      {
        layout: "/admin",
        path: "/chapter",
        name: "Chapitres d'ouvrages",
        icon: "fa fa-file-alt text-success",
      },
      {
        layout: "/admin",
        path: "/brevet",
        name: "Brevet",
        icon: "fa fa-certificate text-light",
      },
      {
        layout: "/admin",
        path: "/these",
        name: "Thèse Doctarat",
        icon: "fa fa-graduation-cap text-dark",
      },
      {
        layout: "/admin",
        path: "/master",
        name: "mastère",
        icon: "fa fa-graduation-cap text-info",
      },
      {
        layout: "/admin",
        path: "/habilitation",
        name: "Habilitation",
        icon: "fa fa-graduation-cap text-info",
      },
      // Autres sous-éléments de menu
    ],
  },
  {
    path: "/main",
    name: "Main",
    icon: "ni ni-circle-08 text-pink",
    component: <UserMain />,
    layout: "/admin",
  },




  {layout: "/admin",
    path: "/events",
    name: "events",
    icon: "fa fa-book",
    //Les dropdown pour production scientifique
    subItems: [
      {
        layout: "/admin",
        path: "/convension",
        name: "Convension",
        icon: "fa fa-file-text text-primary",
        component: <Convension />,
      },
      {
        layout: "/admin",
        path: "/manifestation",
        name: "Manifestation",
        icon: "fa fa-file-text text-primary",
        component: <Manifestation />,
      },
      {
        layout: "/admin",
        path: "/projet",
        name: "Projet",
        icon: "fa fa-file-text text-primary",
        component: <Projet />,
      },
    ]
  }
];
export default routes;
