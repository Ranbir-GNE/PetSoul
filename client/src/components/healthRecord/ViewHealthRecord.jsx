import { useState } from "react";

const ViewRecord = ({ records = [], onEdit, onDelete }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleOpenLightbox = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseLightbox = () => {
    setSelectedRecord(null);
  };

  const handleDownloadRecord = () => {
    alert("Download functionality is not implemented yet.");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Health Records
      </h2>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Record ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Pet ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Owner Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Date of Checkup
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record._id} className="border-t">
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {record.petId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {record.ownerInformation.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {record.checkupInformation.dateOfCheckup
                  ?.map((date) => new Date(date).toLocaleDateString())
                  .join(", ")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 space-x-2">
                <button
                  onClick={() => handleOpenLightbox(record)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(record)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(record._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRecord && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Record Details
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Pet ID:</strong> {selectedRecord.petId}
              </p>
              <p>
                <strong>Owner Name:</strong>{" "}
                {selectedRecord.ownerInformation.name}
              </p>
              <p>
                <strong>Contact Information:</strong>{" "}
                {selectedRecord.ownerInformation.contactInformation}
              </p>

              <p>
                <strong>Medical History:</strong>
              </p>
              <ul className="pl-4">
                {Object.entries(selectedRecord.medicalHistory).map(
                  ([key, value]) => (
                    <li key={key} className="capitalize">
                      <strong>{key}:</strong>{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </li>
                  )
                )}
              </ul>

              <p>
                <strong>Checkup Information:</strong>
              </p>
              {selectedRecord.checkupInformation && (
                <div className="pl-4">
                  <p>
                    <strong>Dates:</strong>{" "}
                    {selectedRecord.checkupInformation.dateOfCheckup
                      ?.map((date) => new Date(date).toLocaleDateString())
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Vital Signs:</strong>
                  </p>
                  <ul>
                    {Object.entries(
                      selectedRecord.checkupInformation.vitalSigns
                    ).map(([key, values]) => (
                      <li key={key} className="capitalize">
                        {key}:{" "}
                        {Array.isArray(values) ? values.join(", ") : values}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Physical Exam Findings:</strong>{" "}
                    {selectedRecord.checkupInformation.physicalExamFindings}
                  </p>
                  <p>
                    <strong>Laboratory Results:</strong>{" "}
                    {selectedRecord.checkupInformation.laboratoryResults}
                  </p>
                  <p>
                    <strong>Diagnostic Tests:</strong>{" "}
                    {selectedRecord.checkupInformation.diagnosticTests}
                  </p>
                  <p>
                    <strong>Treatment Plan:</strong>{" "}
                    {selectedRecord.checkupInformation.treatmentPlan}
                  </p>
                </div>
              )}

              <p>
                <strong>Behavioral Notes:</strong>{" "}
                {selectedRecord.additionalFields?.behavioralNotes?.join(", ")}
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDownloadRecord}
                className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-500"
              >
                Download
              </button>
              <button
                onClick={handleCloseLightbox}
                className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecord;
