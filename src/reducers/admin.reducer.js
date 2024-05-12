import { GET_ADMIN } from "actions/admin.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return action.payload;

    default:
      return state;
  }
}
