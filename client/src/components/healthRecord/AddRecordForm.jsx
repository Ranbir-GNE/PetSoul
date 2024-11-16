import { useState } from "react";
import { Input } from "../ui/input";

const AddRecordForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    petId: "",
    ownerInformation: {
      name: "",
      contactInformation: "",
    },
    presentReports: [],
    medicalHistory: {
      allergies: [""],
      medications: [""],
      vaccinations: [""],
      surgeries: [""],
      illnesses: [""],
      behavioralIssues: [""],
      dietaryRestrictions: [""],
    },
    checkupInformation: {
      dateOfCheckup: [""],
      vitalSigns: {
        temperature: "",
        heartRate: "",
        respiratoryRate: "",
        weight: "",
        bodyConditionScore: "",
        hydrationStatus: "",
      },
      physicalExamFindings: "",
      laboratoryResults: "",
      diagnosticTests: "",
      treatmentPlan: "",
    },
    additionalFields: {
      behavioralNotes: [""],
    },
  });

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      // For fields that are arrays (like allergies, medications, etc.)
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: prev[section][field].map((item, i) =>
            i === index ? value : item
          ),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleArrayChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], value],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto p-6 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Health Record
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Medical History</h3>
        {Object.keys(formData.medicalHistory).map((field) => (
          <div key={field} className="mt-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            {formData.medicalHistory[field].map((item, index) => (
              <Input
                key={index}
                type="text"
                value={item}
                onChange={(e) =>
                  handleChange("medicalHistory", field, e.target.value, index)
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ))}
            <button
              type="button"
              onClick={() => handleArrayChange("medicalHistory", field, "")}
              className="text-blue-500 text-sm mt-1"
            >
              + Add More
            </button>
          </div>
        ))}
      </div>

      {/* Checkup Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Checkup Information</h3>
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Date of Checkup
        </label>
        <Input
          type="date"
          value={formData.checkupInformation.dateOfCheckup[0]}
          onChange={(e) =>
            handleChange("checkupInformation", "dateOfCheckup", [
              e.target.value,
            ])
          }
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />

        {/* Vital Signs */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {Object.keys(formData.checkupInformation.vitalSigns).map((field) => (
            <div key={field} className="mt-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <Input
                type="text"
                value={formData.checkupInformation.vitalSigns[field]}
                onChange={(e) =>
                  handleChange(
                    "checkupInformation.vitalSigns",
                    field,
                    e.target.value
                  )
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Additional Fields</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Behavioral Notes
          </label>
          {formData.additionalFields.behavioralNotes.map((note, index) => (
            <Input
              key={index}
              type="text"
              value={note}
              onChange={(e) =>
                handleChange(
                  "additionalFields",
                  "behavioralNotes",
                  e.target.value,
                  index
                )
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          ))}
          <button
            type="button"
            onClick={() =>
              handleArrayChange("additionalFields", "behavioralNotes", "")
            }
            className="text-blue-500 text-sm mt-1"
          >
            + Add More
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none"
      >
        Submit Health Record
      </button>
    </form>
  );
};

export default AddRecordForm;
