import { useState } from "react";

const ViewReport = ({ reports = [], onEdit, onDelete }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleOpenLightbox = (report) => {
    setSelectedReport(report);
  };

  const handleCloseLightbox = () => {
    setSelectedReport(null);
  };

  const handleDownloadReport = () => {
    alert("Download functionality is not implemented yet.");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Reports</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Report Number
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Date of Checkup
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Pet ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Report Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report._id} className="border-t">
              <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(report.dateOfCheckup).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {report.petId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                {report.reportType}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 space-x-2">
                <button
                  onClick={() => handleOpenLightbox(report)}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(report)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(report._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReport && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
            <button
              onClick={handleCloseLightbox}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Report Details
            </h3>

            <div className="space-y-2">
              <p>
                <strong>Pet ID:</strong> {selectedReport.petId}
              </p>
              <p>
                <strong>Date of Checkup:</strong>{" "}
                {new Date(selectedReport.dateOfCheckup).toLocaleDateString()}
              </p>
              <p>
                <strong>Report Type:</strong> {selectedReport.reportType}
              </p>
              <p>
                <strong>Vital Signs:</strong>
              </p>
              <ul className="pl-4">
                {Object.entries(selectedReport.vitalSigns).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDownloadReport}
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

export default ViewReport;
