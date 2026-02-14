'use client';

import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface WorkflowVisualizationProps {
  workflow: any;
}

export default function WorkflowVisualization({ workflow }: WorkflowVisualizationProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (workflow && workflow.nodes) {
      const flowNodes: Node[] = workflow.nodes.map((node: any, index: number) => ({
        id: node.id,
        type: 'default',
        position: { x: index * 250, y: 100 },
        data: { 
          label: (
            <div className="text-center">
              <div className="font-semibold">{node.name}</div>
              <div className="text-xs text-gray-500">{node.type}</div>
            </div>
          )
        },
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: '2px solid #553c9a',
          borderRadius: '12px',
          padding: '16px',
          minWidth: '180px',
        },
      }));

      const flowEdges: Edge[] = workflow.connections.map((conn: any) => ({
        id: `${conn.source}-${conn.target}`,
        source: conn.source,
        target: conn.target,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#667eea',
        },
        style: {
          stroke: '#667eea',
          strokeWidth: 2,
        },
      }));

      setNodes(flowNodes);
      setEdges(flowEdges);
    }
  }, [workflow, setNodes, setEdges]);

  return (
    <div className="h-[500px] bg-gray-50 rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
