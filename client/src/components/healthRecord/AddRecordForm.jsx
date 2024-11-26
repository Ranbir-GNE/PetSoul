import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { toast } from "sonner";
import useUserAndPetData from "../../hooks/useUserAndPetData";

const AddRecordForm = ({ onSubmit }) => {
  const { pets, isLoading } = useUserAndPetData();
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
      if (section.includes(".")) {
        const sections = section.split(".");
        setFormData((prev) => {
          const updatedSection = {
            ...prev[sections[0]],
            [sections[1]]: {
              ...prev[sections[0]][sections[1]],
              [field]: value,
            },
          };
          return { ...prev, [sections[0]]: updatedSection };
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        }));
      }
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
    // setIsLoading(true);

    const { vitalSigns, dateOfCheckup, petId } = formData.checkupInformation;
    const isVitalSignsEmpty = Object.values(vitalSigns).some(
      (value) => value === ""
    );
    if (isVitalSignsEmpty || !dateOfCheckup) {
      toast.error("Please fill in all vital signs and checkup date.");
      return;
    }

    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      toast.error("Authentication token not found. Please log in again.");
      // setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/healthRecords",
        formData,
        { headers: { Authorization: token } }
      );
      if (response) {
        toast.success("Health record added successfully!");
        if (onSubmit) {
          onSubmit(response.data);
        }
      }
    } catch (err) {
      console.error("Error adding health record:", err);
      toast.error("Failed to add health record. Please try again.");
    } finally {
      setIsLoading(false);
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
        <select
          value={formData.petId}
          onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        >
          <option value="">Select Pet</option>
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name}
            </option>
          ))}
        </select>
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
                placeholder={`Enter ${field}`}
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
