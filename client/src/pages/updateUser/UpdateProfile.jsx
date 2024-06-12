import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./updateProfile.scss";
import { AuthContext } from "../../context/authContext";
import { uploadImage } from "../../services/uploadImage";
import { fetchUser, refetchUser } from "../../services/apiServices";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const { currentUser, setIsProfileUpdated, setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
      name: currentUser.name,
      username: currentUser.username,
      picture: currentUser.picture,
      coverPicture: currentUser.coverPicture,
      facebook: currentUser.facebook,
      instagram: currentUser.instagram,
    })

const handleFormData = async() => {
    try{
    const response = await fetchUser(currentUser.userId);
    console.log(response)
    setFormData({
      name: response.name,
      username: response.username,
      picture: response.picture,
      coverPicture: response.coverPicture,
      facebook: response.facebook,
      instagram: response.instagram,
    });
    }catch(error){
      console.log(error)
    }
}
  useEffect(() => {
     handleFormData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value} = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };
  
  const handleFilesChange = (e) => {
    const { name, files} = e.target;
    if(files.length > 0){
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = {...formData};

      if(formData.picture instanceof File){
        updatedData.picture =await uploadImage(formData.picture); 
      }

      if(formData.coverPicture instanceof File){
        updatedData.coverPicture = await uploadImage(formData.coverPicture);
      }
      toast.success("Updated Successfully!");
       await axios.put(
        import.meta.env.VITE_API_ENDPOINT +
          `/api/users/update/${currentUser.userId}`,
        updatedData,
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating profile:", error);
    } finally {
      setIsProfileUpdated(true);
      setTimeout(() =>{
        window.location.reload();
      },500)
    }
  };

  return (
    <div className="updateProfileContainer">
      <h1>Update Profile</h1>
      <ToastContainer/>
      <form onSubmit={handleFormSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="picture">Profile Picture URL</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFilesChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="coverPicture">Cover Picture URL</label>
          <input
            type="file"
            id="coverPicture"
            name="coverPicture"
            onChange={handleFilesChange}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            placeholder="Enter your facebook username"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            placeholder="Enter your instagram username"
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
