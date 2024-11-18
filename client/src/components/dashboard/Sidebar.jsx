import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full justify-between bg-gray-950">
      <div>
        <ul className="flex flex-col space-y-2">
          <li className="py-2 px-4 hover:text-blue-400">Dashboard</li>
          <li className="py-2 px-4 hover:text-blue-400">Pets</li>
          <li className="py-2 px-4 hover:text-blue-400">Health Records</li>
          <li className="py-2 px-4 hover:text-blue-400">Reports</li>
          <li className="py-2 px-4 hover:text-blue-400">Vaccinations</li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col space-y-2">
          <li className="py-2 px-4 hover:text-blue-400">Profile</li>
          <li className="py-2 px-4 hover:text-blue-400">Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
