import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Footer from "@/components/dashboard/Footer";
import ViewReport from "@/components/reports/ViewReports";
import AddReportForm from "@/components/reports/ReportForm";

const ReportPage = () => {
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
                {isVisible ? "Hide Report Form" : "Show Report Form"}
              </button>
              {isVisible && <AddReportForm />}
            </div>
            <ViewReport />
            <Footer />
          </div>
          <div className="col-span-2">
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
