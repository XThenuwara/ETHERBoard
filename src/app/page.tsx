"use client";
import EthAPI from "@/api/EthAPI";
import { useEffect, useState } from "react";
import EthWebSocket from "@/api/EthWebsocket";

export default function Home() {
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    if(EthAPI.ethHttpProvider == undefined)  {
      new EthAPI();
    }

    if(EthWebSocket.isWebSocketConnected() == false) {
      new EthWebSocket();

      setTimeout(() => {
          EthWebSocket.subscribeToNewBlockHeaders((block: any) => {
            console.log(block);
          setBlocks((prevBlocks) => [...prevBlocks, block]);
        })
      }, 1000);
    }
  }, []); 
 

  return (
    <div> 
        {blocks.map((block, index) => (
           <div>
              {JSON.stringify(block)}
            </div>
        ))}
    </div>
  );
}
