import axios from "axios";


export const GET_MANIFESTATION = "GET_MANIFESTATION";
export const GET_MANIFESTATION_ERRORS = "GET_MANIFESTATION_ERRORS";


export const getManifestations = (email) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/admin/adminManifestations/${email}`)
      .then((res) => {
        dispatch({ type: GET_MANIFESTATION, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_MANIFESTATION_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_MANIFESTATION_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};