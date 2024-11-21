import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaDog,
  FaNotesMedical,
  FaFileAlt,
  FaSyringe,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("key", null);
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white shadow-lg">
      {/* Logo / Header */}
      <div className="flex items-center justify-center p-4 bg-gray-800 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">Pet Care</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4">
        <ul className="space-y-4">
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/dashboard")}
          >
            <FaTachometerAlt className="text-blue-400" />
            <span>Dashboard</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/pets")}
          >
            <FaDog className="text-blue-400" />
            <span>Pets</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/record")}
          >
            <FaNotesMedical className="text-blue-400" />
            <span>Health Records</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/reports")}
          >
            <FaFileAlt className="text-blue-400" />
            <span>Reports</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/vaccination")}
          >
            <FaSyringe className="text-blue-400" />
            <span>Vaccinations</span>
          </li>
        </ul>
      </div>

      {/* Profile and Logout */}
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-4">
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => navigate("/profile")}
          >
            <FaUser className="text-blue-400" />
            <span>Profile</span>
          </li>
          <li
            className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-blue-400" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
