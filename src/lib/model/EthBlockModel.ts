import { Block, BlockExtended } from "@/lib/types/block.type";

export const modelEthBlock = (block: Block) => {
  return {
    hash: block.hash,
    parentHash: block.parentHash,
    sha3Uncles: block.sha3Uncles,
    miner: block.miner,
    stateRoot: block.stateRoot,
    transactionsRoot: block.transactionsRoot,
    receiptsRoot: block.receiptsRoot,
    logsBloom: block.logsBloom,
    difficulty: parseInt(block.difficulty, 16), 
    number: parseInt(block.number, 16), 
    gasLimit: parseInt(block.gasLimit, 16), 
    gasUsed: parseInt(block.gasUsed, 16), 
    timestamp: parseInt(block.timestamp, 16), 
    extraData: block.extraData,
    mixHash: block.mixHash,
    nonce: block.nonce,
    baseFeePerGas: parseInt(block.baseFeePerGas, 16), 
    withdrawalsRoot: block.withdrawalsRoot,
    blobGasUsed: parseInt(block.blobGasUsed, 16), 
    excessBlobGas: parseInt(block.excessBlobGas, 16), 
    parentBeaconBlockRoot: block.parentBeaconBlockRoot,
  };
};

export const modelEthBlockExtended = (block: BlockExtended) => {
  const hexToDecimal = (hex: any) => parseInt(hex, 16);
  const hexToUtf8 = (hex: any) => {
    try {
      return decodeURIComponent(hex.replace(/^0x/, "").replace(/(..)/g, "%$1"));
    } catch {
      return hex;
    }
  };

  const readableBlock = {
    baseFeePerGas: `${hexToDecimal(block.baseFeePerGas)} wei`,
    blobGasUsed: hexToDecimal(block.blobGasUsed),
    difficulty: hexToDecimal(block.difficulty),
    excessBlobGas: hexToDecimal(block.excessBlobGas),
    extraData: hexToUtf8(block.extraData),
    gasLimit: hexToDecimal(block.gasLimit),
    gasUsed: hexToDecimal(block.gasUsed),
    hash: block.hash,
    logsBloom: block.logsBloom,
    miner: block.miner,
    mixHash: block.mixHash,
    nonce: hexToDecimal(block.nonce),
    number: hexToDecimal(block.number),
    parentBeaconBlockRoot: block.parentBeaconBlockRoot,
    parentHash: block.parentHash,
    receiptsRoot: block.receiptsRoot,
    sha3Uncles: block.sha3Uncles,
    size: `${hexToDecimal(block.size)} bytes`,
    stateRoot: block.stateRoot,
    timestamp: new Date(hexToDecimal(block.timestamp) * 1000).toISOString(),
    totalDifficulty: hexToDecimal(block.totalDifficulty),
    transactions: block.transactions.map((tx) => ({
      from: tx.from,
      to: tx.to || "Contract Creation",
      value: `${hexToDecimal(tx.value)} wei`,
      gasPrice: `${hexToDecimal(tx.gasPrice)} wei`,
      maxFeePerGas: `${hexToDecimal(tx.maxFeePerGas)} wei`,
      maxPriorityFeePerGas: `${hexToDecimal(tx.maxPriorityFeePerGas)} wei`,
      input: tx.input,
      hash: tx.hash,
    })),
    withdrawals: block.withdrawals.map((withdrawal) => ({
      address: withdrawal.address,
      amount: `${hexToDecimal(withdrawal.amount)} wei`,
      index: hexToDecimal(withdrawal.index),
      validatorIndex: hexToDecimal(withdrawal.validatorIndex),
    })),
  };

  return readableBlock;
};
