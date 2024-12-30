import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { AiOutlineRetweet } from "react-icons/ai";

const WebcamCapture = ({ onCapture, onRetake }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capturePhoto = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImage(capturedImage);

    // Convert the captured image (Base64 string) to a Blob
    const byteString = atob(capturedImage.split(",")[1]);
    const mimeString = capturedImage.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ua = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ua[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    // Pass the Blob to the parent component
    onCapture(blob);
  };

  const retakePhoto = () => {
    setImage(null);
    onRetake();
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
      {image ? (
        <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]">
          <img
            src={image}
            alt="Captured"
            className="w-full h-auto max-w-full rounded-lg shadow-lg"
          />
          <button
            onClick={retakePhoto}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
          >
            <AiOutlineRetweet size={20} />
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px]">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-auto max-w-full rounded-lg shadow-lg"
          />
          <div
            className="absolute border-4 border-green-500 inset-1/4"
            style={{
              width: "50%",
              height: "50%",
            }}
          />
        </div>
      )}

      {!image && (
        <button
          onClick={capturePhoto}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Capture Photo
        </button>
      )}
    </div>
  );
};

export default WebcamCapture;
