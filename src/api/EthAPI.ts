import Web3, { DEFAULT_RETURN_FORMAT, ETH_DATA_FORMAT, FMT_NUMBER, Web3EthInterface } from "web3";
export default class EthAPI {

    public static ethHttpProvider: Web3EthInterface;

    constructor() {
        EthAPI.ethHttpProvider = new Web3(process.env.NEXT_PUBLIC_ETH_HTTP_PROVIDER_URL).eth;
    }
    
    public static async getBlock(blockHashOrBlockNumber: string | number): Promise<any> {
        return await EthAPI.ethHttpProvider.getBlock(blockHashOrBlockNumber, true, ETH_DATA_FORMAT);
    }

    public static async getBlockNumber(): Promise<BigInt> {
        return await EthAPI.ethHttpProvider.getBlockNumber();
    }

    public static async getBlockTransactionCount(blockHashOrBlockNumber: string | number) {
        const transactionCount = await EthAPI.getBlockTransactionCount('latest');
        console.log(transactionCount);
    }
}