import { GET_BREVET_ERRORS } from "actions/brevets.action";
import { GET_ARTICLE_ERRORS } from "actions/articles.action";
import { GET_OUVRAGE_ERRORS } from "actions/ouvrages.action";
import { GET_THESE_ERRORS } from "actions/theses.action";
import { GET_MASTER_ERRORS } from "actions/masters.action";
import { GET_CHAPTER_ERRORS } from "actions/chapters.action";
import { GET_HABILITATION_ERRORS } from "actions/habilitations.action";

const initialState = { brevetError: [] ,articleError:[], ouvrageError: [] ,theseError:[] ,masterError:[],chapterError:[] ,habilitationError:[] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREVET_ERRORS:
      return {
        ...state,
        brevetError: action.payload,
      }
    case GET_ARTICLE_ERRORS:
      return {
        ...state,
        articleError: action.payload,
      }
    case GET_OUVRAGE_ERRORS:
      return {
        ...state,
        ouvrageError: action.payload,
      }
    case GET_THESE_ERRORS:
      return {
        ...state,
        theseError: action.payload,
      }
    case GET_MASTER_ERRORS:
      return {
        ...state,
        masterError: action.payload,
      }
    case GET_CHAPTER_ERRORS:
      return {
        ...state,
        chapterError: action.payload,
      }
    case GET_HABILITATION_ERRORS:
      return {
        ...state,
        habilitationError: action.payload,
      }
    default: 
      return state;
  }
}