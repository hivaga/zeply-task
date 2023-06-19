import {render} from '@testing-library/react';
import {ITransaction} from "../../model/transaction.types";

import TransactionDetails from './transaction-details';

const transaction: ITransaction = {
  "hash": "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
  "ver": 1,
  "vin_sz": 1,
  "vout_sz": 2,
  "size": 258,
  "weight": 1032,
  "fee": 0,
  "relayed_by": "0.0.0.0",
  "lock_time": 0,
  "tx_index": 7703300705990921,
  "double_spend": false,
  "time": 1322135154,
  "block_index": 154598,
  "block_height": 154598,
  "inputs": [
    {
      "sequence": 4294967295,
      "witness": "",
      "script": "48304502210098a2851420e4daba656fd79cb60cb565bd7218b6b117fda9a512ffbf17f8f178022005c61f31fef3ce3f906eb672e05b65f506045a65a80431b5eaf28e0999266993014104f0f86fa57c424deb160d0fc7693f13fce5ed6542c29483c51953e4fa87ebf247487ed79b1ddcf3de66b182217fcaf3fcef3fcb44737eb93b1fcb8927ebecea26",
      "index": 0,
      "prev_out": {
        "addr": "1FwYmGEjXhMtxpWDpUXwLx7ndLNfFQncKq",
        "n": 2,
        "script": "76a914a3e2bcc9a5f776112497a32b05f4b9e5b2405ed988ac",
        "spending_outpoints": [
          {
            "n": 0,
            "tx_index": 7703300705990921
          }
        ],
        "spent": true,
        "tx_index": 53059022299747,
        "type": 0,
        "value": 100000000
      }
    }
  ],
  "out": [
    {
      "type": 0,
      "spent": true,
      "value": 98000000,
      "spending_outpoints": [
        {
          "tx_index": 3806555949458301,
          "n": 3
        }
      ],
      "n": 0,
      "tx_index": 7703300705990921,
      "script": "76a91429d6a3540acfa0a950bef2bfdc75cd51c24390fd88ac",
      "addr": "14pDqB95GWLWCjFxM4t96H2kXH7QMKSsgG"
    },
    {
      "type": 0,
      "spent": true,
      "value": 2000000,
      "spending_outpoints": [
        {
          "tx_index": 7058160547417340,
          "n": 5
        }
      ],
      "n": 1,
      "tx_index": 7703300705990921,
      "script": "76a91417b5038a413f5c5ee288caa64cfab35a0c01914e88ac",
      "addr": "13AMPUTTwryLGX3nrMvumaerSqNXkL3gEV"
    }
  ]
};

describe('TransactionDetails', () => {
  it('should render successfully', () => {
    const {baseElement} = render(<TransactionDetails data={transaction}/>);
    expect(baseElement).toBeTruthy();
  });
});
