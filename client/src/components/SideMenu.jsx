import React, { useState } from "react";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { FaBlog, FaDashcube } from "react-icons/fa";
import {
  FiMenu,
  FiX,
  FiHome,
  FiMessageSquare,
  FiFolder,
  FiSettings,
} from "react-icons/fi";

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Open the dashboard route instead of using window.open
  const openDashboard = () => {
    setIsDashboardOpen(true);
    navigate("/dashboard"); // Navigate to the Dashboard route
  };

  // Toggle dashboard visibility
  const closeDashboard = () => {
    setIsDashboardOpen(false);
    navigate("/"); // Redirect back to the home route
  };

  return (
    <div className="flex h-screen rounded-md">
      <aside
        className={`bg-gray-100 text-black rounded-md ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1
            className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}
          >
            Parsing Social Media Feeds
          </h1>
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
          </button>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <FiHome size={24} />
                <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                  Home
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <FiMessageSquare size={24} />
                <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                  New Chat
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <FiFolder size={24} />
                <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                  Saved Chats
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <FiSettings size={24} />
                <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                  Settings
                </span>
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center p-4 hover:bg-gray-700">
                <FaBlog size={24} />
                <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                  Blogs
                </span>
              </a>
            </li>
            <li className="mb-4">
              {/* Dashboard link that opens Dashboard */}
              <a
                href="#"
                className="flex items-center p-4 hover:bg-gray-700"
                onClick={openDashboard}
              >
                <FaDashcube size={24} />
                <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                  Dashboard
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow w-2/3 p-4 bg-white">
        {isDashboardOpen ? (
          <Dashboard closeDashboard={closeDashboard} />
        ) : (
          <Cards />
        )}
      </main>
    </div>
  );
};

export default SideMenu;
