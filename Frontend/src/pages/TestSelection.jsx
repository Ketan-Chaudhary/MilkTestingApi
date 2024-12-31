import React, { useState } from "react";

const TestSelection = ({ onSelectTest }) => {
  const tests = [
    {
      name: "Starch",
      description: "Detects the presence of starch adulteration.",
    },
    { name: "Urea", description: "Detects the presence of urea in milk." },
    { name: "Detergent", description: "Checks for detergent adulteration." },
    {
      name: "Hydrogen Peroxide",
      description: "Detects hydrogen peroxide used as a preservative.",
    },
    { name: "Boric Acid", description: "Detects boric acid adulteration." },
    {
      name: "Neutralizer",
      description: "Identifies pH-neutralizing chemicals.",
    },
    { name: "MQ1", description: "Tests microbial quality - indicator 1." },
    { name: "MQ2", description: "Tests microbial quality - indicator 2." },
    {
      name: "Formalin",
      description: "Detects formalin used as a preservative.",
    },
    {
      name: "Ammonium Sulphate",
      description: "Checks for ammonium sulphate in milk.",
    },
    { name: "Sugar", description: "Detects sugar adulteration." },
    { name: "Salt", description: "Detects excessive salt in milk." },
    {
      name: "Sodium Bicarbonate",
      description: "Checks for sodium bicarbonate.",
    },
    { name: "Nitrate", description: "Detects nitrate adulteration." },
    { name: "Carbonate", description: "Checks for carbonate in milk." },
    { name: "Chloride", description: "Detects chloride adulteration." },
    { name: "Soap", description: "Checks for the presence of soap." },
    {
      name: "Synthetic Milk",
      description: "Identifies synthetic milk components.",
    },
    { name: "Glucose", description: "Detects glucose levels in milk." },
    { name: "Water", description: "Checks for excessive water dilution." },
  ];

  const [selectedTest, setSelectedTest] = useState(null);

  const handleSelect = (test) => {
    setSelectedTest(test.name);
    onSelectTest(test.name);
  };

  return (
    <div className="test-selection-container p-4">
      <h2 className="text-xl font-bold mb-4">Select a Test</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => (
          <li
            key={test.name}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedTest === test.name
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSelect(test)}
          >
            <h3 className="font-semibold">{test.name}</h3>
            <p className="text-sm">{test.description}</p>
          </li>
        ))}
      </ul>
      {selectedTest && (
        <div className="mt-4">
          <p className="text-lg">
            Selected Test: <strong>{selectedTest}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default TestSelection;
