import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import defaultProfile from "../../assets/profilePicture.jpg";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultProfile);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("key");
    if (token) {
      try {
        const user = await axios.get(
          `http://localhost:3000/api/users/token/${token}`
        );
        if (user) {
          console.log("User data:", user.data.profilePicture);
          setProfilePicture(user.data.profilePicture || defaultProfile);
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-4">
          <Input
            type="search"
            name="search"
            placeholder="Search..."
            className="w-full bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none py-2 px-4 rounded-lg shadow-sm"
          />
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              />
            </svg>
          </div>
        </div>

        <ul className="flex items-center space-x-6 text-gray-300">
          <li>
            <button className="hover:text-white transition-colors">
              Blogs
            </button>
          </li>
          <li>
            <button className="hover:text-white transition-colors">
              Community
            </button>
          </li>
          {isLogin ? (
            <li>
              <div className="flex items-center space-x-2">
                <span className="hidden sm:block text-gray-400 text-sm">
                  Welcome!
                </span>
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                />
              </div>
            </li>
          ) : (
            <li>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                onClick={handleLogin}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
