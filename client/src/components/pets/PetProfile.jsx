import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import pet1 from "../../assets/pet1.jpg"; // Default pet image
import { toast } from "sonner";

const ViewRecord = () => {
  const [userData, setUserData] = useState({});
  const [pets, setPets] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const fetchUser = async () => {
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
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const fetchPets = async (userId) => {
    try {
      const token = localStorage.getItem("key");
      const response = await axios.get(
        `http://localhost:3000/api/pets/owner/${userId}`,
        { headers: { Authorization: token } }
      );
      if (response.data) {
        setPets(response.data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error.message);
    }
  };

  const fetchPetRecord = async (petId) => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/pets/records/${petId}`,
        { headers: { Authorization: token } }
      );
      if (response.data && response.data.records.length > 0) {
        const record = response.data.records[0];
        setSelectedRecord({
          ownerInformation: {
            name: record.ownerInformation?.name || "N/A",
            contactInformation:
              record.ownerInformation?.contactInformation || "N/A",
          },
          medicalHistory: {
            allergies: (record.medicalHistory?.allergies || []).join(", "),
            medications: (record.medicalHistory?.medications || []).join(", "),
            vaccinations: (record.medicalHistory?.vaccinations || []).join(
              ", "
            ),
            surgeries: (record.medicalHistory?.surgeries || []).join(", "),
            illnesses: (record.medicalHistory?.illnesses || []).join(", "),
            behavioralIssues: (
              record.medicalHistory?.behavioralIssues || []
            ).join(", "),
            dietaryRestrictions: (
              record.medicalHistory?.dietaryRestrictions || []
            ).join(", "),
          },
          vitalSigns: {
            temperature:
              record.checkupInformation?.vitalSigns?.temperature || "N/A",
            heartRate:
              record.checkupInformation?.vitalSigns?.heartRate || "N/A",
            respiratoryRate:
              record.checkupInformation?.vitalSigns?.respiratoryRate || "N/A",
            weight: record.checkupInformation?.vitalSigns?.weight || "N/A",
            bodyConditionScore:
              record.checkupInformation?.vitalSigns?.bodyConditionScore ||
              "N/A",
            hydrationStatus:
              record.checkupInformation?.vitalSigns?.hydrationStatus || "N/A",
          },
          dateOfCheckup: record.checkupInformation?.dateOfCheckup || "N/A",
          physicalExamFindings:
            record.checkupInformation?.physicalExamFindings || "N/A",
          laboratoryResults:
            record.checkupInformation?.laboratoryResults || "N/A",
          diagnosticTests: record.checkupInformation?.diagnosticTests || "N/A",
          treatmentPlan: record.checkupInformation?.treatmentPlan || "N/A",
          behavioralNotes: (
            record.additionalFields?.behavioralNotes || []
          ).join(", "),
        });
        setSelectedPet(petId);
      } else {
        setSelectedRecord(null);
        toast.error("No records found for this pet");
      }
    } catch (error) {
      console.error("Error fetching pet record:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData._id) {
      fetchPets(userData._id);
    }
  }, [userData]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => fetchPetRecord(pet._id)}
          >
            <div className="flex justify-center mb-4">
              <img
                src={pet.profilePicture || pet1}
                alt="Pet Profile Picture"
                className="w-44 h-44 rounded-full"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold">{pet.name}</h3>
              <p className="text-gray-600">Age: {pet.age} years</p>
              <p className="text-gray-600">Breed: {pet.breed}</p>
              <p className="text-gray-600">Species: {pet.species}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg relative">
            <Button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-2 right-2 bg-red-500 text-white"
            >
              Close
            </Button>
            <h3 className="text-2xl font-bold mb-2">
              Health Record: {pets.find((pet) => pet._id === selectedPet)?.name}
            </h3>
            <div>
              <div className="grid grid-cols-2">
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Owner Name: {selectedRecord.ownerInformation.name}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Contact Information:{" "}
                    {selectedRecord.ownerInformation.contactInformation}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Allergies: {selectedRecord.medicalHistory.allergies}{" "}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Medications: {selectedRecord.medicalHistory.medications}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Vaccinations: {selectedRecord.medicalHistory.vaccinations}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Surgeries: {selectedRecord.medicalHistory.surgeries}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Illnesses: {selectedRecord.medicalHistory.illnesses}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Behavioral Issues:{" "}
                    {selectedRecord.medicalHistory.behavioralIssues}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Dietary Restrictions:{" "}
                    {selectedRecord.medicalHistory.dietaryRestrictions}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-4 border-b">
                    Temperature: {selectedRecord.vitalSigns.temperature}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-4 border-b">
                    Heart Rate: {selectedRecord.vitalSigns.heartRate}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-4 border-b">
                    Respiratory Rate:{" "}
                    {selectedRecord.vitalSigns.respiratoryRate}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-4 border-b">
                    Weight: {selectedRecord.vitalSigns.weight}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-4 border-b">
                    Body Condition Score:{" "}
                    {selectedRecord.vitalSigns.bodyConditionScore}
                  </p>
                </div>
                <div>
                  <p className="py-2 px-4 border-b">
                    Hydration Status:{" "}
                    {selectedRecord.vitalSigns.hydrationStatus}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Date of Checkup: {selectedRecord.dateOfCheckup}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Physical Exam Findings:{" "}
                    {selectedRecord.physicalExamFindings}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Laboratory Results: {selectedRecord.laboratoryResults}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Diagnostic Tests: {selectedRecord.diagnosticTests}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Treatment Plan: {selectedRecord.treatmentPlan}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="py-2 px-4 border-b">
                    Behavioral Notes: {selectedRecord.behavioralNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecord;
