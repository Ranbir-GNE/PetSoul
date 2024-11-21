import React from "react";
import logo from "../../assets/logo.png";
import profile from "../../assets/profilePicture.jpg";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 object-cover">
      <div className="flex-shrink-0">
        <img src={logo} alt="logo" className="h-10" />
      </div>
      <div className="flex-grow mx-4">
        <Input
          type="search"
          name="search"
          placeholder="Search..."
          className="w-full p-2 rounded-md"
        />
      </div>
      <div>
        <ul className="flex space-x-4 text-white">
          <li>
            <button className="text-white hover:text-blue-400">Blogs</button>
          </li>
          <li>
            <button className="text-white hover:text-blue-400">
              Community
            </button>
          </li>
          <li>
            <button
              className="text-white hover:text-blue-400"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </li>
          <li>
            <img
              src={profile}
              alt="Profile Picture"
              className="h-8 w-8 rounded-full"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
