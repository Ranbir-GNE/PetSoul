import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ChartComponent from "./ChartComponent";
import userPetContext from "../../context/UserPetContext";

const Grid = () => {
  const [userData, setUserData] = useState();
  const [pets, setPets] = useState([]);
  const [vaccinationData, setVaccinationData] = useState({});
  const userPetData = useContext(userPetContext);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchUserData = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/token/${token}`,
        { headers: { Authorization: token } }
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const fetchPets = async () => {
    const token = localStorage.getItem("key");
    const userId = userData?._id;
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/pets/owner/${userId}`,
        { headers: { Authorization: token } }
      );
      if (response.data.length === 0) {
        console.log("No pets found");
      } else {
        setPets(response.data);
        userPetData.setPets(response.data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error.message);
    }
  };

  const fetchVaccinationData = async (petId) => {
    const token = localStorage.getItem("key");
    if (!token || !petId) {
      console.error("Missing token or petId");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/healthRecords/vaccination/${petId}`,
        { headers: { Authorization: token } }
      );
      setVaccinationData((prevData) => ({
        ...prevData,
        [petId]: response.data.vaccinationRecord,
      }));
    } catch (error) {
      console.error("Error fetching vaccination data:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchPets();
    }
  }, [userData]);

  useEffect(() => {
    if (pets.length > 0 && pets[tabIndex]) {
      fetchVaccinationData(pets[tabIndex]._id);
    }
  }, [pets, tabIndex]);

  return (
    <div className="m-3">
      {/* Pets Grid */}
      <div className="grid grid-cols-5 gap-4 pb-3">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-gray-200 m-3 rounded-lg shadow-md p-3 flex justify-between items-center"
          >
            <div>
              <p>Name: {pet.name}</p>
              <p>Age: {pet.age}</p>
              <p>Breed: {pet.breed}</p>
              <p>Species: {pet.species}</p>
            </div>
            <div>
              <img
                src={pet.profilePicture || "default_pet.jpg"}
                alt="Pet"
                className="object-cover h-16 w-16 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Vaccination and Chart Section */}
      <div className="grid grid-cols-4 gap-4 pb-3">
        {/* Chart */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md col-span-3">
          <ChartComponent />
        </div>

        {/* Vaccination Details */}
        <div className="bg-gray-200 p-3 rounded-lg shadow-md">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              {pets.map((pet, index) => (
                <Tab key={index}>{pet.name}</Tab>
              ))}
            </TabList>
            {pets.map((pet, index) => (
              <TabPanel key={index}>
                <div className="flex flex-col p-2 bg-white shadow-md rounded-md">
                  {vaccinationData[pet._id] ? (
                    vaccinationData[pet._id].map((record, idx) => (
                      <div
                        key={idx}
                        className="border p-2 mb-2 rounded-lg bg-gray-50"
                      >
                        <p className="font-semibold text-gray-800">
                          {record.vaccineName}
                        </p>
                        <p className="text-gray-600">
                          Date:{" "}
                          {new Date(
                            record.vaccinationDate
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          Next Due Date:{" "}
                          {new Date(
                            record.nextVaccinationDate
                          ).toLocaleDateString()}
                        </p>
                        <p
                          className={`font-semibold ${
                            record.vaccineStatus === "completed"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          Status: {record.vaccineStatus}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Loading vaccination data...</p>
                  )}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Grid;
