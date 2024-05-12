import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk";  // Assurez-vous que c'est `redux-thunk` et non pas juste `thunk`
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Import des reducers et des actions
import rootReducer from './reducers';
import { getUser } from "actions/user.actions";
import { getArticles } from "actions/articles.action";
import { getBrevets } from "actions/brevets.action";
import { getOuvrages } from "actions/ouvrages.action";
import { getTheses } from "actions/theses.action";
import { getMasters } from "actions/masters.action";
import { getChapters } from "actions/chapters.action";
import { getHabilitations } from "actions/habilitations.action";
import { getAdmin } from "actions/admin.action";
import { getProjets } from "actions/projets.action";
import { getConvensions } from "actions/convensions.action";
import { getManifestations } from "actions/manifestations.action";

// Import des fichiers CSS
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// Import des layouts
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AccueilLayout from "layouts/Accueil";

// Import des outils de développement
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
// import logger from "redux-logger";


// Création du store Redux avec les middlewares
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Dispatch des actions pour récupérer les données initiales
store.dispatch(getUser());
store.dispatch(getArticles());
store.dispatch(getBrevets());
store.dispatch(getOuvrages());
store.dispatch(getTheses());
store.dispatch(getMasters());
store.dispatch(getChapters());
store.dispatch(getHabilitations());


//sur la pertie Admin 
store.dispatch(getAdmin());
store.dispatch(getProjets());
store.dispatch(getConvensions());
store.dispatch(getManifestations());


// Utilisation de ReactDOM.createRoot pour le rendu
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendu de l'application avec le provider Redux et le router
root.render(
  <Provider store={store}> 
    <BrowserRouter>
      <Routes>
        {/* Routes pour les différents layouts */}
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/accueil/*" element={<AccueilLayout />} />
        {/* Redirection vers la page d'accueil si aucune route ne correspond */}
        <Route path="*" element={<Navigate to="accueil/home" replace />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
