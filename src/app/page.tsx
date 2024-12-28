"use client";
import EthAPI from "@/api/EthAPI";
import { useEffect, useState } from "react";
import EthWebSocket from "@/api/EthWebsocket";
import BlockChainVisualizer from "@/components/BlockchainVisualizer";
import { modelEthBlock, modelEthBlockExtended } from "@/lib/model/EthBlockModel";
import { Button } from "../components/ui/button";

export default function Home() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [latestBlockDetails, setLatestBlockDetails] = useState<any>();
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    if (EthAPI.ethHttpProvider == undefined) {
      new EthAPI();
    }

    if (EthWebSocket.isWebSocketConnected() == false) {
      new EthWebSocket();

      setTimeout(() => {
        EthWebSocket.subscribeToNewBlockHeaders((block: any) => {
          getBlockDetails(block);
        });
      }, 1000);
    }
  }, []);

  const getBlockDetails = async (block: any) => {
    const blockDetails = await EthAPI.getBlock(block.number);
    setLatestBlockDetails(modelEthBlockExtended(blockDetails));
    setBlocks((prevBlocks) => [...prevBlocks, modelEthBlockExtended(blockDetails)]);
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="w-full h-[60vh] md:col-span-4 shadow rounded-md border border-gray-200 dark:border-gray-700 p-1">
          <BlockChainVisualizer blocks={blocks} reset={reset} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="p-2 shadow rounded-md border border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => {
                setReset(true);
                setBlocks([]);

                setTimeout(() => {
                  setReset(false);
                }, 1000);
              }}

              className="rounded-full"
              variant="secondary">
              Reset
            </Button>
          </div>
          <div className="p-2  shadow rounded-md border border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold dark:text-white">Latest Block</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Block Number</h2>
                <p>{latestBlockDetails?.number}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Hash</h2>
                <p>{latestBlockDetails?.hash}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Timestamp</h2>
                <p>{latestBlockDetails?.timestamp}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Transactions</h2>
                <p>{latestBlockDetails?.transactions.length}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Miner</h2>
                <p>{latestBlockDetails?.miner}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">Gas Used</h2>
                <p>{latestBlockDetails?.gasUsed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
