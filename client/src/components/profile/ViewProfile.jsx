import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import profile from "../../assets/profilePicture.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import userContext from "../../context/UserContext";

const ViewProfile = () => {
  const authContext = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    profilePicture: "",
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/token/${token}`,
        { headers: { Authorization: token } }
      );
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let imageUrl = userData.profilePicture;

    if (profilePictureFile) {
      try {
        const imageFormData = new FormData();
        imageFormData.append("file", profilePictureFile);
        imageFormData.append(
          "upload_preset",
          import.meta.env.VITE_UPLOAD_PRESET
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
          imageFormData
        );

        if (response && response.data.secure_url) {
          imageUrl = response.data.secure_url;
        } else {
          console.error("Failed to upload image");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const token = localStorage.getItem("key");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }

    try {
      const updatedData = { ...userData, profilePicture: imageUrl };
      const response = await axios.put(
        `http://localhost:3000/api/users/${userData._id}`,
        updatedData,
        { headers: { Authorization: token } }
      );

      if (response && response.data) {
        setUserData(response.data);
        console.log("Profile updated successfully:", response.data);
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/users/${userData._id}`);
      console.log("User deleted successfully");
    } catch (error) {
      console.log("Error deleting user profile:", error.message);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row p-4">
      {/* Profile Details */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <Button
            onClick={toggleEdit}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <FaEdit />
            <span>Edit</span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex justify-center">
            <img
              src={userData.profilePicture || profile}
              alt="User Profile"
              className="w-44 h-44 rounded-full shadow-md"
            />
          </div>
          <div>
            <p className="font-bold text-gray-600">Username</p>
            <p>{userData.username}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">First Name</p>
            <p>{userData.firstName}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Last Name</p>
            <p>{userData.lastName}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Email</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Phone Number</p>
            <p>{userData.phoneNumber}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Pincode</p>
            <p>{userData.pincode}</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">Address</p>
            <p>{userData.address}</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed top-0 right-0 h-full w-full md:w-1/3 bg-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Edit Profile</h3>
            <Button
              onClick={toggleEdit}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </Button>
          </div>
          <form className="space-y-4" onSubmit={handleSave}>
            <Input
              label="First Name"
              name="firstName"
              placeholder="First Name"
              value={userData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              value={userData.lastName}
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <Input
              label="Address"
              name="address"
              placeholder="Address"
              value={userData.address}
              onChange={handleInputChange}
            />
            <Input
              label="Pincode"
              name="pincode"
              placeholder="Pincode"
              value={userData.pincode}
              onChange={handleInputChange}
            />
            <div className="flex justify-between">
              <Button
                onClick={handleDelete}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <FaTrash />
                <span>Delete</span>
              </Button>
              <Button
                type="submit"
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <FaSave />
                <span>Save</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
