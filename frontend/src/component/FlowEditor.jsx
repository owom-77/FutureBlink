import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges, 
  applyEdgeChanges,  
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import Sidebar from "./Sidebar";
import { scheduleEmail } from "../service/emailService"; 

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
];

const FlowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));  
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));  
    },
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const onAddNode = (type) => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      type: "custom",
      data: { label: type },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleScheduleEmail = async () => {
    const emailData = {
      to: "recipient@example.com",
      subject: "Scheduled Email",
      body: "This is a scheduled email.",
      scheduledAt: new Date(),
    };

    const response = await scheduleEmail(emailData);

    if (response.message === "Email scheduled successfully.") {
      alert("Email scheduled successfully!");
    } else {
      alert("Error scheduling email.");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar onAddNode={onAddNode} />

      <div className="flex-grow h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          style={{ height: "100%" }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      <button
        onClick={handleScheduleEmail}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Schedule Email
      </button>
    </div>
  );
};

export default FlowEditor;
