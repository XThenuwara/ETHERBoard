export interface Block {
    hash: string;
    parentHash: string;
    sha3Uncles: string;
    miner: string;
    stateRoot: string;
    transactionsRoot: string;
    receiptsRoot: string;
    logsBloom: string;
    difficulty: string;
    number: string;
    gasLimit: string;
    gasUsed: string;
    timestamp: string;
    extraData: string;
    mixHash: string;
    nonce: string;
    baseFeePerGas: string;
    withdrawalsRoot: string;
    blobGasUsed: string;
    excessBlobGas: string;
    parentBeaconBlockRoot: string;
}


export interface BlockExtended {
    baseFeePerGas: string;
    blobGasUsed: string;
    difficulty: string;
    excessBlobGas: string;
    extraData: string;
    gasLimit: string;
    gasUsed: string;
    hash: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    nonce: string;
    number: string;
    parentBeaconBlockRoot: string;
    parentHash: string;
    receiptsRoot: string;
    sha3Uncles: string;
    size: string;
    stateRoot: string;
    timestamp: string;
    totalDifficulty: string;
    transactions: Transaction[];
    transactionsRoot: string;
    uncles: string[];
    withdrawals: Withdrawal[];
    withdrawalsRoot: string;
}

interface Transaction {
    accessList: any[];
    blockHash: string;
    blockNumber: string;
    chainId: string;
    from: string;
    gas: string;
    gasPrice: string;
    hash: string;
    input: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    nonce: string;
    r: string;
    s: string;
    to: string | null;
    transactionIndex: string;
    type: string;
    v: string;
    value: string;
}

interface Withdrawal {
    address: string;
    amount: string;
    index: string;
    validatorIndex: string;
}
