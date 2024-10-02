import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState(""); // State to hold the PDF URL
  const [showPdf, setShowPdf] = useState(false); // State to control modal visibility
  const [isProcessing, setIsProcessing] = useState(false); // State to show "Processing..." message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages
    setIsProcessing(true); // Set processing to true when API call starts
    if (username && expectedOutput) {
      try {
        // Fetch data from the Node.js server
        const response = await fetch("http://localhost:5000/analyze_tweets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, expectedOutput: expectedOutput }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from the server.");
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the entire response

        // Check if the PDF base64 string is present
        const pdfBase64 = data["pdf base64 code"];
        console.log("Base64 PDF String:", pdfBase64); // Log the base64 PDF string

        // Decode the PDF and create a URL
        const pdfBlob = base64ToBlob(pdfBase64, 'application/pdf');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl); // Set PDF URL for viewing and download

        // Show the modal with PDF before redirecting to the dashboard
        setShowPdf(true);

      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Error fetching data. Please try again.");
      } finally {
        setIsProcessing(false); // Turn off processing after API call finishes
      }
    }
  };

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64, type) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: type });
  };

  // Function to close PDF modal and navigate to the dashboard
  const closePdfAndNavigate = () => {
    setShowPdf(false);
    onLogin(); // Ensure this function is passed correctly from App.js
    navigate("/dashboard"); // Navigate to the dashboard after showing the PDF
  };

  return (
    <>
      {/* Navbar with blue background */}
      <div className="w-full bg-blue-600 text-white h-16 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Scanalyze</h1>
      </div>

      {/* Full-screen form with gradient background */}
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-r from-gray-100 to-gray-300">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Fetch Twitter Insights
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username input with Twitter icon */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Username (for tweets scraping)
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                <FaTwitter className="text-blue-500 mr-2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full focus:outline-none"
                  placeholder="Enter the Twitter username"
                  required
                />
              </div>
            </div>

            {/* Expected Output input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                What specific information or insights are you hoping to extract
                from the tweets?
              </label>
              <input
                type="text"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the information or insights you need"
                required
              />
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">
                {errorMessage}
              </div>
            )}

            {/* Processing text when API is being hit */}
            {isProcessing && (
              <div className="mb-4 text-blue-600 text-center">
                Processing...
              </div>
            )}

            {/* Submit button with animation */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all hover:scale-105"
              disabled={isProcessing} // Disable button during processing
            >
              {isProcessing ? 'Processing...' : 'Start Scraping'}
            </button>
          </form>

          {/* Display PDF in a modal if PDF URL is available */}
          {showPdf && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Your PDF Report</h2>
                <iframe
                  src={pdfUrl}
                  width="600px"  // Wider
                  height="400px" // Shorter
                  title="PDF Viewer"
                  style={{ border: 'none' }}
                ></iframe>
                <a
                  href={pdfUrl}
                  download="report.pdf"
                  className="block text-center mt-4 text-blue-600 underline"
                >
                  Download PDF
                </a>
                <button
                  onClick={closePdfAndNavigate}
                  className="block w-full py-2 mt-4 bg-blue-600 text-white rounded"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
