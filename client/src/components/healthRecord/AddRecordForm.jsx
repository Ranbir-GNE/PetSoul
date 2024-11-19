import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { toast } from "sonner";

const AddRecordForm = () => {
  const [formData, setFormData] = useState({
    petId: "",
    ownerInformation: {
      name: "",
      contactInformation: "",
    },
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
      dateOfCheckup: "",
      vitalSigns: {
        temperature: "",
        heartRate: "",
        respiratoryRate: "",
        weight: "",
        bodyConditionScore: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/healthRecords/",
        formData
      );
      toast.success("Health record added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding record:", error);
      toast.error("Failed to add health record.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-screen-lg mx-auto p-6 bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add New Health Record
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Pet ID
        </label>
        <Input
          type="text"
          value={formData.petId}
          onChange={(e) => handleChange("petId", null, e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

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

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Checkup Information</h3>
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Date of Checkup
        </label>
        <Input
          type="date"
          value={formData.checkupInformation.dateOfCheckup}
          onChange={(e) =>
            handleChange("checkupInformation", "dateOfCheckup", e.target.value)
          }
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
        />

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

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Additional Fields</h3>
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
