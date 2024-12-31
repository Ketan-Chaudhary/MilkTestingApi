import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { AiOutlineRetweet } from "react-icons/ai";

const WebcamCapture = ({ onAnalyze }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capturePhoto = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    if (capturedImage) {
      cropImage(capturedImage);
    }
  };

  const retakePhoto = () => {
    setImage(null);
  };

  const cropImage = (imageDataUrl) => {
    const image = new Image();
    image.src = imageDataUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set crop area dimensions (lower edge guiding box)
      // Calculate crop dimensions based on the guiding box dimensions
      const cropWidth = image.width * (90 / 200); // Adjusted for the guiding box width
      const cropHeight = image.height * (150 / 500); // Adjusted for the guiding box height
      const cropX = (image.width - cropWidth) / 2; // Center horizontally
      const cropY = image.height * (350 / 500); // Position to match the bottom guiding box

      // Set canvas size to the crop area
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Draw the cropped section onto the canvas
      context.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // Convert the cropped section back to a data URL
      const croppedImage = canvas.toDataURL("image/jpeg");
      setImage(croppedImage);
    };
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

      // Pass the cropped Blob to the parent component for analysis
      onAnalyze(blob);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <div className="relative">
          {/* Display the cropped image */}
          <img
            src={image}
            alt="Cropped"
            className="w-full max-w-xs rounded-lg shadow-lg"
          />
          <button
            onClick={retakePhoto}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
          >
            <AiOutlineRetweet size={20} />
          </button>
        </div>
      ) : (
        <div className="relative w-[200px] h-[500px]">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            videoConstraints={{
              width: 200,
              height: 500,
              facingMode: "environment", // Use the back camera
            }}
          />
          {/* Overlay with guiding indicators */}
          <div className="absolute inset-0 flex justify-between items-center px-4">
            {/* Left Side Hexagons */}
            <div className="flex flex-col gap-1">
              <div
                className="w-4 h-4 bg-blue-400"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
              <div
                className="w-4 h-4 bg-yellow-300"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
              <div
                className="w-4 h-4 bg-green-400"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
              <div
                className="w-4 h-4 bg-red-400"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
            </div>

            {/* Dashed Vertical Line */}
            <div className="relative w-[2px] h-full bg-transparent">
              <div className="absolute inset-0 border-l-2 border-dashed border-gray-700"></div>
            </div>

            {/* Right Side Hexagons */}
            <div className="flex flex-col gap-1">
              <div
                className="w-4 h-4 bg-blue-400"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
              <div
                className="w-4 h-4 bg-yellow-300"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
              <div
                className="w-4 h-4 bg-green-400"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
              <div
                className="w-4 h-4 bg-red-400"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              ></div>
            </div>
          </div>

          {/* Bottom Edge Guide with Dotted Border */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="h-[150px] w-[90px] border-4 border-dotted border-blue-500 rounded-md"></div>
          </div>
        </div>
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
