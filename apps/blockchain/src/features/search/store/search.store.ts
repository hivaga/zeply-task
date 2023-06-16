import {BehaviorSubject, from, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";


export interface ISearchForm {
  hash: string,
  type: 'address' | 'transaction'
}

export interface IAddressDetails {
  address: string
  final_balance: number
  hash160: string
  n_tx: number
  n_unredeemed: number
  total_received: number
  total_sent: number
}

export interface Transaction {
  balance: number
  block_height: number
  block_index: number
  double_spend: boolean
  fee: number
  hash: string
  inputs: any[]
  lock_time: number
  out: any[]
  relayed_by: string
  result: number
  size: number
  time: number
  tx_index: number
  ver: number
  vin_sz: number
  vout_sz: number
  weight: number
}

export type IAddress = string;

export type FullAddressDetails = IAddressDetails & {txs: Transaction[]}

const BASE_API_URL = environment.api.baseUrl;

export class SearchStore {

  search = new BehaviorSubject<ISearchForm>({
    hash: '',
    type: 'address'
  });

  addressDetailsMap = new BehaviorSubject(new Map<IAddress, IAddressDetails>());
  transactionsByAddressMap = new BehaviorSubject(new Map<IAddress, Transaction[]>);

  addressBalance(data: ISearchForm) {
    this.search.next(data);

    return from(fetch('http://localhost:3000/api/search-btc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })).pipe(
      switchMap((response) => from<Promise<FullAddressDetails>>(response.json())),
      tap(response => {

        const cloneResponse = {...response};

        const transactions = this.transactionsByAddressMap.value;
        transactions.set(cloneResponse.address, cloneResponse.txs);
        this.transactionsByAddressMap.next(transactions);

        delete (cloneResponse as Partial<FullAddressDetails>).txs;

        const addressDetails = this.addressDetailsMap.value;
        addressDetails.set(cloneResponse.address, cloneResponse);
        this.addressDetailsMap.next(addressDetails);
      })
    );

  }

  sendTransactionSearchRequest(data: ISearchForm) {
    this.search.next(data);
  }

}
