import React from "react";
import { useNavigate } from "react-router-dom";

const ResultModal = ({ result, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/"); // Redirect to home page when modal closes
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-bold mb-4">Test Result</h2>
        <p className="text-lg text-gray-700">{result}</p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
