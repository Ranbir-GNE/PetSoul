import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";

const ViewRecord = () => {
  const [userData, setUserData] = useState({});
  const [pets, setPets] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // No record selected initially

  // Fetch user data
  const fetchUser = async () => {
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/token/${token}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch pets data
  const fetchPets = async (userId) => {
    try {
      const token = localStorage.getItem("key");
      const response = await axios.get(
        `http://localhost:3000/api/pets/owner/${userId}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.data) {
        setPets(response.data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // Fetch a specific pet's health record
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
      } else {
        setSelectedRecord(null);
        console.warn(`No records found for pet with ID: ${petId}`);
      }
    } catch (error) {
      console.error("Error fetching pet data:", error.message);
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

  const handlePetClick = (petId) => {
    fetchPetRecord(petId);
  };

  return (
    <div className="relative flex flex-col p-4">
      {/* Pets Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pets</h2>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="flex flex-col items-center space-y-2 bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePetClick(pet._id)}
            >
              <img
                src={pet.profilePicture || "https://via.placeholder.com/150"}
                alt={`${pet.name}'s profile`}
                className="w-20 h-20 rounded-full"
              />
              <p className="text-lg font-medium">{pet.name}</p>
              <Button
                onClick={() => handlePetClick(pet._id)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                <FaSearch className="inline-block mr-2" />
                View Record
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Health Record Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Health Record</h2>
        {selectedRecord ? (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Field</th>
                <th className="py-2 px-4 border-b">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Owner Name</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.ownerInformation.name}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Owner Name</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.ownerInformation.name}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Contact Information</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.ownerInformation.contactInformation}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Allergies</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.allergies}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Medications</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.medications}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Vaccinations</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.vaccinations}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Surgeries</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.surgeries}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Illnesses</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.illnesses}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Behavioral Issues</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.behavioralIssues}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Dietary Restrictions</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.medicalHistory.dietaryRestrictions}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Temperature</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.vitalSigns.temperature}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Heart Rate</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.vitalSigns.heartRate}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Respiratory Rate</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.vitalSigns.respiratoryRate}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Weight</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.vitalSigns.weight}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Body Condition Score</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.vitalSigns.bodyConditionScore}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Hydration Status</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.vitalSigns.hydrationStatus}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Date of Checkup</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.dateOfCheckup}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Physical Exam Findings</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.physicalExamFindings}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Laboratory Results</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.laboratoryResults}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Diagnostic Tests</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.diagnosticTests}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Treatment Plan</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.treatmentPlan}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Behavioral Notes</td>
                <td className="py-2 px-4 border-b">
                  {selectedRecord.behavioralNotes}
                </td>
              </tr>
              {/* Additional rows */}
            </tbody>
          </table>
        ) : (
          <p>Select a pet to view its health record.</p>
        )}
      </div>
    </div>
  );
};

export default ViewRecord;
