import React, { useState } from "react";
import profile from "../../assets/profilePicture.jpg";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-2">
      <div className="flex flex-col p-2 bg-white shadow-md rounded-md">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          <div className="mr-3">
            <img
              className="w-12 h-12 rounded-full"
              src={profile}
              alt="profile picture"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Notification Title</p>
          </div>
          <div className="ml-3">
            <p className="text-red-500">Cross</p>
          </div>
        </div>
        {isOpen && (
          <div className="mt-3">
            <p className="text-gray-600">Notification Content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
