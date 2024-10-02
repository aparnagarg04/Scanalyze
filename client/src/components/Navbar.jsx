import React from "react";
import { FiLogIn, FiShare2, FiMenu } from "react-icons/fi";

const Navbar = ({ onMenuToggle }) => {
  return (
    <div className="fixed top-0   w-4/5 ml-64 bg-white text-black h-16 border-b border-gray-700 flex items-center px-4">
      <button onClick={onMenuToggle} className="md:hidden text-black mr-4">
        <FiMenu size={24} />
      </button>

      <div className="flex items-center flex-grow">
        <h1 className="text-xl text-black font-bold">ChatBot</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center text-black hover:text-white">
          <FiShare2 size={20} />
          <span className="ml-2 hidden md:block">Share</span>
        </button>

        <button className="flex items-center text-black hover:text-white">
          <FiLogIn size={20} />
          <span className="ml-2 hidden md:block">Login</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
