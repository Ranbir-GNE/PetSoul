import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import useUserAndPetData from "../../hooks/useUserAndPetData";
import { toast } from "sonner";
import pet1 from "../../assets/pet1.jpg";

const ViewRecord = () => {
  const { pets, isLoading, error } = useUserAndPetData();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);

  const fetchPetRecord = async (petId) => {
    const token = localStorage.getItem("key");
    if (!token) {
      toast.error("Token not found in local storage");
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
          id: record._id,
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
        toast.error(`No records found for pet this pet. ${petId}`);
      }
    } catch (error) {
      toast.error("Error fetching pet data:", error.message);
    }
  };

  const handleDeleteRecord = async () => {
    const token = localStorage.getItem("key");

    if (!selectedRecord.id) {
      toast.error("Record ID is missing");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/healthRecords/${selectedRecord.id}`,
        { headers: { Authorization: token } }
      );
      setSelectedRecord(null);
      toast.success("Record deleted successfully.");
    } catch (error) {
      console.error(
        "Error deleting record:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to delete record: ${error.response?.data?.message || "Unknown error"}`
      );
    }
  };

  return (
    <div className="relative flex flex-col p-4">
      {/* Pets Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Pets</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="flex flex-col items-center space-y-2 bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => fetchPetRecord(pet._id)}
              >
                <img
                  src={pet.profilePicture || pet1}
                  alt={`${pet.name}'s profile`}
                  className="w-20 h-20 rounded-full"
                />
                <p className="text-lg font-medium">{pet.name}</p>
                <Button
                  onClick={() => fetchPetRecord(pet._id)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  <FaSearch className="inline-block mr-2" />
                  View Record
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Health Record Section */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Health Record</h2>
        {selectedRecord ? (
          <div className="space-y-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="ownerInformation.name"
                  value={editedRecord.ownerInformation.name}
                  onChange={handleEditChange}
                  className="p-2 w-full border rounded mb-4"
                />
                <textarea
                  name="medicalHistory.allergies"
                  value={editedRecord.medicalHistory.allergies}
                  onChange={handleEditChange}
                  className="p-2 w-full border rounded mb-4"
                />
                <Button
                  className="bg-blue-500 text-white"
                  onClick={handleEditRecord}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <p>
                  <strong>Owner Name:</strong>{" "}
                  {selectedRecord.ownerInformation.name}
                </p>
                <p>
                  <strong>Owner Email:</strong>{" "}
                  {selectedRecord.ownerInformation.contactInformation}
                </p>
                <p>
                  <strong>Allergies:</strong>{" "}
                  {selectedRecord.medicalHistory.allergies}
                </p>
                <p>
                  <strong>Medications:</strong>{" "}
                  {selectedRecord.medicalHistory.medications}
                </p>
                <p>
                  <strong>Vaccinations:</strong>{" "}
                  {selectedRecord.medicalHistory.vaccinations}
                </p>
                <p>
                  <strong>Surgeries:</strong>{" "}
                  {selectedRecord.medicalHistory.surgeries}
                </p>
                <p>
                  <strong>Behavioral Issues:</strong>{" "}
                  {selectedRecord.medicalHistory.behavioralIssues}
                </p>
                <p>
                  <strong>Dietary Restrictions:</strong>{" "}
                  {selectedRecord.medicalHistory.dietaryRestrictions}
                </p>
                <p>
                  <strong>Temperature:</strong>{" "}
                  {selectedRecord.vitalSigns.temperature}
                </p>
                <p>
                  <strong>Heart Rate:</strong>{" "}
                  {selectedRecord.vitalSigns.heartRate}
                </p>
                <p>
                  <strong>Respiratory Rate:</strong>{" "}
                  {selectedRecord.vitalSigns.respiratoryRate}
                </p>
                <p>
                  <strong>Weight:</strong> {selectedRecord.vitalSigns.weight}
                </p>
                <p>
                  <strong>Body Condition Score:</strong>{" "}
                  {selectedRecord.vitalSigns.bodyConditionScore}
                </p>
                <p>
                  <strong>Hydration Status:</strong>{" "}
                  {selectedRecord.vitalSigns.hydrationStatus}
                </p>
                <p>
                  <strong>Date of Checkup:</strong>{" "}
                  {selectedRecord.dateOfCheckup}
                </p>
                <p>
                  <strong>Physical Exam Findings:</strong>{" "}
                  {selectedRecord.physicalExamFindings}
                </p>
                <p>
                  <strong>Laboratory Results:</strong>{" "}
                  {selectedRecord.laboratoryResults}
                </p>
                <p>
                  <strong>Diagnostic Tests:</strong>{" "}
                  {selectedRecord.diagnosticTests}
                </p>
                <p>
                  <strong>Treatment Plan:</strong>{" "}
                  {selectedRecord.treatmentPlan}
                </p>
                <p>
                  <strong>Behavioral Notes:</strong>{" "}
                  {selectedRecord.behavioralNotes}
                </p>
              </>
            )}
            <Button
              className="bg-red-500 text-white"
              onClick={handleDeleteRecord}
            >
              <FaTrash className="mr-2" />
              Delete Record
            </Button>
          </div>
        ) : (
          <p>Select a pet to view its health record.</p>
        )}
      </div>
    </div>
  );
};

export default ViewRecord;
