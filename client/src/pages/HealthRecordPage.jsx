import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Notifications from "../components/dashboard/Notifications";
import ViewRecord from "@/components/reports/ViewReports";

const HealthRecordPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gray-200">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-gray-300">
          <Navbar />
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 bg-white">
            <ViewRecord />
          </div>
          <div className="w-1/5 bg-gray-200">
            <Notifications />
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4">Footer</div>
      </div>
    </div>
  );
};

export default HealthRecordPage;
