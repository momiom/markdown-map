import { useCallback } from 'react'
import {
  useStoreApi,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  addEdge,
  NodeDragHandler,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from 'reactflow'

const MIN_DISTANCE = 150

type ProximityConnect = (
  initialNodes: Node<any>[],
  initialEdges: Edge<any>[],
) => [Node<any>[], Edge<any>[], OnNodesChange, OnEdgesChange, NodeDragHandler, NodeDragHandler, OnConnect]

export const useProximityConnect: ProximityConnect = (initialNodes, initialEdges) => {
  const store = useStoreApi()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const getClosestEdge = useCallback((node: Node) => {
    const { nodeInternals } = store.getState()
    const storeNodes = Array.from(nodeInternals.values())

    const closestNode = storeNodes.reduce<{ distance: number; node: Node | null }>(
      (res, n) => {
        if (n.id !== node.id) {
          const dx = n.positionAbsolute!.x - node.positionAbsolute!.x
          const dy = n.positionAbsolute!.y - node.positionAbsolute!.y
          const d = Math.sqrt(dx * dx + dy * dy)

          if (d < res.distance && d < MIN_DISTANCE) {
            res.distance = d
            res.node = n
          }
        }

        return res
      },
      {
        distance: Number.MAX_VALUE,
        node: null,
      },
    )

    if (!closestNode.node) {
      return null
    }

    const closeNodeIsSource = closestNode.node!.positionAbsolute!.x < node.positionAbsolute!.x

    return {
      id: `${node.id}-${closestNode.node.id}`,
      source: closeNodeIsSource ? closestNode.node.id : node.id,
      target: closeNodeIsSource ? node.id : closestNode.node.id,
      className: '',
    }
  }, [])

  const onNodeDrag = useCallback<NodeDragHandler>(
    (_, node) => {
      const closeEdge = getClosestEdge(node)

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp')

        if (closeEdge && !nextEdges.find((ne) => ne.source === closeEdge.source && ne.target === closeEdge.target)) {
          closeEdge.className = 'temp'
          nextEdges.push(closeEdge)
        }

        return nextEdges
      })
    },
    [getClosestEdge, setEdges],
  )

  const onNodeDragStop = useCallback<NodeDragHandler>(
    (_, node) => {
      const closeEdge = getClosestEdge(node)

      setEdges((es) => {
        const nextEdges = es.filter((e) => e.className !== 'temp')

        if (closeEdge) {
          nextEdges.push(closeEdge)
        }

        return nextEdges
      })
    },
    [getClosestEdge],
  )

  return [nodes, edges, onNodesChange, onEdgesChange, onNodeDrag, onNodeDragStop, onConnect]
}
