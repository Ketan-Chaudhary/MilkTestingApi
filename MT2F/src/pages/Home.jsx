import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Updated list of tests
  const tests = [
    { id: 1, name: "Starch Test" },
    { id: 2, name: "Urea Test" },
    { id: 3, name: "Detergent Test" },
    { id: 4, name: "Hydrogen Peroxide Test" },
    { id: 5, name: "Boric Acid Test" },
    { id: 6, name: "Neutralizer Test" },
    { id: 7, name: "MQ1 Test" },
    { id: 8, name: "MQ2 Test" },
    { id: 9, name: "Formalin Test" },
    { id: 10, name: "Ammonium Sulphate Test" },
    { id: 11, name: "Sugar Test" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Milk Testing Kit
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {tests.map((test) => (
          <button
            key={test.id}
            onClick={() => navigate(`/camera?test=${test.name}`)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 text-center"
          >
            {test.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
