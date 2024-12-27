export default class EthWebSocket {
  public static ethWebSocketProvider: WebSocket;
  private static isConnected: boolean = false;

  constructor() { 
    EthWebSocket.ethWebSocketProvider = new WebSocket(process.env.NEXT_PUBLIC_ETH_WS_PROVIDER_URL || "wss://ethereum-rpc.publicnode.com");
    this.setupWebSocket();
  }

  private setupWebSocket() {
    EthWebSocket.ethWebSocketProvider.onopen = () => {
      console.log("Connected to WebSocket");
      EthWebSocket.isConnected = true;

      EthWebSocket.ethWebSocketProvider.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      EthWebSocket.ethWebSocketProvider.onclose = () => {
        console.log("WebSocket connection closed");
        EthWebSocket.isConnected = false;
      };
    };
  }

  public static subscribeToNewBlockHeaders(callback: (block: any) => void) {
    if (EthWebSocket.isConnected) {
      const subscriptionRequest = {
        id: 1,
        method: "eth_subscribe",
        params: ["newHeads"],
      };

      EthWebSocket.ethWebSocketProvider.send(JSON.stringify(subscriptionRequest));

      EthWebSocket.ethWebSocketProvider.onmessage = (event) => {
        const data = event.data;
        const response = JSON.parse(data);
        console.log("Received message:", response);

        if (response.id === 1 && response.result) {
          console.log("Subscription successful. Subscription ID:", response.result);
        }

        if (response.method === "eth_subscription" && response.params) {
          const blockHeader = response.params.result;
          callback(blockHeader);
        }
      };
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  public static isWebSocketConnected(): boolean {
    return EthWebSocket.isConnected;
  }

  public static onConnection(callback: () => void) {
    if (EthWebSocket.isConnected) {
      callback();
    } else {
      EthWebSocket.ethWebSocketProvider.onopen = callback;
    }
  }

  
  public static onDisconnection(callback: () => void) {
    EthWebSocket.ethWebSocketProvider.onclose = callback;
  }
}
