import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";
import ResultModal from "../components/ResultModal";

const Camera = () => {
  const [result, setResult] = useState(null);

  const analyzeImage = async (imageBlob) => {
    try {
      // Ensure imageBlob is a valid Blob object
      if (!(imageBlob instanceof Blob)) {
        throw new Error("Invalid imageBlob. Expected a Blob object.");
      }

      const formData = new FormData();
      formData.append("image", imageBlob, "captured_image.jpg"); // Use a meaningful file name

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Capture Test Strip
      </h1>
      <WebcamCapture
        onCapture={analyzeImage}
        onRetake={() => setResult(null)}
      />
      {result && (
        <ResultModal result={result} onClose={() => setResult(null)} />
      )}
    </div>
  );
};

export default Camera;
