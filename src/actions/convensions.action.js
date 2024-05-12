import axios from "axios";


export const GET_CONVENSION = "GET_CONVENSION";
export const GET_CONVENSION_ERRORS = "GET_CONVENSION_ERRORS";


export const getConvensions = (email) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/admin/adminConvensions/${email}`)
      .then((res) => {
        dispatch({ type: GET_CONVENSION, payload: res.data });
        if (res.data.errors) {
          dispatch({ type: GET_CONVENSION_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_CONVENSION_ERRORS, payload: "" });
          
        }
      })
      .catch((err) => console.log(err));
      // console.log(err);
  };
};


// export const getConvensions = (email) => {
//   return (dispatch) => {
//     if (!email) {
//       dispatch({ type: GET_CONVENSION_ERRORS, payload: "Email is required" });
//       return; // Stopper l'exécution si l'email est manquant
//     }
    
//     return axios
//       .get(`http://localhost:5000/api/admin/adminConvensions/${email}`)
//       .then((res) => {
//         dispatch({ type: GET_CONVENSION, payload: res.data });
//         if (res.data.errors) {
//           dispatch({ type: GET_CONVENSION_ERRORS, payload: res.data.errors });
//         } else {
//           dispatch({ type: GET_CONVENSION_ERRORS, payload: "" });
//         }
//       })
//       .catch((err) => console.log(err));
//   };
// };
