import { useState } from "react";
import { Input } from "../ui/input";

const AddReportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    petId: "",
    reportType: "regular",
    vitalSigns: {
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      weight: "",
      bodyConditionScore: "",
      hydrationStatus: "",
    },
    physicalExamination: {
      eyes: "",
      ears: "",
      nose: "",
      mouth: "",
      lungs: "",
      heart: "",
      abdomen: "",
      musculoskeletalSystem: "",
      skinAndCoat: "",
    },
    laboratoryTests: {
      completeBloodCount: "",
      chemistryPanel: "",
      urinalysis: "",
      fecalExamination: "",
    },
    additionalTests: {
      thyroidFunctionTest: "",
      heartwormTest: "",
      felvFivTest: "",
      radiographs: "",
      ultrasound: "",
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
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
        Add New Report
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Report Type
        </label>
        <select
          value={formData.reportType}
          onChange={(e) =>
            setFormData({ ...formData, reportType: e.target.value })
          }
          className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        >
          <option value="regular">Regular</option>
          <option value="consultation">Consultation</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Vital Signs</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.keys(formData.vitalSigns).map((field) => (
            <div key={field} className="mt-2">
              <label className="block text-sm text-gray-600 capitalize">
                {field}
              </label>
              <Input
                type="text"
                value={formData.vitalSigns[field]}
                onChange={(e) =>
                  handleChange("vitalSigns", field, e.target.value)
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Physical Examination</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.keys(formData.physicalExamination).map((field) => (
            <div key={field} className="mt-2">
              <label className="block text-sm text-gray-600 capitalize">
                {field}
              </label>
              <Input
                type="text"
                value={formData.physicalExamination[field]}
                onChange={(e) =>
                  handleChange("physicalExamination", field, e.target.value)
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Laboratory Tests</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(formData.laboratoryTests).map((field) => (
            <div key={field} className="mt-2">
              <label className="block text-sm text-gray-600 capitalize">
                {field}
              </label>
              <Input
                type="text"
                value={formData.laboratoryTests[field]}
                onChange={(e) =>
                  handleChange("laboratoryTests", field, e.target.value)
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Additional Tests</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(formData.additionalTests).map((field) => (
            <div key={field} className="mt-2">
              <label className="block text-sm text-gray-600 capitalize">
                {field}
              </label>
              <Input
                type="text"
                value={formData.additionalTests[field]}
                onChange={(e) =>
                  handleChange("additionalTests", field, e.target.value)
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none </div>focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none"
      >
        Submit Report
      </button>
    </form>
  );
};

export default AddReportForm;
