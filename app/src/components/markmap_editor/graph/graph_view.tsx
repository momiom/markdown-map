import { css, Global } from '@emotion/react'
import React from 'react'
import ReactFlow, { Background, BackgroundVariant, ReactFlowProvider } from 'reactflow'

import { initialEdges, initialNodes } from '@/components/markmap_editor/graph//nodes_and_edges'
import { useProximityConnect } from '@/components/markmap_editor/graph/use_proximity_connect'

const Flow = () => {
  const [nodes, edges, onNodesChange, onEdgesChange, onNodeDrag, onNodeDragStop, onConnect] = useProximityConnect(
    initialNodes,
    initialEdges,
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onConnect={onConnect}
      fitView
    >
      <Background variant={BackgroundVariant.Cross} gap={50} />
    </ReactFlow>
  )
}

export function GraphView() {
  return (
    <>
      <Global
        styles={css`
          .react-flow__edge-path {
            stroke: #333;
            stroke-width: 2;
          }

          .temp .react-flow__edge-path {
            stroke: #bbb;
            stroke-dasharray: 5 5;
          }
        `}
      />
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </>
  )
}
