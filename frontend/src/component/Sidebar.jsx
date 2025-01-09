// Sidebar.js
import React from "react";

const Sidebar = ({ onAddNode }) => {
  return (
    <div className="w-52 h-full bg-gray-100 p-4">
      <button
        onClick={() => onAddNode("Cold Email")}
        className="bg-blue-500 text-white p-2 rounded-md mb-4 w-full"
      >
        Add Cold Email Node
      </button>
      <button
        onClick={() => onAddNode("Wait/Delay")}
        className="bg-yellow-500 text-white p-2 rounded-md mb-4 w-full"
      >
        Add Wait/Delay Node
      </button>
      <button
        onClick={() => onAddNode("Lead Source")}
        className="bg-green-500 text-white p-2 rounded-md w-full"
      >
        Add Lead Source Node
      </button>
    </div>
  );
};

export default Sidebar;
