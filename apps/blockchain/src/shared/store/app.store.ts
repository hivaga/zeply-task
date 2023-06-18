import {BehaviorSubject, from, switchMap, tap, throwError} from "rxjs";
import {getResponseError} from "../../utils/http-utils";
import {CurrencyCodes} from "../consts/consts";


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

export interface ICurrencyRate {
  '15m': number
  buy: number
  last: number
  sell: number
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
  weight: number,
  txs: Transaction[]
}

export type IAddress = string;
export type FullAddressDetails = IAddressDetails;

export class AppStore {

  readonly $searches = new BehaviorSubject<ISearchForm[]>([])
  readonly $addressDetailsMap = new BehaviorSubject(new Map<IAddress, IAddressDetails>());
  readonly $currentCurrency = new BehaviorSubject<CurrencyCodes>(CurrencyCodes.BTC);
  readonly $currencyRates = new BehaviorSubject<{ [P in keyof typeof CurrencyCodes]?: ICurrencyRate }>({})

  constructor(private readonly baseUrl: string) {
  }

  addressBalanceRequest(data: ISearchForm) {
    const searches = this.$searches.value;
    searches.push(data);
    this.$searches.next([...searches]);

    return from(fetch(`${this.baseUrl}/btc-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })).pipe(
      switchMap((response) => {
        if (!response.ok) {
          return throwError(() => getResponseError(response, `Error while address balance!`));
        }
        return from<Promise<FullAddressDetails>>(response.json())
      }),
      tap(response => {
        const cloneResponse = {...response};
        const addressDetails = this.$addressDetailsMap.value;
        addressDetails.set(cloneResponse.address, cloneResponse);
        this.$addressDetailsMap.next(addressDetails);
      }));

  }

  transactionSearchRequest() {

  }

  currencyMultipliersRequest() {

  }

  updateCurrencyRatesRequest(currency: CurrencyCodes) {

    const currentCurrency = this.$currentCurrency.value
    this.$currentCurrency.next(currency);

    return from(fetch(`${this.baseUrl}/btc-conversion-rates`, {
      method: 'GET'
    })).pipe(
      switchMap((response) => {
        if (!response.ok) {
          return throwError(() => getResponseError(response, `Error while fetching currency rates!`));
        }
        return from<Promise<any>>(response.json())
      }),
      tap(response => {
        const cloneResponse = {
          ...response, [CurrencyCodes.BTC]: {
            sell: 1,
            last: 1,
            buy: 1
          }
        };
        this.$currencyRates.next(cloneResponse);
      }));


  }


}
