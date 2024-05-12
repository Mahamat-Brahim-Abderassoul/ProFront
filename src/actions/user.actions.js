import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/userInfo/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (userId, formData) => {
  return (dispatch) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}api/user/upload/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.profileImage });
          });
      })
      .catch((err) => console.log(err));
  };
};
