import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Footer from "@/components/dashboard/Footer";
import ViewVaccination from "@/components/vaccinations/ViewVaccinations";
import AddVaccinationForm from "@/components/vaccinations/AddVaccinationForm";

const VaccinationPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none w-1/6">
          <Sidebar />
        </div>

        <div className="flex-1 grid grid-cols-12">
          <div className="col-span-10 overflow-y-auto text-center">
            <div className="p-4">
              <button
                onClick={handleToggleVisibility}
                className="mb-4 p-2 bg-blue-500 text-white rounded"
              >
                {isVisible
                  ? "Hide Add Vaccination Form"
                  : "Show Add Vaccination Form"}
              </button>
              {isVisible && <AddVaccinationForm />}
            </div>
            <ViewVaccination />
            <Footer />
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationPage;
