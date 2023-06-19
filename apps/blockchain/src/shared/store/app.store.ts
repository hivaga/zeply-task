import {BehaviorSubject, from, switchMap, tap, throwError} from "rxjs";
import {getResponseError} from "../../utils/http-utils";
import {IAddress, IAddressDetails} from "../model/btc-address.types";
import {CurrencyCodes, ICurrencyRate} from "../model/currency.types";
import {ISearchForm} from "../model/search.types";
import {ITransaction, ITransactionHash} from "../model/transaction.types";


export class AppStore {

  readonly $searches = new BehaviorSubject<ISearchForm[]>([])
  readonly $addressDetailsMap = new BehaviorSubject(new Map<IAddress, IAddressDetails>());
  readonly $currentCurrency = new BehaviorSubject<CurrencyCodes>(CurrencyCodes.BTC);
  readonly $currencyRates = new BehaviorSubject<{ [P in keyof typeof CurrencyCodes]?: ICurrencyRate }>({})
  readonly $transactionDetailsMap = new BehaviorSubject(new Map<ITransactionHash, ITransaction>);

  constructor(private readonly baseUrl: string) {
  }

  addressBalanceRequest(data: ISearchForm) {

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
        return from<Promise<IAddressDetails>>(response.json())
      }),
      tap(response => {
        const cloneResponse = {...response};
        const addressDetails = this.$addressDetailsMap.value;
        addressDetails.set(cloneResponse.address, cloneResponse);
        this.$addressDetailsMap.next(addressDetails);

        const searches = this.$searches.value;
        searches.push(data);
        this.$searches.next([...searches]);
        console.log('Update searches list:', searches);
      }));

  }

  transactionSearchRequest(data: ISearchForm) {
    return from(fetch(`${this.baseUrl}/btc-search-transaction`, {
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
        return from<Promise<ITransaction>>(response.json())
      }),
      tap(response => {
        const cloneResponse = {...response};
        const transactionDetails = this.$transactionDetailsMap.value;
        transactionDetails.set(cloneResponse.hash, cloneResponse);
        this.$transactionDetailsMap.next(transactionDetails);

        console.log('Transaction received', response);

        const searches = this.$searches.value;
        searches.push(data);
        this.$searches.next([...searches]);
        console.log('Update searches list:', searches);
      }));
  }

  updateCurrencyRatesRequest(currency: CurrencyCodes) {

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
