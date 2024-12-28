"use client";
import EthAPI from "@/api/EthAPI";
import { useEffect, useState } from "react";
import EthWebSocket from "@/api/EthWebsocket";
import BlockChainVisualizer from "@/components/BlockchainVisualizer";
import { modelEthBlock, modelEthBlockExtended } from "@/lib/model/EthBlockModel";
import { Button } from "../components/ui/button";
import moment from "moment";

export default function Home() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [latestBlockDetails, setLatestBlockDetails] = useState<any>();
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    if (EthAPI.ethHttpProvider == undefined) {
      new EthAPI();
    }

    getTheFirstBlock();

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
    if (blocks.length == 1 && blocks[0].number == blockDetails.number) {
      return;
    }
    setLatestBlockDetails(modelEthBlockExtended(blockDetails));
    setBlocks((prevBlocks) => [...prevBlocks, modelEthBlockExtended(blockDetails)]);
  };

  const getTheFirstBlock = async () => {
    try {
      const blockDetails = await EthAPI.getBlock("latest");
      console.log("Block Details: ", blockDetails);
      console.log("Block Model: ", modelEthBlockExtended(blockDetails));
      setLatestBlockDetails(modelEthBlockExtended(blockDetails));
      setBlocks([modelEthBlockExtended(blockDetails)]);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="w-full h-[60vh] md:col-span-4 shadow rounded-md border border-gray-200 dark:border-gray-700 p-1">
          <BlockChainVisualizer blocks={blocks} reset={reset} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-4 justify-between">
          <div className="p-4 shadow rounded-md border border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold dark:text-white">Latest Block</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Block Number</h2>
                <p>{latestBlockDetails?.number}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Hash</h2>
                <p className="w-32 overflow-hidden text-ellipsis">{latestBlockDetails?.hash}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Miner</h2>
                <p className="w-32 overflow-hidden text-ellipsis">{latestBlockDetails?.miner}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Timestamp</h2>
                <p>{moment(latestBlockDetails?.timestamp).format("YYYY-MM-DD HH:mm:ss")}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Total Difficulty</h2>
                <p>{latestBlockDetails?.totalDifficulty.toString()}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Size</h2>
                <p>{latestBlockDetails?.size}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Transactions</h2>
                <p>{latestBlockDetails?.transactions.length}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">WithDrawals</h2>
                <p>{latestBlockDetails?.withdrawals.length}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Gas Limit</h2>
                <p className="w-32 overflow-hidden text-ellipsis">{latestBlockDetails?.gasLimit} wei</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400">Gas Used</h2>
                <p className="w-32 overflow-hidden text-ellipsis">{latestBlockDetails?.gasUsed} wei</p>
              </div>
            </div>
          </div>
          <div className="p-4 shadow rounded-md border border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold">Actions</h1>
            <div className="mt-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
