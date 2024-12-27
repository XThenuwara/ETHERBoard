import Web3 from 'web3';

export default class Web3API {
    public static web3HttpProvider: Web3;
    public static web3WebSocketProvider: Web3;

    constructor() {
        console.log("Provider HTTP Endpoint: ", process.env.NEXT_PUBLIC_ETH_HTTP_PROVIDER_URL);
        console.log("Provider WS Endpoint: ", process.env.NEXT_PUBLIC_ETH_WS_PROVIDER_URL);
        Web3API.web3HttpProvider = new Web3(process.env.NEXT_PUBLIC_ETH_HTTP_PROVIDER_URL);
        Web3API.web3WebSocketProvider = new Web3(new Web3.providers.WebsocketProvider(process.env.NEXT_PUBLIC_ETH_WS_PROVIDER_URL || ""));
    }
}