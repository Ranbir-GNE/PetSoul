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

  return (
    <div className="flex flex-col h-full justify-between bg-gray-950 text-white">
      <div>
        <ul className="flex flex-col space-y-2">
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </li>
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/pets")}
          >
            <FaDog />
            <span>Pets</span>
          </li>
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/record")}
          >
            <FaNotesMedical />
            <span>Health Records</span>
          </li>
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/reports")}
          >
            <FaFileAlt />
            <span>Reports</span>
          </li>
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/vaccination")}
          >
            <FaSyringe />
            <span>Vaccinations</span>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col space-y-2">
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <FaUser />
            <span>Profile</span>
          </li>
          <li
            className="flex items-center space-x-2 py-2 px-4 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
