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
        position: { x: index * 280, y: 120 },
        data: {
          label: (
            <div className="text-center px-1">
              <div className="font-semibold text-sm">{node.name}</div>
              <div className="text-[10px] opacity-70 mt-1">{node.type.split('.').pop()}</div>
            </div>
          )
        },
        style: {
          background: index === 0 ? '#4f46e5' : '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '14px 18px',
          minWidth: '160px',
          fontSize: '13px',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
        },
      }));

      const flowEdges: Edge[] = workflow.connections.map((conn: any) => ({
        id: `${conn.source}-${conn.target}`,
        source: conn.source,
        target: conn.target,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
        style: { stroke: '#6366f1', strokeWidth: 2 },
      }));

      setNodes(flowNodes);
      setEdges(flowEdges);
    }
  }, [workflow, setNodes, setEdges]);

  return (
    <div className="h-[450px] bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--text-muted)" gap={20} size={1} />
        <Controls className="bg-[var(--bg-card)] border-[var(--border)] rounded-lg" />
      </ReactFlow>
    </div>
  );
}
