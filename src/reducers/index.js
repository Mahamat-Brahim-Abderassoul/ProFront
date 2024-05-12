import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import articlesReducer from './articles.reducer';
import brevetsReducer from './brevets.reducer';
import ouvragesReducer from './ouvrages.reducer';
import thesesReducer from './theses.reducer';
import chaptersReducer from './chapters.reducer';
import habilitationsReducer from './habilitations.reducer';
import mastersReducer from './masters.reducer';
import errorReducer from './error.reducer';
import adminReducer from './admin.reducer';
import projectsReducer from './projets.reducer';
import convensionsReducer from './convensions.reducer';
import manifestationsReducer from './manifestations.reducer';




export default combineReducers({
  userReducer,
  articlesReducer,
  brevetsReducer,
  mastersReducer,
  ouvragesReducer,
  thesesReducer,
  chaptersReducer,
  habilitationsReducer,
  adminReducer,
  projectsReducer,
  convensionsReducer,
  manifestationsReducer,
  errorReducer
});