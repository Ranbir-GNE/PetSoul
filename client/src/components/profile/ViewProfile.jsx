import React, { useState } from "react";
import profile from "../../assets/profilePicture.jpg";
import { Input } from "../ui/input";

const ViewProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: "johndoe123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    pincode: "123456",
  });

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile saved:", editedProfile);
    toggleEdit();
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 p-4 relative">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button
            onClick={toggleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex justify-center">
            <img
              src={profile}
              alt="User Profile"
              className="w-44 h-44 rounded-full"
            />
          </div>
          <ProfileField label="Username" value={editedProfile.username} />
          <ProfileField
            label="Name"
            value={`${editedProfile.firstName} ${editedProfile.lastName}`}
          />
          <ProfileField label="Email" value={editedProfile.email} />
          <ProfileField
            label="Phone Number"
            value={editedProfile.phoneNumber}
          />
          <ProfileField label="Address" value={editedProfile.address} />
          <ProfileField label="Pincode" value={editedProfile.pincode} />
        </div>
      </div>

      {isEditing && (
        <div className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white p-6 overflow-y-auto transition-transform transform translate-x-0 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
          {Object.keys(editedProfile).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key === "verified" ? "Verified (true/false)" : key}
              </label>
              <Input
                type={key === "verified" ? "checkbox" : "text"}
                value={key === "verified" ? undefined : editedProfile[key]}
                checked={key === "verified" ? editedProfile[key] : undefined}
                onChange={(e) =>
                  handleInputChange(
                    key,
                    key === "verified" ? e.target.checked : e.target.value
                  )
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={toggleEdit}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold">{label}</h3>
    <p>{value}</p>
  </div>
);

export default ViewProfile;
