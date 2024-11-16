import React from "react";
import Navbar from "../components/dashboard/Navbar";
import Landing from "../components/landing/Landing";

const LandingPage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-gray-300">
          <Navbar />
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 bg-white">
            <Landing />
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4">Footer</div>
      </div>
    </div>
  );
};

export default LandingPage;
