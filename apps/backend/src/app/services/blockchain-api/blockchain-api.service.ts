import {HttpService} from "@nestjs/axios";
import {Injectable} from '@nestjs/common';
import {catchError, map, throwError} from "rxjs";

@Injectable()
export class BlockchainApiService {
  constructor(private httpService: HttpService) {
  }

  getAddressBalance(address: string) {
    // https://www.blockchain.com/explorer/api/blockchain_api
    // const url = `https://blockchain.info/q/addressbalance/${address}?confirmations=confirmations`
    const url = `https://blockchain.info/rawaddr/${address}?`;

    return this.httpService.get(url).pipe(
      map(response => response.data),
      catchError((err) => {
        console.error('Error in getAddressBalance', err)
        return throwError(() => err);
      }));
  }

  getConversionRates() {

    const url = `https://blockchain.info/ticker`;

    return this.httpService.get(url).pipe(
      map(response => response.data),
      catchError((err) => {
        console.error('Error in getConvertionRates', err)
        return throwError(() => err);
      }));
  }

  getTransactions(address: string) {
    const url = `https://blockchain.info/q/addressbalance/${address}?confirmations=confirmations`
    return this.httpService.get(url).pipe(map(response => response.data));
  }
}
