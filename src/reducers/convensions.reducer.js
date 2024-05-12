import { GET_CONVENSION } from "actions/convensions.action";
const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_CONVENSION:
      return action.payload
    default:
      return state;
  }
}