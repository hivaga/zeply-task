export type ITransactionHash = string;

export interface ITransaction {
  hash: ITransactionHash;
  ver: number;
  vin_sz: number;
  vout_sz: number;
  size: number;
  weight: number;
  fee: number;
  relayed_by: string;
  lock_time: number;
  tx_index: number;
  double_spend: boolean;
  time: number;
  block_index: number;
  block_height: number;
  inputs: Input[];
  out: Output[];
}

interface Input {
  sequence: number;
  witness: string;
  script: string;
  index: number;
  prev_out: PrevOut;
}

interface PrevOut {
  addr: string;
  n: number;
  script: string;
  spending_outpoints: SpendingOutpoint[];
  spent: boolean;
  tx_index: number;
  type: number;
  value: number;
}

interface SpendingOutpoint {
  n: number;
  tx_index: number;
}

interface Output {
  type: number;
  spent: boolean;
  value: number;
  spending_outpoints: SpendingOutpoint[];
  n: number;
  tx_index: number;
  script: string;
  addr: string;
}
