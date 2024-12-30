import React from "react";
import { useNavigate } from "react-router-dom";

const ResultModal = ({ result, analysisMessage, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Analysis Report
        </h2>
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-gray-600">Result:</span> {result}
          </p>
          {analysisMessage && (
            <p className="text-sm text-gray-700 mt-2">{analysisMessage}</p>
          )}
        </div>
        <p className="text-center text-gray-600 mb-4">
          Please ensure to perform additional tests if recommended.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
