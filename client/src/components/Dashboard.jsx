import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Tableau JS API script
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up when the component unmounts
    };
  }, []);

  const handleChatbotClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <>
      {/* Navbar */}
      <div className="w-full bg-blue-600 text-white h-16 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleChatbotClick}
          className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900"
        >
          Chatbot
        </button>
      </div>

      {/* Tableau Dashboard */}
      <div
        className="tableauPlaceholder"
        id="viz1725790809036"
        style={{ position: 'relative', width: '100vw', height: 'calc(100vh - 4rem)' }} // Fullscreen width and height minus navbar height
      >
        {/* Fallback Image in case of no JS */}
        <noscript>
          <a href="#">
            <img
              alt="Final Dashboard"
              src="https://public.tableau.com/static/images/Tw/TwitterUsers2020ReflectionsDashboard/FinalDashboard/1_rss.png"
              style={{ border: 'none' }}
            />
          </a>
        </noscript>

        {/* Tableau Object */}
        <object className="tableauViz" style={{ width: '100%', height: '100%' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="TwitterUsers2020ReflectionsDashboard/FinalDashboard" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param
            name="static_image"
            value="https://public.tableau.com/static/images/Tw/TwitterUsers2020ReflectionsDashboard/FinalDashboard/1.png"
          />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
        </object>
      </div>
    </>
  );
};

export default Dashboard;
