"use client";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type OnConnect,
} from "@xyflow/react";
import { CustomNode } from "@/modules/CustomNode";
import { useCallback } from "react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 600, y: 30 },
    data: {
      title: "Node 1",
      description: "Description 1",
      buttonLabel: "Start",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 1000, y: 300 },
    data: {
      title: "Node 2",
      description: "Description 2",
      buttonLabel: "Next",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 200, y: 300 },
    data: {
      title: "Node 3",
      description: "Description 3",
      buttonLabel: "Finish",
    },
  },
];
const connectionLineStyle = { stroke: "#000" };
const initalEdges = [
  {
    id: "e1->3",
    source: "3",
    target: "1",
    style: { stroke: "#000" },
    sourceTarget: "a",
  },
  {
    id: "e2->3",
    source: "1",
    target: "2",
    style: { stroke: "#000" },
    sourceHandle: "b",
  },
];

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initalEdges);

  const onConnect: OnConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params }, eds)),
    [setEdges]
  );
  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", width: "100vw" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ custom: CustomNode }}
          connectionLineStyle={connectionLineStyle}
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};
export default WorkflowBuilder;
