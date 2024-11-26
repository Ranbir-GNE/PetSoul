import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-gray-800 text-white">
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-2">Let's Talk</h2>
        <p>Have a project in mind? Let's talk. Get in touch with me.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Links</h2>
        <ul className="mb-4">
          <li className="mb-1">
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li className="mb-1">
            <a href="#services" className="hover:underline">
              Services
            </a>
          </li>
          <li className="mb-1">
            <a href="#projects" className="hover:underline">
              Projects
            </a>
          </li>
        </ul>
        <ul className="flex space-x-3">
          <li>
            <a href="#twitter" className="hover:underline">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="#facebook" className="hover:underline">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="#insta" className="hover:underline">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="#linkedin" className="hover:underline">
              <FaLinkedin />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
