import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import LoadingButton from "../dashboard/LoadingButton";
import axios from "axios";
import { toast } from "sonner";

const AddReportForm = ({ onSubmit }) => {
  const [userData, setUserData] = useState(null);
  const [pets, setPets] = useState([]);
  const [isLoadingPets, setIsLoadingPets] = useState(false);
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

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

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

  const fetchPets = async () => {
    setIsLoadingPets(true);
    try {
      const token = localStorage.getItem("key");
      const response = await axios.get(
        `http://localhost:3000/api/pets/owner/${userData._id}`,
        {
          headers: { Authorization: token },
        }
      );
      if (response.data) {
        setPets(response.data);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setIsLoadingPets(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData && userData._id) {
      fetchPets(userData.id);
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.petId) {
      toast.error("Please select a pet.");
      return;
    }

    const isVitalSignsEmpty = Object.values(formData.vitalSigns).some(
      (value) => !value
    );
    if (isVitalSignsEmpty) {
      toast.error("Please fill out all vital signs.");
      return;
    }

    const isPhysicalExaminationEmpty = Object.values(
      formData.physicalExamination
    ).some((value) => !value);
    if (isPhysicalExaminationEmpty) {
      toast.error("Please fill out all physical examination fields.");
      return;
    }

    const isLaboratoryTestsEmpty = Object.values(formData.laboratoryTests).some(
      (value) => !value
    );
    if (isLaboratoryTestsEmpty) {
      toast.error("Please fill out all laboratory tests.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem("key");
    if (!token) {
      console.error("Token not found in local storage");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reports",
        formData,
        {
          headers: { Authorization: token },
        }
      );
      if (response) {
        console.log(response.data, "Report Added Successfully");
        toast.success("Report Added Successfully");
        onSubmit && onSubmit(response.data);
      }
    } catch (err) {
      console.error("Error adding report:", err);
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
        <label className="block text-sm font-medium text-gray-700">Pet</label>
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
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none"
      >
        Submit Report
      </LoadingButton>
    </form>
  );
};

export default AddReportForm;
