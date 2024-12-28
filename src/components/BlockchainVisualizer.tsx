import React, { useEffect, useState, useCallback } from "react";
import { ReactFlow, useNodesState, useEdgesState, Background, MiniMap, NodeToolbar, Controls, Edge, Node, Handle, Position, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { Block, BlockExtended } from "@/lib/types/block.type";

const NodeComponent = (data: { data: { label: string; value: string; block: BlockExtended } }) => {
  const block = data.data.block
  return (
    <div>
      <div className="glass p-2 rounded-lg shadow-md border">
        <h1 className="text-xl font-bold bg-black rounded-full text-white px-3 p-1">#{block.number}</h1>
        <div>
          <div className="grid grid-cols-1">
            <div className="p-2 col-span-1">
              <h2 className="text-lg font-semibold dark:text-white">Hash</h2>
              <p className="w-64 text-ellipsis overflow-hidden">{data.data.label}</p>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="p-2">
              <h2 className="text-lg font-semibold dark:text-white">Transactions</h2>
              <p className="w-64 text-ellipsis overflow-hidden">{block?.transactions?.length}</p>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold dark:text-white">Withdrawals</h2>
              <p className="w-64 text-ellipsis overflow-hidden">{block?.withdrawals?.length}</p>
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold dark:text-white">Miner</h2>
              <p className="w-64 text-ellipsis overflow-hidden">{block?.miner}</p>
            </div>
          </div>
        </div>
        <Handle type="source" position={Position.Right} id="right" />
        <Handle type="target" position={Position.Left} id="left" />
      </div>
    </div>
  );
};

const nodeTypes = {
  systemNode: NodeComponent,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

interface IBlockChainVisualizerProps {
  blocks: Block[];
  reset: boolean;
}

const BlockChainVisualizer = (props: IBlockChainVisualizerProps) => {
  const { blocks, reset } = props;
  const { theme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [defaultViewport, setDefaultViewport] = useState({ padding: 0 });

  // Add a single node dynamically
  const addNode = (block: Block) => {
    const newNode: Node = {
      id: block.hash,
      type: "systemNode",
      data: { label: block.hash, value: block.hash, block },
      position: { x: lastPosition.x + 320, y: lastPosition.y + 5 },
    };
    setNodes([...nodes, newNode]);
    setLastPosition({ x: lastPosition.x + 320, y: lastPosition.y + 5 });
  };

  const addEdge = useCallback((sourceId: string, targetId: string) => {
    const newEdge: Edge = {
      id: `${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
      animated: true,
    };
    setEdges((edges) => [...edges, newEdge]);
  }, []);

  const adjustViewport = () => {
    setDefaultViewport({ padding: 0 });

    setTimeout(() => {
      setDefaultViewport({ padding: 4 });
    }, 1000);
  };

  useEffect(() => {
    if (blocks.length > 0) {
      const latestBlock = blocks[blocks.length - 1];
      addNode(latestBlock);

      if (blocks.length > 1) {
        addEdge(blocks[blocks.length - 2].hash, latestBlock.hash);
      }

      adjustViewport();
    }
  }, [blocks]);

  useEffect(() => {
    if (reset) {
      setNodes([]);
      setEdges([]);
      setLastPosition({ x: 0, y: 0 });
    }
  }, [reset]);

  return (
    <div className="react-flow h-full w-full">
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} minZoom={0.2} maxZoom={4} attributionPosition="bottom-left" fitViewOptions={defaultViewport}>
        <Background />
        <NodeToolbar />
      </ReactFlow>
    </div>
  );
};

export default BlockChainVisualizer;
