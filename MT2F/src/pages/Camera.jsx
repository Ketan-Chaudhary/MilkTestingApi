import React, { useState, useEffect } from "react";
import WebcamCapture from "../components/WebcamCapture";
import ResultModal from "../components/ResultModal";
import { useLocation } from "react-router-dom";

const Camera = () => {
  const [result, setResult] = useState(null);
  const [selectedTest, setSelectedTest] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [testResultStatus, setTestResultStatus] = useState(""); // Positive/Negative

  const location = useLocation();

  // Extract test name and description from the URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const testName = params.get("test");
    const description = params.get("description");

    if (testName && description) {
      setSelectedTest(testName);
      setTestDescription(description);
    }
  }, [location]);

  // Extract the first word for comparison (lowercased)
  const getFirstWord = (text) => {
    return text.split(" ")[0].toLowerCase(); // Get the first word and make it lowercase
  };

  // Function to analyze the captured image and compare with the test name
  const analyzeImage = async (imageBlob) => {
    try {
      const formData = new FormData();
      formData.append("image", imageBlob, "captured_image.jpg");
      formData.append("test", selectedTest);

      const response = await fetch("http://127.0.0.1:8160/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const detectedResult = data.result; // The detected substance from backend (e.g., "starch")

      // Compare the first word of selectedTest and detectedResult
      const selectedTestFirstWord = getFirstWord(selectedTest);
      const detectedResultFirstWord = getFirstWord(detectedResult);

      // Compare the first words and set Positive or Negative
      if (selectedTestFirstWord === detectedResultFirstWord) {
        setTestResultStatus("Positive");
      } else {
        setTestResultStatus("Negative");
      }

      setResult(detectedResult); // Save the detected result
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {selectedTest ? `Performing ${selectedTest}` : "Capture Test Strip"}
      </h1>

      {selectedTest && (
        <div className="bg-gray-200 p-4 rounded-lg mb-4 max-w-md text-center">
          <h2 className="text-xl font-semibold">{selectedTest}</h2>
          <p className="text-sm text-gray-700">{testDescription}</p>
        </div>
      )}

      {/* Webcam Capture Component */}
      <WebcamCapture onAnalyze={analyzeImage} />

      {/* Show Result Modal if there is a result */}
      {result && (
        <ResultModal
          result={result} // Actual result from backend (e.g., "starch")
          testResultStatus={testResultStatus} // Positive or Negative result
          selectedTest={selectedTest}
          onClose={() => setResult(null)} // Close the modal
        />
      )}
    </div>
  );
};

export default Camera;
