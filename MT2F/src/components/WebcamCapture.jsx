import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { AiOutlineRetweet } from "react-icons/ai";

const WebcamCapture = ({ onAnalyze }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capturePhoto = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImage(capturedImage);
  };

  const retakePhoto = () => {
    setImage(null);
  };

  const handleAnalyze = () => {
    if (image) {
      const byteString = atob(image.split(",")[1]);
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ua = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ua[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Pass the Blob back to the parent component for analysis
      onAnalyze(blob);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Captured"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
          <button
            onClick={retakePhoto}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
          >
            <AiOutlineRetweet size={20} />
          </button>
        </div>
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      )}

      <div className="flex gap-4 mt-4">
        {!image && (
          <button
            onClick={capturePhoto}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Capture Photo
          </button>
        )}
        {image && (
          <button
            onClick={handleAnalyze}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Analyze Photo
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
