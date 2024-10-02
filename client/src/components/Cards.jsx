import React from "react";
import { FiMessageCircle, FiAlertCircle, FiEye, FiFlag } from "react-icons/fi";

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-6 flex items-center">
        <div className="mr-4 text-red-500">{icon}</div> {/* Adjusted icon color to red for suspicion */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const MainScreenCards = () => {
  return (
    <div className="grid grid-cols-1 mt-28 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card
        icon={<FiMessageCircle size={24} />}
        title="Detect Suspicious Messages"
        description="Analyze messages to find potentially suspicious or harmful content."
      />
      <Card
        icon={<FiAlertCircle size={24} />}
        title="Identify Red Flags"
        description="Identify patterns and behaviors that indicate possible risks or threats."
      />
      <Card
        icon={<FiEye size={24} />}
        title="Monitor User Activity"
        description="Monitor profiles for unusual activity that may indicate suspicious behavior."
      />
      <Card
        icon={<FiFlag size={24} />}
        title="Detect Political Statements"
        description="Identify politically charged or sensitive statements that may require attention."
      />
    </div>
  );
};

export default MainScreenCards;
