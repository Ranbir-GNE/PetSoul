import React from "react";

const Footer = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <h2>Lets Talk</h2>
        <p>Have a project in mind? Lets talk. Get in touch with me.</p>
      </div>
      <div>
        <h2>Links</h2>
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Projects</li>
        </ul>
        <ul className="flex mr-3">
          <li>twitter</li>
          <li>facebook</li>
          <li>insta</li>
          <li>linkedIn</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
