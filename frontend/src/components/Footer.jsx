import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            FOREVER is a premier online fashion destination offering a curated
            collection of stylish and trendy apparel, accessories, and footwear.
            With a focus on quality, comfort, and affordability, we cater to
            fashion-conscious individuals seeking to express their unique style.
            Our goal is to provide a seamless shopping experience and empower
            our customers to embrace their personal style with confidence.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
          <ul className="text-gray-600">
            <li className="mb-2">Home</li>
            <li className="mb-2">Shop</li>
            <li className="mb-2">About Us</li>
            <li className="mb-2">Contact Us</li>
            <li className="mb-2">FAQs</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-5">Get in Touch</h3>
          <p className="text-gray-600">+1-234-567-8901</p>
          <p className="text-gray-600">admin@forever.com</p>
          <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
        </div>
      </div>
      <div className="flex justify-center items-center text-center py-5">
        <p className="text-base">
          &copy; 2024 FOREVER. All Rights Reserved. Designed by &nbsp;
          <span className="text-red-500">
            {
              <Link to="https://souvikbasak.vercel.app/" target="_blank">
                Souvik Basak
              </Link>
            }
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
