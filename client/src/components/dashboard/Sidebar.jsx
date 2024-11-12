import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <ul className="flex flex-col space-y-2">
          <li className="py-2 px-4 hover:bg-gray-200">Dashboard</li>
          <li className="py-2 px-4 hover:bg-gray-200">Pets</li>
          <li className="py-2 px-4 hover:bg-gray-200">Health Records</li>
          <li className="py-2 px-4 hover:bg-gray-200">Reports</li>
          <li className="py-2 px-4 hover:bg-gray-200">Vaccinations</li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col space-y-2">
          <li className="py-2 px-4 hover:bg-gray-200">Profile</li>
          <li className="py-2 px-4 hover:bg-gray-200">Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
