import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const tests = [
    {
      id: 1,
      name: "Starch",
      description: "Detects the presence of starch adulteration.",
    },
    {
      id: 2,
      name: "Urea",
      description: "Detects the presence of urea in milk.",
    },
    {
      id: 3,
      name: "Detergent",
      description: "Checks for detergent adulteration.",
    },
    {
      id: 4,
      name: "Hydrogen Peroxide",
      description: "Detects hydrogen peroxide used as a preservative.",
    },
    {
      id: 5,
      name: "Boric Acid",
      description: "Detects boric acid adulteration.",
    },
    {
      id: 6,
      name: "Neutralizer",
      description: "Identifies pH-neutralizing chemicals.",
    },
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
            onClick={() =>
              navigate(
                `/camera?test=${test.name}&description=${encodeURIComponent(
                  test.description
                )}`
              )
            }
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
