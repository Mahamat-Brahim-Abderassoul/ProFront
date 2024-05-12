import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup } from "reactstrap";
import { uploadPicture } from "actions/user.actions";

const UploadImg = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    dispatch(uploadPicture(userData._id, formData));
  };

  return (
    <form className="upload-pic">
      <FormGroup>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={handleProfileImageChange}
        />
        <br/>
      <input type="submit" value="Envoyer" />
      </FormGroup>
    </form>
  );
};

export default UploadImg;
