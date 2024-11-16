import React, { useState } from "react";
import pet1 from "../../assets/pet1.jpg";
import { Input } from "../ui/input";

const PetProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const petProfiles = [
    { id: 1, name: "Buddy", species: "Dog", breed: "Golden Retriever", age: 3 },
    { id: 2, name: "Max", species: "Cat", breed: "Siamese", age: 2 },
    { id: 3, name: "Bella", species: "Dog", breed: "Labrador", age: 4 },
  ];

  const openEditPopup = (pet) => {
    setEditingPet(pet);
    setIsEditing(true);
  };

  const closeEditPopup = () => {
    setIsEditing(false);
    setEditingPet(null);
  };

  const handleInputChange = (field, value) => {
    setEditingPet((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved pet profile:", editingPet);
    closeEditPopup();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {petProfiles.map((pet) => (
        <div key={pet.id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-center mb-4">
            <img
              src={pet1}
              alt="Pet Profile Picture"
              className="w-44 h-44 rounded-full"
            />
          </div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">{pet.name}</h2>
            <p className="text-gray-600">Age: {pet.age} years</p>
            <p className="text-gray-600">Breed: {pet.breed}</p>
            <p className="text-gray-600">Species: {pet.species}</p>
          </div>
          <div className="flex justify-around">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => openEditPopup(pet)}
            >
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      ))}

      {isEditing && editingPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg relative">
            <button
              onClick={closeEditPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">Edit Pet Profile</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                value={editingPet.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Species
              </label>
              <Input
                type="text"
                value={editingPet.species}
                onChange={(e) => handleInputChange("species", e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Breed
              </label>
              <Input
                type="text"
                value={editingPet.breed}
                onChange={(e) => handleInputChange("breed", e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <Input
                type="number"
                value={editingPet.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={closeEditPopup}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetProfile;
