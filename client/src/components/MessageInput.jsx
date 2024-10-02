import React, { useState } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Handle sending the message
    console.log("Analyzing message:", message);
    setMessage(""); // Clear the input field after sending
  };

  return (
    <div className="fixed bottom-0 ml-64 w-full bg-white text-white p-4 border-t border-white">
      <div className="flex items-center max-w-5xl mx-auto px-4">
        <button className="text-black hover:text-white mr-2">
          <FiPaperclip size={20} />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your query to analyze feeds..."
          className="flex-grow bg-white border border-black rounded-full py-2 px-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-2xl"
        />

        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
