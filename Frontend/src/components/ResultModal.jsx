import React from "react";
import { useNavigate } from "react-router-dom"; // Ensure that useNavigate is imported

const ResultModal = ({ result, testResultStatus, selectedTest, onClose }) => {
  const navigate = useNavigate(); // Initialize navigate here

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">Test Result</h2>
        <p className="text-lg">{selectedTest}</p>
        <p className="text-sm text-gray-600 mb-4">
          {testResultStatus === "Positive"
            ? "Test Result: Positive"
            : "Test Result: Negative"}
        </p>
        <div className="mb-4">
          <h3 className="font-semibold">Detected Substance:</h3>
          <p className="text-sm text-gray-700">
            {result} {/* Display the actual detected result */}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose} // Close the modal
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={() => navigate("/")} // Correctly navigate to the home page
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
