import React from "react";
import { assets } from "../assets/assets";
const Navigation = ({ setToken }) => {
  return (
    <div className="flex items-center px-[4%] py-2 justify-between">
      <img src={assets.logo} alt="" className="w-[max(10%,80px)]" />
      <button
        onClick={() => {
          setToken("");
        }}
        className="bg-gray-600 hover:bg-gray-900 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Navigation;
