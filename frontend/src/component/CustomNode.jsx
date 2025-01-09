// src/components/CustomNode.js
import React from "react";

const CustomNode = ({ data }) => {
  return (
    <div className="p-4 bg-blue-200 rounded-lg shadow-md">
      <div className="text-xl font-semibold">{data.label}</div>
    </div>
  );
};

export default CustomNode;
